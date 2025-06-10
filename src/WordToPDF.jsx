import React, { useState } from 'react';
import axios from 'axios';
import './styles/WordToPDF.css';

const WordToPDF = () => {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setDownloadUrl('');
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a Word (.docx) file first.");
      return;
    }

    const formData = new FormData();
    formData.append('word', file); // Use key 'word' for word file
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/word-to-pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.download_url) {
        setDownloadUrl(res.data.download_url);
      } else {
        alert("Conversion failed.");
      }
    } catch (err) {
      alert("Error occurred: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="word-to-pdf-container">
      <h2>Word to PDF Converter</h2>
      <p>Upload a Word (.docx) file and convert it to PDF</p>

      <input type="file" accept=".doc,.docx" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Converting..." : "Convert to PDF"}
      </button>

      {downloadUrl && (
        <a href={downloadUrl} className="download-link" target="_blank" rel="noopener noreferrer">
          Download Converted PDF File
        </a>
      )}
    </div>
  );
};

export default WordToPDF;
