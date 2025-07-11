import React, { useRef, useState } from "react";

function App() {
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [summary, setSummary] = useState([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    const chunks = [];
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks, { type: "video/mp4" });
      setVideoBlob(blob);
      uploadVideo(blob);
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    } else {
      console.warn("MediaRecorder is not initialized.");
    }
    setRecording(false);
  };

  const uploadVideo = async (blobOrFile) => {
    const file =
      blobOrFile instanceof Blob
        ? new File([blobOrFile], "recorded_video.mp4", { type: "video/mp4" })
        : blobOrFile;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setFeedback(data.feedback);
      setSummary(data.summary);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoBlob(file);
      uploadVideo(file);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📹 Bad Posture Detection App</h1>

      {/* Webcam Recording Controls */}
      <button onClick={startRecording} disabled={recording}>
        📸 Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        🛑 Stop Recording
      </button>

      {/* File Upload Input */}
      <div style={{ marginTop: "20px" }}>
        <label htmlFor="upload" style={{ marginRight: "10px" }}>
          📤 Or Upload a Video File:
        </label>
        <input
          id="upload"
          type="file"
          accept="video/*"
          onChange={handleFileChange}
        />
      </div>

      {/* Preview Recorded or Uploaded Video */}
      {videoBlob && (
        <div style={{ marginTop: "20px" }}>
          <h3>🎞️ Video Preview:</h3>
          <video
            src={URL.createObjectURL(videoBlob)}
            controls
            width="400"
          />
        </div>
      )}

      {/* Summary Output */}
      {summary.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>📝 Posture Analysis Summary</h3>
          <ul>
            {summary.map((item, idx) => (
              <li key={idx}>
                {item.issue}: {item.count} times
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Frame-by-frame Feedback */}
      {feedback.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>📍 Detailed Feedback by Frame</h3>
          <ul>
            {feedback.map((f, idx) => (
              <li key={idx}>
                Frame {f.frame}: {f.issues.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
