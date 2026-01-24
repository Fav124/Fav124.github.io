import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { MessageSquare, User, Mail, Calendar, X, LayoutDashboard, MessageCircle } from 'lucide-react';
import AdminChat from './AdminChat';

const AdminDashboard = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('logs'); // 'logs' or 'chat'

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

        // Realtime subscription & Presence
        const channel = supabase.channel('admin_room', {
            config: {
                presence: {
                    key: 'admin',
                },
            },
        });

        channel
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages'
            }, (payload) => {
                setMessages(prev => [payload.new, ...prev]);
            })
            .on('presence', { event: 'sync' }, () => {
                console.log('Presence synced');
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    await channel.track({ online_at: new Date().toISOString(), user: 'admin' });
                }
            });

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
                <div className="px-6 pt-6 bg-slate-50/50">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                                <LayoutDashboard size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">Admin Control Panel</h2>
                                <p className="text-sm text-slate-500 font-medium tracking-tight">Manage your platform in real-time</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-200 rounded-xl transition-colors text-slate-400"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 border-b border-slate-100">
                        <button
                            onClick={() => setActiveTab('logs')}
                            className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === 'logs' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                        >
                            <span className="flex items-center gap-2 italic">
                                <MessageSquare size={16} /> Log Kolaborasi
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('chat')}
                            className={`px-6 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === 'chat' ? 'border-primary text-primary' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                        >
                            <span className="flex items-center gap-2 italic">
                                <MessageCircle size={16} /> Live Support
                            </span>
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-hidden flex flex-col">
                    {activeTab === 'chat' ? (
                        <div className="p-6 h-full">
                            <AdminChat />
                        </div>
                    ) : (
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30 scroll-smooth">

                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-4">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full"
                                    />
                                    <p className="text-slate-500 font-medium animate-pulse text-sm uppercase tracking-widest">Sinkronisasi Database...</p>
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="text-center py-20">
                                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                        <MessageSquare size={40} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800">Log Kosong</h3>
                                    <p className="text-slate-400 text-sm">Belum ada permintaan kolaborasi yang masuk.</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {messages.map((msg, i) => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            key={msg.id}
                                            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:border-primary/20 transition-all flex flex-col gap-3 group relative"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                                        {msg.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-bold text-slate-900">{msg.name}</h4>
                                                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{msg.email}</p>
                                                    </div>
                                                </div>
                                                <div className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                                                    {new Date(msg.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>

                                            <div className="pl-[52px]">
                                                <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none border border-slate-100/50">
                                                    <p className="text-[10px] font-black text-primary uppercase mb-1">{msg.subject}</p>
                                                    <p className="text-sm text-slate-600 leading-relaxed">{msg.message}</p>
                                                </div>
                                            </div>

                                            {/* Realtime "New" Ping */}
                                            {new Date(msg.created_at) > new Date(Date.now() - 30000) && (
                                                <div className="absolute top-2 right-2 flex gap-1 items-center">
                                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                                                    <span className="text-[8px] font-black text-emerald-600 uppercase tracking-tighter">Live</span>
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            )}
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
