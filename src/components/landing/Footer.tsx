import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#001633] dark:bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* About Section */}
          <div>
            <h3 className="mb-4 font-bold text-lg">About Portal</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              The DBT Awareness & Verification Portal is an initiative under Smart India Hackathon to ensure transparency in Direct Benefit Transfer for students across India.
            </p>
          </div>

          {/* Quick Links (FIXED: Now clickable) */}
          <div>
            <h3 className="mb-4 font-bold text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
            
              <li>
                <button 
                  onClick={() => onNavigate('helpdesk')} 
                  className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors text-left"
                >
                  FAQs & Helpdesk <ExternalLink className="w-3 h-3" />
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('guidelines')} 
                  className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors text-left"
                >
                  Guidelines <ExternalLink className="w-3 h-3" />
                </button>
              </li>
              <li>
                {/* User Manual stays as a PDF download link */}
                <a 
                  href="/resources/student-downloads/USERMANUAL.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  User Manual <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Related Portals (External Links) */}
          <div>
            <h3 className="mb-4 font-bold text-lg">Related Portals</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://pfms.nic.in/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white flex items-center gap-1">
                  PFMS Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://scholarships.gov.in/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white flex items-center gap-1">
                  NSP Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://uidai.gov.in/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white flex items-center gap-1">
                  UIDAI Aadhaar <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.meity.gov.in/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white flex items-center gap-1">
                  MeitY Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://www.digitalindia.gov.in/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white flex items-center gap-1">
                  Digital India <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-bold text-lg">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-400">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-300">Helpline (Toll Free)</div>
                  <div className="text-white">1800-11-8004</div>
                </div>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-300">Email Support</div>
                  <div className="text-white">support@dbtportal.gov.in</div>
                </div>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  Ministry of Electronics & IT
                  <br />
                  New Delhi - 110003
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            © 2025 Government of India. All rights reserved. | Designed under Smart India Hackathon Initiative
          </div>
          <div className="flex gap-4 text-sm text-gray-400">
            <button className="hover:text-white">Privacy Policy</button>
            <span>|</span>
            <button className="hover:text-white">Terms of Use</button>
            <span>|</span>
            <button className="hover:text-white">Sitemap</button>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          Last Updated: November 13, 2025 | Version 2.0.1 | Best viewed in Chrome, Firefox, Safari
        </div>
      </div>
    </footer>
  );
}
