#flask bakend with react frontend
from flask import *
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/api')
def api():
    return jsonify({'data': 'Hello from the backend!'})

if __name__ == '__main__':
    app.run(debug=True)

    



