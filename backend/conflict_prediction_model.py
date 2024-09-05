# train_model.py
import joblib
import numpy as np
from sklearn.linear_model import LogisticRegression
from datetime import date
import random

# File path to save the trained model
MODEL_PATH = 'conflict_prediction_model.joblib'

# Function to generate synthetic training data
def generate_training_data(num_samples=1000):
    X = []
    y = []

    for _ in range(num_samples):
        # Random geographic coordinates within a city (latitude, longitude)
        latitude = random.uniform(28.4, 28.9)  # Delhi's latitude range
        longitude = random.uniform(76.8, 77.4)  # Delhi's longitude range

        # Random project start and end dates
        start_date = random.randint(date(2020, 1, 1).toordinal(), date(2023, 1, 1).toordinal())
        end_date = start_date + random.randint(30, 300)  # Random project duration in days

        # Project department (as integer IDs for simplicity)
        department_id = random.randint(1, 10)

        # Whether the project had a conflict or not (0 = no conflict, 1 = conflict)
        conflict = random.choice([0, 1])

        # Feature set: [latitude, longitude, start_date, project_duration, department_id]
        duration = end_date - start_date
        X.append([latitude, longitude, start_date, duration, department_id])
        y.append(conflict)

    return np.array(X), np.array(y)

# Function to train the model and save it
def train_and_save_model():
    X, y = generate_training_data(num_samples=2000)

    model = LogisticRegression(max_iter=1000)
    model.fit(X, y)

    # Save the trained model to disk
    joblib.dump(model, MODEL_PATH)
    print(f"Model trained and saved to {MODEL_PATH}")

if __name__ == "__main__":
    train_and_save_model()
