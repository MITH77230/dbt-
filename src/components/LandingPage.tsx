import HeroSection from './landing/HeroSection';
import LoginCards from './landing/LoginCards';
import AwarenessStrip from './landing/AwarenessStrip';
import Footer from './landing/Footer';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <HeroSection />
      <LoginCards onNavigate={onNavigate} />
      <AwarenessStrip />
    </div>
  );
}