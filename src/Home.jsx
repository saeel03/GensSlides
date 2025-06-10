import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/Home.css';
import { motion } from 'framer-motion';

const Home = () => {
  const [topic, setTopic] = useState('');
  const [pptLink, setPptLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/generate-ppt-topic', { topic });
      setPptLink(res.data.download_url);
    } catch (err) {
      console.error('Error generating PPT:', err);
    }
    setLoading(false);
  };

  return (
    <>
      <motion.div
        className="home-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div className="home-inner" initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
          <h2 className="gradient-heading">Turn Prompt into Presentations Instantly</h2>
          <p className="sub-text">Search for the topic and Generate ppt</p>
          <motion.div
            className="input-wrapper"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter topics like climate change, AI in Education"
            />
          </motion.div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleGenerate}
            disabled={loading}
            className="glow-button"
          >
            {loading ? 'Generating...' : 'Generate'}
          </motion.button>

          {pptLink && (
            <motion.div
              style={{ marginTop: '1rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <a href={pptLink} download="presentation.pptx">📥 Download Presentation</a>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      <motion.section
        id="about"
        className="services-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="services-title">Services</h2>
        <div className="services-grid">
          {[
            {
              title: "Generate Resume",
              description: "Convert Your Details to Stunning Resume",
              color: "blue",
              route: "/generate-resume"
            },
            {
              title: "Content to ppt",
              description: "Paste Your text and get ppt",
              color: "pink",
              route: "/content-to-ppt"
            },
            {
              title: "PDF to Word",
              description: "Convert Your pdf to word",
              color: "pink",
              route: "/pdf-to-word"
            },
            {
              title: "Word to PDF",
              description: "Convert your Word document to PDF",
              color: "blue",
              route: "/word-to-pdf"
            },
            {
              title: "PDF to PPT",
              description: "Transform your PDF files into clean, editable PowerPoints",
              color: "blue",
              route: "/pdf-to-ppt"
            },
          ].map((service, index) => (
            <motion.div
              className="service-card"
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <h3>
                <span className={service.color}>{service.title}</span>
              </h3>
              <p>{service.description}</p>
              <button onClick={() => navigate(service.route)}>Get Started</button>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </>
  );
};

export default Home;
