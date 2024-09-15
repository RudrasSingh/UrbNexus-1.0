from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {"message": "Hello from the backend!"}
    return jsonify(data)

@app.route('/api/data', methods=['GET','POST'])
def post_data():
    data = request.json
    # Print the data received from the frontend
    print("Data received:", data)
    if "abcd" in data["email"]:
        print({"message": "welcome from the backend"})
        return jsonify({"message": "welcome from the backend"})
    
    # Process the data as needed
    return jsonify({"status": "Data received"}), 201

if __name__ == '__main__':
    app.run(debug=True)
