import { useState, useEffect, FormEvent } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Home, BookOpen, CheckCircle, Award, Download, HelpCircle,
  AlertCircle, PlayCircle, FileText, CreditCard, Building, ShieldCheck, Clock, Activity, RotateCcw, Check, X, ExternalLink, Mail, Phone, MapPin, User
} from 'lucide-react';

import { supabase } from '../../supabaseClient';

interface StudentDashboardProps {
  onNavigate: (page: string) => void;
}

type VerificationStatus = 'not_submitted' | 'open' | 'pending_institute' | 'pending_admin' | 'verified' | 'rejected';

export default function StudentDashboard({ onNavigate }: StudentDashboardProps) {
  const [currentTab, setCurrentTab] = useState('home');

  // --- REAL DATA STATE ---
  const [bankAccount, setBankAccount] = useState('');
  const [confirmBankAccount, setConfirmBankAccount] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [userProfile, setUserProfile] = useState<any>(null);
  const [myTicket, setMyTicket] = useState<any>(null);
  const [status, setStatus] = useState<VerificationStatus>('not_submitted');

  // --- DEMO STATE ---
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  // --- SUPPORT FORM STATE ---
  const [supportMsg, setSupportMsg] = useState('');

  // 1. Fetch User & Ticket Status
  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setUserProfile(profile);

        const { data: ticket } = await supabase
            .from('tickets')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();
        
        if (ticket) {
            setMyTicket(ticket);
            setStatus(ticket.status as VerificationStatus);
        }
      }
    };
    fetchData();
  }, []);

  // 2. Submit Verification Request
  const handleApplyVerification = async (e: FormEvent) => {
    e.preventDefault();
    if (bankAccount !== confirmBankAccount) { alert("Bank numbers don't match."); return; }

    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { alert("Please login."); setLoading(false); return; }

    const description = `Bank: ${bankAccount} | IFSC: ${ifscCode}`;
    const { error } = await supabase.from('tickets').insert([{
      user_id: user.id,
      user_name: userProfile?.full_name || 'Student',
      type: 'verification',
      description: description,
      status: 'pending_institute' 
    }]);

    setLoading(false);
    if (error) alert("Error: " + error.message);
    else { alert("Submitted!"); window.location.reload(); }
  };

  const handleReapply = () => {
    if(!window.confirm("Start new application?")) return;
    setStatus('not_submitted');
    setMyTicket(null);
    setBankAccount('');
    setConfirmBankAccount('');
    setIfscCode('');
  };

  // Support Form Handler
  const handleContactSupport = (e: FormEvent) => {
    e.preventDefault();
    alert("Support request sent! Ticket ID: #SUP-" + Math.floor(Math.random() * 10000));
    setSupportMsg('');
  };

  // --- QUIZ LOGIC ---
  const quizQuestions = [
    { question: 'What does DBT stand for?', options: ['Direct Bank Transfer', 'Direct Benefit Transfer', 'Data Backup'], correct: 'Direct Benefit Transfer' },
    { question: 'Why link Aadhaar?', options: ['Identity Verification', 'Avoid Duplication', 'All of the above'], correct: 'All of the above' },
    { question: 'Where to check status?', options: ['Bank', 'DBT Portal', 'All of the above'], correct: 'All of the above' }
  ];

  const handleQuizSubmit = () => {
    let score = 0;
    quizQuestions.forEach((q, index) => { if (selectedAnswers[index] === q.correct) score++; });
    setQuizScore(score);
    setIsQuizSubmitted(true);
  };

  const handleRetakeQuiz = () => {
    setQuizScore(null);
    setSelectedAnswers({});
    setIsQuizSubmitted(false);
  };

  const studentDownloadFiles = [
    { label: 'DBT Scholarship Guidelines', fileName: 'DBTcompleteguidelines.pdf', url: '/resources/student-downloads/DBTcompleteguidelines.pdf' },
    { label: 'Student FAQs', fileName: 'FAQ.pdf', url: '/resources/student-downloads/FAQ.pdf' },
    { label: 'Aadhaar Linking Manual', fileName: 'AADHAARbanklinkingmanual.pdf', url: '/resources/student-downloads/AADHAARbanklinkingmanual.pdf' },
    { label: 'Scholarship App Guide', fileName: 'SCHOLARSHIPAPPGUIDE.pdf', url: '/resources/student-downloads/SCHOLARSHIPAPPGUIDE.pdf' },
    { label: 'Bank Verification List', fileName: 'Banksallverification.pdf', url: '/resources/student-downloads/Banksallverification.pdf' },
  ];

  const getStepStatus = (stepIndex: number) => {
      if (status === 'rejected') return 'error';
      if (status === 'verified') return 'complete';
      if (stepIndex === 0) return 'complete'; 
      if (stepIndex === 1) {
          if (status === 'pending_institute' || status === 'open') return 'current'; 
          if (status === 'pending_admin') return 'complete';    
          return 'waiting';
      }
      if (stepIndex === 2) {
          if (status === 'pending_admin') return 'current';
          return 'waiting';
      }
      return 'waiting';
  };

  const dbtStatus = { enabled: status === 'verified', bankLinked: !!myTicket, aadhaarLinked: true };

  const sidebar = (
    <nav className="py-4">
      {[
        { id: 'home', label: 'Dashboard', icon: Home },
        { id: 'profile', label: 'My Profile', icon: User }, // Added Profile
        { id: 'verification', label: 'Verification', icon: ShieldCheck },
        { id: 'awareness', label: 'Awareness', icon: BookOpen },
        { id: 'quiz', label: 'Quiz', icon: Award },
        { id: 'downloads', label: 'Downloads', icon: Download },
        { id: 'support', label: 'Support', icon: HelpCircle },
      ].map((item) => (
        <button key={item.id} onClick={() => setCurrentTab(item.id)} className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${currentTab === item.id ? 'bg-[#E6F0FF] text-[#002147] border-r-4 border-[#002147]' : 'text-gray-600 hover:bg-gray-50'}`}>
          <item.icon className="w-5 h-5" /><span>{item.label}</span>
        </button>
      ))}
    </nav>
  );

  return (
    <DashboardLayout title="Student Dashboard" userRole="Student" userName={userProfile?.full_name || 'Student'} onNavigate={onNavigate} sidebar={sidebar}>
      
      {/* HOME TAB */}
      {currentTab === 'home' && (
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#002147] to-[#004e92] p-8 text-white shadow-lg">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2">Welcome, {userProfile?.full_name?.split(' ')[0] || "Student"}!</h2>
              <p className="text-blue-100 max-w-xl">Your central hub for Direct Benefit Transfer.</p>
            </div>
            <Activity className="absolute right-8 top-1/2 -translate-y-1/2 w-32 h-32 text-white/10" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-l-green-500"><CardHeader><CardTitle className="flex items-center gap-2"><CheckCircle className="text-green-500"/> DBT Status</CardTitle></CardHeader><CardContent><Badge className="bg-green-100 text-green-800">{status === 'verified' ? 'Enabled' : 'Pending'}</Badge></CardContent></Card>
            <Card className="border-l-4 border-l-blue-500"><CardHeader><CardTitle className="flex items-center gap-2"><CreditCard className="text-blue-500"/> Bank Linked</CardTitle></CardHeader><CardContent><Badge className={myTicket ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}>{myTicket ? 'Submitted' : 'Not Linked'}</Badge></CardContent></Card>
            <Card className="border-l-4 border-l-purple-500"><CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck className="text-purple-500"/> Aadhaar Seeded</CardTitle></CardHeader><CardContent><Badge className="bg-purple-100 text-purple-800">Verified</Badge></CardContent></Card>
          </div>
        </div>
      )}

      {/* NEW PROFILE TAB */}
      {currentTab === 'profile' && (
        <div className="space-y-6">
            <h2 className="text-2xl text-[#002147] font-bold mb-4">My Profile</h2>
            <Card>
                <CardHeader>
                    <CardTitle>Personal Details</CardTitle>
                    <CardDescription>View your registered information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4 pb-6 border-b">
                        <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-2xl font-bold">
                            {userProfile?.full_name?.charAt(0) || 'S'}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">{userProfile?.full_name || 'Student Name'}</h3>
                            <p className="text-gray-500">{userProfile?.username || 'No mobile number'}</p>
                            <Badge variant="outline" className="mt-2 text-blue-700 border-blue-200 bg-blue-50">Verified Student</Badge>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <Label className="text-gray-500">Full Name</Label>
                            <div className="font-medium text-lg">{userProfile?.full_name || '-'}</div>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-gray-500">Aadhaar Number</Label>
                            <div className="font-medium text-lg">•••• •••• {userProfile?.aadhaar?.slice(-4) || 'XXXX'}</div>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-gray-500">Mobile Number</Label>
                            <div className="font-medium text-lg">{userProfile?.username || '-'}</div>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-gray-500">Date of Registration</Label>
                            <div className="font-medium text-lg">{new Date(userProfile?.created_at).toLocaleDateString()}</div>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-gray-500">District</Label>
                            <div className="font-medium text-lg">{userProfile?.district || 'Not Provided'}</div>
                        </div>
                        <div className="space-y-1">
                            <Label className="text-gray-500">State</Label>
                            <div className="font-medium text-lg">{userProfile?.state || 'Not Provided'}</div>
                        </div>
                    </div>

                    <div className="pt-4 border-t flex justify-end">
                        <Button variant="outline" onClick={() => alert("Profile editing is disabled in demo mode.")}>Edit Profile</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      )}

      {/* VERIFICATION TAB */}
      {currentTab === 'verification' && (
        <div className="space-y-6">
          <h2 className="text-2xl text-[#002147] mb-1">Verification Status</h2>
          {status !== 'not_submitted' ? (
             <Card className="border-2 border-blue-100">
               <CardHeader className="bg-blue-50"><CardTitle>Application Tracking</CardTitle><CardDescription>Tracking ID: {myTicket?.id?.slice(0,8)}</CardDescription></CardHeader>
               <CardContent className="pt-8">
                 <div className="relative flex justify-between mb-8">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10"></div>
                    <div className={`absolute top-1/2 left-0 h-1 bg-green-500 -z-10 transition-all duration-500`} style={{width: status === 'verified' ? '100%' : status === 'pending_admin' ? '66%' : '33%'}}></div>
                    {['Submitted', 'Institute Check', 'Govt. Approval'].map((label, i) => {
                        const s = getStepStatus(i);
                        return (
                            <div key={i} className="text-center bg-white px-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${s === 'complete' ? 'bg-green-500 text-white' : s === 'current' ? 'bg-blue-600 text-white' : s === 'error' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                    {s === 'complete' ? <CheckCircle className="w-5 h-5"/> : (s === 'current' ? <Clock className="w-5 h-5"/> : s === 'error' ? <AlertCircle className="w-5 h-5"/> : i+1)}
                                </div>
                                <div className="text-sm font-medium">{label}</div>
                            </div>
                        )
                    })}
                 </div>
                 <div className="p-4 rounded border bg-blue-50 text-blue-900 mb-4">
                    <div className="font-bold mb-1">Current Status:</div> 
                    {status === 'pending_institute' || status === 'open' ? "Waiting for Institute Verification." : status === 'pending_admin' ? "Institute Verified. Waiting for Govt Approval." : status === 'verified' ? "Application Approved!" : "Application Rejected."}
                 </div>
                 {status === 'rejected' && <div className="flex justify-end"><Button onClick={handleReapply}><RotateCcw className="w-4 h-4 mr-2"/> Re-Apply</Button></div>}
               </CardContent>
             </Card>
          ) : (
            <Card className="border-2 border-[#002147]"><CardHeader className="bg-[#E6F0FF]"><CardTitle>Submit Bank Details</CardTitle></CardHeader><CardContent className="pt-6"><form onSubmit={handleApplyVerification} className="space-y-6"><div className="grid gap-4 md:grid-cols-2"><div className="space-y-2"><Label>Bank Account *</Label><Input value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} required /></div><div className="space-y-2"><Label>Confirm Account *</Label><Input value={confirmBankAccount} onChange={(e) => setConfirmBankAccount(e.target.value)} required /></div><div className="space-y-2"><Label>IFSC Code *</Label><Input value={ifscCode} onChange={(e) => setIfscCode(e.target.value.toUpperCase())} maxLength={11} required /></div></div><Button type="submit" className="w-full bg-[#002147]" disabled={loading}>{loading ? "Submitting..." : "Submit"}</Button></form></CardContent></Card>
          )}
        </div>
      )}

      {currentTab === 'awareness' && <div className="space-y-6"><Tabs defaultValue="videos"><TabsList><TabsTrigger value="videos">Videos</TabsTrigger></TabsList><TabsContent value="videos"><div className="grid md:grid-cols-2 gap-4">{[{ title: 'What is DBT?', url: 'https://www.youtube.com/results?search_query=what+is+direct+benefit+transfer+india' }, { title: 'Link Aadhaar', url: 'https://www.youtube.com/results?search_query=how+to+link+aadhaar+to+bank+account+for+dbt' }].map((v,i)=><a key={i} href={v.url} target="_blank" rel="noreferrer" className="block"><Card className="hover:shadow-lg transition-all"><CardContent className="p-6 flex items-center gap-4"><PlayCircle className="w-12 h-12 text-red-600"/><div><h3 className="font-bold">{v.title}</h3><p className="text-sm text-gray-500">Watch on YouTube</p></div><ExternalLink className="w-4 h-4 ml-auto text-gray-400"/></CardContent></Card></a>)}</div></TabsContent></Tabs></div>}
      
      {currentTab === 'quiz' && (
        <div className="space-y-6">
          <Card className="border-t-4 border-t-[#002147]">
            <CardHeader><CardTitle>DBT Knowledge Quiz</CardTitle><CardDescription>Test your knowledge</CardDescription></CardHeader>
            <CardContent className="pt-6">
                {!isQuizSubmitted ? (
                    <>
                        {quizQuestions.map((q, index) => (
                            <div key={index} className="mb-6 p-4 border rounded bg-gray-50">
                                <h3 className="font-medium mb-3 text-lg">{index + 1}. {q.question}</h3>
                                <div className="space-y-2">
                                    {q.options.map((opt) => (
                                        <div key={opt} className={`p-3 border rounded cursor-pointer transition-colors ${selectedAnswers[index] === opt ? 'bg-[#002147] text-white border-[#002147]' : 'bg-white hover:bg-gray-100'}`} onClick={() => setSelectedAnswers(prev => ({...prev, [index]: opt}))}>{opt}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <Button onClick={handleQuizSubmit} className="w-full bg-green-600 hover:bg-green-700 text-lg">Submit Answers</Button>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <div className="mb-4">{quizScore! >= 2 ? <CheckCircle className="w-16 h-16 text-green-500 mx-auto"/> : <AlertCircle className="w-16 h-16 text-orange-500 mx-auto"/>}</div>
                        <h3 className="text-2xl font-bold mb-2">You scored {quizScore} / {quizQuestions.length}</h3>
                        <Button onClick={handleRetakeQuiz} variant="outline"><RotateCcw className="w-4 h-4 mr-2"/> Retake Quiz</Button>
                    </div>
                )}
            </CardContent>
          </Card>
        </div>
      )}

      {currentTab === 'downloads' && <div className="space-y-6"><div className="grid md:grid-cols-2 gap-4">{studentDownloadFiles.map(f=><Card key={f.fileName} className="p-4 flex items-center gap-4 hover:shadow-md"><FileText className="text-red-500"/><div className="flex-1 font-medium">{f.label}</div><Button variant="outline" size="sm" asChild><a href={f.url} download>Download</a></Button></Card>)}</div></div>}
      
      {currentTab === 'support' && (
        <div className="space-y-6">
            <h2 className="text-2xl text-[#002147] font-bold mb-4">Help & Support</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
                {/* Contact Channels */}
                <div className="space-y-4">
                    <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="bg-blue-100 p-3 rounded-full"><Phone className="text-blue-600 w-6 h-6"/></div>
                            <div>
                                <p className="text-sm text-gray-500">Toll-Free Helpline</p>
                                <p className="text-xl font-bold text-[#002147]">1800-11-8004</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="bg-green-100 p-3 rounded-full"><Mail className="text-green-600 w-6 h-6"/></div>
                            <div>
                                <p className="text-sm text-gray-500">Email Support</p>
                                <p className="text-lg font-bold text-[#002147]">helpdesk@dbt.gov.in</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="bg-orange-100 p-3 rounded-full"><MapPin className="text-orange-600 w-6 h-6"/></div>
                            <div>
                                <p className="text-sm text-gray-500">Visit Center</p>
                                <p className="text-sm font-medium">Find nearest Common Service Center (CSC)</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Contact Form */}
                <Card className="border-t-4 border-t-[#002147]">
                    <CardHeader>
                        <CardTitle>Send us a Message</CardTitle>
                        <CardDescription>We usually reply within 24 hours.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleContactSupport} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Subject</Label>
                                <Input placeholder="e.g., Payment Issue, Login Problem" required />
                            </div>
                            <div className="space-y-2">
                                <Label>Message</Label>
                                <textarea 
                                    className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
                                    placeholder="Describe your issue..." 
                                    value={supportMsg}
                                    onChange={(e) => setSupportMsg(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full bg-[#002147]">Send Message</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* FAQ Section */}
            <div className="mt-8">
                <h3 className="text-xl font-bold text-[#002147] mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                    {[
                        { q: "How long does verification take?", a: "Institute verification typically takes 2-3 working days. Final government approval may take up to 7 days." },
                        { q: "My application was rejected. What now?", a: "Check the rejection reason in your dashboard. You can correct your details and use the 'Re-Apply' button to submit again." },
                        { q: "Is Aadhaar linking mandatory?", a: "Yes, for DBT transfers, your bank account must be seeded with your Aadhaar number." },
                        { q: "Can I change my bank account later?", a: "Yes, but you will need to undergo the verification process again for the new account." }
                    ].map((faq, i) => (
                        <Card key={i}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base font-semibold text-gray-800">{faq.q}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600">{faq.a}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
      )}

    </DashboardLayout>
  );
}