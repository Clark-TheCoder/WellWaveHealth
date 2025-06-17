README - WellWave Health Video Appointment Application

Developer: Emma Clark  
Project Status: 75% Complete  
Target Audience: Nova Scotia Health / Healthcare Providers  
Purpose: Secure Online Doctor-Patient Consultations

---

🩺 Overview:
WellWave Health is a secure video chat application designed to be used alongside existing in-office scheduling systems. Its purpose is to help doctors in Nova Scotia conduct online consultations safely, efficiently, and without compromising patient data privacy.
There is Maple, but this is for patients to connect to doctors online, but not the other way around. If doctors want to communicate with patients online, they have to use phones, Teams, Zoom, etc. these are not safe for patient care and are difficult for patients 
to navigate if they have mulitple doctors using multiple different platforms.
---

🚧 Current Status:
✔ User authentication (JWT + cookies)  
✔ Clinical provider account creation & login  
✔ UI for doctor/patient video chat screen  
✔ Notes panel for call summaries & care plans  
✔ Patient alias system (no personal identifiers stored)  

🔧 In Progress (Remaining ~25%):
• Integrating real-time video call functionality (WebRTC)
• Finishing front-end UI polish (some popups and error messages)
• Saving call log durations securely on the backend after the call has been completed
• Clean up un-used calls that are older than 24 hours old
---

🔐 Privacy & Security:
This app prioritizes patient privacy by:
• Using JWTs and cookies for secure authentication  
• Assigning patient aliases instead of storing real names  
• Not saving any personal health information (PHI)  
• Only saving the doctor's login info and call durations

---

⚙️ Technologies Used:
• HTML / CSS / JavaScript  
• Node.js + Express  
• SQL (for account and call log storage)  
• JWT (for authentication)  
• Cookies (for session handling)

---

🧪 Running the App Locally (in development):
1. Clone the project folder.
2. Run `npm install` to install dependencies.
3. Use `npm run devStart` to launch the app.
4. Visit `http://localhost:3000` in your browser.

---

📌 Note:
This app is under active development. Final video call functionality is being integrated and tested before production deployment. Design and functionality will be fully complete shortly.

---

Thank you for reviewing my project!
Feel free to contact me with any questions.