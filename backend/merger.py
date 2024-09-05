import os
import json
import google.generativeai as genai
from datetime import datetime
from config import Config
from geopy.distance import geodesic

# Configure API Key
genai.configure(api_key=Config.GEN_AI_API)

# Function to check if two tasks can be merged based on time and location proximity
def can_merge(task1, task2):
    time_match = (task1['start_time'] == task2['start_time'] and task1['end_time'] == task2['end_time'])
    
    # Calculate the distance between two locations using latitudes and longitudes
    loc1 = (task1['latitude'], task1['longitude'])
    loc2 = (task2['latitude'], task2['longitude'])
    distance = geodesic(loc1, loc2).kilometers
    
    # Merge tasks if distance is within 5 km
    return time_match and distance <= 5

# Function to merge tasks
def merge_tasks(tasks):
    merged_tasks = []
    task_ids_merged = set()  # To track tasks that have been merged
    
    for i in range(len(tasks)):
        if tasks[i]['id'] in task_ids_merged:
            continue  # Skip tasks that have already been merged
        
        for j in range(i + 1, len(tasks)):
            if can_merge(tasks[i], tasks[j]):
                # Merge tasks that can be done together
                merged_task = {
                    'name': f"{tasks[i]['name']} and {tasks[j]['name']}",
                    'start_time': tasks[i]['start_time'],
                    'end_time': tasks[i]['end_time'],
                    'latitude': tasks[i]['latitude'],
                    'longitude': tasks[i]['longitude'],
                    'departments': f"{tasks[i]['department']} and {tasks[j]['department']}",
                    'description': f"Merged task involving {tasks[i]['name']} and {tasks[j]['name']} due to time and proximity."
                }
                merged_tasks.append(merged_task)
                task_ids_merged.add(tasks[i]['id'])
                task_ids_merged.add(tasks[j]['id'])
    
    # Sort tasks by time and proximity (optional)
    merged_tasks.sort(key=lambda x: (x['start_time'], x['latitude'], x['longitude']))
    
    return merged_tasks

# Example JSON input
json_data = '''
{
  "tasks": [
    {
      "id": 1,
      "name": "roadways",
      "start_time": "09:00 AM",
      "end_time": "05:00 PM",
      "latitude": 28.7041,
      "longitude": 77.1025,
      "department": "Public Works"
    },
    {
      "id": 2,
      "name": "water supply",
      "start_time": "09:00 AM",
      "end_time": "05:00 PM",
      "latitude": 28.7045,
      "longitude": 77.1030,
      "department": "Water Department"
    },
    {
      "id": 3,
      "name": "waterways",
      "start_time": "10:00 PM",
      "end_time": "06:00 AM",
      "latitude": 28.6139,
      "longitude": 77.2090,
      "department": "Maritime Affairs"
    },
    {
      "id": 4,
      "name": "electricity",
      "start_time": "10:00 PM",
      "end_time": "06:00 AM",
      "latitude": 28.6135,
      "longitude": 77.2095,
      "department": "Electricity Board"
    }
  ]
}
'''

# Load tasks from JSON
tasks = json.loads(json_data)["tasks"]

# Merge tasks based on the schedule and location proximity
merged_tasks = merge_tasks(tasks)

# Display the merged tasks
print(json.dumps(merged_tasks, indent=2))

# Define an in-depth, predefined prompt for Generative AI
predefined_prompt = f'''
You are a task scheduling AI. Optimize the following merged tasks based on time, proximity (latitude, longitude), and department involvement.
Return the output in a JSON format. The tasks are: {json.dumps(merged_tasks)}
'''

# Call the Generative AI API for task suggestions
response = genai.GenerativeModel(
    model_name="gemini-1.0-pro",
    generation_config={
        "temperature": 0.8,
        "top_p": 1,
        "max_output_tokens": 2048,
        "response_mime_type": "text/plain",  # Text output
    }
).start_chat(history=[
    {"role": "user", "parts": [predefined_prompt]}
]).send_message(predefined_prompt)

# Parse the AI's response
try:
    ai_response = response.text.strip()
    # Try to parse the response as JSON, assuming the AI outputs JSON-like text
    parsed_json = json.loads(ai_response)
    print(json.dumps(parsed_json, indent=2))
except json.JSONDecodeError:
    print(f"AI Response is not in JSON format. Here's the raw text:\n{ai_response}")