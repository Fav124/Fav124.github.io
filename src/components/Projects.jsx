import { motion } from 'framer-motion';
import { ExternalLink, Github, Info } from 'lucide-react';

const projects = [
    {
        title: "DEISA",
        subtitle: "Sistem Kesehatan Pondok Pesantren",
        description: "Sistem pencatatan kesehatan santri dan manajemen obat untuk pondok pesantren dengan fitur dashboard admin, pencatatan riwayat kesehatan, dan manajemen stok obat.",
        techStack: ["Laravel", "Android Studio", "MySQL", "Vite", "Kotlin"],
        repoUrl: "https://github.com/fav124/deisa",
        imageColor: "from-blue-600 to-emerald-500",
        featured: true
    },
    {
        title: "E-Learning Platform",
        subtitle: "Platform Pembelajaran Online",
        description: "Platform pembelajaran online dengan video course, kuis interaktif, dan sistem sertifikasi digital.",
        techStack: ["Laravel", "Vue.js", "MySQL", "Tailwind CSS"],
        repoUrl: "https://github.com/fav124/e-learning",
        imageColor: "from-purple-600 to-blue-500"
    },
    {
        title: "Inventory Management",
        subtitle: "Sistem Manajemen Inventaris",
        description: "Aplikasi web untuk mengelola stok barang, pemesanan, dan laporan inventaris otomatis.",
        techStack: ["Laravel", "JavaScript", "MySQL", "Bootstrap"],
        repoUrl: "https://github.com/fav124/inventory",
        imageColor: "from-amber-500 to-red-500"
    },
    {
        title: "Task Management App",
        subtitle: "Aplikasi Manajemen Tugas",
        description: "Aplikasi Android untuk mengelola tugas harian dengan fitur reminder dan integrasi kalender.",
        techStack: ["Kotlin", "XML", "Firebase", "Material Design"],
        repoUrl: "https://github.com/fav124/taskapp",
        imageColor: "from-emerald-500 to-blue-600"
    }
];

const ProjectCard = ({ project, idx }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: idx * 0.1 }}
        className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100"
    >
        <div className={`h-48 bg-gradient-to-br ${project.imageColor} relative flex items-center justify-center p-6 text-white overflow-hidden`}>
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
            <h3 className="text-3xl font-black opacity-30 group-hover:opacity-50 transition-opacity select-none">{project.title}</h3>
            <div className="absolute bottom-4 right-4 flex gap-2">
                <a href={project.repoUrl} target="_blank" className="p-2 bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/40 transition-colors">
                    <Github size={20} />
                </a>
            </div>
        </div>

        <div className="p-8 flex-1 flex flex-col">
            <div className="mb-4">
                <h4 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{project.title}</h4>
                <p className="text-sm font-semibold text-primary/70 uppercase tracking-widest">{project.subtitle}</p>
            </div>

            <p className="text-slate-600 mb-6 line-clamp-3">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-8">
                {project.techStack.map(tech => (
                    <span key={tech} className="px-2 py-1 bg-slate-50 text-slate-500 text-xs font-bold rounded-md border border-slate-100">
                        {tech}
                    </span>
                ))}
            </div>

            <div className="mt-auto flex gap-3">
                <button className="flex-1 btn btn-primary py-2 text-sm flex items-center justify-center gap-2">
                    <Info size={16} /> Detail
                </button>
                <a href={project.repoUrl} target="_blank" className="flex-1 btn btn-secondary py-2 text-sm flex items-center justify-center gap-2">
                    <Github size={16} /> Repo
                </a>
            </div>
        </div>
    </motion.div>
);

const Projects = () => {
    const featured = projects.find(p => p.featured);
    const others = projects.filter(p => !p.featured);

    return (
        <section id="projects" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Portofolio & Proyek</h2>
                    <div className="w-20 h-1.5 bg-primary rounded-full"></div>
                </div>

                {/* Featured Project */}
                {featured && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16 bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 flex flex-col lg:flex-row hover:shadow-2xl transition-all duration-700"
                    >
                        <div className={`lg:w-1/2 bg-gradient-to-br ${featured.imageColor} flex items-center justify-center p-20 text-white`}>
                            <div className="text-center">
                                <h3 className="text-6xl font-black mb-4 select-none opacity-40">{featured.title}</h3>
                                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold border border-white/30 uppercase tracking-widest">Featured Project</span>
                            </div>
                        </div>
                        <div className="lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
                            <h3 className="text-3xl font-black text-slate-900 mb-2">{featured.title}</h3>
                            <p className="text-primary font-bold mb-6 text-lg">{featured.subtitle}</p>
                            <p className="text-slate-600 text-lg mb-8 leading-relaxed">{featured.description}</p>

                            <div className="flex flex-wrap gap-2 mb-10">
                                {featured.techStack.map(tech => (
                                    <span key={tech} className="px-3 py-1 bg-white shadow-sm border border-slate-100 text-slate-600 text-sm font-bold rounded-lg hover:border-primary hover:text-primary transition-all cursor-default">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <button className="px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                                    <Info size={20} /> Lihat Detail
                                </button>
                                <a href={featured.repoUrl} target="_blank" className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-2xl font-bold flex items-center gap-2 hover:border-primary hover:text-primary transition-all">
                                    <Github size={20} /> GitHub Repo
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Other Projects */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {others.map((project, idx) => (
                        <ProjectCard key={project.title} project={project} idx={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
