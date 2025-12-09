import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import DashboardLayout from '../shared/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Input } from '../ui/input';
import {
  Home, Users, Upload, FileText, Download, TrendingUp, CheckCircle, XCircle, Clock,
  Search, Filter, Bell, AlertTriangle, Lock, Eye
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import { supabase } from '../../supabaseClient';
import { decryptData } from '../../utils/security';

interface InstitutionDashboardProps {
  onNavigate: (page: string) => void;
}

export default function InstitutionDashboard({ onNavigate }: InstitutionDashboardProps) {
  const [currentTab, setCurrentTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  
  // --- REAL DATA STATES ---
  const [realStudents, setRealStudents] = useState<any[]>([]);
  const [pendingVerifications, setPendingVerifications] = useState<any[]>([]);
  const [approvedHistory, setApprovedHistory] = useState<any[]>([]); 
  const [uploading, setUploading] = useState(false);

  // --- VERIFICATION FILTER STATE ---
  const [verificationTab, setVerificationTab] = useState<'pending' | 'approved'>('pending');

  // --- NOTICE STATES ---
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeDate, setNoticeDate] = useState('');
  const [noticeDesc, setNoticeDesc] = useState('');
  const [notices, setNotices] = useState<any[]>([]);
  const [loadingNotices, setLoadingNotices] = useState(false);

  // --- INSTITUTE RESOURCES DATA ---
  const instituteResources = [
    {
      title: "Institutional Onboarding Guide",
      fileName: "INSTITUTIONAL ONBOARDING GUIDE ENG.pdf",
      path: "/resources/INSTITUTE-resources/INSTITUTIONAL ONBOARDING GUIDE ENG.pdf"
    },
    {
      title: "DBT Schemes Reference",
      fileName: "DBTschemes.pdf",
      path: "/resources/INSTITUTE-resources/DBTschemes.pdf"
    },
    {
      title: "About Direct Benefit Transfer",
      fileName: "About Direct Benefit Transfer.pdf",
      path: "/resources/INSTITUTE-resources/About Direct Benefit Transfer.pdf"
    }
  ];

  // --- FETCH DATA ---
  const fetchData = async () => {
    // 1. Fetch Students
    const { data: students } = await supabase.from('profiles').select('*').eq('role', 'student');
    if (students) setRealStudents(students);

    // 2. Fetch Pending Verifications
    const { data: pending } = await supabase
        .from('tickets')
        .select('*')
        .in('status', ['pending_institute', 'open'])
        .order('created_at', { ascending: false });
    if (pending) setPendingVerifications(pending);

    // 3. Fetch Approved History
    const { data: approved } = await supabase
        .from('tickets')
        .select('*')
        .in('status', ['pending_admin', 'verified'])
        .order('created_at', { ascending: false });
    if (approved) setApprovedHistory(approved);

    // 4. Fetch Notices
    fetchNotices();
  };

  const fetchNotices = async () => {
    setLoadingNotices(true);
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .eq('panchayat_name', 'ABC College (Institute)')
      .order('created_at', { ascending: false });
    
    if (!error && events) setNotices(events);
    setLoadingNotices(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- HANDLERS ---
  const handleVerifyTicket = async (ticketId: string) => {
    const { error } = await supabase
        .from('tickets')
        .update({ status: 'pending_admin' }) 
        .eq('id', ticketId);

    if (error) {
        alert("Error: " + error.message);
    } else {
        alert("Verified! Application forwarded to Govt. Admin.");
        fetchData(); 
    }
  };

  const handleRejectTicket = async (ticketId: string) => {
    const { error } = await supabase
        .from('tickets')
        .update({ status: 'rejected' })
        .eq('id', ticketId);

    if (error) {
        alert("Error: " + error.message);
    } else {
        alert("Application Rejected.");
        fetchData(); 
    }
  };

  const handlePostNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle || !noticeDate) {
        alert("Please fill in the title and date.");
        return;
    }
    
    const { error } = await supabase.from('events').insert([{
        title: `NOTICE: ${noticeTitle}`,
        date: new Date(noticeDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        venue: 'Institute Campus',
        status: 'scheduled',
        description: noticeDesc,
        panchayat_name: 'ABC College (Institute)'
    }]);
    
    if (error) {
        alert("Error posting notice: " + error.message);
    } else {
        alert("Notice Posted Successfully!");
        setNoticeTitle('');
        setNoticeDate('');
        setNoticeDesc('');
        fetchNotices();
    }
  };

  const handleDeleteNotice = async (id: string) => {
      if(!window.confirm("Delete this notice?")) return;
      const { error } = await supabase.from('events').delete().eq('id', id);
      if(!error) fetchNotices();
  };

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
        setUploading(false);
        alert("✅ Success! 120 Student Records imported from CSV.");
    }, 1500);
  };

  // --- REPORT GENERATION (PDF) ---
  const handleGenerateReport = (type: 'verification' | 'students') => {
    const doc = new jsPDF();
    const today = new Date().toLocaleDateString('en-IN');

    doc.setFontSize(16);
    doc.text('DBT Institution Report', 14, 20);
    
    doc.setFontSize(11);
    doc.text('Institute: ABC College (Institute)', 14, 30);
    doc.text(`Generated on: ${today}`, 14, 36);

    if (type === 'verification') {
        doc.setFontSize(13);
        doc.text('Monthly Verification Summary', 14, 48);
        doc.setFontSize(11);
        doc.text(`Total Students: ${statsData.total}`, 14, 60);
        doc.text(`Verified Applications: ${statsData.verified}`, 14, 66);
        doc.text(`Pending Applications: ${statsData.pending}`, 14, 72);
        doc.text(`Rejected/Failed: ${statsData.notEnabled}`, 14, 78);
    } else {
        doc.setFontSize(13);
        doc.text('Student Status List', 14, 48);
        let y = 60;
        const studentsToPrint = realStudents.length > 0 ? realStudents.slice(0, 15) : demoStudents;
        studentsToPrint.forEach((s, i) => {
            doc.text(`${i+1}. ${s.full_name} - ${s.institute_name || 'ABC College'}`, 14, y);
            y += 8;
        });
    }

    doc.save(`${type}_report.pdf`);
  };

  // --- PARSE HELPER ---
  const parseTicketData = (description: string) => {
      try { return JSON.parse(description); } 
      catch (e) { return { text: description }; }
  };

  // --- DEMO DATA ---
  const statsData = { total: 1250, verified: 1065, pending: 125, notEnabled: 60, sessions: 18 };
  const chartData = [ { month: 'Jul', verified: 820 }, { month: 'Aug', verified: 920 }, { month: 'Sep', verified: 980 }, { month: 'Oct', verified: 1040 }, { month: 'Nov', verified: 1065 } ];
  const pieData = [ { name: 'Enabled', value: 1065, color: '#22c55e' }, { name: 'Pending', value: 125, color: '#f59e0b' }, { name: 'Not Enabled', value: 60, color: '#ef4444' } ];
  const demoStudents = [ { id: 'ST001', full_name: 'Amit Sharma', aadhaar: '•••• 2345', institute_name: 'Delhi Public School', created_at: '2025-11-01' } ];
  const displayStudents = realStudents.length > 0 ? realStudents : demoStudents;
  const filteredStudents = displayStudents.filter((s: any) => (s.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()));

  const sidebar = (
    <nav className="py-4">
      {[
        { id: 'home', label: 'Dashboard', icon: Home },
        { id: 'verifications', label: 'Verifications', icon: CheckCircle },
        { id: 'students', label: 'Student Database', icon: Users },
        { id: 'notices', label: 'Notices', icon: Bell },
        { id: 'reports', label: 'Reports', icon: FileText },
        { id: 'upload', label: 'Bulk Upload', icon: Upload },
        { id: 'resources', label: 'Resources', icon: Download },
      ].map((item) => (
        <button key={item.id} onClick={() => setCurrentTab(item.id)} className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${currentTab === item.id ? 'bg-[#E6F0FF] text-[#002147] border-r-4 border-[#002147]' : 'text-gray-600 hover:bg-gray-50'}`}>
          <item.icon className="w-5 h-5" /><span>{item.label}</span>
        </button>
      ))}
    </nav>
  );

  return (
    <DashboardLayout title="Institution Dashboard" userRole="Institution Admin" userName="ABC College" onNavigate={onNavigate} sidebar={sidebar}>
      
      {currentTab === 'home' && (
        <div className="space-y-6">
          <div><h2 className="text-2xl text-[#002147] mb-1">Institution Overview</h2><p className="text-gray-600">Monitor student DBT status</p></div>
          <div className="grid md:grid-cols-5 gap-4">
            <Card className="border-l-4 border-l-blue-500"><CardContent className="pt-6"><div className="flex justify-between"><div><p className="text-sm text-gray-600">Total Students</p><p className="text-3xl text-[#002147]">{statsData.total}</p></div><Users className="w-8 h-8 text-blue-500"/></div></CardContent></Card>
            <Card className="border-l-4 border-l-green-500"><CardContent className="pt-6"><div className="flex justify-between"><div><p className="text-sm text-gray-600">Verified</p><p className="text-3xl text-green-600">{statsData.verified}</p></div><CheckCircle className="w-8 h-8 text-green-500"/></div></CardContent></Card>
            <Card className="border-l-4 border-l-yellow-500"><CardContent className="pt-6"><div className="flex justify-between"><div><p className="text-sm text-gray-600">Pending</p><p className="text-3xl text-yellow-600">{statsData.pending}</p></div><Clock className="w-8 h-8 text-yellow-500"/></div></CardContent></Card>
            <Card className="border-l-4 border-l-red-500"><CardContent className="pt-6"><div className="flex justify-between"><div><p className="text-sm text-gray-600">Failed</p><p className="text-3xl text-red-600">{statsData.notEnabled}</p></div><XCircle className="w-8 h-8 text-red-500"/></div></CardContent></Card>
            <Card className="border-l-4 border-l-purple-500"><CardContent className="pt-6"><div className="flex justify-between"><div><p className="text-sm text-gray-600">Camps Held</p><p className="text-3xl text-purple-600">{statsData.sessions}</p></div><TrendingUp className="w-8 h-8 text-purple-500"/></div></CardContent></Card>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card><CardHeader><CardTitle>Verification Trend</CardTitle><CardDescription>Monthly Progress</CardDescription></CardHeader><CardContent><ResponsiveContainer width="100%" height={250}><BarChart data={chartData}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="month"/><YAxis/><Tooltip/><Bar dataKey="verified" fill="#002147"/></BarChart></ResponsiveContainer></CardContent></Card>
            <Card><CardHeader><CardTitle>Status Breakdown</CardTitle><CardDescription>Current Distribution</CardDescription></CardHeader><CardContent><ResponsiveContainer width="100%" height={250}><PieChart><Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>{pieData.map((e, i) => <Cell key={i} fill={e.color}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer></CardContent></Card>
          </div>
        </div>
      )}

      {/* --- VERIFICATION TAB --- */}
      {currentTab === 'verifications' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div><h2 className="text-2xl text-[#002147]">Verification Center</h2><p className="text-gray-600">Review student applications</p></div>
            <div className="flex bg-gray-100 p-1 rounded-lg">
                <button className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${verificationTab === 'pending' ? 'bg-white shadow text-blue-700' : 'text-gray-600 hover:text-gray-900'}`} onClick={()=>setVerificationTab('pending')}>
                    Pending Requests ({pendingVerifications.length})
                </button>
                <button className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${verificationTab === 'approved' ? 'bg-white shadow text-green-700' : 'text-gray-600 hover:text-gray-900'}`} onClick={()=>setVerificationTab('approved')}>
                    Approved History ({approvedHistory.length})
                </button>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
                <Table>
                    <TableHeader><TableRow><TableHead>Student Name</TableHead><TableHead>Data (Encrypted/View)</TableHead><TableHead>Date</TableHead><TableHead>Status / Action</TableHead></TableRow></TableHeader>
                    <TableBody>
                        {/* PENDING VIEW */}
                        {verificationTab === 'pending' && (
                            pendingVerifications.length === 0 ? <TableRow><TableCell colSpan={4} className="text-center p-8">No pending items.</TableCell></TableRow> :
                            pendingVerifications.map((ticket) => {
                                const data = parseTicketData(ticket.description);
                                return (
                                    <TableRow key={ticket.id}>
                                        <TableCell className="font-medium">{ticket.user_name}</TableCell>
                                        <TableCell>
                                            {data.bank_encrypted ? (
                                                <div className="space-y-1">
                                                    <div className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${data.ai_risk_level === 'CRITICAL' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                                        <AlertTriangle className="w-3 h-3 mr-1"/> AI Risk: {data.ai_risk_level || 'ANALYZING'}
                                                    </div>
                                                    <div className="text-xs text-blue-600 cursor-pointer flex items-center gap-1" onClick={() => alert(`DECRYPTED:\nBank: ${decryptData(data.bank_encrypted)}\nIFSC: ${decryptData(data.ifsc_encrypted)}`)}>
                                                        <Eye className="w-3 h-3"/> Decrypt Data
                                                    </div>
                                                </div>
                                            ) : <span>{ticket.description}</span>}
                                        </TableCell>
                                        <TableCell>{new Date(ticket.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell className="flex gap-2">
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleVerifyTicket(ticket.id)}>Verify</Button>
                                            <Button size="sm" variant="destructive" onClick={() => handleRejectTicket(ticket.id)}>Reject</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}

                        {/* APPROVED HISTORY VIEW */}
                        {verificationTab === 'approved' && (
                            approvedHistory.length === 0 ? <TableRow><TableCell colSpan={4} className="text-center p-8">No approved history found.</TableCell></TableRow> :
                            approvedHistory.map((ticket) => (
                                <TableRow key={ticket.id}>
                                    <TableCell className="font-medium">{ticket.user_name}</TableCell>
                                    <TableCell className="text-gray-500 italic">Data Verified & Processed</TableCell>
                                    <TableCell>{new Date(ticket.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        {ticket.status === 'verified' ? 
                                            <Badge className="bg-green-100 text-green-800">Fully Verified (Admin)</Badge> : 
                                            <Badge className="bg-blue-100 text-blue-800">Forwarded to Admin</Badge>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* --- UPDATED STUDENTS TAB WITH INSTITUTE COLUMN --- */}
      {currentTab === 'students' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center"><div><h2 className="text-2xl text-[#002147]">Student Database</h2></div><Button className="bg-[#002147]"><Users className="mr-2 h-4 w-4"/> Add</Button></div>
          <Card><CardContent className="pt-6"><Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Institute / School</TableHead><TableHead>Mobile</TableHead><TableHead>Aadhaar</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>
                {filteredStudents.map((s: any) => (
                    <TableRow key={s.id}>
                        <TableCell>{s.full_name}</TableCell>
                        {/* New Institute Column */}
                        <TableCell className="text-blue-700 font-medium">{s.institute_name || 'ABC College'}</TableCell> 
                        <TableCell>{s.username}</TableCell>
                        <TableCell>•••• {s.aadhaar?.slice(-4)}</TableCell>
                        <TableCell>{new Date(s.created_at).toLocaleDateString()}</TableCell>
                        <TableCell><Badge className="bg-green-100 text-green-800">Active</Badge></TableCell>
                    </TableRow>
                ))}
          </TableBody></Table></CardContent></Card>
        </div>
      )}

      {/* --- NOTICES TAB --- */}
      {currentTab === 'notices' && (
        <div className="space-y-6">
            <h2 className="text-2xl text-[#002147]">Notice Board</h2>
            <div className="grid lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                    <CardHeader><CardTitle>Post Notice</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={handlePostNotice} className="space-y-4">
                            <div><label className="text-sm font-medium">Title</label><Input value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)} required /></div>
                            <div><label className="text-sm font-medium">Date</label><Input type="date" value={noticeDate} onChange={(e) => setNoticeDate(e.target.value)} required/></div>
                            <div><label className="text-sm font-medium">Description</label><textarea className="w-full p-2 border rounded" value={noticeDesc} onChange={(e) => setNoticeDesc(e.target.value)}></textarea></div>
                            <Button type="submit" className="w-full bg-[#002147]">Publish</Button>
                        </form>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-2">
                    <CardHeader><CardTitle>Active Notices</CardTitle><CardDescription>Published for this Institute</CardDescription></CardHeader>
                    <CardContent>
                        {loadingNotices ? <p>Loading...</p> : (
                            <Table>
                                <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Date</TableHead><TableHead>Action</TableHead></TableRow></TableHeader>
                                <TableBody>
                                    {notices.length === 0 ? <TableRow><TableCell colSpan={3}>No notices found.</TableCell></TableRow> : 
                                    notices.map((n) => (
                                        <TableRow key={n.id}>
                                            <TableCell>{n.title}</TableCell>
                                            <TableCell>{n.date}</TableCell>
                                            <TableCell><Button variant="destructive" size="sm" onClick={() => handleDeleteNotice(n.id)}>Delete</Button></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
      )}

      {/* --- UPLOAD TAB --- */}
      {currentTab === 'upload' && (
        <div className="space-y-6">
            <h2 className="text-2xl text-[#002147]">Bulk Data Upload</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>Upload CSV</CardTitle><CardDescription>Import student records</CardDescription></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center hover:border-[#002147] transition-colors cursor-pointer">
                            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2"/>
                            <p className="text-sm text-gray-600">Drag & Drop CSV file here</p>
                            <Button variant="outline" className="mt-4">Browse Files</Button>
                        </div>
                        <Button className="w-full bg-[#002147]" onClick={handleUpload} disabled={uploading}>
                            {uploading ? "Processing Data..." : "Upload & Process"}
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Instructions</CardTitle></CardHeader>
                    <CardContent className="space-y-4 text-sm text-gray-600">
                        <div className="bg-blue-50 p-4 rounded">
                            <h4 className="font-bold text-blue-900 mb-2">Required Columns:</h4>
                            <ul className="list-disc pl-4 space-y-1"><li>Student Name</li><li>Aadhaar Number</li><li>Mobile Number</li></ul>
                        </div>
                        <Button variant="outline" className="w-full"><Download className="mr-2 h-4 w-4"/> Download Template</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
      )}

      {/* --- REPORTS TAB --- */}
      {currentTab === 'reports' && (
        <div className="space-y-6">
            <h2 className="text-2xl text-[#002147]">Institutional Reports</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader><CardTitle>Monthly Verification Report</CardTitle><CardDescription>Summary of verification status</CardDescription></CardHeader>
                    <CardContent>
                        <Button className="w-full bg-[#002147]" onClick={() => handleGenerateReport('verification')}>
                            <Download className="mr-2 h-4 w-4"/> Generate PDF
                        </Button>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                    <CardHeader><CardTitle>Student Status List</CardTitle><CardDescription>List of students and their status</CardDescription></CardHeader>
                    <CardContent>
                        <Button className="w-full bg-[#002147]" onClick={() => handleGenerateReport('students')}>
                            <Download className="mr-2 h-4 w-4"/> Generate PDF
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
      )}

      {/* --- RESOURCES TAB --- */}
      {currentTab === 'resources' && (
        <div className="space-y-6">
            <h2 className="text-2xl text-[#002147]">Downloads</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {instituteResources.map((res, i) => (
                    <Card key={i} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-6 text-center">
                            <FileText className="h-10 w-10 mx-auto text-blue-900 mb-3"/>
                            <p className="font-medium text-gray-800 text-sm h-10 flex items-center justify-center">{res.title}</p>
                            <Button variant="outline" size="sm" className="mt-2 w-full" onClick={() => window.open(res.path, '_blank')}>
                                Download
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      )}

    </DashboardLayout>
  );
}