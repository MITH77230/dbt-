import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  Target, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap, 
  Globe,
  Award,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '../ui/button';

interface AboutDBTProps {
  onNavigate: (page: string) => void;
}

export default function AboutDBT({ onNavigate }: AboutDBTProps) {
  const objectives = [
    {
      icon: Target,
      title: 'Direct Transfer',
      description: 'Eliminate intermediaries and ensure benefits reach beneficiaries directly'
    },
    {
      icon: Shield,
      title: 'Transparency',
      description: 'Complete transparency in fund disbursement and tracking'
    },
    {
      icon: Zap,
      title: 'Speed',
      description: 'Faster processing and reduced delays in benefit delivery'
    },
    {
      icon: Users,
      title: 'Inclusion',
      description: 'Financial inclusion through bank account linkage'
    }
  ];

  const benefits = [
    'Elimination of Ghost Beneficiaries',
    'Reduced Leakages in the System',
    'Real-time Tracking of Payments',
    'Faster Disbursement of Benefits',
    'Reduced Transaction Costs',
    'Enhanced Accountability',
    'Better Targeting of Beneficiaries',
    'Digital Financial Inclusion'
  ];

  const schemes = [
    {
      name: 'National Scholarship Portal',
      description: 'Scholarships for students from various backgrounds',
      beneficiaries: '10M+'
    },
    {
      name: 'PM-KISAN',
      description: 'Direct income support to farmers',
      beneficiaries: '11M+'
    },
    {
      name: 'Aadhaar Enabled Payment',
      description: 'Direct payment through Aadhaar authentication',
      beneficiaries: '50M+'
    },
    {
      name: 'LPG Subsidy (PAHAL)',
      description: 'Direct LPG subsidy to bank accounts',
      beneficiaries: '28M+'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#002147] to-[#003366] dark:from-gray-800 dark:to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl mb-4">About Direct Benefit Transfer (DBT)</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            A transformative initiative by the Government of India to ensure transparent, 
            efficient, and timely delivery of government benefits directly to beneficiaries
          </p>
        </div>
      </div>

      {/* What is DBT */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl dark:text-white">What is Direct Benefit Transfer?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Direct Benefit Transfer (DBT) is an initiative of the Government of India that aims to 
              transfer subsidies and benefits directly to the bank accounts of beneficiaries. This 
              system leverages Aadhaar authentication and the National Payments Corporation of India's 
              (NPCI) infrastructure to ensure seamless, transparent, and timely delivery of benefits.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Launched in January 2013, DBT has revolutionized the way government welfare schemes 
              operate by eliminating middlemen, reducing delays, and ensuring that benefits reach 
              the intended recipients without leakage.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <TrendingUp className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <p className="text-3xl text-blue-600 dark:text-blue-400 mb-2">₹27 Lakh Cr+</p>
                <p className="text-gray-600 dark:text-gray-400">Total Amount Transferred</p>
              </div>
              <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Users className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                <p className="text-3xl text-green-600 dark:text-green-400 mb-2">100 Cr+</p>
                <p className="text-gray-600 dark:text-gray-400">Beneficiaries Reached</p>
              </div>
              <div className="text-center p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <Globe className="w-12 h-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
                <p className="text-3xl text-orange-600 dark:text-orange-400 mb-2">315+</p>
                <p className="text-gray-600 dark:text-gray-400">Schemes Covered</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Objectives */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl text-center text-gray-900 dark:text-white mb-12">Key Objectives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {objectives.map((obj, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow dark:bg-gray-900 dark:border-gray-700">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-[#002147] dark:bg-blue-600 text-white flex items-center justify-center mb-4">
                    <obj.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="dark:text-white">{obj.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">{obj.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl text-center text-gray-900 dark:text-white mb-12">Benefits of DBT System</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
              <p className="text-gray-700 dark:text-gray-300">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Major Schemes */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl text-center text-gray-900 dark:text-white mb-12">Major DBT Schemes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schemes.map((scheme, index) => (
              <Card key={index} className="dark:bg-gray-900 dark:border-gray-700">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="dark:text-white">{scheme.name}</CardTitle>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">{scheme.description}</p>
                    </div>
                    <Award className="w-8 h-8 text-[#FF9933]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Beneficiaries</span>
                    <span className="text-xl text-[#002147] dark:text-blue-400">{scheme.beneficiaries}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl text-center text-gray-900 dark:text-white mb-12">How DBT Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Registration', desc: 'Beneficiary registers with Aadhaar and bank account' },
            { step: '2', title: 'Verification', desc: 'Details are verified through the DBT portal' },
            { step: '3', title: 'Approval', desc: 'Eligible beneficiaries are approved by authorities' },
            { step: '4', title: 'Transfer', desc: 'Benefits are directly transferred to bank accounts' }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#002147] dark:bg-blue-600 text-white flex items-center justify-center text-2xl mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-xl mb-2 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              {index < 3 && (
                <ArrowRight className="w-6 h-6 text-gray-400 mx-auto mt-4 hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-[#002147] to-[#003366] dark:from-gray-800 dark:to-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl mb-4">Want to Learn More?</h2>
          <p className="text-xl opacity-90 mb-8">
            Explore our guidelines and helpdesk for detailed information
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-[#002147] hover:bg-gray-100"
              onClick={() => onNavigate('guidelines')}
            >
              View Guidelines
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => onNavigate('helpdesk')}
            >
              Get Help
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
