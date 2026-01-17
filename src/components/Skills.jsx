import { motion } from 'framer-motion';

const SkillBar = ({ name, percentage }) => (
    <div className="mb-6">
        <div className="flex justify-between mb-2">
            <span className="font-semibold text-slate-700">{name}</span>
            <span className="text-primary font-bold">{percentage}%</span>
        </div>
        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${percentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            />
        </div>
    </div>
);

const Skills = () => {
    const skillCategories = [
        {
            title: "Front-end",
            skills: ["HTML", "CSS", "JavaScript", "React", "Vue"],
            bars: [
                { name: "HTML & CSS", percentage: 90 },
                { name: "JavaScript", percentage: 80 },
                { name: "React/Vue", percentage: 70 },
            ]
        },
        {
            title: "Back-end",
            skills: ["PHP", "Laravel", "MySQL"],
            bars: [
                { name: "PHP", percentage: 85 },
                { name: "Laravel", percentage: 80 },
            ]
        },
        {
            title: "Mobile & Tools",
            skills: ["Kotlin", "XML", "Git"],
            bars: [
                { name: "Android Development", percentage: 75 },
                { name: "Git & Version Control", percentage: 85 },
            ]
        }
    ];

    return (
        <section id="skills" className="py-24 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Keterampilan</h2>
                    <div className="w-20 h-1.5 bg-primary rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {skillCategories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all"
                        >
                            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                                {category.title}
                            </h3>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {category.skills.map(skill => (
                                    <span key={skill} className="px-3 py-1 bg-blue-50 text-primary text-sm font-bold rounded-lg">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {category.bars.map((bar, barIdx) => (
                                <SkillBar key={barIdx} name={bar.name} percentage={bar.percentage} />
                            ))}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
