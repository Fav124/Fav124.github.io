import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Download, ArrowLeft, ExternalLink, Calendar, Briefcase, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assets } from '../lib/assets';

const ResumePDF = () => {
    return (
        <div className="min-h-screen bg-slate-100 py-12 px-6 flex flex-col items-center">
            {/* Action Bar */}
            <div className="w-full max-w-5xl mb-8 flex justify-between items-center no-print">
                <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-all">
                    <ArrowLeft size={20} /> Back to Portfolio
                </Link>
                <button
                    onClick={() => window.print()}
                    className="px-6 py-3 bg-primary text-white rounded-2xl font-black flex items-center gap-2 hover:bg-primary-dark transition-all shadow-xl shadow-primary/20"
                >
                    <Download size={20} /> Download / Print PDF
                </button>
            </div>

            {/* Resume Sheet */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-5xl bg-white shadow-2xl rounded-[3rem] overflow-hidden flex flex-col md:flex-row print:shadow-none print:rounded-none"
            >
                {/* Left Column (Branding & Sidebar) */}
                <div className="w-full md:w-80 bg-slate-900 text-white p-12 flex flex-col shrink-0">
                    <div className="flex flex-col items-center text-center mb-12">
                        <div className="w-40 h-40 rounded-full border-4 border-white/10 overflow-hidden mb-6 bg-white/5 flex items-center justify-center">
                            <img src={assets.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <h1 className="text-2xl font-black tracking-tight leading-tight">Muhammad <br />Hafiz Favian</h1>
                        <p className="text-secondary font-bold text-xs uppercase tracking-widest mt-4">Fullstack Developer</p>
                    </div>

                    <div className="space-y-10">
                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-6">Contact</h4>
                            <div className="space-y-4">
                                <a href="mailto:favianmuhammadhafiz@gmail.com" className="flex items-start gap-3 group">
                                    <Mail size={16} className="text-secondary mt-1 shrink-0" />
                                    <span className="text-xs font-medium text-white/80 group-hover:text-white transition-colors break-all">favianmuhammadhafiz@gmail.com</span>
                                </a>
                                <div className="flex items-start gap-3">
                                    <Phone size={16} className="text-secondary mt-1 shrink-0" />
                                    <span className="text-xs font-medium text-white/80">+62 812 7084 7671</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin size={16} className="text-secondary mt-1 shrink-0" />
                                    <span className="text-xs font-medium text-white/80">Riau, Indonesia</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-6">Expertise</h4>
                            <div className="flex flex-wrap gap-2">
                                {["Laravel", "React", "Node.js", "Java", "Kotlin", "MySQL", "Tailwind"].map(s => (
                                    <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white/60">{s}</span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-6">Languages</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold">Indonesian</span>
                                    <span className="text-secondary">Native</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold">English</span>
                                    <span className="text-white/40 italic">Conversational</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column (Experience & Education) */}
                <div className="flex-1 p-16 md:p-20">
                    <section className="mb-16">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-slate-100 rounded-2xl text-slate-900">
                                <Briefcase size={24} />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Professional Summary</h2>
                        </div>
                        <p className="text-slate-600 leading-[1.8] font-medium text-justify">
                            Developer penuh waktu yang bersemangat dengan pengalaman dalam membangun aplikasi berbasis web dan mobile. Berfokus pada arsitektur bersih dan skalabel untuk menghadirkan solusi digital yang berdampak nyata, terutama di sektor pendidikan dan pesantren. Mahir dalam ekosistem PHP/Laravel dan pengembangan Android modern.
                        </p>
                    </section>

                    <section className="mb-16">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-slate-100 rounded-2xl text-slate-900">
                                <Calendar size={24} />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Experience</h2>
                        </div>
                        <div className="space-y-10">
                            <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-slate-200">
                                <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-primary ring-4 ring-white"></div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-slate-900">Fullstack Web Developer</h3>
                                    <span className="text-[10px] font-black uppercase bg-slate-100 py-1 px-3 rounded-md text-slate-500">2024 - Present</span>
                                </div>
                                <p className="text-primary font-bold text-sm mb-4">Project DEISA / Freelance</p>
                                <p className="text-slate-500 text-sm leading-relaxed">Merancang dan membangun sistem informasi kesehatan pondok pesantren. Mengintegrasikan dashboard admin dengan aplikasi Android untuk monitoring realtime.</p>
                            </div>

                            <div className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-slate-200">
                                <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-slate-300 ring-4 ring-white"></div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-slate-800">Android App Developer</h3>
                                    <span className="text-[10px] font-black uppercase bg-slate-100 py-1 px-3 rounded-md text-slate-400">2023 - 2024</span>
                                </div>
                                <p className="text-slate-400 font-bold text-sm mb-4">Independent Projects</p>
                                <p className="text-slate-400 text-sm leading-relaxed">Mengembangkan berbagai aplikasi utilitas dan produktivitas menggunakan Kotlin dan Java untuk platform Android.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-slate-100 rounded-2xl text-slate-900">
                                <GraduationCap size={24} />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Education</h2>
                        </div>
                        <div className="space-y-6">
                            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-slate-900">Sekolah Menengah Atas (SMA)</h3>
                                    <span className="text-[10px] font-black text-primary">Sekarang</span>
                                </div>
                                <p className="text-slate-500 text-sm font-medium italic">Siswa Kelas 3 • Riau, Indonesia</p>
                            </div>
                        </div>
                    </section>
                </div>
            </motion.div>

            {/* Footer / Contact for PDF */}
            <div className="mt-12 text-center text-slate-400 text-xs font-medium no-print">
                Generated via Favian Portfolio Platform • {new Date().getFullYear()}
            </div>
        </div>
    );
};

export default ResumePDF;
