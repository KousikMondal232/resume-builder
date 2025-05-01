import { useState } from 'react'

function ResumeForm({ data, onUpdate }) {
  const [formData, setFormData] = useState(data)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profileImage: reader.result,
        })
        onUpdate({
          ...formData,
          profileImage: reader.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [name]: value,
      },
    })
    onUpdate({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [name]: value,
      },
    })
  }

  const handleAddLink = (e) => {
    e.preventDefault()
    if (e.target.title.value.trim() && e.target.url.value.trim()) {
      const newLink = {
        title: e.target.title.value.trim(),
        url: e.target.url.value.trim(),
      }
      setFormData({
        ...formData,
        links: [...formData.links, newLink],
      })
      onUpdate({
        ...formData,
        links: [...formData.links, newLink],
      })
      e.target.title.value = ''
      e.target.url.value = ''
    }
  }

  const handleAddProject = (e) => {
    e.preventDefault()
    const newProject = {
      title: '',
      description: '',
      technologies: '',
      link: '',
    }
    setFormData({
      ...formData,
      projects: [...formData.projects, newProject],
    })
    onUpdate({
      ...formData,
      projects: [...formData.projects, newProject],
    })
  }

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target
    const updatedProjects = formData.projects.map((proj, i) =>
      i === index ? { ...proj, [name]: value } : proj
    )
    setFormData({
      ...formData,
      projects: updatedProjects,
    })
    onUpdate({
      ...formData,
      projects: updatedProjects,
    })
  }

  const handleAddEducation = (e) => {
    e.preventDefault()
    const newEducation = {
      school: '',
      degree: '',
      year: '',
    }
    setFormData({
      ...formData,
      education: [...formData.education, newEducation],
    })
    onUpdate({
      ...formData,
      education: [...formData.education, newEducation],
    })
  }

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target
    const updatedEducation = formData.education.map((edu, i) =>
      i === index ? { ...edu, [name]: value } : edu
    )
    setFormData({
      ...formData,
      education: updatedEducation,
    })
    onUpdate({
      ...formData,
      education: updatedEducation,
    })
  }

  const handleAddExperience = (e) => {
    e.preventDefault()
    const newExperience = {
      company: '',
      position: '',
      duration: '',
      description: '',
    }
    setFormData({
      ...formData,
      experience: [...formData.experience, newExperience],
    })
    onUpdate({
      ...formData,
      experience: [...formData.experience, newExperience],
    })
  }

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target
    const updatedExperience = formData.experience.map((exp, i) =>
      i === index ? { ...exp, [name]: value } : exp
    )
    setFormData({
      ...formData,
      experience: updatedExperience,
    })
    onUpdate({
      ...formData,
      experience: updatedExperience,
    })
  }

  const handleAddSkill = (e) => {
    e.preventDefault()
    if (e.target.skill.value.trim()) {
      const newSkills = [...formData.skills, e.target.skill.value.trim()]
      setFormData({
        ...formData,
        skills: newSkills,
      })
      onUpdate({
        ...formData,
        skills: newSkills,
      })
      e.target.skill.value = ''
    }
  }

  return (
    <div className="form-container">
      <h2>Profile Image</h2>
      <div className="form-section">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
        />
      </div>

      <h2>Personal Information</h2>
      <div className="form-section">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.personalInfo.name}
          onChange={handlePersonalInfoChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.personalInfo.email}
          onChange={handlePersonalInfoChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.personalInfo.phone}
          onChange={handlePersonalInfoChange}
        />
        <textarea
          name="address"
          placeholder="Address"
          value={formData.personalInfo.address}
          onChange={handlePersonalInfoChange}
        />
      </div>

      <h2>Links</h2>
      <div className="form-section">
        <form onSubmit={handleAddLink}>
          <input type="text" name="title" placeholder="Link Title (e.g., Portfolio)" />
          <input type="url" name="url" placeholder="URL" />
          <button type="submit">Add Link</button>
        </form>
        <div className="links-list">
          {formData.links.map((link, index) => (
            <div key={index} className="link-item">
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
            </div>
          ))}
        </div>
      </div>

      <h2>Projects</h2>
      <div className="form-section">
        {formData.projects.map((proj, index) => (
          <div key={index} className="project-entry">
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={proj.title}
              onChange={(e) => handleProjectChange(index, e)}
            />
            <textarea
              name="description"
              placeholder="Project Description"
              value={proj.description}
              onChange={(e) => handleProjectChange(index, e)}
            />
            <input
              type="text"
              name="technologies"
              placeholder="Technologies Used"
              value={proj.technologies}
              onChange={(e) => handleProjectChange(index, e)}
            />
            <input
              type="url"
              name="link"
              placeholder="Project Link"
              value={proj.link}
              onChange={(e) => handleProjectChange(index, e)}
            />
          </div>
        ))}
        <button onClick={handleAddProject}>Add Project</button>
      </div>

      <h2>Education</h2>
      <div className="form-section">
        {formData.education.map((edu, index) => (
          <div key={index} className="education-entry">
            <input
              type="text"
              name="school"
              placeholder="School/University"
              value={edu.school}
              onChange={(e) => handleEducationChange(index, e)}
            />
            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => handleEducationChange(index, e)}
            />
            <input
              type="text"
              name="year"
              placeholder="Year"
              value={edu.year}
              onChange={(e) => handleEducationChange(index, e)}
            />
          </div>
        ))}
        <button onClick={handleAddEducation}>Add Education</button>
      </div>

      <h2>Experience</h2>
      <div className="form-section">
        {formData.experience.map((exp, index) => (
          <div key={index} className="experience-entry">
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => handleExperienceChange(index, e)}
            />
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={exp.position}
              onChange={(e) => handleExperienceChange(index, e)}
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={exp.duration}
              onChange={(e) => handleExperienceChange(index, e)}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={exp.description}
              onChange={(e) => handleExperienceChange(index, e)}
            />
          </div>
        ))}
        <button onClick={handleAddExperience}>Add Experience</button>
      </div>

      <h2>Skills</h2>
      <div className="form-section">
        <form onSubmit={handleAddSkill}>
          <input type="text" name="skill" placeholder="Add a skill" />
          <button type="submit">Add Skill</button>
        </form>
        <div className="skills-list">
          {formData.skills.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ResumeForm