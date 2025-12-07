import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#001633] dark:bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="mb-4">About Portal</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              The DBT Awareness & Verification Portal is an initiative under Smart India Hackathon to ensure transparency in Direct Benefit Transfer for students across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white flex items-center gap-1">
                  About DBT <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white flex items-center gap-1">
                  FAQs <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white flex items-center gap-1">
                  Guidelines <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white flex items-center gap-1">
                  User Manual <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Related Portals */}
          <div>
            <h3 className="mb-4">Related Portals</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-white flex items-center gap-1">
                  PFMS Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white flex items-center gap-1">
                  NSP Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white flex items-center gap-1">
                  UIDAI Aadhaar <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white flex items-center gap-1">
                  MeitY Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white flex items-center gap-1">
                  Digital India <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-gray-400">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div>Helpline (Toll Free)</div>
                  <div className="text-white">1800-11-8004</div>
                </div>
              </li>
              <li className="flex items-start gap-2 text-gray-400">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div>Email Support</div>
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
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white">Terms of Use</a>
            <span>|</span>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          Last Updated: November 13, 2025 | Version 2.0.1 | Best viewed in Chrome, Firefox, Safari
        </div>
      </div>
    </footer>
  );
}