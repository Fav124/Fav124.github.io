import { Github, Mail, Instagram, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 bg-slate-900 text-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-xl">
                            MF
                        </div>
                        <span className="font-bold text-2xl tracking-tight text-white">Favian</span>
                    </div>

                    <div className="flex gap-6 mb-10">
                        {[
                            { icon: Github, href: "https://github.com/fav124" },
                            { icon: Mail, href: "mailto:favianmuhammadhafiz@gmail.com" },
                            { icon: Instagram, href: "#" },
                            { icon: Linkedin, href: "#" },
                        ].map((social, i) => (
                            <a key={i} href={social.href} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-primary transition-all duration-300">
                                <social.icon size={20} />
                            </a>
                        ))}
                    </div>

                    <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-10">
                        {['Home', 'About', 'Skills', 'Projects', 'Contact'].map(link => (
                            <a key={link} href={`#${link.toLowerCase()}`} className="text-slate-400 hover:text-white font-medium transition-colors">
                                {link}
                            </a>
                        ))}
                    </nav>

                    <div className="w-full pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm font-medium">
                        <p>&copy; {currentYear} Muhammad Hafiz Favian. All rights reserved.</p>
                        <div className="flex items-center gap-2">
                            Made with <Heart size={14} className="text-red-500 fill-red-500" /> in Riau, Indonesia
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
