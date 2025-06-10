import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './ResumeForm.css';

const ResumeForm = ({ onSubmit }) => {
  const resumeRef = useRef();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      profession: '',
      email: '',
      phone: '',
      address: '',
      summary: '',
      links: {
        github: '',
        linkedin: '',
        portfolio: '',
      }
    },
    education: [],
    experience: [],
    skills: [],
    projects: []
  });

  const [educationEntry, setEducationEntry] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const [experienceEntry, setExperienceEntry] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const [skillEntry, setSkillEntry] = useState('');

  const [projectEntry, setProjectEntry] = useState({
    name: '',
    description: '',
    link: ''
  });

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          [name]: value
        }
      }));
    }
  };

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setEducationEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setExperienceEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectEntry(prev => ({ ...prev, [name]: value }));
  };

  const addEducation = () => {
    if (educationEntry.institution && educationEntry.degree) {
      setFormData(prev => ({
        ...prev,
        education: [...prev.education, educationEntry]
      }));
      setEducationEntry({
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        description: ''
      });
    }
  };

  const addExperience = () => {
    if (experienceEntry.company && experienceEntry.position) {
      setFormData(prev => ({
        ...prev,
        experience: [...prev.experience, experienceEntry]
      }));
      setExperienceEntry({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
      });
    }
  };

  const addSkill = () => {
    if (skillEntry.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillEntry.trim()]
      }));
      setSkillEntry('');
    }
  };

  const addProject = () => {
    if (projectEntry.name) {
      setFormData(prev => ({
        ...prev,
        projects: [...prev.projects, projectEntry]
      }));
      setProjectEntry({
        name: '',
        description: '',
        link: ''
      });
    }
  };

  const downloadPDF = () => {
    const input = resumeRef.current;
    html2canvas(input, { 
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`${formData.personalInfo.name}-resume.pdf`);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    downloadPDF();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  return (
    <div className="resume-form-container">
      <h2>Build Your Resume</h2>
      <div className="step-indicator">
  {[1, 2, 3, 4, 5].map((num) => (
    <div key={num} className={`step ${step >= num ? 'active' : ''}`}>
      <span>{num}</span>
    </div>
  ))}
</div>
      
      <form onSubmit={handleSubmit}>
        {/* Step 1: Personal Information */}
        {step === 1 && (
          <section className="form-section">
            <h3>Personal Information</h3>
            <div className="form-group">
              <label>Full Name*</label>
              <input
                type="text"
                name="name"
                value={formData.personalInfo.name}
                onChange={handlePersonalInfoChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Profession*</label>
              <input
                type="text"
                name="profession"
                value={formData.personalInfo.profession}
                onChange={handlePersonalInfoChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email*</label>
              <input
                type="email"
                name="email"
                value={formData.personalInfo.email}
                onChange={handlePersonalInfoChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.personalInfo.phone}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.personalInfo.address}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div className="form-group">
              <label>Professional Summary</label>
              <textarea
                name="summary"
                value={formData.personalInfo.summary}
                onChange={handlePersonalInfoChange}
                rows="4"
              />
            </div>
            <div className="form-group">
              <label>GitHub URL</label>
              <input
                type="url"
                name="links.github"
                value={formData.personalInfo.links.github}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div className="form-group">
              <label>LinkedIn URL</label>
              <input
                type="url"
                name="links.linkedin"
                value={formData.personalInfo.links.linkedin}
                onChange={handlePersonalInfoChange}
              />
            </div>
            <div className="form-group">
              <label>Portfolio URL</label>
              <input
                type="url"
                name="links.portfolio"
                value={formData.personalInfo.links.portfolio}
                onChange={handlePersonalInfoChange}
              />
            </div>
          </section>
        )}

        {/* Step 2: Education */}
        {step === 2 && (
          <section className="form-section">
            <h3>Education</h3>
            {formData.education.length > 0 && (
              <div className="preview-list">
                <h4>Added Education:</h4>
                <ul>
                  {formData.education.map((edu, index) => (
                    <li key={index}>{edu.institution} - {edu.degree}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="form-group">
              <label>Institution*</label>
              <input
                type="text"
                name="institution"
                value={educationEntry.institution}
                onChange={handleEducationChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Degree*</label>
              <input
                type="text"
                name="degree"
                value={educationEntry.degree}
                onChange={handleEducationChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Field of Study</label>
              <input
                type="text"
                name="field"
                value={educationEntry.field}
                onChange={handleEducationChange}
              />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={educationEntry.startDate}
                onChange={handleEducationChange}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={educationEntry.endDate}
                onChange={handleEducationChange}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={educationEntry.description}
                onChange={handleEducationChange}
                rows="3"
              />
            </div>
            <button type="button" onClick={addEducation} className="add-btn">
              Add Education
            </button>
          </section>
        )}

        {/* Step 3: Experience */}
        {step === 3 && (
          <section className="form-section">
            <h3>Experience</h3>
            {formData.experience.length > 0 && (
              <div className="preview-list">
                <h4>Added Experience:</h4>
                <ul>
                  {formData.experience.map((exp, index) => (
                    <li key={index}>{exp.company} - {exp.position}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="form-group">
              <label>Company*</label>
              <input
                type="text"
                name="company"
                value={experienceEntry.company}
                onChange={handleExperienceChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Position*</label>
              <input
                type="text"
                name="position"
                value={experienceEntry.position}
                onChange={handleExperienceChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={experienceEntry.startDate}
                onChange={handleExperienceChange}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={experienceEntry.endDate}
                onChange={handleExperienceChange}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={experienceEntry.description}
                onChange={handleExperienceChange}
                rows="3"
              />
            </div>
            <button type="button" onClick={addExperience} className="add-btn">
              Add Experience
            </button>
          </section>
        )}

        {/* Step 4: Skills */}
        {step === 4 && (
          <section className="form-section">
            <h3>Skills</h3>
            {formData.skills.length > 0 && (
              <div className="preview-list">
                <h4>Added Skills:</h4>
                <ul className="skills-preview">
                  {formData.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="form-group">
              <label>Skill</label>
              <input
                type="text"
                value={skillEntry}
                onChange={(e) => setSkillEntry(e.target.value)}
                placeholder="Enter a skill and click Add Skill"
              />
            </div>
            <button type="button" onClick={addSkill} className="add-btn">
              Add Skill
            </button>
          </section>
        )}

        {/* Step 5: Projects */}
        {step === 5 && (
          <section className="form-section">
            <h3>Projects</h3>
            {formData.projects.length > 0 && (
              <div className="preview-list">
                <h4>Added Projects:</h4>
                <ul>
                  {formData.projects.map((project, index) => (
                    <li key={index}>{project.name}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="form-group">
              <label>Project Name*</label>
              <input
                type="text"
                name="name"
                value={projectEntry.name}
                onChange={handleProjectChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={projectEntry.description}
                onChange={handleProjectChange}
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>Project URL</label>
              <input
                type="url"
                name="link"
                value={projectEntry.link}
                onChange={handleProjectChange}
              />
            </div>
            <button type="button" onClick={addProject} className="add-btn">
              Add Project
            </button>
          </section>
        )}

        <div className="form-navigation">
          {step > 1 && (
            <button type="button" onClick={prevStep} className="nav-btn prev-btn">
              Previous
            </button>
          )}
          {step < 5 ? (
            <button type="button" onClick={nextStep} className="nav-btn next-btn">
              Next
            </button>
          ) : (
            <button type="submit" className="submit-btn">
              Generate Resume
            </button>
          )}
        </div>
      </form>

      {/* Resume Preview Section */}
      {formData.personalInfo.name && (
        <div className="resume-preview-container">
          <h3>Resume Preview</h3>
          <div className="resume-paper" ref={resumeRef}>
            <div className="resume-header">
              <h1>{formData.personalInfo.name}</h1>
              <h2>{formData.personalInfo.profession}</h2>
              <div className="contact-info">
                {formData.personalInfo.email && <span>{formData.personalInfo.email}</span>}
                {formData.personalInfo.phone && <span>{formData.personalInfo.phone}</span>}
                {formData.personalInfo.address && <span>{formData.personalInfo.address}</span>}
              </div>
            </div>

            {formData.personalInfo.summary && (
              <div className="resume-section">
                <h3>PROFESSIONAL SUMMARY</h3>
                <p>{formData.personalInfo.summary}</p>
              </div>
            )}

            {formData.experience.length > 0 && (
              <div className="resume-section">
                <h3>PROFESSIONAL EXPERIENCE</h3>
                {formData.experience.map((exp, index) => (
                  <div key={index} className="experience-item">
                    <div className="experience-header">
                      <h4>{exp.company}</h4>
                      <span className="experience-date">
                        {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        {exp.endDate ? ` - ${new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : ' - Present'}
                      </span>
                    </div>
                    <p className="position">{exp.position}</p>
                    {exp.description && <p className="description">{exp.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {formData.education.length > 0 && (
              <div className="resume-section">
                <h3>EDUCATION</h3>
                {formData.education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <div className="education-header">
                      <h4>{edu.institution}</h4>
                      <span className="education-date">
                        {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        {edu.endDate ? ` - ${new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : ' - Present'}
                      </span>
                    </div>
                    <p className="degree">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                    {edu.description && <p className="description">{edu.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {formData.skills.length > 0 && (
              <div className="resume-section">
                <h3>SKILLS</h3>
                <div className="skills-list">
                  {formData.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {formData.projects.length > 0 && (
              <div className="resume-section">
                <h3>PROJECTS</h3>
                {formData.projects.map((project, index) => (
                  <div key={index} className="project-item">
                    <h4>{project.name}</h4>
                    {project.description && <p className="description">{project.description}</p>}
                    {project.link && (
                      <p className="project-link">Link: <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a></p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button onClick={downloadPDF} className="download-btn">
            Download Resume as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeForm;