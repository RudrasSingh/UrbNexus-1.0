from flask import Flask, request, jsonify, session # type: ignore
from flask_cors import CORS # type: ignore


app = Flask(__name__)
CORS(app)

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    # Check if the username and password are valid
    if username == 'admin' and password == 'password':
        session['logged_in'] = True
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Invalid credentials'})

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('logged_in', None)
    return jsonify({'message': 'Logout successful'})

@app.route('/protected', methods=['GET'])
def protected():
    if 'logged_in' in session:
        return jsonify({'message': 'This is a protected route'})
    else:
        return jsonify({'message': 'Unauthorized'})

if __name__ == '__main__':
    app.run(debug=True)