import BackButton from '../components/BackButton';
import { Globe, BookOpen, Trophy, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 p-6">
      <BackButton to="/" />

      <div className="max-w-2xl mx-auto pt-20 space-y-6 animate-fadeIn">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
              <Globe size={48} className="text-cyan-300" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Tentang Game</h1>
          <p className="text-cyan-200">World Explorer Quiz: Discover the Globe</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex items-start gap-4 mb-4">
            <BookOpen className="text-cyan-300 flex-shrink-0" size={24} />
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Apa itu World Explorer Quiz?</h2>
              <p className="text-slate-200 leading-relaxed">
                World Explorer Quiz adalah game kuis interaktif yang mengajak Anda menjelajahi pengetahuan tentang benua-benua di dunia. Uji wawasan Anda tentang landmark terkenal, bendera negara, nama negara, dan kota-kota penting dari seluruh penjuru dunia!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex items-start gap-4 mb-4">
            <Trophy className="text-cyan-300 flex-shrink-0" size={24} />
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Cara Bermain</h2>
              <ul className="text-slate-200 space-y-2 leading-relaxed">
                <li>• Pilih benua yang ingin Anda eksplorasi</li>
                <li>• Pilih kategori kuis (Landmark, Bendera, Negara, atau Kota)</li>
                <li>• Jawab 10 pertanyaan pilihan ganda</li>
                <li>• Dapatkan skor tertinggi dan tantang diri Anda!</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex items-start gap-4">
            <Users className="text-cyan-300 flex-shrink-0" size={24} />
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Tujuan Game</h2>
              <p className="text-slate-200 leading-relaxed">
                Game ini dirancang untuk meningkatkan pengetahuan geografis dan budaya dunia dengan cara yang menyenangkan dan interaktif. Cocok untuk semua usia yang ingin belajar sambil bermain!
              </p>
            </div>
          </div>
        </div>

        <div className="text-center text-cyan-200 text-sm mt-8">
          <p>© 2024 World Explorer Quiz. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
