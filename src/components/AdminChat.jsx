import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Send, User, Search, Hash, Clock, Circle } from 'lucide-react';

const AdminChat = () => {
    const [chats, setChats] = useState([]);
    const [activeClientId, setActiveClientId] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const scrollRef = useRef(null);

    // Group chats by clientId
    const clients = Array.from(new Set(chats.map(c => c.sender_id))).map(id => {
        const lastMsg = [...chats].reverse().find(c => c.sender_id === id);
        return {
            id,
            lastMessage: lastMsg?.message,
            time: lastMsg?.created_at,
            name: id.replace('client_', 'User ')
        };
    }).sort((a, b) => new Date(b.time) - new Date(a.time));

    const activeMessages = chats.filter(c => c.sender_id === activeClientId);

    useEffect(() => {
        const fetchAllChats = async () => {
            const { data } = await supabase
                .from('chats')
                .select('*')
                .order('created_at', { ascending: true });

            if (data) setChats(data);
        };

        fetchAllChats();

        const channel = supabase
            .channel('admin_chat_room')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'chats'
            }, (payload) => {
                setChats(prev => [...prev, payload.new]);
                if (!payload.new.is_admin && document.hidden) {
                    showNotification("Pesan Baru dari Client", payload.new.message);
                }
            })
            .subscribe();

        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }

        return () => supabase.removeChannel(channel);
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
    }, [activeClientId, chats]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !activeClientId) return;

        const msg = {
            sender_id: activeClientId,
            message: newMessage,
            is_admin: true
        };

        const { error } = await supabase.from('chats').insert([msg]);
        if (!error) setNewMessage('');
    };

    return (
        <div className="flex h-[600px] bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm">
            {/* User List */}
            <div className="w-1/3 border-r border-slate-100 flex flex-col">
                <div className="p-6 border-b border-slate-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Cari user..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                    {clients.map(client => (
                        <button
                            key={client.id}
                            onClick={() => setActiveClientId(client.id)}
                            className={`w-full p-4 rounded-2xl flex items-center gap-3 transition-all mb-1 ${activeClientId === client.id
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'hover:bg-slate-50 text-slate-600'
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${activeClientId === client.id ? 'bg-white/20' : 'bg-slate-100'}`}>
                                {client.name.charAt(0)}
                            </div>
                            <div className="text-left flex-1 min-w-0">
                                <h5 className="font-bold text-sm truncate">{client.name}</h5>
                                <p className={`text-[10px] truncate ${activeClientId === client.id ? 'text-white/70' : 'text-slate-400'}`}>
                                    {client.lastMessage}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-slate-50/30">
                {activeClientId ? (
                    <>
                        <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <User className="text-primary" size={20} />
                                <h4 className="font-bold text-slate-900">{activeClientId.replace('client_', 'Client ')}</h4>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                <Clock size={12} /> Live Support
                            </div>
                        </div>

                        <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-4">
                            {activeMessages.map((m, i) => (
                                <div key={i} className={`flex ${m.is_admin ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[70%] p-4 rounded-2xl text-sm ${m.is_admin
                                        ? 'bg-primary text-white rounded-tr-none shadow-lg shadow-primary/10'
                                        : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                                        }`}>
                                        <p>{m.message}</p>
                                        <p className={`text-[9px] mt-1 font-bold ${m.is_admin ? 'text-white/60' : 'text-slate-400'}`}>
                                            {new Date(m.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary transition-all text-sm"
                                placeholder="Tulis balasan..."
                            />
                            <button className="p-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                                <Send size={20} />
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-12 text-center">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <Hash size={40} />
                        </div>
                        <h4 className="text-lg font-bold text-slate-800 mb-2">Pilih Chat</h4>
                        <p className="max-w-xs text-sm">Klik salah satu user di sebelah kiri untuk mulai mengobrol secara realtime.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminChat;
