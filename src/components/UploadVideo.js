// src/components/UploadVideo.js
import React, { useState } from 'react';
import axios from 'axios';

const UploadVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!videoFile) return;

    const formData = new FormData();
    formData.append("file", videoFile);

    try {
      const response = await axios.post("http://localhost:54301/analyze", formData);
      setResult(response.data);
    } catch (err) {
      alert("Upload failed or server error");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Upload Video for Analysis</h2>
      <input type="file" accept="video/*" onChange={handleVideoChange} />
      <button onClick={handleSubmit}>Analyze</button>

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

export default UploadVideo;
