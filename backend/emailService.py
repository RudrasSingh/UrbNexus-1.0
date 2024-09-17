from mailjet_rest import Client


# Function to send an email using Mailjet
def automatic_mail(to_email, to_name, subject, text_part, html_part):
    try:
        API_KEY = 'your-mailjet-api-key'  # Replace with your Mailjet API Key
        API_SECRET = 'your-mailjet-api-secret'  # Replace with your Mailjet API Secret

        # Initialize the Mailjet Client
        mailjet = Client(auth=(API_KEY, API_SECRET), version='v3.1')

        # Create the email data payload
        data = {
            'Messages': [
                {
                    "From": {
                        "Email": "urbnexus@gmail.com",  # Replace with your email
                        "Name": "Your Name"  # Replace with your name
                    },
                    "To": [
                        {
                            "Email": to_email,  # Recipient's email
                            "Name": to_name  # Recipient's name
                        }
                    ],
                    "Subject": subject,
                    "TextPart": text_part,
                    "HTMLPart": html_part,
                    "CustomID": "AppNotification"
                }
            ]
        }

        # Send the email and check the response
        result = mailjet.send.create(data=data)

        # Check if email was sent successfully
        if result.status_code == 200:
            return {"status": "success", "message": "Email sent successfully", "response": result.json()}
        else:
            return {"status": "fail", "message": "Failed to send email", "response": result.json()}

    except Exception as e:
        return {"status": "error", "message": str(e)}

# Send an automatic email after a task is created
mail_result = automatic_mail(
    to_email="subhra080@gmail.com",
    to_name="Recipient Name",
    subject="Task Created Successfully",
    text_part="Your task has been created successfully!",
    html_part="<h3>Task Created</h3><p>Your task has been created successfully!</p>"
)

# Check email result and handle accordingly
if mail_result['status'] == 'success':
    print("Email notification sent!")
else:
    print(f"Error sending email: {mail_result['message']}")
