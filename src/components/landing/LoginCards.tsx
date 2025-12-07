import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { GraduationCap, Building2, Home, Shield, ArrowRight, HelpCircle } from 'lucide-react';

interface LoginCardsProps {
  onNavigate: (page: string) => void;
}

export default function LoginCards({ onNavigate }: LoginCardsProps) {
  const cards = [
    {
      id: 'student',
      title: 'Student Login',
      description: 'Access your DBT status, awareness resources, and verification tools',
      icon: GraduationCap,
      gradient: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-100 text-blue-600',
    },
    {
      id: 'institution',
      title: 'Institution Login',
      description: 'Manage student records, conduct verification drives, and track DBT enablement',
      icon: Building2,
      gradient: 'from-purple-500 to-purple-600',
      iconBg: 'bg-purple-100 text-purple-600',
    },
    {
      id: 'panchayat',
      title: 'Gram Panchayat Login',
      description: 'Organize awareness camps, track village-level progress, and support students',
      icon: Home,
      gradient: 'from-green-500 to-green-600',
      iconBg: 'bg-green-100 text-green-600',
    },
    {
      id: 'admin',
      title: 'Admin Login',
      description: 'Monitor national analytics, manage users, and oversee portal operations',
      icon: Shield,
      gradient: 'from-red-500 to-red-600',
      iconBg: 'bg-red-100 text-red-600',
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-2 text-[#002147] dark:text-white">Portal Access</h2>
          <p className="text-gray-600 dark:text-gray-300">Select your role to login or register</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.id} className="border-2 hover:border-[#002147] dark:hover:border-blue-500 transition-all duration-300 hover:shadow-xl group dark:bg-gray-700 dark:border-gray-600">
                <CardHeader className={`bg-gradient-to-br ${card.gradient} text-white rounded-t-lg`}>
                  <div className="flex justify-center mb-3">
                    <div className={`${card.iconBg} p-4 rounded-full`}>
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>
                  <CardTitle className="text-center">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <CardDescription className="text-center mb-6 min-h-[60px]">
                    {card.description}
                  </CardDescription>
                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-[#002147] hover:bg-[#003366]"
                      onClick={() => onNavigate(`${card.id}-login`)}
                    >
                      Login
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="ghost" className="w-full text-[#002147]">
                      Register / Help
                      <HelpCircle className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Info Bar */}
        <div className="mt-12 bg-[#E6F0FF] border border-[#002147]/20 rounded-lg p-6">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl text-[#002147] mb-1">24/7</div>
              <div className="text-sm text-gray-600">Support Available</div>
            </div>
            <div>
              <div className="text-2xl text-[#002147] mb-1">12+ Languages</div>
              <div className="text-sm text-gray-600">Multilingual Portal</div>
            </div>
            <div>
              <div className="text-2xl text-[#002147] mb-1">100% Secure</div>
              <div className="text-sm text-gray-600">Government Certified</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
