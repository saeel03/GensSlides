import { useState } from 'react';
import './App.css';
import SignUpForm from './SignUpForm';
import Signin from './Signin';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Profile from './Profile';
import PdfToWord from './PdfToWord';
import WordToPDF from './WordToPDF';
import ContentToPPT from './ContentToPPT'; // ✅ Import the new screen
import ResumeForm from './components/ResumeForm';
import PdfToPpt from './PdfToPpt';
import LandingPage from './Landingpage';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WithNavbar from './WithNavbar'; // Import the wrapper

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>

        {/* Routes WITHOUT Navbar */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='/login' element={<Signin />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/generate-resume" element={<ResumeForm />} />
        <Route path="/pdf-to-ppt" element={<PdfToPpt />} />


        <Route path='/pdf-to-word' element={<PdfToWord />} />
        <Route path='/word-to-pdf' element={<WordToPDF />} />
        <Route path='/content-to-ppt' element={<ContentToPPT />} /> {/* ✅ added */}

        {/* Routes WITH Navbar using the wrapper */}
        <Route path='/home' element={<WithNavbar><Home /></WithNavbar>} />
        <Route path='/about' element={<WithNavbar><About /></WithNavbar>} />
        <Route path='/contact' element={<WithNavbar><Contact /></WithNavbar>} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
