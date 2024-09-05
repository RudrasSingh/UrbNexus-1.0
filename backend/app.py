#flask bakend with react frontend
from flask import *
from flask_cors import CORS
from config import Config
from authlib.integrations.flask_client import OAuth
from pyrebase import *

#----------------------application setup---------------------------------------
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
        role = request.json.get('role')
        department = request.json.get('department')
        if request.json.get('profile_picture'):
            picture = request.json.get('profile_picture')
        else:
            picture = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        
        try:
            user = auth.create_user_with_email_and_password(email, password)

            #TODO: create user in database with specific role and department

            return jsonify({"message":"User created successfully","name":name,"email":email,"profile_picture":picture})
        
        except Exception as e:
            return jsonify({"message":e.args[1]})
    else:
        return jsonify({"message":"Invalid request method"})
    
@app.route('/login', methods = ['GET','POST'])
def login():
    if request.method == 'POST': 
        email = request.form['email']
        password = request.form['password']        
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
            return redirect('/')
        
        except Exception as e:
            login_error = "Invalid email or password. Please try again."
            return render_template('login.html', login_error = login_error, login_display_error = True)
    else:
        return render_template('login.html')


@app.route('/logout')
def logout():

    session.pop('user', None)
    session.clear()
    return jsonify({"message":"Log out success"})

# ---------------------------------------------------------------------------------------



if __name__ == '__main__':
    app.run(debug=True)





