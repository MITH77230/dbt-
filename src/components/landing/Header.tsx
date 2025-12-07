import { Globe, Phone, Mail, HelpCircle, Sun, Moon } from 'lucide-react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useLanguage, languages, Language } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  onNavigate?: (page: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-[#002147] dark:bg-gray-800 text-white">
      {/* Top Strip */}
      <div className="bg-[#001633] dark:bg-gray-900 py-1 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Phone className="w-3 h-3" />
            <span className="text-xs">{t('header.helpline')}</span>
            <Mail className="w-3 h-3" />
            <span className="text-xs">support@dbtportal.gov.in</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-3 h-3" />
              ) : (
                <Sun className="w-3 h-3" />
              )}
              <span className="text-xs">{theme === 'light' ? 'Dark' : 'Light'}</span>
            </button>
            
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3" />
              <Select value={language} onValueChange={(val) => setLanguage(val as Language)}>
                <SelectTrigger className="bg-transparent border-none h-auto py-0 text-xs text-white focus:ring-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                  {Object.entries(languages).map(([code, name]) => (
                    <SelectItem key={code} value={code} className="dark:text-white dark:focus:bg-gray-700">
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Left: Government Logo */}
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="45" fill="#FF9933" />
                  <circle cx="50" cy="50" r="30" fill="#fff" />
                  <circle cx="50" cy="50" r="15" fill="#138808" />
                  <circle cx="50" cy="50" r="5" fill="#000080" />
                  {[...Array(24)].map((_, i) => (
                    <line
                      key={i}
                      x1="50"
                      y1="50"
                      x2={50 + 30 * Math.cos((i * 15 * Math.PI) / 180)}
                      y2={50 + 30 * Math.sin((i * 15 * Math.PI) / 180)}
                      stroke="#000080"
                      strokeWidth="0.5"
                    />
                  ))}
                </svg>
              </div>
            </div>
            <div>
              <div className="text-sm opacity-90">{t('header.govIndia')}</div>
              <div className="text-xl">{t('header.title')}</div>
              <div className="text-xs opacity-75">{t('header.ministry')}</div>
            </div>
          </div>

          {/* Right: Digital India Logo */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-lg">{t('header.digitalIndia')}</div>
              <div className="text-xs opacity-75">{t('header.powerToEmpower')}</div>
            </div>
            <div className="bg-white p-2 rounded">
              <div className="w-12 h-12 flex items-center justify-center text-[#002147]">
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
                  <rect x="20" y="30" width="15" height="50" />
                  <rect x="42" y="20" width="15" height="60" />
                  <rect x="65" y="35" width="15" height="45" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-[#003366] dark:bg-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10 rounded-none border-b-2 border-transparent hover:border-white"
              onClick={() => onNavigate?.('home')}
            >
              {t('nav.home')}
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10 rounded-none"
              onClick={() => onNavigate?.('about')}
            >
              {t('nav.aboutDBT')}
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10 rounded-none"
              onClick={() => onNavigate?.('guidelines')}
            >
              {t('nav.guidelines')}
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10 rounded-none"
              onClick={() => onNavigate?.('contact')}
            >
              {t('nav.contact')}
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10 rounded-none flex items-center gap-1"
              onClick={() => onNavigate?.('helpdesk')}
            >
              <HelpCircle className="w-4 h-4" />
              {t('nav.helpdesk')}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
