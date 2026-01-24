import { motion } from 'framer-motion';
import { Github, Linkedin, ArrowRight, User, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assets } from '../lib/assets';

const Hero = () => {
    return (
        <section id="home" className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
            {/* Background Image Mask */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale"
                style={{ backgroundImage: `url(${assets.heroBg})`, backgroundSize: 'cover' }}
            ></div>

            {/* Background Shapes */}
            <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 left-[-5%] w-[300px] h-[300px] bg-accent/10 rounded-full blur-2xl"></div>

            <div className="container mx-auto px-6 relative flex flex-col md:flex-row items-center justify-between gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 text-center md:text-left"
                >
                    <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-primary uppercase bg-blue-100 rounded-full">
                        Fullstack Developer
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 leading-tight mb-6">
                        Muhammad <br /> Hafiz Favian
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
                        Saya membuat aplikasi web dengan <span className="font-semibold text-primary">Laravel</span> dan aplikasi Android dengan <span className="font-semibold text-primary">Android Studio</span>.
                        Membangun solusi digital yang bermanfaat untuk pondok pesantren dan bisnis.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                        <a href="#projects" className="btn btn-primary flex items-center gap-2 group">
                            Lihat Proyek <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <Link to="/chat" className="btn btn-secondary flex items-center gap-2">
                            <MessageCircle size={20} /> Live Chat
                        </Link>
                    </div>

                    <div className="flex items-center gap-6 justify-center md:justify-start">
                        <a href="https://github.com/fav124" target="_blank" className="p-3 bg-white shadow-md rounded-lg text-slate-600 hover:text-primary hover:shadow-lg transition-all">
                            <Github size={24} />
                        </a>
                        <a href="#" className="p-3 bg-white shadow-md rounded-lg text-slate-600 hover:text-primary hover:shadow-lg transition-all">
                            <Linkedin size={24} />
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex-1 flex justify-center relative"
                >
                    <div className="relative w-72 h-72 md:w-96 md:h-96">
                        {/* Morphing Shape */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent animate-morphing opacity-80 shadow-2xl shadow-primary/20 overflow-hidden rounded-full">
                            {/* TIPS: Ganti foto utama di src/lib/assets.js bagian heroImage */}
                            <img
                                src={assets.heroImage}
                                alt="Favian Profile"
                                className="w-full h-full object-cover mix-blend-overlay opacity-50"
                            />
                        </div>

                        {/* Overlay Initials - Now subtle and behind if image exists */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            {!assets.heroImage && <span className="text-8xl md:text-9xl font-black text-white/40 select-none uppercase tracking-tighter">MF</span>}
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -top-4 -right-10 px-4 py-2 bg-white shadow-xl rounded-2xl flex items-center gap-2 border border-slate-100"
                        >
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-bold text-slate-700">Available for Work</span>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-8 -left-4 p-4 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl border border-white/20"
                        >
                            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">Current Project</p>
                            <p className="font-bold text-primary">DEISA System</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
