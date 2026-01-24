import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [clientId, setClientId] = useState('');
    const [isAdminOnline, setIsAdminOnline] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        // Generate or get unique client ID
        let id = localStorage.getItem('chat_client_id');
        if (!id) {
            id = 'client_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('chat_client_id', id);
        }
        setClientId(id);

        // Fetch initial messages for this client
        const fetchChat = async () => {
            const { data } = await supabase
                .from('chats')
                .select('*')
                .eq('sender_id', id)
                .order('created_at', { ascending: true });

            if (data) setMessages(data);
        };

        fetchChat();

        // Subscribe to real-time chat updates
        const chatChannel = supabase
            .channel('chat_room')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'chats'
            }, (payload) => {
                if (payload.new.sender_id === id) {
                    setMessages(prev => [...prev, payload.new]);
                    if (payload.new.is_admin && document.hidden) {
                        showNotification("Pesan Baru dari Admin", payload.new.message);
                    }
                }
            })
            .subscribe();

        // Subscribe to Admin Presence
        const adminChannel = supabase.channel('admin_room');
        adminChannel
            .on('presence', { event: 'sync' }, () => {
                const state = adminChannel.presenceState();
                setIsAdminOnline(state.admin !== undefined);
            })
            .subscribe();

        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }

        return () => {
            supabase.removeChannel(chatChannel);
            supabase.removeChannel(adminChannel);
        };
    }, []);

    const showNotification = (title, body) => {
        if (Notification.permission === 'granted') {
            new Notification(title, { body, icon: '/archlinux-logo.svg' });
        }
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const msg = {
            sender_id: clientId,
            message: newMessage,
            is_admin: false
        };

        const { error } = await supabase.from('chats').insert([msg]);
        if (!error) {
            setNewMessage('');
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[60]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="bg-white w-[350px] sm:w-[400px] h-[500px] rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden mb-4"
                    >
                        {/* Header */}
                        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                        <User size={20} className="text-primary" />
                                    </div>
                                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-900 ${isAdminOnline ? 'bg-emerald-500' : 'bg-slate-400'}`}></div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">Favian Muhammad</h4>
                                    <p className="text-[10px] uppercase font-black text-white/50 tracking-widest leading-none">
                                        {isAdminOnline ? 'Online' : 'Offline'}
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4">
                            <div className="text-center p-4">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 inline-block px-3 py-1 rounded-full">
                                    {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
                                </p>
                            </div>

                            {messages.length === 0 && (
                                <div className="text-center py-10 px-6">
                                    <p className="text-slate-500 text-sm leading-relaxed">
                                        Halo! Ada yang bisa saya bantu?
                                        {isAdminOnline
                                            ? " Saya sedang online dan siap berdiskusi."
                                            : " Saya sedang offline, tapi tinggalkan pesan saja, InsyaAllah akan segera dibalas."}
                                    </p>
                                </div>
                            )}

                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.is_admin ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm text-sm ${m.is_admin
                                        ? 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                                        : 'bg-primary text-white rounded-tr-none'
                                        }`}>
                                        <p>{m.message}</p>
                                        <p className={`text-[9px] mt-1 font-bold ${m.is_admin ? 'text-slate-400' : 'text-white/60'}`}>
                                            {new Date(m.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 flex gap-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Ketik pesan..."
                                className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary transition-all text-sm"
                            />
                            <button
                                type="submit"
                                disabled={!newMessage.trim()}
                                className="p-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all disabled:opacity-50"
                            >
                                <Send size={20} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Float Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center group relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {isOpen ? <X size={28} className="relative z-10" /> : <MessageCircle size={28} className="relative z-10" />}

                {/* Notification Badge Placeholder */}
                {!isOpen && !isAdminOnline && (
                    <div className="absolute top-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                )}
            </motion.button>
        </div>
    );
};

export default ChatWidget;
