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
  AlertTriangle,
  RefreshCcw,
  Server,
  FileCheck,
  CreditCard,
  MousePointerClick
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

  // 7 In-Depth Differences Data
  const differences = [
    {
      icon: Shield,
      title: "Primary Purpose",
      seed: "Verifies your identity (KYC) for the bank's internal records.",
      map: "Routes government money to a specific destination account."
    },
    {
      icon: CreditCard,
      title: "Account Limit",
      seed: "You can link Aadhaar to MULTIPLE bank accounts.",
      map: "Only ONE account can be mapped for DBT at a time."
    },
    {
      icon: Database,
      title: "Funds Transfer",
      seed: "Money will NOT land here automatically from government.",
      map: "Scholarship funds are auto-credited via Aadhaar Bridge."
    },
    {
      icon: FileCheck,
      title: "Action Required",
      seed: "Submit Aadhaar copy to bank branch (Simple KYC).",
      map: "Submit specific 'Mandate Form' for NPCI Mapping."
    },
    {
      icon: Server,
      title: "Storage Location",
      seed: "Data stays in the Bank's Core Banking System (CBS).",
      map: "Data is pushed to NPCI's National Mapper Server."
    },
    {
      icon: RefreshCcw,
      title: "Switching Rule",
      seed: "Linking a new account doesn't affect old ones.",
      map: "Mapping a new account AUTOMATICALLY overwrites the old one."
    },
    {
      icon: MousePointerClick,
      title: "How to Check",
      seed: "Ask at your Bank Branch counter.",
      map: "Check online on UIDAI website or dial *99*99#."
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
            <div className="flex justify-center gap-4 mt-8">
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
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="dark:bg-gray-800 dark:border-gray-700 shadow-md hover:shadow-lg transition-all">
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

      {/* NEW: VISUALLY ENHANCED COMPARISON SECTION */}
      <div className="bg-white dark:bg-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#002147] dark:text-white mb-4">Aadhaar Seeding vs. NPCI Mapping</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Understanding the difference between these two concepts is the #1 way to solve payment failures.
            </p>
          </div>

          <div className="grid md:grid-cols-1 gap-8">
             {/* Header Row for Desktop */}
             <div className="hidden md:grid grid-cols-3 bg-[#002147] text-white p-4 rounded-t-lg font-bold text-lg">
                <div className="text-center">Comparison Factor</div>
                <div className="flex items-center justify-center gap-2"><Link className="w-5 h-5"/> Aadhaar Seeding (KYC)</div>
                <div className="flex items-center justify-center gap-2"><Database className="w-5 h-5"/> DBT Mapping (NPCI)</div>
             </div>

             {/* Dynamic Content Rows */}
             <div className="space-y-4 md:space-y-0">
               {differences.map((item, i) => (
                 <div key={i} className={`flex flex-col md:grid md:grid-cols-3 p-6 rounded-lg md:rounded-none border-b border-gray-200 transition-colors hover:bg-blue-50/50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} shadow-sm md:shadow-none border md:border-0 mb-4 md:mb-0`}>
                    
                    {/* Feature Title */}
                    <div className="flex items-center gap-3 md:justify-center mb-3 md:mb-0">
                        <div className="bg-blue-100 p-2 rounded-full text-[#002147]">
                            <item.icon className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-gray-800 text-lg md:text-base">{item.title}</span>
                    </div>

                    {/* Aadhaar Seeding Side */}
                    <div className="md:border-l md:border-r border-gray-200 px-4 py-2 text-gray-600 flex items-start gap-2">
                        <span className="md:hidden font-bold text-blue-600 min-w-[80px]">Seeding:</span>
                        {item.seed}
                    </div>

                    {/* DBT Mapping Side */}
                    <div className="px-4 py-2 text-[#002147] font-medium flex items-start gap-2 bg-green-50/50 md:bg-transparent rounded md:rounded-none mt-2 md:mt-0">
                        <span className="md:hidden font-bold text-green-600 min-w-[80px]">Mapping:</span>
                        {item.map}
                    </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Quick Tip Cards */}
          <div className="mt-10 grid md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl flex gap-4 shadow-sm">
                  <div className="bg-yellow-100 p-3 rounded-full h-fit"><AlertTriangle className="w-6 h-6 text-yellow-700" /></div>
                  <div>
                      <h4 className="font-bold text-yellow-900 text-lg mb-1">Common Student Mistake</h4>
                      <p className="text-sm text-yellow-800 leading-relaxed">
                        "I submitted my Aadhaar to the bank, but scholarship didn't come!" <br/>
                        <strong>Reason:</strong> You likely did KYC but forgot to fill the specific <strong>NPCI Mandate Form</strong>.
                      </p>
                  </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl flex gap-4 shadow-sm">
                  <div className="bg-blue-100 p-3 rounded-full h-fit"><RefreshCcw className="w-6 h-6 text-blue-700" /></div>
                  <div>
                      <h4 className="font-bold text-blue-900 text-lg mb-1">The "Overwrite" Rule</h4>
                      <p className="text-sm text-blue-800 leading-relaxed">
                        If you map a new bank account today, your previous mapping is <strong>automatically deleted</strong>. 
                        Funds will only go to the latest mapped bank.
                      </p>
                  </div>
              </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-gray-900 dark:text-white mb-4">Portal Features</h2>
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
      </div>

      {/* Announcements & Links */}
      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="dark:bg-gray-900 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Bell className="w-5 h-5 text-[#FF9933]" /> Latest Announcements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.map((announcement, index) => (
                    <div key={index} className="border-l-4 border-[#002147] dark:border-blue-500 pl-4 py-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge variant="outline" className="mb-2 dark:border-gray-600 dark:text-gray-300">{announcement.type}</Badge>
                          <p className="dark:text-white">{announcement.title}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{announcement.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-900 dark:border-gray-700">
              <CardHeader><CardTitle className="dark:text-white">Quick Access</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('landing')}><CheckCircle className="w-4 h-4 mr-2"/> Student Login</Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('landing')}><Building2 className="w-4 h-4 mr-2"/> Institution Portal</Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('landing')}><MapPin className="w-4 h-4 mr-2"/> Panchayat Dashboard</Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('guidelines')}><Award className="w-4 h-4 mr-2"/> View Guidelines</Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => onNavigate('helpdesk')}><Shield className="w-4 h-4 mr-2"/> Help & Support</Button>
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
          <p className="text-xl opacity-90 mb-8">Join millions of beneficiaries experiencing seamless DBT services</p>
          <Button size="lg" className="bg-white text-[#FF9933] hover:bg-gray-100" onClick={() => onNavigate('landing')}>Access Portal Now</Button>
        </div>
      </div>
    </div>
  );
}