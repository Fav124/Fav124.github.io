import { Routes, Route, Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { useState } from 'react';

// Sections
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Resume from './components/Resume';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetails from './pages/ProjectDetails';
import ChatWidget from './components/ChatWidget';
import Login from './pages/Login';
import AdminCMS from './pages/AdminCMS';
import ResumePDF from './pages/ResumePDF';
import ChatPage from './pages/ChatPage';

const Home = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <About />
      <Resume />
      <Skills />
      <Projects />
      <Contact />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-primary/20 selection:text-primary relative">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminCMS />} />
        <Route path="/cv" element={<ResumePDF />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>



      {/* Internal Admin Entry - Bottom left hidden trigger */}
      <Link
        to="/admin"
        className="fixed bottom-4 left-4 p-2 bg-slate-200 text-slate-400 rounded-full opacity-20 hover:opacity-100 transition-opacity z-50 flex items-center justify-center"
        title="Admin Control Panel"
      >
        <Settings size={16} />
      </Link>


      {/* Realtime Chat Widget for Clients */}
      <ChatWidget />
    </div>
  );
}


export default App;
