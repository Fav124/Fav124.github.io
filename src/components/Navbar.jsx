import { useState, useEffect } from 'react';
import { Menu, X, Rocket } from 'lucide-react';
import Logo from './Logo';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Resume', href: '#resume' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];


    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a href="#home">
                    <Logo />
                </a>


                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-10">
                    <ul className="flex gap-8">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    className="font-medium text-slate-600 hover:text-primary transition-colors relative group"
                                >
                                    {link.name}
                                    <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <a href="#contact" className="btn btn-primary flex items-center gap-2">
                        Hire Me <Rocket size={18} />
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-slate-800 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Links */}
            <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen py-6' : 'max-h-0'}`}>
                <ul className="flex flex-col items-center gap-6">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                className="text-lg font-semibold text-slate-700 hover:text-primary"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                    <a
                        href="#contact"
                        className="btn btn-primary w-[80%] text-center"
                        onClick={() => setIsOpen(false)}
                    >
                        Hire Me
                    </a>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
