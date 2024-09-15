import pandas as pd
from math import radians, cos, sin, sqrt, atan2
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import numpy as np
from itertools import combinations
from joblib import Parallel, delayed

# Load your dataset
df = pd.read_csv("merge_training_dataset.csv")

# Convert the start_time and end_time columns, allowing pandas to infer the format
df['start_time'] = pd.to_datetime(df['start_time'], dayfirst=True, errors='coerce')
df['end_time'] = pd.to_datetime(df['end_time'], dayfirst=True, errors='coerce')

# Check for rows where parsing failed
invalid_dates = df[df['start_time'].isna() | df['end_time'].isna()]
if not invalid_dates.empty:
    print("Invalid date entries found:")
    print(invalid_dates)

# Sample a smaller subset of the data (e.g., 100 rows for faster testing)
df_sample = df.sample(n=100, random_state=42)

# Define Feature Engineering Functions

# Function to calculate Haversine distance between two geographical points
def haversine(lat1, lon1, lat2, lon2):
    # Validate the latitude and longitude values
    if not (-90 <= lat1 <= 90 and -90 <= lat2 <= 90 and -180 <= lon1 <= 180 and -180 <= lon2 <= 180):
        return np.nan  # Return NaN for invalid coordinates

    R = 6371.0  # Earth radius in kilometers
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    
    a = sin(dlat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2
    
    # Ensure 'a' is within the valid range for the sqrt function
    if a < 0 or a > 1:
        return np.nan  # Return NaN for invalid 'a' values
    
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c

# Function to check if two tasks overlap in time
def is_overlapping(row1, row2):
    return row1['start_time'] <= row2['end_time'] and row2['start_time'] <= row1['end_time']

# Function to calculate resource similarity between two tasks
def resource_similarity(row1, row2):
    resources_1 = set(row1['inventory_used'].split(","))
    resources_2 = set(row2['inventory_used'].split(","))
    common_resources = resources_1.intersection(resources_2)
    return len(common_resources)

# Function to calculate features for each task pair
def calculate_features(i, df):
    results = []
    for j in range(i+1, len(df)):
        row1 = df.iloc[i]
        row2 = df.iloc[j]
        dist = haversine(row1['latitude'], row1['longitude'], row2['latitude'], row2['longitude'])
        overlap = is_overlapping(row1, row2)
        res_sim = resource_similarity(row1, row2)
        results.append((i, j, dist, overlap, res_sim))
    return results

# Use parallel processing to speed up feature calculation
def parallel_feature_calculation(df):
    results = Parallel(n_jobs=-1)(delayed(calculate_features)(i, df) for i in range(len(df)))
    flattened_results = [item for sublist in results for item in sublist]
    return flattened_results

# Calculate pairwise features
feature_results = parallel_feature_calculation(df_sample)

# Convert the results to a dataframe
pairwise_df = pd.DataFrame(feature_results, columns=['task_1', 'task_2', 'distance', 'time_overlap', 'resource_similarity'])

# Drop rows with NaN values (e.g., invalid distance calculations)
pairwise_df = pairwise_df.dropna()

# For demo purposes, create a random target column for pairwise features
pairwise_df['optimization_suggestion'] = np.random.choice(['merge', 'optimize', 'no action'], len(pairwise_df))

# Split the Data into Training and Testing Sets
X = pairwise_df[['distance', 'time_overlap', 'resource_similarity']]
y = pairwise_df['optimization_suggestion']

# Convert target variable into categorical format (necessary for Logistic Regression)
y = pd.Categorical(y).codes

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Logistic Regression model
model = LogisticRegression(max_iter=1000)  # Increase max_iter if needed
model.fit(X_train, y_train)

# Make Predictions on the Test Set
y_pred = model.predict(X_test)

# Evaluate the Model's Performance
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Display feature importance using Logistic Regression coefficients
coefficients = model.coef_[0]
feature_names = X.columns
for feature, coefficient in zip(feature_names, coefficients):
    print(f"Feature: {feature}, Coefficient: {coefficient:.4f}")
