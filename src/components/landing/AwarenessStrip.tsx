import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

export default function AwarenessStrip() {
  const messages = [
    {
      icon: CheckCircle,
      text: 'Ensure your bank account is DBT-Enabled for seamless scholarship transfer.',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      icon: Info,
      text: 'Link your Aadhaar to receive scholarships on time. Visit your nearest Common Service Center.',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      icon: AlertCircle,
      text: 'Join awareness drives at your local Gram Panchayat to learn about DBT benefits.',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
    {
      icon: CheckCircle,
      text: 'Verify your DBT status online before applying for any scholarship scheme.',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [messages.length]);

  const current = messages[currentIndex];
  const Icon = current.icon;

  return (
    <section className="bg-[#FF9933] dark:bg-orange-800 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl text-center text-white mb-6">DBT Awareness Messages</h2>
        
        <div className={`${current.bg} dark:bg-gray-700 rounded-lg p-6 transition-all duration-500`}>
          <div className="flex items-start gap-4">
            <div className={`${current.color} dark:text-white mt-1`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className={`${current.color} dark:text-white text-lg`}>{current.text}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {messages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white w-8' : 'bg-white/50'
              }`}
              aria-label={`Go to message ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}