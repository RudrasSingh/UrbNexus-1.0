from flask import *
from flask_cors import CORS
from config import Config
from authlib.integrations.flask_client import OAuth
from pyrebase import *
import database as db
from resource_allocator_algo import ResourceAllocator
import random
from functools import wraps
import merger
import emailService as mail


#----------------------application setup----------------------------------------
app = Flask(__name__)
CORS(app)
api = Blueprint("api", __name__, url_prefix="/api/v1")
app.config.from_object(Config)
app.secret_key = Config.FLASK_SECRET

oauth = OAuth(app)
oauth.register(
    "myApp",
    client_id=Config.OAUTH2_CLIENT_ID,
    client_secret=Config.OAUTH2_CLIENT_SECRET,
    client_kwargs={"scope": "openid profile email"},
    server_metadata_url=Config.OAUTH2_META_URL
)

firebase = initialize_app(Config.FIREBASE_CONFIG)
auth = firebase.auth()
# -----------------------------------------------------------------------------
#authentications
def role_restricted(excluded_roles):
    """
    Decorator to deny access to users with specific roles.
    If the user's role is in `excluded_roles`, they will be blocked.
    """
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            if "user" not in session:
                return jsonify({"message": "Unauthorized access. Please sign in.", "redirect": "/google-login"}), 401

            user_email = session["user"].get("email")
            if not user_email:
                return jsonify({"message": "Invalid session. Please sign in again."}), 401

            # Fetch the user's role from the database
            user_role = "public" if db.read_public_user_by_email(user_email) else "authority"

            if user_role in excluded_roles:
                return jsonify({"message": "Access Denied"}), 403

            return f(*args, **kwargs)
        return wrapper
    return decorator

#Google Login
@api.route("/callback/<flow>")
def googleCallback(flow):
    token = oauth.myApp.authorize_access_token()

    if not token:
        abort(400, "Authorization failed or state mismatch")

    token = dict(token)
    userinfo = token.get('userinfo')

    if not userinfo:
        # Handle the case where user info is not available
        abort(400, "Failed to fetch user information")

    user_info = {
        "name": userinfo.get('name'),
        "email": userinfo.get('email'),
        "id_token": token.get('id_token'),
        "proile_picture": userinfo.get('picture')
    }

    # Set complete user information in the session
    session["user"] = user_info

    if flow == "login":
        return jsonify({"name":user_info["name"],"email":user_info["email"],"profile_picture":user_info["profile_picture"]})
    elif flow == "signup":
        # Store user info in the database
        db.create_public_user(user_info["name"], user_info["email"], pro_pic=user_info["profile_picture"])
        return jsonify({"name":user_info["name"],"email":user_info["email"],"profile_picture":user_info["profile_picture"]})
    else:
        abort(400, "Invalid flow type")



@api.route("/google-login")
def googleLoginUser():
    if "user" in session:
        abort(404)
    return oauth.myApp.authorize_redirect(redirect_uri=url_for("googleCallback", flow="login", _external=True))


@api.route("/google-signup")
def googleSignupUser():
    if "user" in session:
        abort(404)
    return oauth.myApp.authorize_redirect(redirect_uri=url_for("googleCallback", flow="signup", _external=True))


@api.route('/signup-public', methods = ['GET','POST'])
def signupUser():
    if request.method == 'POST':
        name = request.json.get('name')
        email = request.json.get('email')
        password = request.json.get('password')
        if request.json.get('profile_picture'):
            picture = request.json.get('profile_picture')
        else:
            picture = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        
        try:
            user = auth.create_user_with_email_and_password(email, password)
            db.create_public_user(name,email,pro_pic=picture)
            auth.send_email_verification(user.get("idToken"))
            return jsonify({"message":"User created successfully","name":name,"email":email,"profile_picture":picture})
        
        except Exception as e:
            error = str(e)
            return jsonify({"message":error})
            
    else:
        return jsonify({"message":"Invalid request method"})

@api.route('/signup-authority', methods=['GET', 'POST'])
def signupAuthority():
    if request.method == 'POST':
        data = request.get_json()  # Get the entire JSON payload
        if not data:
            return jsonify({"message": "Invalid JSON payload"}), 400

        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        authorityId = data.get('authorityId')
        contact = data.get('contact')
        role = data.get('role')
        department = data.get('department')

        if not email or not password:
            return jsonify({"message": "Email and password are required"}), 400

        if 'profile_picture' in request.files:
            picture = upload_to_firebase(request.files['profile_picture'])
        else:
            picture = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

        try:
            
            # Store user info in the database
            user = auth.create_user_with_email_and_password(email, password)
            db.create_dep_head(name,contact,email,picture,authorityId)
            auth.send_email_verification(user.get("idToken"))
            print(user, name, email, role, department, picture, authorityId)

            return jsonify({
                "message": "User created successfully",
                "name": name,
                "email": email,
                "profile_picture": picture
            })
        
        except Exception as e:
            error_message = str(e)
            return jsonify({"message": f"Error: {error_message}"}), 400

    return jsonify({"message": "Invalid request method"}), 405
    
@api.route('/login', methods = ['GET','POST'])
def login():
    if request.method == 'POST': 
        info = request.get_json()
        email = info.get("email")
        password = info.get("password")

        try:
            user = auth.sign_in_with_email_and_password(email, password)
            idToken = user["idToken"]
            user = auth.get_account_info(user['idToken'])
            session['user'] = {
                "name":user["users"],
                "email":user["users"][0]["email"],
                "emailVerified":user["users"][0]["emailVerified"],
                "idToken":idToken
            }
            print(user)
            return jsonify({"message":"Login Successful","id":1,"info":session["user"]})
        
        except Exception as e:
            login_error = "Invalid email or password. Please try again."
            return jsonify({"message":f"something went wrong. Please try again later {e}"})
    else:
        return jsonify({"message":"Login Failure"})


@api.route('/logout')
def logout():

    session.pop('user', None)
    session.clear()
    return jsonify({"message":"Log out success"})

# @api.route('/deleteTask')
# def dels():
#     task_id = 43973
#     if not task_id:
#         return jsonify({"message": "Task ID is required"}), 400

#     try:
#         db.delete_task(task_id)
#         return jsonify({"message": "Task deleted successfully"})
#     except Exception as e:
#         return jsonify({"message": f"Failed to delete task: {str(e)}"}), 500
#---------------------------------------------------------------------------------------
# image uploading function
def upload_to_firebase(file):
    """uploading the profile image on cloud storage"""
    file_name = file.filename
    auth.storage.child(file_name).put(file)
    url = auth.storage.child(file_name).get_url(None)
    return url

#---------------------------------------------------------------------------------------
#functionality code
@api.route('/new-task', methods=['GET','POST'])
def createTask():
    if "user" in session:

        # Get task details from the front end
        info = request.get_json()
        depart = info.get("department")
        # deptId = []
        # for id in db.read_departments():
        #     deptId.append({"id":id.get("dep_id"),"name":id.get("dep_name")})
        # for id in deptId:
        #     if depart==id.get("name"):
        #         department = id.get("id")
        try:
            existing_task_ids = [task.get("t_id") for task in db.read_tasks()]
            while True:
                taskId = random.randint(10000, 99999)
                if taskId not in existing_task_ids:
                    break
            taskinfo = {
            "id" : taskId,
            "title": info.get("title"),
            "desc": info.get("desc"),
            "projManager": info.get("projManager"),
            "department": 1002,
            "stat": info.get("stat"),
            "priority": info.get("priority"),
            "location": info.get("location"),
            "deadline": info.get("deadline"),
            "resources": info.get("resources")
            }
            db.create_task(taskinfo.get("id"), taskinfo.get("title"),taskinfo.get("desc"),taskinfo.get("projManager"),taskinfo.get("department"), taskinfo.get("stat"), taskinfo.get("priority"), taskinfo.get("location"), taskinfo.get("deadline"), json.dumps(taskinfo.get("resources")))
            mail.task_created_email(session.get("email"),session.get("name"),taskinfo.get("title"))
            return jsonify({"message":"Task created successfully","task details":db.read_tasks()})
        
        except Exception as e:   
            return({"message":f"something went wrong! Please try again later {e}"})

        
        #TODO: allocate the resources for the task using Resource Allocation Algorithm and notify upon success

    #    info  = request.get_json()

    #     allocation_result= allocation_for_task(info)


    #TODO: write the mechanism to get the details from the front end and store it in the database
    # info = request.get_json()
    # depart = info.get("department")
    # deptId = []
    # department = 1234
    # # for id in db.read_departments():
    # #     deptId.append({"id":id.get("dep_id"),"name":id.get("dep_name")})
    # # for id in deptId:
    # #     if depart==id.get("name"):
    # #         department = id.get("id")
    # try:
    #     taskId = 1234
    #     task=f"TK{random.randint(10000,99999)}"
    #     # for id in db.read_tasks():
    #     #     if id.get("t_id") != task:
    #     #         taskId = task
    #     taskinfo = {
    #         "id" : taskId,
    #         "title": info.get("title"),
    #         "desc": info.get("desc"),
    #         "projManager": info.get("projManager"),
    #         "department": depart,
    #         "stat": info.get("stat"),
    #         "priority": info.get("priority"),
    #         "location": info.get("location"),
    #         "deadline": info.get("deadline")
    #     }
    #     # db.create_task(taskId, info.get("title"),None, None,None, info.get("stat"), info.get("priority"), info.get("location"), info.get("deadline"))

    #     return jsonify({"message":"Task created successfully","task details":db.read_tasks()})
    
    # except Exception as e:   
    #     return({"message":f"something went wrong! Please try again later {e}"})
    #TODO: allocate the resources for the task using Resource Allocation Algorithm and notify upon success
    

    #TODO: run the task overlapping algorithm to check for overlapping tasks and notify the user
    
    #TODO: check for the overlapping tasks and ask them if they want to merge the task and if yes then merge the task and modify the database accordingly for merged tasks and notify the user about the same and return the task details

    # return jsonify({"message":"Task created successfully","info":info})

@api.route('/checkMerge', methods=['GET','POST'])
def mergeCheck():
    if "user" not in session:
        return jsonify({"message": "User not logged in"}), 401

    try:
        # Fetch all tasks from PostgreSQL (Assume it returns a list of tuples)
        tasks_data = db.read_tasks()  

        if not tasks_data:
            return jsonify({"message": "No tasks found", "tasks": []})

        tasks_json = [
            {
                "id": task[0],          # t_id
                "name": task[1],        # title
                "description": task[2], # descr
                "assigned_to": task[3], # assign_to
                "department_id": task[4], # dep_id
                "status": task[5],      # stat
                "priority": task[6],    # priority
                "location": task[7],    # loc
                "due_date": task[8],    # due
                "requirements": task[9] # req
            }
            for task in tasks_data
        ]

        # Check for overlapping tasks and merge them
        merged_tasks = merger.merge_tasks(tasks_json)
        return jsonify({"message": "Tasks merged successfully", "merged_tasks": merged_tasks})
        
    except Exception as e:
        return jsonify({"message": f"Something went wrong! Error: {str(e)}"}), 500
    
@api.route('/forum',methods=['GET'])
def discussionForum():
    if "user" in session:
        forumContent = db.read_all_posts()
        forum = {}
        for content in forumContent:
            forum[content.get("email")] = content
        return jsonify({"message":"Forum content","forum":jsonify(forum)})
    else:
        return jsonify({"message":"User not logged in"}), 401
        
@api.route('/new-post',methods=['GET','POST'])
def createPost():
    if "user" in session:
        post = request.get_json()
        postCount = 100
        postId = session.get("name")+str(postCount)
        if postId not in db.get_all_post_ids():
            postCount+=1
            try:
                db.create_post(postId,session.get("email"),session.get("name"),post.get("title"),post.get("content"))
                return jsonify({"message":"Post created successfully","post":post})
            except Exception as e:
                return jsonify({"message":f"something went wrong! Please try again later {e}"})
        else:
            try:
                db.create_post(postId,session.get("email"),session.get("name"),post.get("title"),post.get("content"))
                return jsonify({"message":"Post created successfully","post":post})
            except Exception as e:
                return jsonify({"message":f"something went wrong! Please try again later {e}"})
    else:
        return jsonify({"message":"User not logged in"}), 401
    
@api.route('/new-reply',methods=['GET','POST'])
def addReply():
    if "user" in session:
        reply = request.get_json()
        postId = reply.get("postId")
        try:
            # db.create_comment(commentId,postId,session.get("email"),session.get("name"),comment.get("content"))
            db.add_reply(postId,reply,session.get("name"))
            return jsonify({"message":"Comment created successfully","comment":reply})
        except Exception as e:
            return jsonify({"message":f"something went wrong! Please try again later {e}"})
    else:
        return jsonify({"message":"User not logged in"}), 401



#           #TODO: run the task overlapping algorithm to check for overlapping tasks and notify the user
#         if overlapping_tasks:
#            merge_decision = handle_task_overlap(overlapping_tasks, info)

#          #TODO: check for the overlapping tasks and ask them if they want to merge the task and if yes then merge the task and modify the database accordingly for merged tasks and notify the user about the same and return the task details

#         return jsonify({"message":"Task created successfully","info":info})
#         return jsonify({
#             "message": "Task processed successfully",
#             "task_info": info,
#             "allocation": allocation_result
#         })
#     else:
#         return jsonify({"message": "User not logged in"}), 401



def allocation_for_task(info):
    
    try:
        # Extract task details from the info object
        project_name = info.get("name")
        project_priority = info.get("priority", "low")  # Default to 'low' if not provided
        project_requirements = info.get("requirements", {})  # Get task requirements from the JSON

        #fetch these from the DB ------>
        available_resources = {
            "machinery": 8,
            "workers": 15
        }

        # Create the project as a dictionary with name, priority, and requirements
        new_project = [{
            "name": project_name,
            "priority": project_priority,
            "requirements": project_requirements
        }]

       
        allocator = ResourceAllocator(new_project, available_resources)
        allocation = allocator.allocate_resources()

        # Return the allocated resources
        return allocation
    except Exception as e:
        raise Exception(f"Resource allocation failed: {str(e)}")


app.register_blueprint(api)
if __name__ == '__main__':
    app.run(debug=True)





