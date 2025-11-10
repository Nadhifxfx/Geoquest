import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { Globe } from 'lucide-react';

const continents = [
  { name: 'Asia', emoji: '🏯', color: 'from-red-500 to-orange-500' },
  { name: 'Afrika', emoji: '🦁', color: 'from-yellow-500 to-amber-600' },
  { name: 'Eropa', emoji: '🏰', color: 'from-blue-500 to-indigo-600' },
  { name: 'Amerika', emoji: '🗽', color: 'from-green-500 to-emerald-600' },
  { name: 'Oseania', emoji: '🦘', color: 'from-teal-500 to-cyan-600' },
];

export default function Continent() {
  const navigate = useNavigate();

  const handleContinentSelect = (continent: string) => {
    navigate(`/category/${continent}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 p-6">
      <BackButton to="/" />

      <div className="max-w-4xl mx-auto pt-20 space-y-8 animate-fadeIn">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
              <Globe size={48} className="text-cyan-300" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Pilih Benua</h1>
          <p className="text-cyan-200">Mulai petualangan Anda di benua mana?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {continents.map((continent) => (
            <button
              key={continent.name}
              onClick={() => handleContinentSelect(continent.name)}
              className={`bg-gradient-to-br ${continent.color} p-8 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20`}
            >
              <div className="text-center space-y-3">
                <div className="text-6xl">{continent.emoji}</div>
                <h2 className="text-3xl font-bold text-white">{continent.name}</h2>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
