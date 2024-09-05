import joblib
import numpy as np
from sqlalchemy import func, and_
from flask import Flask, jsonify, request
from flask_socketio import SocketIO, emit
from datetime import date
from smtplib import SMTP
from email.mime.text import MIMEText

# Flask and Flask-SocketIO setup
app = Flask(__name__)
socketio = SocketIO(app)

# Load the model
MODEL_PATH = 'conflict_prediction_model.joblib'

# Email SMTP Configuration (using Gmail as an example)
SMTP_SERVER = 'smtp.gmail.com'
SMTP_PORT = 587
SENDER_EMAIL = 'your-email@gmail.com'
SENDER_PASSWORD = 'your-password'

# Proximity radius for geographic proximity checks (in meters)
PROXIMITY_RADIUS = 500

# Function to send email notifications
def send_email_notification(recipient_email, subject, message):
    try:
        server = SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        
        msg = MIMEText(message)
        msg['Subject'] = subject
        msg['From'] = SENDER_EMAIL
        msg['To'] = recipient_email
        
        server.sendmail(SENDER_EMAIL, recipient_email, msg.as_string())
        server.quit()
        print(f"Email sent to {recipient_email}")
    except Exception as e:
        print(f"Error sending email: {e}")

# Function to load the saved model
def load_model():
    try:
        model = joblib.load(MODEL_PATH)
        print(f"Model loaded from {MODEL_PATH}")
        return model
    except FileNotFoundError:
        print("Error: Trained model not found. Train the model first.")
        return None

# Function to detect overlapping projects based on location and time
# def detect_project_overlap(new_project, db_session):
    new_location = new_project['location']
    new_start_date = new_project['start_date']
    new_end_date = new_project['end_date']
    
    # overlapping_projects = db_session.query(Project).filter(
    #     func.ST_DWithin(Project.location, new_location, PROXIMITY_RADIUS),
    #     and_(Project.start_date <= new_end_date, Project.end_date >= new_start_date)
    # ).all()

    # return overlapping_projects

# Function to notify departments of overlapping projects
# def notify_departments(overlapping_projects, new_project):
    for project in overlapping_projects:
        # department = get_department_by_id(project.department_id)
        
        # Email notification
        send_email_notification(
            recipient_email=department.email,
            subject=f"Overlap Alert: Project '{new_project['name']}'",
            message=f"Your project '{project.name}' overlaps with the new project '{new_project['name']}'"
        )

        # Real-time notification using WebSocket
        socketio.emit('notification', {
            'message': f"Project '{new_project['name']}' overlaps with '{project.name}' in your department."
        }, room=department.id)

# Function to predict project conflict using the ML model
def predict_project_conflict(model, new_project):
    location = new_project['location']
    start_date = new_project['start_date'].toordinal()
    end_date = new_project['end_date'].toordinal()
    duration = end_date - start_date
    department = new_project['department_id']

    # Prepare feature set for the new project
    new_project_features = np.array([[location.x, location.y, start_date, duration, department]])

    # Predict conflict and probability
    conflict_prediction = model.predict(new_project_features)
    conflict_probability = model.predict_proba(new_project_features)

    return conflict_prediction[0], conflict_probability[0][1]

# Flask route for project overlap check and conflict prediction
@app.route('/check_overlap', methods=['POST'])
def check_project_overlap():
    data = request.get_json()

    # Extract project data from request
    new_project = {
        'name': data['name'],
        'location': data['location'],  # Assuming (lat, lon) format or WKT
        'start_date': date.fromisoformat(data['start_date']),
        'end_date': date.fromisoformat(data['end_date']),
        'department_id': data['department_id']
    }

    # Load the trained model
    model = load_model()

    if not model:
        return jsonify({'error': 'Model not available. Please train the model first.'}), 500

    # Check for overlapping projects
    overlapping_projects = detect_project_overlap(new_project, db_session)

    # If there are overlaps, notify the departments
    if overlapping_projects:
        notify_departments(overlapping_projects, new_project)

    # Predict potential conflict using the machine learning model
    conflict_prediction, conflict_probability = predict_project_conflict(model, new_project)

    return jsonify({
        'conflict_prediction': bool(conflict_prediction),
        'conflict_probability': conflict_probability,
        'overlapping_projects': [{'name': proj.name, 'department_id': proj.department_id} for proj in overlapping_projects]
    })

if __name__ == "__main__":
    socketio.run(app, debug=True)
