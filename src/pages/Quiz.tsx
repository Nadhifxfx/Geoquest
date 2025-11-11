import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { quizData } from '../data/questions';
import BackButton from '../components/BackButton';
import { Trophy, Home, Clock } from 'lucide-react';

interface Question {
  q: string;
  options: string[];
  answer: string;
}

export default function Quiz() {
  const navigate = useNavigate();
  const { continent, category } = useParams<{ continent: string; category: string }>();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // ⏳ 60 detik total waktu kuis

  useEffect(() => {
    if (continent && category) {
      const continentData = quizData[continent as keyof typeof quizData];
      if (continentData) {
        const categoryQuestions = continentData[category as keyof typeof continentData];
        if (categoryQuestions && Array.isArray(categoryQuestions)) {
          const shuffled = [...categoryQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
          setQuestions(shuffled);
        }
      }
    }
  }, [continent, category]);

  // 🕒 Timer countdown
  useEffect(() => {
    if (quizCompleted || questions.length === 0) return;

    if (timeLeft <= 0) {
      // waktu habis, langsung kembali ke menu utama
      alert("Waktu habis! Silakan coba lagi.");
      navigate('/');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizCompleted, questions, navigate]);

  const playSound = (soundType: 'click' | 'correct' | 'wrong') => {
    const sfxEnabled = localStorage.getItem('sfxEnabled');
    if (sfxEnabled === null || JSON.parse(sfxEnabled)) {
      const audio = new Audio(`/sounds/${soundType}.mp3`);
      audio.play().catch(() => {});
    }
  };

  const handleAnswerClick = (answer: string) => {
    if (isAnswered) return;

    playSound('click');
    setSelectedAnswer(answer);
    setIsAnswered(true);
    setShowResult(true);

    const isCorrect = answer === questions[currentQuestion].answer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      playSound('correct');
    } else {
      playSound('wrong');
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setIsAnswered(false);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = (score / questions.length) * 100;
    let message = '';
    let emoji = '';

    if (percentage === 100) {
      message = 'Sempurna! Anda Master Geografi!';
      emoji = '🏆';
    } else if (percentage >= 80) {
      message = 'Luar Biasa! Pengetahuan Anda Hebat!';
      emoji = '🌟';
    } else if (percentage >= 60) {
      message = 'Bagus! Terus Tingkatkan!';
      emoji = '👍';
    } else if (percentage >= 40) {
      message = 'Cukup Baik! Masih Ada Yang Bisa Dipelajari!';
      emoji = '📚';
    } else {
      message = 'Jangan Menyerah! Coba Lagi!';
      emoji = '💪';
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 flex items-center justify-center p-6">
        <div className="max-w-md w-full space-y-6 animate-fadeIn">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="text-center space-y-6">
              <div className="text-8xl">{emoji}</div>
              <Trophy size={64} className="text-yellow-400 mx-auto" />
              <h1 className="text-4xl font-bold text-white">Kuis Selesai!</h1>
              <div className="bg-white/20 rounded-2xl p-6">
                <p className="text-6xl font-bold text-white mb-2">{score}/{questions.length}</p>
                <p className="text-cyan-200 text-xl">{percentage.toFixed(0)}%</p>
              </div>
              <p className="text-2xl text-cyan-200 font-semibold">{message}</p>
              <div className="space-y-3 pt-4">
                <button
                  onClick={() => navigate('/')}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <Home size={24} />
                  Kembali ke Menu Utama
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Main Lagi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 p-6">
      <BackButton />

      <div className="max-w-3xl mx-auto pt-20 space-y-6 animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
            <span className="text-white font-semibold">
              Pertanyaan {currentQuestion + 1}/{questions.length}
            </span>
          </div>

          {/* ⏰ Timer di kanan atas */}
          <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 flex items-center gap-2">
            <Clock size={20} className="text-cyan-300" />
            <span className="text-white font-semibold">
              {timeLeft}s
            </span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-8 text-center leading-relaxed">
            {question.q}
          </h2>

          <div className="space-y-4">
            {question.options.map((option, index) => {
              let buttonClass =
                'w-full p-4 rounded-xl text-left font-semibold text-lg transition-all duration-300 transform ';

              if (showResult) {
                if (option === question.answer) {
                  buttonClass += 'bg-green-500 text-white scale-105 shadow-lg';
                } else if (option === selectedAnswer) {
                  buttonClass += 'bg-red-500 text-white';
                } else {
                  buttonClass += 'bg-white/5 text-white/50';
                }
              } else {
                buttonClass +=
                  'bg-white/10 hover:bg-white/20 text-white hover:scale-105 active:scale-95';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(option)}
                  disabled={isAnswered}
                  className={buttonClass}
                >
                  <span className="inline-block w-8 h-8 rounded-full bg-white/20 text-center leading-8 mr-3">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full bg-white/10 rounded-full h-3 backdrop-blur-sm overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-500 rounded-full"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
