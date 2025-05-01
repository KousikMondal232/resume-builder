import { useRef } from 'react'

function ResumePreview({ data }) {
  const resumeRef = useRef(null)

  const handleDownload = () => {
    const content = resumeRef.current
    const style = document.createElement('style')
    style.textContent = `
      @media print {
        body { background: none; }
        .resume { padding: 20px; }
      }
    `
    document.head.appendChild(style)
    
    window.print()
    document.head.removeChild(style)
  }

  return (
    <div className="preview-container">
      <div className="resume" ref={resumeRef}>
        <div className="resume-header">
          {data.profileImage && (
            <div className="profile-image">
              <img src={data.profileImage} alt="Profile" />
            </div>
          )}
          <h2>{data.personalInfo.name || 'Your Name'}</h2>
          <div className="contact-info">
            <p>{data.personalInfo.email}</p>
            <p>{data.personalInfo.phone}</p>
            <p>{data.personalInfo.address}</p>
          </div>
          {data.links.length > 0 && (
            <div className="links-section">
              {data.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-link"
                >
                  {link.title}
                </a>
              ))}
            </div>
          )}
        </div>

        {data.education.length > 0 && (
          <div className="resume-section">
            <h3>Education</h3>
            {data.education.map((edu, index) => (
              <div key={index} className="education-item">
                <h4>{edu.school}</h4>
                <p>{edu.degree}</p>
                <p>{edu.year}</p>
              </div>
            ))}
          </div>
        )}

        {data.experience.length > 0 && (
          <div className="resume-section">
            <h3>Experience</h3>
            {data.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <h4>{exp.company}</h4>
                <p className="position">{exp.position}</p>
                <p className="duration">{exp.duration}</p>
                <p className="description">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {data.projects.length > 0 && (
          <div className="resume-section">
            <h3>Projects</h3>
            {data.projects.map((proj, index) => (
              <div key={index} className="project-item">
                <h4>{proj.title}</h4>
                <p className="description">{proj.description}</p>
                <p className="technologies">Technologies: {proj.technologies}</p>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {data.skills.length > 0 && (
          <div className="resume-section">
            <h3>Skills</h3>
            <div className="skills">
              {data.skills.map((skill, index) => (
                <span key={index} className="skill">{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>
      <button className="download-button" onClick={handleDownload}>
        Download Resume
      </button>
    </div>
  )
}

export default ResumePreview