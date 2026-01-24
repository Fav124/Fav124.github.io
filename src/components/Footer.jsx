import { Github, Mail, Instagram, Linkedin, Heart } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="pt-24 pb-12 bg-slate-900 text-white relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <Logo />
                        <p className="mt-6 text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
                            Membangun solusi digital masa depan dengan teknologi modern. Berfokus pada kualitas kode dan pengalaman pengguna yang luar biasa.
                        </p>
                        <div className="mt-8 flex gap-4">
                            {[
                                { icon: Github, href: "https://github.com/fav124" },
                                { icon: Mail, href: "mailto:favianmuhammadhafiz@gmail.com" },
                                { icon: Instagram, href: "#" },
                                { icon: Linkedin, href: "#" },
                            ].map((social, i) => (
                                <a key={i} href={social.href} className="w-10 h-10 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300">
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-6">Navigasi</h4>
                        <ul className="space-y-4">
                            {['Home', 'About', 'Resume', 'Skills', 'Projects'].map(link => (
                                <li key={link}>
                                    <a href={`#${link.toLowerCase()}`} className="text-sm font-bold text-slate-400 hover:text-white transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support & Contact */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-6">Bantuan</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/chat" className="text-sm font-bold text-primary hover:underline flex items-center gap-2">
                                    <MessageCircle size={16} /> Live Support
                                </Link>
                            </li>
                            <li>
                                <Link to="/cv" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">
                                    Unduh CV (PDF)
                                </Link>
                            </li>
                            <li className="pt-4">
                                <p className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-1">Lokasi</p>
                                <p className="text-xs font-bold text-slate-400">Riau, Indonesia</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-500 text-xs font-bold tracking-tight">
                        &copy; {currentYear} Favian Muhammad. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                        Made with <Heart size={14} className="text-red-500 fill-red-500" /> in Riau
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
