import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { MessageSquare, User, Mail, Calendar, X } from 'lucide-react';

const AdminDashboard = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isOpen) return;

        // Initial fetch
        const fetchMessages = async () => {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error) setMessages(data);
            setLoading(false);
        };

        fetchMessages();

        // Realtime subscription
        const channel = supabase
            .channel('realtime_messages')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages'
            }, (payload) => {
                setMessages(prev => [payload.new, ...prev]);
                // Play a subtle sound or notification could go here
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white w-full max-w-4xl max-h-[85vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-slate-100"
            >
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                            <MessageSquare size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Collaboration Logs</h2>
                            <p className="text-sm text-slate-500 font-medium">Monitoring realtime dari Supabase</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-200 rounded-xl transition-colors text-slate-400"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full"
                            />
                            <p className="text-slate-500 font-medium animate-pulse">Memuat pesan...</p>
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                <MessageSquare size={40} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800">Belum ada pesan</h3>
                            <p className="text-slate-500">Pesan yang dikirim lewat formulir kontak akan muncul di sini.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {messages.map((msg) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={msg.id}
                                    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group relative"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                        <div className="space-y-3 flex-1">
                                            <div className="flex flex-wrap gap-3">
                                                <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600">
                                                    <User size={14} /> {msg.name}
                                                </div>
                                                <div className="flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full text-xs font-bold text-primary">
                                                    <Mail size={14} /> {msg.email}
                                                </div>
                                                <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-400">
                                                    <Calendar size={14} /> {new Date(msg.created_at).toLocaleString('id-ID')}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800 mb-1">{msg.subject}</h4>
                                                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* New Badge for recent messages */}
                                    {new Date(msg.created_at) > new Date(Date.now() - 60000) && (
                                        <div className="absolute top-4 right-4 bg-emerald-500 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter animate-bounce">
                                            NEW
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Status */}
                <div className="px-6 py-4 bg-white border-t border-slate-100 flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live: Listening for new messages</p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminDashboard;
