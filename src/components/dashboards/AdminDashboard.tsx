import { useState, useEffect } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import {
  Home, Users, TrendingUp, Download, Settings, Shield, AlertCircle, CheckCircle,
  Activity, MapPin, Building2, Clock, Search, X, XCircle, MessageSquare, Calendar, Briefcase, Award
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';

// --- IMPORT SUPABASE ---
import { supabase } from '../../supabaseClient';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [currentTab, setCurrentTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  // --- REAL DATA STATES ---
  const [realUsers, setRealUsers] = useState<any[]>([]);
  const [adminTickets, setAdminTickets] = useState<any[]>([]); // Tickets waiting for Admin (Step 2)
  const [realEvents, setRealEvents] = useState<any[]>([]);
  
  // --- NEW: VOLUNTEER STATE ---
  const [volunteers, setVolunteers] = useState<any[]>([]); 

  const [loading, setLoading] = useState(false);

  // --- FETCH REAL DATA ---
  const fetchData = async () => {
    setLoading(true);
    
    // 1. Users
    const { data: userData } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    if (userData) setRealUsers(userData);

    // 2. Tickets
    const { data: ticketData } = await supabase
      .from('tickets')
      .select('*')
      .eq('status', 'pending_admin') 
      .order('created_at', { ascending: false });
    if (ticketData) setAdminTickets(ticketData);

    // 3. Events
    const { data: eventData } = await supabase.from('events').select('*').order('created_at', { ascending: false });
    if (eventData) setRealEvents(eventData);

    // 4. Volunteers (New)
    const { data: volData } = await supabase.from('volunteers').select('*').order('created_at', { ascending: false });
    if (volData) setVolunteers(volData);

    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  // --- HANDLER: FINAL ADMIN APPROVAL ---
  const handleFinalVerify = async (id: string) => {
    const { error } = await supabase.from('tickets').update({ status: 'verified' }).eq('id', id);
    if (error) alert("Error: " + error.message);
    else { alert("Application Finalized & Verified!"); fetchData(); }
  };

  const handleReject = async (id: string) => {
    const { error } = await supabase.from('tickets').update({ status: 'rejected' }).eq('id', id);
    if (error) alert("Error: " + error.message);
    else { alert("Application Rejected."); fetchData(); }
  };

  // --- NEW: HANDLER FOR CERTIFICATE ISSUE ---
  const handleIssueCertificate = (volunteer: any) => {
      // ---------------------------------------------------------
      // PLACEHOLDER FOR CERTIFICATE GENERATION LOGIC
      // You can integrate jsPDF here later to generate the cert.
      // ---------------------------------------------------------
      alert(`Certificate Issued for ${volunteer.full_name}!\n\n(This action would trigger email dispatch with the PDF attachment)`);
  };

  // --- HELPER: CALCULATE INTERNSHIP PROGRESS ---
  const calculateProgress = (startDate: string, durationMonths: number) => {
      const start = new Date(startDate);
      const now = new Date();
      const end = new Date(start);
      end.setMonth(end.getMonth() + durationMonths);

      const totalTime = end.getTime() - start.getTime();
      const timeElapsed = now.getTime() - start.getTime();
      
      let percent = Math.round((timeElapsed / totalTime) * 100);
      if (percent > 100) percent = 100;
      if (percent < 0) percent = 0;

      return { 
          percent, 
          isComplete: percent >= 100, 
          daysLeft: Math.ceil((end.getTime() - now.getTime()) / (1000 * 3600 * 24)) 
      };
  };

  // Filter Logic for Real Users
  const filteredRealUsers = realUsers.filter(user => {
    const term = searchQuery.toLowerCase();
    const name = (user.full_name || user.panchayat_name || 'Admin').toLowerCase();
    const role = (user.role || '').toLowerCase();
    return name.includes(term) || role.includes(term);
  });

  // --- RICH DEMO DATA ---
  const nationalStats = { totalStudents: 2548920, dbtEnabled: 2183182, institutions: 5240, panchayats: 12450, avgDisbursalTime: 2.3 };
  const monthlyTrend = [{ month: 'Jun', students: 100 }, { month: 'Jul', students: 200 }, { month: 'Aug', students: 450 }, { month: 'Sep', students: 800 }, { month: 'Oct', students: 1200 }];
  const pieData = [{ name: 'DBT Enabled', value: 86, color: '#22c55e' }, { name: 'Pending', value: 14, color: '#f59e0b' }];
  const disbursalData = [{ bank: 'SBI', avgTime: 1.8 }, { bank: 'HDFC', avgTime: 2.1 }, { bank: 'PNB', avgTime: 2.5 }];
  const topPanchayats = [{ name: 'Rampur GP, UP', progress: 95, students: 156, rank: 1 }, { name: 'Khadki GP, MH', progress: 94, students: 189, rank: 2 }, { name: 'Sultanpur GP, BR', progress: 93, students: 142, rank: 3 }];
  
  // NEW: State Data for Analytics Tab
  const stateAnalytics = [
    { state: 'Uttar Pradesh', total: 45000, active: 41000, pending: 4000 },
    { state: 'Maharashtra', total: 38000, active: 35000, pending: 3000 },
    { state: 'Bihar', total: 32000, active: 28000, pending: 4000 },
    { state: 'Madhya Pradesh', total: 29000, active: 27000, pending: 2000 },
  ];

  // NEW: Pending Approvals for Approvals Tab
  const pendingApprovals = [
    { id: 'REQ-101', name: 'Global Institute of Tech', type: 'Institution', location: 'Delhi', date: '2025-11-12' },
    { id: 'REQ-102', name: 'Gram Panchayat - Bisrakh', type: 'Panchayat', location: 'Uttar Pradesh', date: '2025-11-13' },
    { id: 'REQ-103', name: 'St. Xavier College', type: 'Institution', location: 'Mumbai', date: '2025-11-14' },
  ];

  const sidebar = (
    <nav className="py-4 bg-[#001633]">
      {[
          { id: 'home', label: 'Dashboard', icon: Home }, 
          { id: 'analytics', label: 'Analytics', icon: TrendingUp }, 
          { id: 'users', label: 'User Management', icon: Users }, 
          { id: 'interns', label: 'Internships', icon: Briefcase }, // NEW TAB ADDED HERE
          { id: 'approvals', label: 'Approvals', icon: Shield }, 
          { id: 'logs', label: 'Verifications & Logs', icon: MessageSquare }, 
          { id: 'reports', label: 'Reports', icon: Download }, 
          { id: 'settings', label: 'Settings', icon: Settings }
      ].map((item) => (
        <button key={item.id} onClick={() => setCurrentTab(item.id)} className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${currentTab === item.id ? 'bg-[#002147] text-white' : 'text-gray-300 hover:bg-[#002147] hover:text-white'}`}>
          <item.icon className="w-5 h-5" /><span>{item.label}</span>
        </button>
      ))}
    </nav>
  );

  return (
    <DashboardLayout title="Super Admin Dashboard" userRole="System Administrator" userName="Admin Portal" onNavigate={onNavigate} sidebar={sidebar}>
      
      {/* --- TAB: HOME --- */}
      {currentTab === 'home' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3"><div className="bg-[#002147] p-3 rounded"><Shield className="w-8 h-8 text-white" /></div><div><h2 className="text-2xl text-[#002147]">National DBT Overview</h2><p className="text-gray-600">Comprehensive analytics across all states</p></div></div>
          <div className="grid md:grid-cols-5 gap-4">
            <Card className="bg-[#002147] text-white"><CardContent className="pt-6"><p className="text-sm opacity-90">Total Students</p><p className="text-3xl">{(nationalStats.totalStudents/1000000).toFixed(2)}M</p></CardContent></Card>
            <Card className="bg-green-600 text-white"><CardContent className="pt-6"><p className="text-sm opacity-90">DBT Enabled</p><p className="text-3xl">{(nationalStats.dbtEnabled/1000000).toFixed(2)}M</p></CardContent></Card>
            <Card className="bg-purple-600 text-white"><CardContent className="pt-6"><p className="text-sm opacity-90">Institutions</p><p className="text-3xl">{nationalStats.institutions.toLocaleString()}</p></CardContent></Card>
            <Card className="bg-orange-600 text-white"><CardContent className="pt-6"><p className="text-sm opacity-90">Panchayats</p><p className="text-3xl">{nationalStats.panchayats}</p></CardContent></Card>
            <Card className="bg-blue-600 text-white"><CardContent className="pt-6"><p className="text-sm opacity-90">Avg Disbursal</p><p className="text-3xl">{nationalStats.avgDisbursalTime} days</p></CardContent></Card>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card><CardHeader><CardTitle>Growth Trend</CardTitle></CardHeader><CardContent><ResponsiveContainer width="100%" height={250}><LineChart data={monthlyTrend}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="month"/><YAxis/><Tooltip/><Line type="monotone" dataKey="students" stroke="#002147"/></LineChart></ResponsiveContainer></CardContent></Card>
            <Card><CardHeader><CardTitle>Status</CardTitle></CardHeader><CardContent><ResponsiveContainer width="100%" height={250}><PieChart><Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>{pieData.map((e, i) => <Cell key={i} fill={e.color}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer></CardContent></Card>
          </div>
          <Card><CardHeader><CardTitle>Top Performing Panchayats</CardTitle></CardHeader><CardContent><div className="space-y-3">{topPanchayats.map((p,i)=><div key={i} className="flex items-center gap-4 p-3 border rounded"><div className="font-bold">#{p.rank}</div><div className="flex-1">{p.name}</div><div className="text-green-600 font-bold">{p.progress}%</div></div>)}</div></CardContent></Card>
        </div>
      )}

      {/* --- TAB: ANALYTICS (NOW WORKING WITH DEMO DATA) --- */}
      {currentTab === 'analytics' && (
        <div className="space-y-6">
            <h2 className="text-2xl text-[#002147]">Deep Dive Analytics</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>State-wise Performance</CardTitle><CardDescription>Total Students vs Active DBT</CardDescription></CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={stateAnalytics}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="state" /><YAxis /><Tooltip /><Legend />
                            <Bar dataKey="total" fill="#8884d8" name="Total Students" />
                            <Bar dataKey="active" fill="#82ca9d" name="DBT Active" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Bank Disbursal Efficiency</CardTitle><CardDescription>Average days to credit amount</CardDescription></CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={disbursalData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="bank" /><YAxis /><Tooltip /><Bar dataKey="avgTime" fill="#002147" name="Avg Days" /></BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader><CardTitle>Detailed State Metrics</CardTitle></CardHeader>
                <CardContent>
                    <Table><TableHeader><TableRow><TableHead>State</TableHead><TableHead>Total</TableHead><TableHead>Active</TableHead><TableHead>Pending</TableHead><TableHead>Efficiency</TableHead></TableRow></TableHeader>
                    <TableBody>
                        {stateAnalytics.map((s, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">{s.state}</TableCell>
                                <TableCell>{s.total.toLocaleString()}</TableCell>
                                <TableCell className="text-green-600">{s.active.toLocaleString()}</TableCell>
                                <TableCell className="text-yellow-600">{s.pending.toLocaleString()}</TableCell>
                                <TableCell><Badge className="bg-green-100 text-green-800">{((s.active/s.total)*100).toFixed(1)}%</Badge></TableCell>
                            </TableRow>
                        ))}
                    </TableBody></Table>
                </CardContent>
            </Card>
        </div>
      )}

      {/* --- TAB: INTERNSHIPS (NEW FEATURE) --- */}
      {currentTab === 'interns' && (
        <div className="space-y-6">
            <h2 className="text-2xl text-[#002147]">Internship Tracking & Certification</h2>
            <Card>
                <CardHeader>
                    <CardTitle>Active DBT Sahayaks</CardTitle>
                    <CardDescription>Track volunteer progress and issue certificates.</CardDescription>
                </CardHeader>
                <CardContent>
                    {volunteers.length === 0 ? <p className="text-gray-500 text-center py-6">No active interns found.</p> : (
                        <Table>
                            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>District</TableHead><TableHead>Duration</TableHead><TableHead>Progress (Timeline)</TableHead><TableHead>Action</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {volunteers.map((vol) => {
                                    const { percent, isComplete, daysLeft } = calculateProgress(vol.start_date, vol.duration_months);
                                    return (
                                        <TableRow key={vol.id}>
                                            <TableCell className="font-medium">
                                                {vol.full_name}<br/>
                                                <span className="text-xs text-gray-500">{vol.email}</span>
                                            </TableCell>
                                            <TableCell>{vol.district}, {vol.state || 'India'}</TableCell>
                                            <TableCell><Badge variant="outline">{vol.duration_months} Month(s)</Badge></TableCell>
                                            <TableCell className="w-1/3">
                                                <div className="space-y-1">
                                                    <div className="flex justify-between text-xs text-gray-500">
                                                        <span>Started: {new Date(vol.start_date).toLocaleDateString()}</span>
                                                        <span>{isComplete ? "Completed" : `${daysLeft} days left`}</span>
                                                    </div>
                                                    <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                                        <div className={`h-full ${isComplete ? 'bg-green-600' : 'bg-blue-600'}`} style={{ width: `${percent}%` }}></div>
                                                    </div>
                                                    <div className="text-xs text-right font-bold">{percent}%</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {isComplete ? (
                                                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700" onClick={() => handleIssueCertificate(vol)}>
                                                        <Award className="w-4 h-4 mr-2"/> Issue Certificate
                                                    </Button>
                                                ) : (
                                                    <Button size="sm" variant="secondary" disabled>In Progress</Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
      )}

      {/* --- TAB: APPROVALS --- */}
      {currentTab === 'approvals' && (
        <div className="space-y-6">
          <h2 className="text-2xl text-[#002147]">Account Approval Requests</h2>
          <Card>
            <CardHeader><CardTitle>Pending Institute/Panchayat Registrations</CardTitle></CardHeader>
            <CardContent>
                <Table><TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Name</TableHead><TableHead>Type</TableHead><TableHead>Location</TableHead><TableHead>Date</TableHead><TableHead>Action</TableHead></TableRow></TableHeader>
                <TableBody>
                    {pendingApprovals.map((req) => (
                        <TableRow key={req.id}>
                            <TableCell>{req.id}</TableCell>
                            <TableCell className="font-medium">{req.name}</TableCell>
                            <TableCell><Badge variant="outline">{req.type}</Badge></TableCell>
                            <TableCell>{req.location}</TableCell>
                            <TableCell>{req.date}</TableCell>
                            <TableCell className="flex gap-2">
                                <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={()=>alert("Account Approved (Demo)")}>Approve</Button>
                                <Button size="sm" variant="destructive" onClick={()=>alert("Account Rejected (Demo)")}>Reject</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody></Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* --- TAB: USERS (REAL) --- */}
      {currentTab === 'users' && (
        <div className="space-y-6">
          <Input placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <Card><CardContent className="pt-6"><Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Role</TableHead><TableHead>Location</TableHead><TableHead>Date</TableHead></TableRow></TableHeader><TableBody>
            {filteredRealUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.full_name || 'Admin'}</TableCell>
                <TableCell><Badge variant="outline">{user.role}</Badge></TableCell>
                <TableCell>{user.role === 'institute' ? user.address : (user.district || 'India')}</TableCell>
                <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody></Table></CardContent></Card>
        </div>
      )}

      {/* --- TAB: LOGS & VERIFICATIONS (REAL WORKFLOW) --- */}
      {currentTab === 'logs' && (
        <div className="space-y-6">
          <h2 className="text-2xl text-[#002147]">Verifications & Activity</h2>
          
          <Card className="border-2 border-blue-500">
            <CardHeader className="bg-blue-50"><CardTitle className="flex items-center gap-2 text-blue-800"><Shield className="w-5 h-5"/> Final Verification Queue</CardTitle><CardDescription>Applications verified by Institute, awaiting Govt. Approval</CardDescription></CardHeader>
            <CardContent>
              {adminTickets.length === 0 ? <p className="text-center p-4">No applications pending final approval.</p> : (
                <Table>
                  <TableHeader><TableRow><TableHead>Student</TableHead><TableHead>Details</TableHead><TableHead>Institute Status</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {adminTickets.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell className="font-medium">{t.user_name}</TableCell>
                        <TableCell>{t.description}</TableCell>
                        <TableCell><Badge className="bg-green-100 text-green-800">Verified</Badge></TableCell>
                        <TableCell className="flex gap-2">
                            <Button size="sm" className="bg-[#002147] hover:bg-blue-900" onClick={() => handleFinalVerify(t.id)}>Final Verify</Button>
                            <Button size="sm" variant="destructive" onClick={() => handleReject(t.id)}>Reject</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card><CardHeader><CardTitle>Panchayat Events</CardTitle></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead></TableRow></TableHeader><TableBody>
              {realEvents.map((e) => (<TableRow key={e.id}><TableCell>{e.title}</TableCell><TableCell>{e.status}</TableCell><TableCell>{e.date}</TableCell></TableRow>))}
            </TableBody></Table></CardContent>
          </Card>
        </div>
      )}

      {/* --- TAB: REPORTS (DEMO) --- */}
      {currentTab === 'reports' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {[{ title: 'National Overview' }, { title: 'User Stats' }].map((report, index) => (
              <Card key={index}><CardHeader><CardTitle>{report.title}</CardTitle></CardHeader><CardContent><Button className="w-full bg-[#002147]" onClick={() => alert(`Downloading ${report.title}...`)}><Download className="mr-2 h-4 w-4"/> Download Report</Button></CardContent></Card>
            ))}
          </div>
        </div>
      )}

      {currentTab === 'settings' && <div className="space-y-6"><Button variant="destructive" onClick={() => { supabase.auth.signOut(); window.location.reload(); }}>Log Out</Button></div>}
    </DashboardLayout>
  );
}