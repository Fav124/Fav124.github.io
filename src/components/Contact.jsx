import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Send, Instagram, Linkedin, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [statusMessage, setStatusMessage] = useState('');
    const [isAdminOnline, setIsAdminOnline] = useState(false);

    useEffect(() => {
        const channel = supabase.channel('admin_room');

        channel
            .on('presence', { event: 'sync' }, () => {
                const state = channel.presenceState();
                setIsAdminOnline(state.admin !== undefined);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const { error } = await supabase
                .from('messages')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        subject: formData.subject,
                        message: formData.message
                    }
                ]);

            if (error) throw error;

            setStatus('success');

            if (isAdminOnline) {
                setStatusMessage('Pesan terkirim! Admin sedang online dan akan segera membalas.');
            } else {
                setStatusMessage('Pesan terkirim! Admin sedang offline. InsyaAllah akan segera dibalas.');
            }

            setFormData({ name: '', email: '', subject: '', message: '' });

            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
            setStatusMessage('Gagal mengirim pesan. Silakan coba lagi.');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Notification Toast */}
            <AnimatePresence>
                {status !== 'idle' && status !== 'loading' && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${status === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-red-50 border-red-100 text-red-800'
                            }`}
                    >
                        {status === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                        <p className="font-bold">{statusMessage}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center mb-16">
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-4xl font-bold text-slate-900">Kontak & Kolaborasi</h2>
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${isAdminOnline ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${isAdminOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></div>
                            {isAdminOnline ? 'Admin Online' : 'Admin Offline'}
                        </div>
                    </div>
                    <div className="w-20 h-1.5 bg-primary rounded-full"></div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Nama Lengkap</label>
                                        <input
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            type="text"
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Alamat Email</label>
                                        <input
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            type="email"
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Subjek</label>
                                    <input
                                        id="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        type="text"
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                                        placeholder="How can I help you?"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Pesan</label>
                                    <textarea
                                        id="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all resize-none"
                                        placeholder="Tell me about your project..."
                                    ></textarea>
                                </div>

                                <button
                                    disabled={status === 'loading'}
                                    type="submit"
                                    className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 group disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status === 'loading' ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                            className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                                        />
                                    ) : (
                                        <>
                                            Kirim Pesan <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] text-white shadow-xl shadow-slate-200 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Mail size={120} />
                            </div>
                            <h3 className="text-2xl font-bold mb-8 relative z-10">Informasi Kontak</h3>

                            <div className="space-y-6 relative z-10">
                                <a href="mailto:favianmuhammadhafiz@gmail.com" className="flex gap-4 group">
                                    <div className="p-3 bg-white/10 rounded-2xl h-fit group-hover:bg-primary transition-colors">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Email</p>
                                        <p className="font-medium text-sm md:text-base break-all">favianmuhammadhafiz@gmail.com</p>
                                    </div>
                                </a>

                                <div className="flex gap-4 group">
                                    <div className="p-3 bg-white/10 rounded-2xl h-fit group-hover:bg-primary transition-colors">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">WhatsApp</p>
                                        <p className="font-medium">+62 812 7084 7671</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 group">
                                    <div className="p-3 bg-white/10 rounded-2xl h-fit group-hover:bg-primary transition-colors">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Lokasi</p>
                                        <p className="font-medium">Riau, Indonesia</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 flex gap-4 relative z-10">
                                {[
                                    { icon: Github, href: "https://github.com/fav124" },
                                    { icon: Instagram, href: "#" },
                                    { icon: Linkedin, href: "#" },
                                ].map((social, i) => (
                                    <a key={i} href={social.href} className="p-4 bg-white/10 rounded-2xl hover:bg-primary transition-all">
                                        <social.icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </motion.div>

                        <div className="p-8 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm">
                            <h3 className="text-xl font-bold text-slate-800 mb-6">Tersedia untuk</h3>
                            <ul className="space-y-3">
                                {[
                                    "Kolaborasi proyek open source",
                                    "Pengembangan aplikasi web & mobile",
                                    "Konsultasi teknologi",
                                    "Magang / kerja remote"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

