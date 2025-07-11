// ResultDisplay.js
import React from 'react';

function ResultDisplay({ data }) {
  if (!data || !data.feedback) {
    return <p>No results yet. Upload a video or capture with webcam.</p>;
  }

  return (
    <div>
      <h2>Analysis Results</h2>
      <p>Total Frames: {data.total_frames}</p>
      {data.feedback.map((item, index) => (
        <div key={index}>
          <p><strong>Frame {item.frame}:</strong></p>
          <ul>
            {item.issues.map((issue, idx) => (
              <li key={idx}>{issue}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ResultDisplay;
