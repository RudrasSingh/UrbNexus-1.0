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
                        "Name": "UrbNexus Team"
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


# 🎯 Unified HTML Email Template
def generate_email_template(title, message, cta_text=None, cta_link=None):
    html_template = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; background: #ffffff; box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center;">
            <img src="https://public.readdy.ai/ai/img_res/3cc2ba5c910c5b5cfa186471391cb1e9.jpg" alt="UrbNexus" style="width: 150px; margin-bottom: 20px;">
        </div>
        <h2 style="color: #333; text-align: center;">{title}</h2>
        <p style="color: #555; font-size: 16px; line-height: 1.6; text-align: center;">
            {message}
        </p>
        {f'<div style="text-align: center; margin-top: 20px;"><a href="{cta_link}" style="background: #007BFF; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;">{cta_text}</a></div>' if cta_text and cta_link else ''}
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="text-align: center; color: #888; font-size: 14px;">
            Need help? Contact us at <a href="mailto:urbnexus@gmail.com" style="color: #007BFF;">urbnexus@gmail.com</a>.
        </p>
    </div>
    """
    return html_template


# 1️⃣ **Task Creation Email**
def task_created_email(to_email, to_name, task_name):
    subject = "✅ Your Task Has Been Created Successfully!"
    text_part = f"Your task '{task_name}' has been successfully created. Check your dashboard for details."
    html_part = generate_email_template(
        title="Task Created Successfully 🎉",
        message=f"Hello {to_name},<br><br>Your task <strong>{task_name}</strong> has been created successfully! You can now track its progress and manage it on your dashboard.",
        cta_text="View Task",
        cta_link="https://urbnexus.netlify.app"
    )
    return send_email(to_email, to_name, subject, text_part, html_part)


# 2️⃣ **Task Overlap Warning Email**
def task_overlap_email(to_email, to_name, task_name, conflicting_task):
    subject = "⚠️ Task Overlap Detected!"
    text_part = f"Your task '{task_name}' is overlapping with '{conflicting_task}'. Review your dashboard to resolve this."
    html_part = generate_email_template(
        title="⚠️ Task Overlap Detected",
        message=f"Hello {to_name},<br><br>Your task <strong>{task_name}</strong> is overlapping with <strong>{conflicting_task}</strong>. We recommend checking your dashboard to avoid any conflicts.",
        cta_text="Resolve Overlap",
        cta_link="https://urbnexus.netlify.app"
    )
    return send_email(to_email, to_name, subject, text_part, html_part)


# 3️⃣ **Task Merge Proposal Email**
def task_merge_proposal_email(to_email, to_name, task_name, merge_task):
    subject = "🔄 Task Merge Proposal"
    text_part = f"Consider merging your task '{task_name}' with '{merge_task}' to optimize resources."
    html_part = generate_email_template(
        title="🔄 Task Merge Proposal",
        message=f"Hello {to_name},<br><br>We noticed that your task <strong>{task_name}</strong> could be merged with <strong>{merge_task}</strong> to enhance efficiency and resource management.",
        cta_text="Merge Tasks",
        cta_link="https://urbnexus.netlify.app"
    )
    return send_email(to_email, to_name, subject, text_part, html_part)

# testing
print(task_created_email("atul.tmsl@gmail.com","Atul","Road Building"))
print(task_overlap_email("ishakriti.2004@gmail.com","Isha","Road Building","Bridge Construction"))
print(task_merge_proposal_email("utsavtiwari030@gmail.com","Utsav","Road Building","Bridge Construction"))
print(task_merge_proposal_email("49guptarishav@gmail.com","Rishav","Road Building","Bridge Construction"))
print(task_merge_proposal_email("subhra080@gmail.com","Subhra","Water Supply","Electricity lines"))
print(task_merge_proposal_email("srijitajana003@gmail.com","Srijita","Water Supply","Electricity lines"))


