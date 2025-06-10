import React, { useState } from 'react';
import axios from 'axios';
import './styles/ContentToPPT.css';

const ContentToPPT = () => {
  const [content, setContent] = useState('');
  const [pptLink, setPptLink] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/generate-ppt-from-content', { content });
      setPptLink(res.data.download_url);
    } catch (err) {
      console.error('Error generating PPT:', err);
    }
    setLoading(false);
  };

  return (
    <div className="content-container">
      <h2 className="gradient-heading">Paste your content and generate a PowerPoint</h2>
      
      <textarea
        rows="10"
        placeholder="Paste your article or content here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate PPT'}
      </button>

      {pptLink && (
        <div>
          <a className="download-link" href={pptLink} download="presentation.pptx">📥 Download Presentation</a>
        </div>
      )}
    </div>
  );
};

export default ContentToPPT;
