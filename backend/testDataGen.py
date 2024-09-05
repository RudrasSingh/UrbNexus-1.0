import random
import pandas as pd
from datetime import timedelta, date

def generate_random_location():
    lat = random.uniform(8.0, 37.0)
    lon = random.uniform(68.0, 97.0)
    return lat, lon

def generate_random_dates():
    start_date = date.today() - timedelta(days=random.randint(0, 365))
    end_date = start_date + timedelta(days=random.randint(30, 365))
    return start_date, end_date

def generate_random_department():
    return random.randint(1, 10)

def simulate_conflict(start_date, end_date, department):
    conflict_probability = random.random()
    
    if department in [1, 2, 3]:
        conflict_probability += 0.2
    
    if (end_date - start_date).days > 180:
        conflict_probability += 0.1
    
    return 1 if conflict_probability > 0.5 else 0

def generate_dataset(n):
    data = []
    for _ in range(n):
        lat, lon = generate_random_location()
        start_date, end_date = generate_random_dates()
        department = generate_random_department()
        conflict = simulate_conflict((lat, lon), start_date, end_date, department)
        
        data.append({
            'latitude': lat,
            'longitude': lon,
            'start_date': start_date,
            'end_date': end_date,
            'department_id': department,
            'conflict': conflict
        })
    
    return pd.DataFrame(data)

df = generate_dataset(1000)

df['start_date'] = df['start_date'].astype(str)
df['end_date'] = df['end_date'].astype(str)

df.to_csv('project_training_data.csv', index=False)
print("Training data saved to 'project_training_data.csv'")
