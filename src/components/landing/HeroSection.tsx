import { Button } from '../ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-[#002147] to-[#003366] dark:from-gray-800 dark:to-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1623863568368-69e4cbe6cc0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzdHVkZW50cyUyMHN0dWR5aW5nJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjMwNTQ5OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Students"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-block bg-[#FF9933] text-white px-3 py-1 rounded-full text-sm mb-4">
              Smart India Initiative
            </div>
            <h1 className="text-4xl md:text-5xl mb-4">
              Empowering Students through
              <span className="block text-[#FF9933] mt-2">Direct Benefit Transparency</span>
            </h1>
            <p className="text-lg opacity-90 mb-6">
              Ensuring every scholarship reaches the right student, at the right time. Join the DBT awareness movement and verify your eligibility today.
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#138808]" />
                <span>Real-time DBT Status Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#138808]" />
                <span>Multilingual Awareness Resources</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#138808]" />
                <span>Village-level Support & Training</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="bg-[#FF9933] hover:bg-[#e68a2e] text-white">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#002147]">
                Learn More
              </Button>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl mb-4">Quick Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded">
                  <div className="text-3xl">2.5M+</div>
                  <div className="text-sm opacity-75">Students Verified</div>
                </div>
                <div className="bg-white/10 p-4 rounded">
                  <div className="text-3xl">5,200+</div>
                  <div className="text-sm opacity-75">Institutions</div>
                </div>
                <div className="bg-white/10 p-4 rounded">
                  <div className="text-3xl">12,000+</div>
                  <div className="text-sm opacity-75">Gram Panchayats</div>
                </div>
                <div className="bg-white/10 p-4 rounded">
                  <div className="text-3xl">95%</div>
                  <div className="text-sm opacity-75">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}