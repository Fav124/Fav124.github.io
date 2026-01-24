import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Briefcase,
    FolderKanban,
    Settings,
    LogOut,
    Plus,
    Trash2,
    Edit3,
    CheckCircle,
    MessageCircle,
    Download,
    Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminChat from '../components/AdminChat';
import Logo from '../components/Logo';

const AdminCMS = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('overview');
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate('/login');
            } else {
                setUser(user);
                fetchProjects();
            }
            setLoading(false);
        };

        checkUser();
    }, [navigate]);

    const fetchProjects = async () => {
        const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (data) setProjects(data);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    if (loading) return <div className="h-screen w-full flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-primary" size={40} /></div>;

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-slate-200 flex flex-col p-6 sticky top-0 h-screen">
                <div className="mb-12 px-2">
                    <Logo />
                </div>

                <nav className="flex-1 space-y-2">
                    {[
                        { id: 'overview', name: 'Overview', icon: LayoutDashboard },
                        { id: 'projects', name: 'Projects', icon: FolderKanban },
                        { id: 'chat', name: 'Live Support', icon: MessageCircle },
                        { id: 'resume', name: 'Resume Build', icon: Briefcase },
                        { id: 'settings', name: 'Branding', icon: Settings },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold transition-all ${activeSection === item.id
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <item.icon size={20} />
                            {item.name}
                        </button>
                    ))}
                </nav>

                <div className="pt-6 border-t border-slate-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all"
                    >
                        <LogOut size={20} /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-12 overflow-y-auto">
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight capitalize">{activeSection}</h1>
                        <p className="text-slate-500 font-medium mt-1 uppercase text-xs tracking-[0.2em]">Management System</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs font-black">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            Connected: {user?.email}
                        </div>
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {activeSection === 'overview' && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
                                    <h4 className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-4">Total Projects</h4>
                                    <p className="text-5xl font-black text-slate-900">{projects.length}</p>
                                </div>
                                <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
                                    <h4 className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-4">Active Chats</h4>
                                    <p className="text-5xl font-black text-primary">Live</p>
                                </div>
                                <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-xl shadow-slate-200">
                                    <h4 className="text-white/40 font-black text-[10px] uppercase tracking-widest mb-4">Platform Version</h4>
                                    <p className="text-4xl font-black">v2.0 Overhaul</p>
                                </div>
                            </div>
                        )}

                        {activeSection === 'projects' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold text-slate-900">Project List</h3>
                                    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                                        <Plus size={20} /> Add New Project
                                    </button>
                                </div>
                                <div className="grid gap-4">
                                    {projects.length === 0 ? (
                                        <div className="p-12 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200 text-slate-400">
                                            No projects found. Add your first one to get started!
                                        </div>
                                    ) : (
                                        projects.map(p => (
                                            <div key={p.id} className="p-6 bg-white rounded-3xl border border-slate-100 flex items-center justify-between group hover:border-primary/20 transition-all">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-16 h-16 bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center text-slate-300 font-black">
                                                        {p.image_url ? <img src={p.image_url} className="object-cover w-full h-full" /> : 'IMG'}
                                                    </div>
                                                    <div>
                                                        <h5 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{p.title}</h5>
                                                        <p className="text-xs text-slate-400 font-medium">{p.tech_stack?.join(', ')}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button className="p-3 hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all rounded-xl"><Edit3 size={18} /></button>
                                                    <button className="p-3 hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all rounded-xl"><Trash2 size={18} /></button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}

                        {activeSection === 'chat' && (
                            <div className="h-[70vh]">
                                <AdminChat />
                            </div>
                        )}

                        {(activeSection === 'resume' || activeSection === 'settings') && (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-300">
                                    <Plus size={40} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-2">Editor Feature Coming Soon</h3>
                                <p className="text-slate-500 max-w-sm">Use the project management and chat systems while we finalize the full site builder.</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default AdminCMS;
