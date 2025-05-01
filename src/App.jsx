import { useState } from 'react'
import './App.css'
import ResumeForm from './components/ResumeForm'
import ResumePreview from './components/ResumePreview'

function App() {
  const [theme, setTheme] = useState('light')
  const [resumeData, setResumeData] = useState({
    profileImage: '',
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
    },
    links: [],
    education: [],
    experience: [],
    projects: [],
    skills: [],
  })

  const handleUpdateResume = (newData) => {
    setResumeData(newData)
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={`app ${theme}`}>
      <div className="theme-toggle">
        <button onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>
      <h1>Resume Builder</h1>
      <div className="container">
        <ResumeForm data={resumeData} onUpdate={handleUpdateResume} />
        <ResumePreview data={resumeData} />
      </div>
    </div>
  )
}

export default App