import { Mail, Phone, MapPin, ExternalLink, FileText } from 'lucide-react';

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

          {/* Quick Links (Internal) */}
          <div>
            <h3 className="mb-4 font-bold text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  About DBT
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('helpdesk')} 
                  className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  FAQs & Helpdesk
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('guidelines')} 
                  className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  Guidelines
                </button>
              </li>
              <li>
                {/* Links to the PDF in your public folder */}
                <a 
                  href="/resources/student-downloads/USERMANUAL.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  User Manual <FileText className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Related Portals (External Real Links) */}
          <div>
            <h3 className="mb-4 font-bold text-lg">Related Portals</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://pfms.nic.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  PFMS Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://scholarships.gov.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  National Scholarship Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://uidai.gov.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  UIDAI (Aadhaar) <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.meity.gov.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  MeitY Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.digitalindia.gov.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                >
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
                  <a href="tel:1800118004" className="text-white hover:underline">1800-11-8004</a>
                </div>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-300">Email Support</div>
                  <a href="mailto:support@dbtportal.gov.in" className="text-white hover:underline">support@dbtportal.gov.in</a>
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
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          Last Updated: November 13, 2025 | Version 2.0.1 | Best viewed in Chrome, Firefox, Safari
        </div>
      </div>
    </footer>
  );
}
