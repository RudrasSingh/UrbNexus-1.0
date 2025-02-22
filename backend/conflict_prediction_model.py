# train_model.py
import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from datetime import date
import random
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import pandas as pd

# Function to generate more detailed dataset with additional features
def generate_data(num_samples=1000):
    data = []
    for _ in range(num_samples):
        # Generate base features
        latitude = random.uniform(28.4, 28.9)
        longitude = random.uniform(76.8, 77.4)
        start_date = random.randint(date(2020, 1, 1).toordinal(), date(2023, 1, 1).toordinal())
        duration = random.randint(30, 300)
        department_id = random.randint(1, 10)

        # Calculate geographic risk based on proximity to high-risk zones
        risk_zones = [(28.5, 77.1), (28.8, 76.9)]
        risk = min([np.sqrt((latitude - zone[0])**2 + (longitude - zone[1])**2) for zone in risk_zones])

        # Assign conflict probability based on risk and departmental factors
        conflict_prob = 0.2 + 0.1 * risk + 0.05 * (department_id - 1)
        conflict = random.random() < conflict_prob

        # Add seasonality and project complexity
        seasonality = date.fromordinal(start_date).timetuple().tm_yday
        project_complexity = (duration / 100) * department_id

        # Introduce noise to numerical features
        latitude += random.uniform(-0.01, 0.01)
        longitude += random.uniform(-0.01, 0.01)
        duration += random.randint(-10, 10)

        data.append([latitude, longitude, start_date, duration, department_id, risk, seasonality, project_complexity, conflict])

    df = pd.DataFrame(data, columns=['latitude', 'longitude', 'start_date', 'duration', 'department_id', 'risk', 'seasonality', 'project_complexity', 'conflict'])
    return df

# Function to generate synthetic training data with more features
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
        duration = end_date - start_date

        # Project department (as integer IDs for simplicity)
        department_id = random.randint(1, 10)

        # Introduce geographic risk (high risk for certain latitudes, longitudes)
        risk_zone = 1 if latitude < 28.6 and longitude > 77.0 else 0

        # Convert start_date to day of the year (seasonality)
        seasonality = date.fromordinal(start_date).timetuple().tm_yday

        # Project complexity based on duration and department type (more complex projects might be more prone to conflicts)
        project_complexity = (duration / 100) * department_id

        # Whether the project had a conflict or not (0 = no conflict, 1 = conflict), weighted by risk zone and complexity
        conflict = random.choices([0, 1], weights=[0.7, 0.3])[0] if risk_zone or project_complexity > 10 else random.choice([0, 1])

        # Feature set: [latitude, longitude, start_date, duration, department_id, risk_zone, seasonality, project_complexity]
        X.append([latitude, longitude, start_date, duration, department_id, risk_zone, seasonality, project_complexity])
        y.append(conflict)

    return np.array(X), np.array(y)

# File path to save the trained model
MODEL_PATH = 'conflict_prediction_model.joblib'

# Function to train and evaluate the model
def train_and_evaluate_model():
    for i in range(3):
        print(f"Training model iteration {i + 1}...")

        # Generate new dataset for each iteration
        X, y = generate_training_data(num_samples=2000)
        df = generate_data(num_samples=10000)  # Larger dataset for external use
        df.to_csv('generated_data.csv', index=False)  # Save the dataset as CSV

        # Split the data into training and testing sets
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

        # Use a Random Forest Classifier for better performance
        model = RandomForestClassifier(n_estimators=200, random_state=42, class_weight='balanced')
        model.fit(X_train, y_train)

        # Save the trained model to disk
        model_file_path = f"{MODEL_PATH}_iter_{i + 1}.joblib"
        joblib.dump(model, model_file_path)
        print(f"Model trained and saved to {model_file_path}")

        # Evaluate the model on the test data
        y_pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        report = classification_report(y_test, y_pred)

        # Output the evaluation results
        print(f"Accuracy for iteration {i + 1}: {accuracy * 100:.2f}%")
        print("Classification Report:")
        print(report)
        print("\n" + "="*50 + "\n")

# if __name__ == "__main__":
#     train_and_evaluate_model()
