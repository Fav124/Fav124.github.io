import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Briefcase, Download, Github } from 'lucide-react';

const About = () => {
    const tools = ['Git', 'GitHub', 'VSCode', 'Figma', 'LAMP', 'Android Studio', 'Laravel', 'Vite', 'React', 'Tailwind CSS'];

    return (
        <section id="about" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Tentang Saya</h2>
                    <div className="w-20 h-1.5 bg-primary rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-12 items-start">
                    <div className="md:col-span-2 space-y-6">
                        <p className="text-xl text-slate-700 leading-relaxed">
                            Halo—saya <span className="font-bold text-primary">Muhammad Hafiz Favian (Favian)</span>, pelajar SMA kelas 3 dari Pandau Jaya. Saya mengembangkan aplikasi web menggunakan <span className="font-semibold px-2 py-0.5 bg-blue-50 border border-blue-100 rounded text-primary">Laravel</span> dan aplikasi Android dengan <span className="font-semibold px-2 py-0.5 bg-blue-50 border border-blue-100 rounded text-primary">Android Studio</span>.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Saya mulai belajar pemrograman sejak kelas 1 SMA dan terus mengembangkan keterampilan melalui proyek-proyek nyata. Saya menikmati proses memecahkan masalah dengan kode dan menciptakan solusi yang berguna untuk masyarakat, seperti proyek DEISA yang saat ini sedang saya kembangkan.
                        </p>

                        <div className="pt-6">
                            <h3 className="text-2xl font-bold text-slate-800 mb-6">Tools yang Saya Gunakan</h3>
                            <div className="flex flex-wrap gap-3">
                                {tools.map((tool) => (
                                    <span key={tool} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 font-medium hover:border-primary hover:text-primary transition-all cursor-default">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-8 bg-gradient-to-br from-primary to-primary-dark rounded-3xl text-white shadow-2xl shadow-primary/20"
                    >
                        <h3 className="text-2xl font-bold mb-8">Informasi</h3>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="p-3 bg-white/10 rounded-2xl h-fit">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-1">Lokasi</p>
                                    <p className="font-medium">Pandau Jaya, Siak Hulu, Riau</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="p-3 bg-white/10 rounded-2xl h-fit">
                                    <GraduationCap size={24} />
                                </div>
                                <div>
                                    <p className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-1">Status</p>
                                    <p className="font-medium">Pelajar SMA Kelas 3</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="p-3 bg-white/10 rounded-2xl h-fit">
                                    <Briefcase size={24} />
                                </div>
                                <div>
                                    <p className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-1">Fokus</p>
                                    <p className="font-medium">Fullstack Developer</p>
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-10 py-4 bg-white text-primary rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors shadow-lg shadow-black/10">
                            <Download size={20} /> Download CV
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
