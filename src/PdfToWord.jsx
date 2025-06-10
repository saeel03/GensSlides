import React, { useState } from 'react';
import axios from 'axios';
import './styles/PdfToWord.css';

const PdfToWord = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [wordFileUrl, setWordFileUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
    setWordFileUrl('');
  };

  const handleUpload = async () => {
    if (!pdfFile) {
      alert('Please select a PDF file.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('pdf', pdfFile);

    try {
      const response = await axios.post('http://localhost:5000/pdf-to-word', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setWordFileUrl(response.data.download_url);
    } catch (error) {
      console.error('Conversion error:', error);
      alert('Conversion failed. Try another PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pdf-to-word-container">
      <h2>📄 PDF to Word Converter</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="file-input"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="convert-button"
      >
        {loading ? 'Converting...' : 'Convert to Word'}
      </button>

      {loading && <div className="loader"></div>}

      {wordFileUrl && (
        <div className="download-section">
          <a href={wordFileUrl} download>
            📥 Download Word File
          </a>
        </div>
      )}
    </div>
  );
};

export default PdfToWord;
