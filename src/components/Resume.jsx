import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Download, User } from 'lucide-react';
import { Link } from 'react-router-dom';


const Resume = () => {
    const experiences = [
        {
            title: "Fullstack Developer (Project DEISA)",
            company: "SMA Negeri / Freelance",
            period: "2024 - Sekarang",
            description: "Mengembangkan sistem pencatatan kesehatan santri menggunakan Laravel dan database modern."
        },
        {
            title: "Android App Developer",
            company: "Personal Projects",
            period: "2023 - 2024",
            description: "Membuat berbagai aplikasi utilitas menggunakan Android Studio."
        }
    ];

    const education = [
        {
            school: "SMA (Sekolah Menengah Atas)",
            major: "Siswa Kelas 3",
            period: "Sekarang",
            location: "Riau, Indonesia"
        }
    ];

    return (
        <section id="resume" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Curriculum Vitae</h2>
                    <div className="w-20 h-1.5 bg-primary rounded-full"></div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Sidebar / Photo Placeholder */}
                    <div className="lg:col-span-4 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center"
                        >
                            {/* 
                                TIPS UNTUK USER:
                                Untuk mengganti foto profil:
                                1. Masukkan foto kamu ke folder /public/
                                2. Ganti <User size={80} /> di bawah dengan <img src="/foto_kamu.jpg" className="w-full h-full object-cover" />
                            */}
                            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 overflow-hidden border-4 border-white shadow-xl">
                                <User size={80} />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">Muhammad Hafiz Favian</h3>
                            <p className="text-primary font-bold text-sm uppercase tracking-widest mb-4">Student & Developer</p>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                                Pelajar SMA kelas 3 dari Pandau Jaya yang berfokus pada pengembangan web (Laravel) dan aplikasi Android.
                            </p>
                            <Link
                                to="/cv"
                                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 group"
                            >
                                <Download size={20} /> Download CV <span className="text-[10px] opacity-50 font-normal">(PDF)</span>
                            </Link>

                        </motion.div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Experience */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                                    <Briefcase size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Pengalaman Kerja</h3>
                            </div>

                            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                                {experiences.map((exp, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                                    >
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 group-hover:bg-primary group-hover:text-white text-slate-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors">
                                            <div className="w-2 h-2 bg-current rounded-full"></div>
                                        </div>
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-slate-50 rounded-3xl border border-slate-100 group-hover:border-primary/20 group-hover:shadow-lg transition-all">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-bold text-slate-900">{exp.title}</h4>
                                                <time className="text-[10px] font-black uppercase text-primary bg-primary/5 px-2 py-1 rounded-md">{exp.period}</time>
                                            </div>
                                            <p className="text-sm font-bold text-slate-500 mb-2 italic">{exp.company}</p>
                                            <p className="text-sm text-slate-500 leading-relaxed font-medium">{exp.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Education */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-secondary/10 text-secondary rounded-2xl">
                                    <GraduationCap size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Pendidikan</h3>
                            </div>

                            <div className="grid md:grid-cols-1 gap-6">
                                {education.map((edu, i) => (
                                    <div key={i} className="p-8 bg-slate-900 text-white rounded-[2rem] relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                                            <GraduationCap size={120} />
                                        </div>
                                        <div className="relative z-10">
                                            <p className="text-secondary font-bold text-xs uppercase tracking-[0.2em] mb-2">{edu.period}</p>
                                            <h4 className="text-xl font-bold mb-1">{edu.school}</h4>
                                            <p className="text-white/60 font-medium mb-4">{edu.major}</p>
                                            <div className="flex items-center gap-2 text-white/40 text-sm">
                                                <Award size={16} /> {edu.location}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Resume;
