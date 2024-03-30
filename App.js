import React, { useState } from "react";
import axios from "axios";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [classificationResult, setClassificationResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:3000/classify",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setClassificationResult(response.data.class);
    } catch (error) {
      setError("An error occurred while uploading the image.");
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Image Classification App</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <div>{error}</div>}
      {classificationResult !== null && (
        <div>
          <h2>Classification Result:</h2>
          <p>Class: {classificationResult}</p>
        </div>
      )}
    </div>
  );
}

export default App;
