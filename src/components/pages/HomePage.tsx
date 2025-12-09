import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Users, 
  Building2, 
  MapPin, 
  Shield, 
  TrendingUp, 
  Award,
  CheckCircle,
  Bell,
  ArrowRight,
  Link,
  Database,
  Briefcase // Imported Briefcase icon
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const stats = [
    { label: 'Registered Students', value: '2.5M+', icon: Users, color: 'text-blue-600' },
    { label: 'Verified Institutions', value: '12,450', icon: Building2, color: 'text-green-600' },
    { label: 'Active Panchayats', value: '8,900', icon: MapPin, color: 'text-orange-600' },
    { label: 'Success Rate', value: '98.7%', icon: TrendingUp, color: 'text-purple-600' }
  ];

  const features = [
    {
      title: 'Student Verification',
      description: 'Quick and secure DBT verification for scholarship disbursement',
      icon: Shield,
      color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Institution Management',
      description: 'Comprehensive dashboard for managing student data and analytics',
      icon: Building2,
      color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
    },
    {
      title: 'Panchayat Tracking',
      description: 'Village-level monitoring and event management system',
      icon: MapPin,
      color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
    },
    {
      title: 'Admin Controls',
      description: 'National-level analytics and comprehensive user management',
      icon: Award,
      color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
    }
  ];

  const announcements = [
    {
      date: '10 Nov 2025',
      title: 'New DBT Verification Guidelines Released',
      type: 'Important'
    },
    {
      date: '05 Nov 2025',
      title: 'System Maintenance Scheduled for 15th Nov',
      type: 'Notice'
    },
    {
      date: '01 Nov 2025',
      title: 'Scholarship Application Deadline Extended',
      type: 'Update'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#002147] to-[#003366] dark:from-gray-800 dark:to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <Badge className="mb-4 bg-[#FF9933] text-white border-none">
              Official Government Portal
            </Badge>
            <h1 className="text-4xl mb-4">Welcome to DBT Awareness & Verification Portal</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Empowering citizens through transparent and efficient Direct Benefit Transfer system. 
              Verify, track, and manage DBT processes seamlessly.
            </p>
            <div className="flex flex-col items-center mt-8">
              <div className="flex justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-[#FF9933] hover:bg-[#FF9933]/90 text-white"
                  onClick={() => onNavigate('landing')}
                >
                  Access Portal <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white text-[#002147] hover:bg-gray-100"
                  onClick={() => onNavigate('about')}
                >
                  Learn More
                </Button>
              </div>
              
              {/* Secondary Volunteer Link in Hero */}
              <button 
                onClick={() => onNavigate('volunteer')}
                className="mt-6 text-blue-200 hover:text-white underline underline-offset-4 text-sm font-medium transition-colors"
              >
                Interested in social work? Join our Internship Program →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="dark:bg-gray-800 dark:border-gray-700 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-3xl mt-2 dark:text-white font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-12 h-12 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* NEW SECTION: Aadhaar Seeding vs DBT Mapping */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl text-gray-900 dark:text-white mb-2">Understand the Difference</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Crucial information for scholarship beneficiaries to ensure payment success.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1: Aadhaar Seeding */}
          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all dark:bg-gray-800">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Link className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Aadhaar Seeded Account</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This simply means your Aadhaar number is updated in your bank account records (KYC).
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>You can have <strong>multiple</strong> accounts seeded with Aadhaar.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Allows Aadhaar-based authentication (AePS).</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-red-500 font-medium">
                  <Shield className="w-4 h-4 mt-0.5" />
                  <span>Does NOT guarantee scholarship money will come here.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Card 2: DBT Mapping */}
          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-all dark:bg-gray-800">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-full">
                  <Database className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">DBT Mapped (NPCI) Account</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This is the specific account linked to the <strong>NPCI Mapper</strong> to receive government funds.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Only <strong>ONE</strong> account can be mapped for DBT at a time.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span>Government money <strong>automatically</strong> goes to this account.</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-green-600 font-medium">
                  <Shield className="w-4 h-4 mt-0.5" />
                  <span>This is REQUIRED for receiving scholarships.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-gray-900 dark:text-white mb-4">Portal Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Comprehensive solutions for all stakeholders in the DBT ecosystem
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="dark:text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Announcements */}
            <Card className="dark:bg-gray-900 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Bell className="w-5 h-5 text-[#FF9933]" />
                  Latest Announcements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement, index) => (
                    <div key={index} className="border-l-4 border-[#002147] dark:border-blue-500 pl-4 py-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge variant="outline" className="mb-2 dark:border-gray-600 dark:text-gray-300">
                            {announcement.type}
                          </Badge>
                          <p className="dark:text-white">{announcement.title}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{announcement.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="link" className="mt-4 text-[#002147] dark:text-blue-400">
                  View All Announcements →
                </Button>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="dark:bg-gray-900 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Quick Access</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* --- HIGHLIGHTED VOLUNTEER LINK --- */}
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/40 font-medium"
                    onClick={() => onNavigate('volunteer')}
                  >
                    <Briefcase className="w-4 h-4 mr-2 text-[#FF9933]" />
                    Volunteer / Internship Program
                    <Badge className="ml-auto bg-[#FF9933] text-white hover:bg-[#e68a2e] text-[10px] h-5">NEW</Badge>
                  </Button>
                  {/* ---------------------------------- */}

                  <Button 
                    variant="outline" 
                    className="w-full justify-start dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                    onClick={() => onNavigate('landing')}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Student Login & Verification
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                    onClick={() => onNavigate('landing')}
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    Institution Portal Access
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                    onClick={() => onNavigate('landing')}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    Panchayat Dashboard
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                    onClick={() => onNavigate('guidelines')}
                  >
                    <Award className="w-4 h-4 mr-2" />
                    View Guidelines
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                    onClick={() => onNavigate('helpdesk')}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Get Help & Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#FF9933] to-[#FF6B00] dark:from-orange-900 dark:to-orange-800 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl mb-4">Ready to Get Started?</h2>
          <p className="text-xl opacity-90 mb-8">
            Join millions of beneficiaries experiencing seamless DBT services
          </p>
          <Button 
            size="lg" 
            className="bg-white text-[#FF9933] hover:bg-gray-100"
            onClick={() => onNavigate('landing')}
          >
            Access Portal Now
          </Button>
        </div>
      </div>
    </div>
  );
}