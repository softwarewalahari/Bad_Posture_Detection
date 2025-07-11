# 🧍‍♀️ Bad Posture Detection App

This is a full-stack posture detection web application that uses **OpenCV** and **angle-based logic** to detect poor posture from a user's webcam feed. Built with a **React frontend** and **Flask backend**, this tool processes video frames to check for posture deviations and alerts the user.

---

## 📌 Tech Stack

### 🖥️ Frontend:
- **React.js** — main UI framework
- **HTML5 & CSS3** — for basic structure and styling
- **JavaScript** — interactivity and logic
- **MediaPipe** — for pose detection (in the backend)
- **Axios** — to send video data to backend (if used)

### 🧠 Backend:
- **Python**
- **Flask** — lightweight web server
- **OpenCV** — video frame capturing and image processing
- **MediaPipe Pose** — Google’s ML solution for detecting body landmarks
- **Angle-Based Logic** — used to determine bad posture based on shoulder, spine, and neck angles

---

## 📁 Project Structure

Bad_Posture_Detection/
├── frontend/ # React app
│ ├── public/
│ └── src/
│ └── App.js # Main React component
│
├── backend/
│ ├── main.py # Flask server with OpenCV & MediaPipe
│ ├── requirements.txt # Backend dependencies
│ ├── uploads/ # Folder for storing uploaded videos
│ └── temp_videos/ # Temporary processed video files
│
└── README.md

yaml
Copy
Edit

---

## ⚙️ Features

- 🧍‍♀️ Detects bad posture using webcam
- 📐 Uses angles between joints (like neck–spine, shoulder tilt) to check posture
- 🔄 Live or recorded video input
- 🔔 Option to notify or display alerts for bad posture
- 💾 Temporarily saves uploaded videos

---

## 📦 Installation & Running the App

### 1. Clone the Repository

```bash
git clone https://github.com/softwarewalahari/Bad_Posture_Detection.git
cd Bad_Posture_Detection
2. Setup Frontend
bash
Copy
Edit
cd frontend
npm install
npm start
3. Setup Backend
bash
Copy
Edit
cd ../backend
python -m venv venv
venv\Scripts\activate    # Windows
pip install -r requirements.txt
python main.py
📐 Angle-Based Posture Detection Logic
Shoulder Angle: To detect slouching or leaning

Neck-Spine Alignment: Checks for forward head posture

MediaPipe Pose returns landmark coordinates of body parts

Custom logic calculates:

Angle between ear, shoulder, and hip

If angle < threshold (e.g., 150°), it’s considered bad posture

✅ Dependencies (requirements.txt)
nginx
Copy
Edit
flask
opencv-python
mediapipe
flask-cors
✨ Future Enhancements
Real-time alerts with sound

Email/posture report logs

Admin panel/dashboard to track posture history

ML model to classify slouch vs hunch vs lean

📸 Sample Snapshots
You can add demo images/gifs showing how posture is detected.

🤝 Contributors
Haritha – Frontend, Backend, Integration


