import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Calendar, Tag, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { assets } from '../lib/assets';

const ProjectDetails = () => {
    const { id } = useParams();

    // TIPS: Nanti data ini akan diambil dari Supabase
    const project = {
        title: id?.toUpperCase() || "PROJECT NAME",
        subtitle: "A detailed breakdown of the development process.",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        fullContent: `
            ### Tantangan Proyek
            Bagaimana merancang arsitektur sistem yang skalabel dan aman untuk ribuan data santri.

            ### Solusi Kami
            Kami menggunakan Laravel sebagai backend karena keamanannya dan sistem manajemen database yang kuat. Untuk mobile, kami memilih Kotlin karena performanya yang stabil.

            ### Hasil Akhir
            Efisiensi operasional pondok pesantren meningkat hingga 70% dalam hal administrasi kesehatan.
        `,
        techStack: ["Laravel", "React", "Supabase", "Tailwind CSS"],
        repoUrl: "#",
        demoUrl: "#",
        date: "Januari 2024",
        category: "Web & Mobile App"
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="pt-32 pb-24">
                <div className="container mx-auto px-6">
                    {/* Back Button */}
                    <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold transition-all mb-12 group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Beranda
                    </Link>

                    {/* Header Section */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-4 py-1 bg-primary/5 text-primary text-xs font-black uppercase tracking-widest rounded-full">{project.category}</span>
                                <span className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-widest">
                                    <Calendar size={14} /> {project.date}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-8">
                                {project.title}
                            </h1>
                            <p className="text-xl text-slate-600 leading-relaxed max-w-xl mb-10">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <a href={project.repoUrl} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all">
                                    <Github size={20} /> Lihat Source Code
                                </a>
                                <a href={project.demoUrl} className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-100 rounded-2xl font-bold flex items-center gap-2 hover:border-primary hover:text-primary transition-all">
                                    <ExternalLink size={20} /> Live Demo
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative"
                        >
                            <div className="aspect-video bg-slate-100 rounded-[3rem] overflow-hidden border border-slate-100 shadow-2xl relative group">
                                <img
                                    src={assets.projectDefault}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    alt={project.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Content Section */}
                    <div className="grid lg:grid-cols-12 gap-16">
                        <div className="lg:col-span-8 space-y-12">
                            <div className="prose prose-slate max-w-none">
                                <h2 className="text-3xl font-black text-slate-900 mb-8">Eksplorasi Proyek</h2>
                                <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-line font-medium">
                                    {project.fullContent}
                                </p>
                            </div>

                            <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <ShieldCheck className="text-primary" /> Key Features
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {["Responsive Design", "API Integration", "Realtime Sync", "Admin Dashboard", "CMS Ready", "Secure Auth"].map(f => (
                                        <div key={f} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div> {f}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-4">
                            <div className="sticky top-32 space-y-8">
                                <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
                                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <Tag className="text-primary" /> Technologies
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map(t => (
                                            <span key={t} className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-black uppercase rounded-xl">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-8 bg-primary rounded-[2.5rem] text-white shadow-xl shadow-primary/20">
                                    <h3 className="text-xl font-bold mb-4">Tertarik Berkolaborasi?</h3>
                                    <p className="text-white/80 text-sm mb-6 font-medium">Mari bangun sesuatu yang hebat bersama. Tim saya siap membantu proyek kamu.</p>
                                    <Link to="/#contact" className="w-full py-4 bg-white text-primary rounded-2xl font-black text-center flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                                        Start a Chat
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProjectDetails;
