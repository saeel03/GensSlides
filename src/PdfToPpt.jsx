import React, { useState } from "react";
import "./styles/PdfToPpt.css"; // create this file if you want custom styling
import { useNavigate } from "react-router-dom";

const PdfToPpt = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setDownloadLink(null); // Reset previous download link
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      alert("Please select a PDF file.");
      return;
    }
  
    const formData = new FormData();
    formData.append("pdf", selectedFile);
  
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/pdf-to-ppt", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        // FIX: parse JSON instead of blob
        const data = await response.json();
        const { download_url } = data;
  
        // You can directly use the provided download_url
        setDownloadLink(download_url);
      } else {
        alert("Failed to convert PDF to PPT.");
      }
    } catch (error) {
      alert("Error uploading file.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="pdf-to-ppt-container">
      <h2>📄 ➜ 📊 PDF to PPT Converter</h2>

      <div className="upload-area">
        <label htmlFor="pdf-upload">Upload your PDF:</label>
        <input type="file" id="pdf-upload" accept="application/pdf" onChange={handleFileChange} />
      </div>

      {selectedFile && (
        <div className="convert-action">
          <button onClick={handleConvert} disabled={loading}>
            {loading ? "Converting..." : "Convert to PPT"}
          </button>
        </div>
      )}

      {downloadLink && (
        <div className="download-area">
          <a href={downloadLink} download="converted.pptx">📥 Download PPT</a>
        </div>
      )}
    </div>
  );
};

export default PdfToPpt;
