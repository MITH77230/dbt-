import React, { useEffect } from 'react';
import { Globe } from 'lucide-react';

declare global {
  function googleTranslateElementInit(): void;
}

const GoogleTranslate: React.FC = () => {
  useEffect(() => {
    // Define the initialization function globally
    (window as any).googleTranslateElementInit = () => {
      setTimeout(() => {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,hi,bn,te,mr,ta,gu,kn,ml,or,pa,as,ur',
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        );
      }, 1000); // Delay initialization to ensure element is ready
    };

    // Load the Google Translate script
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);

    // Add custom styles to make it look like the navigation buttons and ensure dropdown visibility
    const style = document.createElement('style');
    style.textContent = `
      #google_translate_element .goog-te-combo {
        background: transparent;
        border: none;
        border-bottom: 2px solid transparent;
        border-radius: 0;
        height: auto;
        padding: 8px 0;
        font-size: 0.875rem;
        color: white;
        outline: none;
        font-family: inherit;
        cursor: pointer;
        transition: all 0.2s ease;
        min-width: 80px;
      }
      #google_translate_element .goog-te-combo:hover {
        background: rgba(255, 255, 255, 0.1);
        border-bottom-color: white;
      }
      #google_translate_element .goog-te-gadget {
        color: white;
        font-size: 0.875rem;
      }
      #google_translate_element .goog-te-gadget-simple {
        background: transparent;
        border: none;
      }
      #google_translate_element .goog-te-menu-value span {
        color: white;
      }
      #google_translate_element .goog-te-menu-value {
        color: white;
      }
      .goog-te-menu-frame {
        border: 1px solid #ccc;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        background: white;
      }
      .goog-te-menu2 {
        background: white;
      }
      .goog-te-menu2-item div, .goog-te-menu2-item-selected div {
        color: #333;
        padding: 8px 12px;
      }
      .goog-te-menu2-item:hover div, .goog-te-menu2-item-selected div {
        background: #f0f0f0;
      }
    `;
    document.head.appendChild(style);

    // Cleanup function to remove the script and style if component unmounts
    return () => {
      const existingScript = document.querySelector('script[src*="translate.google.com"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div id="google_translate_element"></div>
  );
};

export default GoogleTranslate;
