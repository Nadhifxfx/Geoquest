import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import { Music, Volume2, Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  const [musicEnabled, setMusicEnabled] = useState(() => {
    const saved = localStorage.getItem('musicEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [sfxEnabled, setSfxEnabled] = useState(() => {
    const saved = localStorage.getItem('sfxEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('musicEnabled', JSON.stringify(musicEnabled));
  }, [musicEnabled]);

  useEffect(() => {
    localStorage.setItem('sfxEnabled', JSON.stringify(sfxEnabled));
  }, [sfxEnabled]);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('settingsChanged'));
  }, [musicEnabled, sfxEnabled]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 p-6">
      <BackButton to="/" />

      <div className="max-w-md mx-auto pt-20 space-y-6 animate-fadeIn">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
              <SettingsIcon size={48} className="text-cyan-300" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white">Pengaturan</h1>
        </div>

        <div className="space-y-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Music className="text-cyan-300" size={28} />
                <div>
                  <h3 className="text-white font-semibold text-lg">Musik Latar</h3>
                  <p className="text-slate-300 text-sm">Background music</p>
                </div>
              </div>
              <button
                onClick={() => setMusicEnabled(!musicEnabled)}
                className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                  musicEnabled ? 'bg-cyan-500' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                    musicEnabled ? 'translate-x-8' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Volume2 className="text-cyan-300" size={28} />
                <div>
                  <h3 className="text-white font-semibold text-lg">Efek Suara</h3>
                  <p className="text-slate-300 text-sm">Sound effects</p>
                </div>
              </div>
              <button
                onClick={() => setSfxEnabled(!sfxEnabled)}
                className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                  sfxEnabled ? 'bg-cyan-500' : 'bg-slate-600'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                    sfxEnabled ? 'translate-x-8' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-cyan-500/20 backdrop-blur-md rounded-xl p-4 border border-cyan-400/30">
          <p className="text-cyan-100 text-sm text-center">
            💡 Pengaturan akan tersimpan secara otomatis
          </p>
        </div>
      </div>
    </div>
  );
}
