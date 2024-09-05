import os
import json
import google.generativeai as genai
from datetime import datetime

# Configure API Key
genai.configure(api_key=os.environ.get("GENAI_API_KEY", "AIzaSyCkXOZtI3aLb0y7jAejWX7iDoMFpjAHx2g"))

# Function to merge tasks if they overlap or can be done simultaneously
def merge_tasks(tasks):
    merged_tasks = []
    for i in range(len(tasks)):
        for j in range(i + 1, len(tasks)):
            if tasks[i]['start_time'] == tasks[j]['start_time'] and tasks[i]['end_time'] == tasks[j]['end_time']:
                # Merge tasks that have the same start and end time
                merged_task = {
                    'name': f"{tasks[i]['name']} and {tasks[j]['name']}",
                    'start_time': tasks[i]['start_time'],
                    'end_time': tasks[i]['end_time'],
                    'description': f"Merged task involving {tasks[i]['name']} and {tasks[j]['name']} due to similar time slots."
                }
                merged_tasks.append(merged_task)
            else:
                # Tasks that can't be merged
                merged_tasks.append(tasks[i])
                merged_tasks.append(tasks[j])
    
    # Remove duplicates (merged tasks might get added twice in some conditions)
    merged_tasks = [dict(t) for t in {tuple(d.items()) for d in merged_tasks}]
    
    return merged_tasks

# Example JSON input
json_data = '''
{
  "tasks": [
    {
      "id": 1,
      "name": "roadways",
      "start_time": "09:00 AM",
      "end_time": "05:00 PM"
    },
    {
      "id": 2,
      "name": "water supply",
      "start_time": "09:00 AM",
      "end_time": "05:00 PM"
    },
    {
      "id": 3,
      "name": "waterways",
      "start_time": "10:00 PM",
      "end_time": "06:00 AM"
    },
    {
      "id": 4,
      "name": "electricity",
      "start_time": "10:00 PM",
      "end_time": "06:00 AM"
    }
  ]
}
'''

# Load tasks from JSON
tasks = json.loads(json_data)["tasks"]

# Merge tasks based on the schedule
merged_tasks = merge_tasks(tasks)

# Display the merged tasks
print(json.dumps(merged_tasks, indent=2))

# Use Generative AI to process the merged schedule and provide additional insights
task_input = f"Tasks schedule: {json.dumps(merged_tasks)}. Suggest further improvements to minimize conflicts and optimize task scheduling."
response = genai.GenerativeModel(
    model_name="gemini-1.0-pro",
    generation_config={
        "temperature": 0.9,
        "top_p": 1,
        "max_output_tokens": 2048,
        "response_mime_type": "text/plain",
    }
).start_chat(history=[
    {"role": "user", "parts": [task_input]}
]).send_message(task_input)

# Print AI response
print(response.text)
