#flask bakend with react frontend
from flask import *
from flask_cors import CORS
from config import Config
from authlib.integrations.flask_client import OAuth
from pyrebase import *
import database as db
from resource_allocator_algo import ResourceAllocator
import random


#----------------------application setup----------------------------------------
app = Flask(__name__)
CORS(app)

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
#Google Login
@app.route("/callback/<flow>")
def googleCallback(flow):
    token = oauth.myApp.authorize_access_token()
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
        '''
        TODO: add function tob store user info in database 
        '''
        return jsonify({"name":user_info["name"],"email":user_info["email"],"profile_picture":user_info["profile_picture"]})
    else:
        abort(400, "Invalid flow type")



@app.route("/google-login")
def googleLoginUser():
    if "user" in session:
        abort(404)
    return oauth.myApp.authorize_redirect(redirect_uri=url_for("googleCallback", flow="login", _external=True))


@app.route("/google-signup")
def googleSignupUser():
    if "user" in session:
        abort(404)
    return oauth.myApp.authorize_redirect(redirect_uri=url_for("googleCallback", flow="signup", _external=True))


@app.route('/signup-public', methods = ['GET','POST'])
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
            # user = auth.create_user_with_email_and_password(email, password)
            return jsonify({"message":"User created successfully","name":name,"email":email,"profile_picture":picture})
        
        except Exception as e:
            return jsonify({"message":e.args[1]})
    else:
        return jsonify({"message":"Invalid request method"})

@app.route('/signup-authority', methods = ['GET','POST'])
def signupAuthority():
    if request.method == 'POST':

        name = request.json.get('name')
        email = request.json.get('email')
        password = request.json.get('password')
        authorrityId = request.json.get('authorityId')
        role = request.json.get('role')
        department = request.json.get('department')
        if request.json.get('profile_picture'):
            picture = request.json.get('profile_picture')
        else:
            picture = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        
        try:
            user = auth.create_user_with_email_and_password(email, password)

            #TODO: create user in database with specific role and department
            # db.create_user(user["localId"], name, email, role, department, picture)
            print(user, name, email, role, department, picture, authorrityId)

            return jsonify({"message":"User created successfully","name":name,"email":email,"profile_picture":picture})
        
        except Exception as e:
            return jsonify({"message":e.args[1]})
    else:
        return jsonify({"message":"Invalid request method"})
    
@app.route('/login', methods = ['GET','POST'])
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
                "name":user["users"][0]["displayName"],
                "email":user["users"][0]["email"],
                "emailVerified":user["users"][0]["emailVerified"],
                "idToken":idToken
            }
            return jsonify({"message":"Login Successful","id":1,"info":session["user"]})
        
        except Exception as e:
            login_error = "Invalid email or password. Please try again."
            return jsonify({"message":"something went wrong. Please try again later"})
    else:
        return jsonify({"message":"Login Failure"})


@app.route('/logout')
def logout():

    session.pop('user', None)
    session.clear()
    return jsonify({"message":"Log out success"})

#---------------------------------------------------------------------------------------
#functionality code
@app.route('/new-task', methods=['GET','POST'])
def createTask():
    if "user" in session:

        #TODO: write the mechanism to get the details from the front end and store it in the database
       # info = request.get_json()
       # try:
         #   db.

        
        #TODO: allocate the resources for the task using Resource Allocation Algorithm and notify upon success

        info = request.get_json()

        allocation_result= allocation_for_task(info)


    #TODO: write the mechanism to get the details from the front end and store it in the database
    info = request.get_json()
    depart = info.get("department")
    deptId = []
    department = 1234
    # for id in db.read_departments():
    #     deptId.append({"id":id.get("dep_id"),"name":id.get("dep_name")})
    # for id in deptId:
    #     if depart==id.get("name"):
    #         department = id.get("id")
    try:
        taskId = 1234
        task=f"TK{random.randint(10000,99999)}"
        # for id in db.read_tasks():
        #     if id.get("t_id") != task:
        #         taskId = task
        taskinfo = {
            "id" : taskId,
            "title": info.get("title"),
            "desc": info.get("desc"),
            "projManager": info.get("projManager"),
            "department": depart,
            "stat": info.get("stat"),
            "priority": info.get("priority"),
            "location": info.get("location"),
            "deadline": info.get("deadline")
        }
        # db.create_task(taskId, info.get("title"),None, None,None, info.get("stat"), info.get("priority"), info.get("location"), info.get("deadline"))

        return jsonify({"message":"Task created successfully","task details":db.read_tasks()})
    
    except Exception as e:   
        return({"message":f"something went wrong! Please try again later {e}"})
    #TODO: allocate the resources for the task using Resource Allocation Algorithm and notify upon success
    

    #TODO: run the task overlapping algorithm to check for overlapping tasks and notify the user
    
    #TODO: check for the overlapping tasks and ask them if they want to merge the task and if yes then merge the task and modify the database accordingly for merged tasks and notify the user about the same and return the task details

    # return jsonify({"message":"Task created successfully","info":info})

# @app.route('/forum',methods=['GET'])
# def discussionForum():
#     if "user" in session:
#         pass
#     else:
#         pass
        


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


if __name__ == '__main__':
    app.run(debug=True)





