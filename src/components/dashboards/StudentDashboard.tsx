import { useState, useEffect } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input'; // Added Input
import { Label } from '../ui/label'; // Added Label
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Home,
  BookOpen,
  CheckCircle,
  Award,
  Download,
  HelpCircle,
  AlertCircle,
  PlayCircle,
  FileText,
  ExternalLink,
  X,
  CreditCard, // Added icon
  Building // Added icon
} from 'lucide-react';

// --- IMPORT SUPABASE ---
import { supabase } from '../../supabaseClient';

interface StudentDashboardProps {
  onNavigate: (page: string) => void;
}

export default function StudentDashboard({ onNavigate }: StudentDashboardProps) {
  const [currentTab, setCurrentTab] = useState('home');
  
  // --- VERIFICATION FORM STATE ---
  const [bankAccount, setBankAccount] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  // --- QUIZ STATE (Demo) ---
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});

  // --- FETCH USER PROFILE (For Name in Ticket) ---
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setUserProfile(data);
      }
    };
    getUser();
  }, []);

  // --- FUNCTION: APPLY FOR VERIFICATION ---
  const handleApplyVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) { 
        alert("You must be logged in."); 
        setLoading(false); 
        return; 
    }

    if(!bankAccount || !ifscCode) {
        alert("Please fill in all bank details.");
        setLoading(false);
        return;
    }

    // Create the description string with the bank details
    const description = `Application for DBT Verification.\nBank Account: ${bankAccount}\nIFSC Code: ${ifscCode}`;

    const { error } = await supabase.from('tickets').insert([{
      user_id: user.id,
      user_name: userProfile?.full_name || 'Student',
      type: 'verification', // Special type for admin to see
      description: description,
      status: 'open'
    }]);

    setLoading(false);

    if (error) {
      alert("Error submitting application: " + error.message);
    } else {
      alert("Application Submitted Successfully! The Admin will verify your bank details.");
      setBankAccount('');
      setIfscCode('');
    }
  };

  // --- DUMMY DATA FOR DEMO TABS ---
  const dbtStatus = {
    enabled: true,
    bankLinked: true,
    aadhaarLinked: true,
    lastVerified: 'October 15, 2025',
  };

  const quizQuestions = [
    {
      question: 'What does DBT stand for?',
      options: ['Direct Bank Transfer', 'Direct Benefit Transfer', 'Digital Banking Technology', 'Data Backup Transfer'],
      correct: 'Direct Benefit Transfer',
    },
    {
      question: 'Why is Aadhaar linking important for DBT?',
      options: ['To verify identity', 'To ensure timely scholarship transfer', 'To prevent duplication', 'All of the above'],
      correct: 'All of the above',
    },
    {
      question: 'Where can you check your DBT status?',
      options: ['Bank Branch', 'DBT Portal', 'Gram Panchayat', 'All of the above'],
      correct: 'All of the above',
    },
  ];

  const handleQuizSubmit = () => {
    let score = 0;
    quizQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) score++;
    });
    setQuizScore(score);
  };

  const sidebar = (
    <nav className="py-4">
      {[
        { id: 'home', label: 'Dashboard', icon: Home },
        { id: 'awareness', label: 'Awareness', icon: BookOpen },
        { id: 'verification', label: 'Verification', icon: CheckCircle }, // <--- THIS TAB IS WORKING
        { id: 'quiz', label: 'Quiz', icon: Award },
        { id: 'downloads', label: 'Downloads', icon: Download },
        { id: 'support', label: 'Support', icon: HelpCircle },
      ].map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentTab(item.id)}
            className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
              currentTab === item.id
                ? 'bg-[#E6F0FF] text-[#002147] border-r-4 border-[#002147]'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );

  return (
    <DashboardLayout
      title="Student Dashboard"
      userRole="Student"
      userName={userProfile?.full_name || "Rahul Kumar"}
      onNavigate={onNavigate}
      sidebar={sidebar}
    >
      {/* --- TAB: HOME (DEMO DATA) --- */}
      {currentTab === 'home' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl text-[#002147] mb-1">Welcome, {userProfile?.full_name?.split(' ')[0] || "Rahul"}!</h2>
            <p className="text-gray-600">Here's your DBT status and latest updates</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" /> DBT Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Enabled</Badge>
                <p className="text-sm text-gray-600 mt-2">Your account is DBT-ready</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500" /> Bank Linked
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Verified</Badge>
                <p className="text-sm text-gray-600 mt-2">SBI •••• 4567</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-500" /> Aadhaar Linked
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Active</Badge>
                <p className="text-sm text-gray-600 mt-2">•••• •••• {userProfile?.aadhaar?.slice(-4) || '8923'}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: 'Nov 10, 2025', action: 'DBT Status verified successfully', status: 'success' },
                  { date: 'Nov 5, 2025', action: 'Completed DBT Awareness Quiz', status: 'success' },
                  { date: 'Oct 28, 2025', action: 'Downloaded DBT Guidelines PDF', status: 'info' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <div className="text-sm">{activity.action}</div>
                      <div className="text-xs text-gray-500">{activity.date}</div>
                    </div>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* --- TAB: VERIFICATION (WORKING REAL DATA) --- */}
      {currentTab === 'verification' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl text-[#002147] mb-1">Apply for Verification</h2>
            <p className="text-gray-600">Submit your bank details for DBT enablement</p>
          </div>

          <Card className="border-2 border-[#002147]">
            <CardHeader className="bg-[#E6F0FF]">
              <CardTitle>Verification Form</CardTitle>
              <CardDescription>Please ensure details match your bank passbook</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleApplyVerification} className="space-y-6">
                
                {/* Visual Status (Demo) */}
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-8 h-8 text-yellow-600" />
                    <div>
                      <div className="font-medium text-yellow-900">Action Required</div>
                      <div className="text-sm text-yellow-800">Please submit current bank details</div>
                    </div>
                  </div>
                  <Badge className="bg-yellow-200 text-yellow-800">Pending</Badge>
                </div>

                {/* FORM INPUTS */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="bankAcc">Bank Account Number *</Label>
                        <div className="relative">
                            <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input 
                                id="bankAcc" 
                                placeholder="Enter Account Number" 
                                className="pl-10"
                                value={bankAccount}
                                onChange={(e) => setBankAccount(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="ifsc">IFSC Code *</Label>
                        <div className="relative">
                            <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input 
                                id="ifsc" 
                                placeholder="Ex: SBIN0001234" 
                                className="pl-10 uppercase"
                                value={ifscCode}
                                onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                                maxLength={11}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-900 mb-1">Note</div>
                      <p className="text-sm text-blue-800">
                        This request will be sent to the System Admin for approval. You will be notified once verified.
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-[#002147] hover:bg-[#003366]"
                  disabled={loading}
                >
                  {loading ? "Submitting Application..." : "Apply for Verification"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* --- TAB: AWARENESS (DEMO DATA) --- */}
      {currentTab === 'awareness' && (
        <div className="space-y-6">
          <Tabs defaultValue="videos" className="w-full">
            <TabsList>
              <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
              <TabsTrigger value="guides">Text Guides</TabsTrigger>
            </TabsList>
            <TabsContent value="videos" className="grid md:grid-cols-2 gap-4 mt-4">
               {[1,2,3,4].map((i) => (
                 <Card key={i}><CardContent className="p-4 flex items-center justify-center h-40 bg-gray-100"><PlayCircle className="w-12 h-12 text-gray-400"/></CardContent></Card>
               ))}
            </TabsContent>
            <TabsContent value="guides" className="mt-4"><p>Guides content...</p></TabsContent>
          </Tabs>
        </div>
      )}

      {/* --- TAB: QUIZ (DEMO LOGIC) --- */}
      {currentTab === 'quiz' && (
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>DBT Knowledge Quiz</CardTitle></CardHeader>
            <CardContent>
                {quizQuestions.map((q, index) => (
                  <div key={index} className="mb-6 p-4 border rounded">
                    <h3 className="font-medium mb-3">{index + 1}. {q.question}</h3>
                    <div className="space-y-2">
                        {q.options.map((opt) => (
                            <div key={opt} className={`p-2 border rounded cursor-pointer ${selectedAnswers[index] === opt ? 'bg-blue-50 border-blue-500' : ''}`} onClick={() => setSelectedAnswers(prev => ({...prev, [index]: opt}))}>
                                {opt}
                            </div>
                        ))}
                    </div>
                  </div>
                ))}
                <Button onClick={handleQuizSubmit} className="w-full bg-[#002147]">Submit Quiz</Button>
                {quizScore !== null && <div className="mt-4 text-center font-bold text-xl">Score: {quizScore} / 3</div>}
            </CardContent>
          </Card>
        </div>
      )}

      {/* --- TAB: DOWNLOADS (DEMO DATA) --- */}
      {currentTab === 'downloads' && (
        <div className="space-y-6">
           <div className="grid md:grid-cols-2 gap-4">
              {['DBT Guide 2025.pdf', 'Aadhaar Linking Manual.pdf', 'Bank Form.pdf', 'FAQs.pdf'].map((file) => (
                  <Card key={file} className="flex items-center p-4 gap-4">
                      <FileText className="w-8 h-8 text-red-500" />
                      <div className="flex-1 font-medium">{file}</div>
                      <Button variant="outline" size="sm"><Download className="w-4 h-4"/></Button>
                  </Card>
              ))}
           </div>
        </div>
      )}

      {/* --- TAB: SUPPORT (DEMO DATA) --- */}
      {currentTab === 'support' && (
        <div className="space-y-6">
           <div className="grid md:grid-cols-2 gap-6">
              <Card><CardHeader><CardTitle>Helpdesk</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-[#002147]">1800-11-8004</p></CardContent></Card>
              <Card><CardHeader><CardTitle>Email</CardTitle></CardHeader><CardContent><p className="text-lg">support@dbt.gov.in</p></CardContent></Card>
           </div>
        </div>
      )}

    </DashboardLayout>
  );
}