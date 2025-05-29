import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import IntellectaDashboard from './SubjectChallenge'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import LevelsPage from './LevelsPage'
import TeacherNavbar from './components/Admin/AdminDashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
     <Routes>
  <Route path="/quiz" element={<IntellectaDashboard />} />
  <Route path="/levels" element={<LevelsPage />} />
  <Route path="/admin" element={<TeacherNavbar />} />
</Routes>
    
    </BrowserRouter>
  )
}

export default App
