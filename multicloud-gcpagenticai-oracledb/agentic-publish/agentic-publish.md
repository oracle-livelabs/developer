# Deploy Your AI Agent to Production

## Introduction

This lab demonstrates how to take your AI agent from development to production by publishing and integrating it into a live web application. You'll learn how to expose your Vertex AI agent, create a web interface, and deploy it to Google Cloud Run.

After building and testing your AI agent in the previous labs, it's time to make it accessible to end users. This lab covers the essential steps for deploying a production-ready agent that can be embedded in websites or accessed through custom applications.

Estimated Time: 30 minutes

### Objectives

* Publish your Vertex AI agent for external access
* Create a web application to integrate the agent
* Deploy the application to Google Cloud Run
* Configure authentication and security settings
* Test the live agent in a production environment

### Prerequisites

* Completed agent creation from previous labs
* Google Cloud Platform account with appropriate permissions
* Basic understanding of web development concepts
* Access to Google Cloud Shell or local development environment

## Task 1: Publish Your Agent

1. In your Dialogflow tab, click the **Overflow menu** (three dots) in the top right corner

2. Select **Publish agent**

   ![Publish Agent](images/publish-agent.png " ")

3. Configure publication settings:
   - Keep all configurations as default
   - Click **Enable unauthenticated API**

   **Important**: Enabling the unauthenticated API is for demo purposes only. This configuration is NOT recommended for production workloads. For production deployments, implement proper authentication following the [Dialogflow Messenger security documentation](https://cloud.google.com/dialogflow/cx/docs/concept/integration/dialogflow-messenger#authenticated_setup).

   ![Enable API](images/enable-unauthenticated-api.png " ")

4. Copy the provided code snippet:
   - After enabling, you'll see a CSS/JavaScript code snippet
   - This contains your agent's integration code
   - Copy this snippet for use in the next task

   ![Code Snippet](images/agent-code-snippet.png " ")

## Task 2: Set Up Development Environment

1. Open Google Cloud Console in a new tab

2. Activate Cloud Shell:
   - Click the **Activate Cloud Shell** button in the top right corner
   - Wait for Cloud Shell to initialize

3. Open Cloud Editor:
   - Click **Open Editor** button
   - If prompted, click **Authorize** to continue

   ![Cloud Shell Editor](images/cloud-shell-editor.png " ")

4. Enable Gemini Code Assist (Optional but recommended):
   - Click on **Gemini Code Assist** in the editor
   - Sign in to your Google Cloud Project
   - If prompted, enable the API

   ![Gemini Code Assist](images/gemini-code-assist.png " ")

## Task 3: Create Web Application

1. In Cloud Shell Editor, use Gemini Code Assist or create manually a Flask application

2. Create a new file named `app.py`:

   ```python
   from flask import Flask, render_template_string

   app = Flask(__name__)

   # HTML template with Dialogflow Messenger
   html_template = """
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Travel Buddy AI Agent</title>
       <link rel="stylesheet" 
           href="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css">
       <script 
           src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"></script>
       <style>
           df-messenger {
               z-index: 999;
               position: fixed;
               --df-messenger-font-color: #000;
               --df-messenger-font-family: Google Sans;
               --df-messenger-chat-background: #f3f6fc;
               --df-messenger-message-user-background: #d3e3fd;
               --df-messenger-message-bot-background: #fff;
               bottom: 16px;
               right: 16px;
           }
           body {
               font-family: 'Google Sans', sans-serif;
               margin: 0;
               padding: 20px;
               background-color: #f8f9fa;
           }
           .container {
               max-width: 800px;
               margin: 0 auto;
               background: white;
               padding: 40px;
               border-radius: 8px;
               box-shadow: 0 2px 4px rgba(0,0,0,0.1);
           }
           h1 {
               color: #1a73e8;
           }
       </style>
   </head>
   <body>
       <div class="container">
           <h1>Welcome to Travel Buddy!</h1>
           <p>Start chatting with our AI Travel agent in the bottom right corner.</p>
           <p>Our agent can help you with:</p>
           <ul>
               <li>Destination recommendations</li>
               <li>Travel planning and itineraries</li>
               <li>Visa and travel requirements</li>
               <li>Local attractions and activities</li>
           </ul>
       </div>
       
       <!-- PASTE YOUR AGENT CODE SNIPPET HERE -->
       <df-messenger
           project-id="YOUR_PROJECT_ID"
           agent-id="YOUR_AGENT_ID"
           language-code="en"
           max-query-length="-1">
           <df-messenger-chat-bubble
               chat-title="Travel Buddy">
           </df-messenger-chat-bubble>
       </df-messenger>
   </body>
   </html>
   """

   @app.route("/")
   def index():
       """Renders the HTML template with the Dialogflow Messenger."""
       return render_template_string(html_template)

   if __name__ == "__main__":
       app.run(debug=True, host='0.0.0.0', port=8080)
   ```

3. Replace the placeholder `<df-messenger>` section with your actual agent code snippet from Task 1

4. Save the file (Ctrl+S or Cmd+S)

## Task 4: Test Locally

1. In Cloud Shell terminal, run the application:
   ```bash
   python app.py
   ```

2. Preview the application:
   - Click **Web Preview** icon in Cloud Shell
   - Click **Change Port**
   - Input `8080`
   - Click **Change and Preview**

   ![Web Preview](images/web-preview.png " ")

3. Test the agent:
   - A sample website will open
   - Click on the AI agent bubble in the bottom right
   - Start a conversation with your agent
   - Test various queries to ensure it's working correctly

   ![Test Live Agent](images/test-live-agent.png " ")

4. Stop the application:
   - Press Ctrl+C in the terminal to stop the Flask server

## Task 5: Deploy to Cloud Run

1. Create a `requirements.txt` file:
   ```text
   Flask==3.0.0
   gunicorn==21.2.0
   ```

2. Create a `Dockerfile`:
   ```dockerfile
   # Use Python runtime as base image
   FROM python:3.11-slim

   # Set working directory
   WORKDIR /app

   # Copy application files
   COPY . /app

   # Install dependencies
   RUN pip install --no-cache-dir -r requirements.txt

   # Expose port 8080
   EXPOSE 8080

   # Run the application with gunicorn
   CMD ["gunicorn", "--bind", "0.0.0.0:8080", "app:app"]
   ```

3. Build the Docker image:
   ```bash
   export PROJECT_ID=$(gcloud config get-value project)
   gcloud builds submit --tag gcr.io/${PROJECT_ID}/travel-buddy
   ```

4. Deploy to Cloud Run:
   ```bash
   gcloud run deploy travel-buddy \
       --image gcr.io/${PROJECT_ID}/travel-buddy \
       --platform managed \
       --region us-central1 \
       --allow-unauthenticated \
       --port 8080
   ```

   ![Deploy Cloud Run](images/deploy-cloud-run.png " ")

5. Access your deployed application:
   - After deployment completes, you'll receive a URL
   - Open the URL in your browser
   - Your AI agent is now live and accessible to anyone!

   ![Live Application](images/live-application.png " ")

## Task 6: Integrate with Oracle AI Database

To enhance your agent with Oracle AI Database capabilities:

1. **Store conversation history**:
   - Capture agent interactions in Oracle database
   - Use for analytics and agent improvement
   - Enable agentic memory for personalized experiences

2. **Connect to enterprise data**:
   - Query Oracle AI Vector Search from your agent
   - Implement RAG with Oracle-stored documents
   - Leverage Select AI for natural language database queries

3. **Add custom functions**:
   - Create Cloud Functions that interact with Oracle database
   - Register functions as tools in your Vertex AI agent
   - Enable the agent to perform database operations

These advanced integrations are covered in the other labs of this workshop.

## Task 7: Clean Up (Optional)

To avoid incurring charges for resources used in this lab:

1. Delete the Cloud Run service:
   ```bash
   gcloud run services delete travel-buddy --region us-central1
   ```

2. Delete container images:
   ```bash
   gcloud container images delete gcr.io/${PROJECT_ID}/travel-buddy
   ```

3. Or delete the entire project:
   - Go to [Manage resources](https://console.cloud.google.com/iam-admin/projects) page
   - Select your project
   - Click **Delete**
   - Type the project ID to confirm

## Learn More

* [Dialogflow Messenger Documentation](https://cloud.google.com/dialogflow/cx/docs/concept/integration/dialogflow-messenger)
* [Cloud Run Documentation](https://cloud.google.com/run/docs)
* [Vertex AI Agent Deployment Guide](https://cloud.google.com/dialogflow/cx/docs/concept/deployment)
* [Authentication Best Practices](https://cloud.google.com/dialogflow/cx/docs/concept/integration/dialogflow-messenger#authenticated_setup)

## Acknowledgements

* **Author** - Paul Parkinson, Architect and Developer Advocate
* **Last Updated By/Date** - Paul Parkinson, January 2026
