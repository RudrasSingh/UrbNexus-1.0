from mailjet_rest import Client
from config import Config

# Mailjet API credentials
API_KEY = Config.MAILJET_API_KEY
API_SECRET = Config.MAILJET_API_SECRET


mailjet = Client(auth=(API_KEY, API_SECRET), version='v3.1')


def send_email(to_email, to_name, subject, text_part, html_part):
    try:
        data = {
            'Messages': [
                {
                    "From": {
                        "Email": "urbnexus@gmail.com", 
                        "Name": "UrbNexus 1.0" 
                    },
                    "To": [
                        {
                            "Email": to_email,
                            "Name": to_name
                        }
                    ],
                    "Subject": subject,
                    "TextPart": text_part,
                    "HTMLPart": html_part,
                    "CustomID": "AppNotification"
                }
            ]
        }

       
        result = mailjet.send.create(data=data)

      
        if result.status_code == 200:
            return {"status": "success", "message": "Email sent successfully", "response": result.json()}
        else:
            return {"status": "fail", "message": "Failed to send email", "response": result.json()}

    except Exception as e:
        return {"status": "error", "message": str(e)}

# 1️⃣ Email when a task is successfully created
def task_created_email(to_email, to_name, task_name):
    subject = "✅ Task Created Successfully"
    text_part = f"Your task '{task_name}' has been successfully created. Visit your dashboard for details."
    html_part = f"<h3>Task Created Successfully</h3><p>Your task '<strong>{task_name}</strong>' has been created. Please visit the dashboard for more details and next steps.</p>"
    return send_email(to_email, to_name, subject, text_part, html_part)

# 2️⃣ Email when a task is overlapping with another task
def task_overlap_email(to_email, to_name, task_name, conflicting_task):
    subject = "⚠️ Task Overlap Detected"
    text_part = f"Your task '{task_name}' is overlapping with '{conflicting_task}'. Review on the dashboard to avoid conflicts."
    html_part = f"<h3>⚠️ Task Overlap Detected</h3><p>Your task '<strong>{task_name}</strong>' is overlapping with '<strong>{conflicting_task}</strong>'. Please review the dashboard to resolve potential conflicts.</p>"
    return send_email(to_email, to_name, subject, text_part, html_part)

# 3️⃣ Email to propose merging tasks to optimize resources
def task_merge_proposal_email(to_email, to_name, task_name, merge_task):
    subject = "🔄 Task Merge Proposal"
    text_part = f"Consider merging your task '{task_name}' with '{merge_task}' to optimize resources. Check your dashboard for more details."
    html_part = f"<h3>🔄 Task Merge Proposal</h3><p>Your task '<strong>{task_name}</strong>' may benefit from merging with '<strong>{merge_task}</strong>' to save time and resources. Please visit your dashboard to proceed with the merge.</p>"
    return send_email(to_email, to_name, subject, text_part, html_part)


# testing
# print(task_created_email("atul.tmsl@gmail.com","Atul","Road Building"))
# print(task_overlap_email("ishakriti.2004@gmail.com","Isha","Road Building","Bridge Construction"))
# print(task_merge_proposal_email("utsavtiwari030@gmail.com","Utsav","Road Building","Bridge Construction"))
