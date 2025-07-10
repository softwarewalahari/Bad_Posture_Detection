// src/components/WebcamCapture.js
import React, { useRef, useState } from 'react';
import Webcam from "react-webcam";
import axios from "axios";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [result, setResult] = useState(null);
  let mediaRecorder;

  const startRecording = () => {
    setRecordedChunks([]);
    setRecording(true);

    const stream = webcamRef.current.stream;
    mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) setRecordedChunks(prev => prev.concat(event.data));
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const formData = new FormData();
      formData.append("file", blob, "recorded_video.webm");

      axios.post("http://localhost:54301/analyze", formData)
        .then((res) => setResult(res.data))
        .catch((err) => console.error("Webcam upload error", err));
    };

    mediaRecorder.start();
  };

  const stopRecording = () => {
    setRecording(false);
    mediaRecorder.stop();
  };

  return (
    <div>
      <h2>Record Posture via Webcam</h2>
      <Webcam audio={false} ref={webcamRef} />
      <div style={{ marginTop: "1rem" }}>
        {!recording ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <button onClick={stopRecording}>Stop & Analyze</button>
        )}
      </div>

      {result && (
        <div>
          <h3>Result Summary</h3>
          <p>Total Frames: {result.total_frames}</p>
          <ul>
            {result.summary.map((item, index) => (
              <li key={index}>{item.issue} - {item.count} frames</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
