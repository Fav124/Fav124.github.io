import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import Resume from './components/Resume';
import Footer from './components/Footer';

import { Settings } from 'lucide-react';
import { useState } from 'react';


function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-primary/20 selection:text-primary relative">
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

      {/* Internal Admin Entry - Bottom left hidden trigger */}
      <button
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-4 left-4 p-2 bg-slate-200 text-slate-400 rounded-full opacity-20 hover:opacity-100 transition-opacity z-50"
        title="Admin View"
      >
        <Settings size={16} />
      </button>

      <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}

export default App;
