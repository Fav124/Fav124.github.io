import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, MessageCircle, ArrowLeft, Bell, BellOff } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [clientId, setClientId] = useState('');
    const [isAdminOnline, setIsAdminOnline] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        let id = localStorage.getItem('chat_client_id');
        if (!id) {
            id = 'client_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('chat_client_id', id);
        }
        setClientId(id);

        const fetchChat = async () => {
            const { data } = await supabase
                .from('chats')
                .select('*')
                .eq('sender_id', id)
                .order('created_at', { ascending: true });
            if (data) setMessages(data);
        };
        fetchChat();

        const chatChannel = supabase.channel('chat_room');
        chatChannel
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chats' }, (payload) => {
                if (payload.new.sender_id === id) {
                    setMessages(prev => [...prev, payload.new]);
                    if (payload.new.is_admin && document.hidden) {
                        showNotification("Pesan Baru dari Admin", payload.new.message);
                    }
                }
            })
            .subscribe();

        const adminChannel = supabase.channel('admin_room');
        adminChannel
            .on('presence', { event: 'sync' }, () => {
                const state = adminChannel.presenceState();
                setIsAdminOnline(state.admin !== undefined);
            })
            .subscribe();

        if (Notification.permission === 'granted') setNotificationsEnabled(true);

        return () => {
            supabase.removeChannel(chatChannel);
            supabase.removeChannel(adminChannel);
        };
    }, []);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages]);

    const showNotification = (title, body) => {
        if (Notification.permission === 'granted') {
            new Notification(title, { body, icon: '/archlinux-logo.svg' });
        }
    };

    const requestPermission = () => {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') setNotificationsEnabled(true);
        });
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        const { error } = await supabase.from('chats').insert([{ sender_id: clientId, message: newMessage, is_admin: false }]);
        if (!error) setNewMessage('');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-1 pt-24 pb-12 flex items-center justify-center p-4">
                <div className="w-full max-w-5xl h-[80vh] bg-white rounded-[3rem] shadow-2xl border border-slate-100 flex overflow-hidden">
                    {/* Info Sidebar */}
                    <div className="hidden lg:flex w-80 bg-slate-900 text-white p-10 flex-col">
                        <div className="flex-1">
                            <div className="mb-10">
                                <Link to="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-all font-bold text-sm group">
                                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Kembali
                                </Link>
                            </div>
                            <h2 className="text-3xl font-black mb-4">Direct Chat</h2>
                            <p className="text-white/50 text-sm leading-relaxed mb-8">
                                Hubungi saya secara langsung untuk diskusi proyek atau kolaborasi. Pesan kamu aman dan terenkripsi.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 text-sm font-bold">
                                    <div className={`w-3 h-3 rounded-full ${isAdminOnline ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-500'}`}></div>
                                    {isAdminOnline ? 'Admin Online' : 'Admin Offline'}
                                </div>
                                <button
                                    onClick={requestPermission}
                                    className={`w-full flex items-center gap-3 p-4 rounded-2xl border text-xs font-black uppercase tracking-widest transition-all ${notificationsEnabled ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-white/5 border-white/5 text-white/40 hover:bg-white/10'
                                        }`}
                                >
                                    {notificationsEnabled ? <Bell size={16} /> : <BellOff size={16} />}
                                    {notificationsEnabled ? 'Notifikasi Aktif' : 'Aktifkan Notifikasi'}
                                </button>
                            </div>
                        </div>
                        <div className="pt-8 border-t border-white/5 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                            Powered by Supabase Realtime
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 flex flex-col relative">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                                    <MessageCircle size={24} />
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-900">Workspace Chat</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        {isAdminOnline ? 'Favian is typing...' : 'Leave a message'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 bg-slate-50/50 space-y-6">
                            {messages.length === 0 && (
                                <div className="text-center py-20 opacity-50 flex flex-col items-center">
                                    <MessageCircle size={48} className="text-slate-300 mb-4" />
                                    <p className="text-slate-500 font-bold max-w-xs">Belum ada obrolan. Mulailah dengan menyapa!</p>
                                </div>
                            )}
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.is_admin ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`max-w-[70%] p-5 rounded-3xl shadow-lg shadow-slate-200/50 text-sm leading-relaxed ${m.is_admin
                                            ? 'bg-white text-slate-800 border border-slate-100 rounded-tl-none font-medium'
                                            : 'bg-primary text-white rounded-tr-none font-bold'
                                        }`}>
                                        <p>{m.message}</p>
                                        <span className={`text-[9px] mt-2 block font-black uppercase tracking-widest opacity-50`}>
                                            {new Date(m.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-slate-100 flex gap-4">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="flex-1 px-6 py-4 bg-slate-100 border border-slate-200 rounded-2xl focus:outline-none focus:border-primary transition-all font-bold text-slate-700"
                                placeholder="Tulis sesuatu..."
                            />
                            <button type="submit" disabled={!newMessage.trim()} className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-primary transition-all shadow-xl shadow-slate-200 disabled:opacity-50">
                                <Send size={24} />
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ChatPage;
