import { Terminal } from 'lucide-react';

const Logo = () => {
    return (
        <div className="flex items-center gap-2 group">
            {/* 
                TIPS UNTUK USER:
                Jika kamu ingin mengganti ikon dengan logo gambar:
                1. Masukkan file logo kamu ke folder /public/
                2. Ganti <Terminal /> di bawah dengan <img src="/logo_kamu.png" className="w-8 h-8" alt="Logo" />
            */}
            <div className="p-2 bg-primary rounded-xl text-white group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                <Terminal size={24} />
            </div>

            <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
                Fav<span className="text-primary italic">124</span>
            </span>
        </div>
    );
};

export default Logo;
