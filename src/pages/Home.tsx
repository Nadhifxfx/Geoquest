import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Info, Settings, X, Globe } from 'lucide-react';
import MenuButton from '../components/MenuButton';

export default function Home() {
  const navigate = useNavigate();
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const handleExit = () => {
    window.close();
    if (!window.closed) {
      alert('Terima kasih telah bermain World Explorer Quiz!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 animate-fadeIn">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-white/10 rounded-full backdrop-blur-sm shadow-2xl">
              <Globe size={64} className="text-cyan-300" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            GEOQUEST
          </h1>
          <p className="text-cyan-200 text-lg font-medium">
            Discover the Globe
          </p>
        </div>

        <div className="space-y-4">
          <MenuButton onClick={() => navigate('/continent')} icon={<Play />}>
            Main
          </MenuButton>
          <MenuButton onClick={() => navigate('/about')} icon={<Info />} variant="secondary">
            Tentang
          </MenuButton>
          <MenuButton onClick={() => navigate('/settings')} icon={<Settings />} variant="secondary">
            Pengaturan
          </MenuButton>
          <MenuButton onClick={() => setShowExitConfirm(true)} icon={<X />} variant="danger">
            Keluar Game
          </MenuButton>
        </div>
      </div>

      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">Konfirmasi Keluar</h2>
            <p className="text-slate-300 mb-6">Apakah Anda yakin ingin keluar dari game?</p>
            <div className="flex gap-4">
              <button
                onClick={handleExit}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
              >
                Ya, Keluar
              </button>
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
