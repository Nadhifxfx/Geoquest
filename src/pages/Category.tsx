import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { Landmark, Flag, Map, Building } from 'lucide-react';

const categories = [
  { name: 'Landmark', icon: Landmark, color: 'from-purple-500 to-pink-500', description: 'Monumen & Tempat Terkenal' },
  { name: 'Bendera', icon: Flag, color: 'from-blue-500 to-cyan-500', description: 'Bendera Negara' },
  { name: 'Negara', icon: Map, color: 'from-green-500 to-teal-500', description: 'Fakta Negara' },
  { name: 'Kota', icon: Building, color: 'from-orange-500 to-red-500', description: 'Ibukota & Kota Besar' },
];

export default function Category() {
  const navigate = useNavigate();
  const { continent } = useParams<{ continent: string }>();

  const handleCategorySelect = (category: string) => {
    navigate(`/quiz/${continent}/${category}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 p-6">
      <BackButton />

      <div className="max-w-4xl mx-auto pt-20 space-y-8 animate-fadeIn">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Pilih Kategori</h1>
          <p className="text-cyan-200 text-xl">{continent}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => handleCategorySelect(category.name)}
                className={`bg-gradient-to-br ${category.color} p-8 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20`}
              >
                <div className="space-y-4">
                  <IconComponent size={48} className="text-white mx-auto" />
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-1">{category.name}</h2>
                    <p className="text-white/80 text-sm">{category.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
