import { useState, useEffect } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import {
  Home,
  Users,
  TrendingUp,
  Download,
  Settings,
  Shield,
  AlertCircle,
  CheckCircle,
  Activity,
  MapPin,
  Building2,
  Clock,
  Search,
  X,
  XCircle,
  MessageSquare // Added for tickets
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';

// --- IMPORT SUPABASE ---
import { supabase } from '../../supabaseClient';

// Helper for icon compatibility
const Award = TrendingUp; 

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [currentTab, setCurrentTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  // --- REAL DATA STATES ---
  const [realUsers, setRealUsers] = useState<any[]>([]);
  const [realTickets, setRealTickets] = useState<any[]>([]); // <--- New State for Tickets
  const [loading, setLoading] = useState(false);

  // --- FETCH REAL DATA (Users & Tickets) ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // 1. Fetch Users
      const { data: userData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (userData) setRealUsers(userData);

      // 2. Fetch Tickets
      const { data: ticketData } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (ticketData) setRealTickets(ticketData);

      setLoading(false);
    };

    fetchData();
  }, []);

  // Filter Logic for Real Users
  const filteredRealUsers = realUsers.filter(user => {
    const term = searchQuery.toLowerCase();
    const name = (user.full_name || user.panchayat_name || 'Admin').toLowerCase();
    const role = (user.role || '').toLowerCase();
    const id = (user.aadhaar || user.panchayat_id || user.username || '').toLowerCase();
    return name.includes(term) || role.includes(term) || id.includes(term);
  });


  // --- DUMMY DATA FOR CHARTS (Visuals only) ---
  const nationalStats = {
    totalStudents: 2548920,
    dbtEnabled: 2183182,
    institutions: 5240,
    panchayats: 12450,
    avgDisbursalTime: 2.3,
  };

  const stateData = [
    { state: 'Uttar Pradesh', enabled: 385420, pending: 45230, total: 430650, percentage: 89 },
    { state: 'Maharashtra', enabled: 342180, pending: 38920, total: 381100, percentage: 90 },
    { state: 'Bihar', enabled: 298540, pending: 51460, total: 350000, percentage: 85 },
    { state: 'West Bengal', enabled: 276420, pending: 33580, total: 310000, percentage: 89 },
    { state: 'Madhya Pradesh', enabled: 234180, pending: 25820, total: 260000, percentage: 90 },
  ];

  const monthlyTrend = [
    { month: 'Jun', students: 1920000, institutions: 4800 },
    { month: 'Jul', students: 2080000, institutions: 4950 },
    { month: 'Aug', students: 2240000, institutions: 5050 },
    { month: 'Sep', students: 2380000, institutions: 5150 },
    { month: 'Oct', students: 2480000, institutions: 5200 },
    { month: 'Nov', students: 2548920, institutions: 5240 },
  ];

  const disbursalData = [
    { bank: 'SBI', avgTime: 1.8, count: 685420 },
    { bank: 'HDFC', avgTime: 2.1, count: 432180 },
    { bank: 'PNB', avgTime: 2.5, count: 398540 },
    { bank: 'ICICI', avgTime: 2.0, count: 356920 },
    { bank: 'Others', avgTime: 2.8, count: 310062 },
  ];

  const topPanchayats = [
    { name: 'Rampur GP, Varanasi, UP', progress: 95, students: 156, rank: 1 },
    { name: 'Khadki GP, Pune, MH', progress: 94, students: 189, rank: 2 },
    { name: 'Sultanpur GP, Patna, BR', progress: 93, students: 142, rank: 3 },
    { name: 'Bardhaman GP, WB', progress: 92, students: 178, rank: 4 },
    { name: 'Indore Rural GP, MP', progress: 91, students: 165, rank: 5 },
  ];

  const pendingApprovals = [
    { id: 'REQ-1243', type: 'Institution', name: 'XYZ College, Delhi', date: 'Nov 12, 2025', status: 'pending' },
    { id: 'REQ-1244', type: 'Panchayat', name: 'Ramgarh GP, Jharkhand', date: 'Nov 11, 2025', status: 'pending' },
    { id: 'REQ-1245', type: 'Institution', name: 'ABC University, Kerala', date: 'Nov 10, 2025', status: 'pending' },
  ];

  const pieData = [
    { name: 'DBT Enabled', value: 86, color: '#22c55e' },
    { name: 'Pending', value: 10, color: '#f59e0b' },
    { name: 'Not Enabled', value: 4, color: '#ef4444' },
  ];

  const sidebar = (
    <nav className="py-4 bg-[#001633]">
      {[
        { id: 'home', label: 'Dashboard', icon: Home },
        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'approvals', label: 'Approvals', icon: Shield },
        { id: 'logs', label: 'Tickets & Logs', icon: MessageSquare }, // Renamed for clarity
        { id: 'reports', label: 'Reports', icon: Download },
        { id: 'settings', label: 'Settings', icon: Settings },
      ].map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentTab(item.id)}
            className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
              currentTab === item.id
                ? 'bg-[#002147] text-white border-r-4 border-white'
                : 'text-gray-300 hover:bg-[#002147] hover:text-white'
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
      title="Super Admin Dashboard"
      userRole="System Administrator"
      userName="Admin Portal"
      onNavigate={onNavigate as any}
      sidebar={sidebar}
    >
      {/* --- TAB: HOME --- */}
      {currentTab === 'home' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#002147] p-3 rounded">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl text-[#002147]">National DBT Overview</h2>
              <p className="text-gray-600">Comprehensive analytics across all states and territories</p>
            </div>
          </div>

          {/* National Stats Cards */}
          <div className="grid md:grid-cols-5 gap-4">
            <Card className="bg-gradient-to-br from-[#002147] to-[#003366] text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Total Students</p>
                    <p className="text-3xl">{(nationalStats.totalStudents / 1000000).toFixed(2)}M</p>
                  </div>
                  <Users className="w-8 h-8 opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">DBT Enabled</p>
                    <p className="text-3xl">{(nationalStats.dbtEnabled / 1000000).toFixed(2)}M</p>
                  </div>
                  <CheckCircle className="w-8 h-8 opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Institutions</p>
                    <p className="text-3xl">{nationalStats.institutions.toLocaleString()}</p>
                  </div>
                  <Building2 className="w-8 h-8 opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-600 to-orange-700 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Panchayats</p>
                    <p className="text-3xl">{(nationalStats.panchayats / 1000).toFixed(1)}K</p>
                  </div>
                  <MapPin className="w-8 h-8 opacity-80" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Avg Disbursal</p>
                    <p className="text-3xl">{nationalStats.avgDisbursalTime} days</p>
                  </div>
                  <Clock className="w-8 h-8 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>National Growth Trend</CardTitle>
                <CardDescription>Student enrollment and institutional participation</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="students" stroke="#002147" name="Students" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="institutions" stroke="#FF9933" name="Institutions" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Distribution</CardTitle>
                <CardDescription>Overall DBT enablement status</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Top Panchayats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FF9933]" />
                Top Performing Panchayats
              </CardTitle>
              <CardDescription>Highest DBT enablement rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPanchayats.map((panchayat) => (
                  <div key={panchayat.rank} className="flex items-center gap-4 p-3 border rounded-lg hover:shadow-md transition-shadow">
                    <div className={`text-2xl font-bold ${panchayat.rank === 1 ? 'text-yellow-500' : panchayat.rank === 2 ? 'text-gray-400' : panchayat.rank === 3 ? 'text-orange-600' : 'text-gray-600'}`}>
                      #{panchayat.rank}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{panchayat.name}</div>
                      <div className="text-sm text-gray-600">{panchayat.students} students</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-[#138808]">{panchayat.progress}%</div>
                      <div className="text-xs text-gray-600">Progress</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* --- TAB: ANALYTICS --- */}
      {currentTab === 'analytics' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl text-[#002147] mb-1">State/District Analytics</h2>
            <p className="text-gray-600">Detailed breakdown of DBT awareness and enablement</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>State-wise DBT Scoreboard</CardTitle>
              <CardDescription>Performance metrics across all states</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>State</TableHead>
                    <TableHead>Total Students</TableHead>
                    <TableHead>DBT Enabled</TableHead>
                    <TableHead>Pending</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stateData.map((state) => (
                    <TableRow key={state.state}>
                      <TableCell className="font-medium">{state.state}</TableCell>
                      <TableCell>{state.total.toLocaleString()}</TableCell>
                      <TableCell className="text-green-600">{state.enabled.toLocaleString()}</TableCell>
                      <TableCell className="text-yellow-600">{state.pending.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${state.percentage >= 90 ? 'bg-green-600' : state.percentage >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${state.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-12">{state.percentage}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {state.percentage >= 90 ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Excellent</Badge>
                        ) : state.percentage >= 80 ? (
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Good</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Needs Focus</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Average Disbursal Time by Bank</CardTitle>
              <CardDescription>Performance metrics for scholarship disbursement</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={disbursalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bank" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avgTime" fill="#002147" name="Avg Time (days)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* --- TAB: USERS (REAL DATA) --- */}
      {currentTab === 'users' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl text-[#002147] mb-1">User Management</h2>
              <p className="text-gray-600">Live Database Records from Supabase</p>
            </div>
            <Button className="bg-[#002147] hover:bg-[#003366]">
              <Users className="w-4 h-4 mr-2" />
              Add New User
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search by name, type, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Registered Users</CardTitle>
              <CardDescription>{filteredRealUsers.length} active users found in database</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center p-8">Loading real users from database...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User ID / Mobile</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRealUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center p-8">
                          No users found in Supabase Database.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRealUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium font-mono">
                            {user.username || user.aadhaar || user.panchayat_id || 'N/A'}
                          </TableCell>
                          <TableCell className="font-medium">
                            {user.full_name || user.panchayat_name || 'Admin User'}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {user.role?.replace('_', ' ') || 'User'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {user.district || user.state ? `${user.district || ''}, ${user.state || ''}` : 'India'}
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              Active
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {new Date(user.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">Edit</Button>
                              <Button variant="ghost" size="sm" className="text-red-500">Suspend</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
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
          <div>
            <h2 className="text-2xl text-[#002147] mb-1">Account Approvals</h2>
            <p className="text-gray-600">Review and approve institution and panchayat registrations</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pending Approval Requests</CardTitle>
              <CardDescription>{pendingApprovals.length} requests awaiting review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((request) => (
                  <Card key={request.id} className="border-2 border-orange-200">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline">{request.type}</Badge>
                            <span className="text-sm text-gray-600">{request.id}</span>
                          </div>
                          <h3 className="text-lg font-medium mb-1">{request.name}</h3>
                          <div className="text-sm text-gray-600">Submitted: {request.date}</div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                          <Button size="sm" variant="outline">Review</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* --- TAB: LOGS & TICKETS (REAL TICKET DATA) --- */}
      {currentTab === 'logs' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl text-[#002147] mb-1">System Logs & Support Tickets</h2>
            <p className="text-gray-600">View real-time requests from students</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Open Tickets</p>
                    <p className="text-3xl">{realTickets.filter(t => t.status === 'open').length}</p>
                  </div>
                  <AlertCircle className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Resolved</p>
                    <p className="text-3xl">{realTickets.filter(t => t.status === 'resolved').length}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">System Errors</p>
                    <p className="text-3xl">0</p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* REAL TICKETS TABLE */}
          <Card>
            <CardHeader>
              <CardTitle>Incoming Requests & Tickets</CardTitle>
              <CardDescription>Live data from Student Dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? <p className="p-4 text-center">Loading tickets...</p> : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {realTickets.length === 0 ? (
                      <TableRow><TableCell colSpan={6} className="text-center p-6">No tickets raised yet.</TableCell></TableRow>
                    ) : (
                      realTickets.map((t) => (
                        <TableRow key={t.id}>
                          <TableCell className="font-medium">{t.user_name || 'Anonymous'}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={t.type === 'verification' ? 'border-orange-500 text-orange-600' : 'border-blue-500 text-blue-600'}>
                              {t.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-xs truncate" title={t.description}>{t.description}</TableCell>
                          <TableCell>
                            <Badge className={t.status === 'open' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                              {t.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-gray-500">{new Date(t.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">View</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {currentTab === 'reports' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl text-[#002147] mb-1">System Reports</h2>
            <p className="text-gray-600">Download comprehensive reports and data exports</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'National DBT Report', period: 'Monthly - November 2025', format: 'PDF', size: '8.5 MB' },
              { title: 'State-wise Analytics', period: 'Current Quarter', format: 'Excel', size: '3.2 MB' },
              { title: 'Institution Performance Report', period: 'Last 6 months', format: 'PDF', size: '6.8 MB' },
              { title: 'Panchayat Activity Log', period: 'Current Year', format: 'CSV', size: '2.1 MB' },
              { title: 'Student Database Export', period: 'As of today', format: 'Excel', size: '42.5 MB' },
              { title: 'Disbursal Time Analysis', period: 'Annual 2024-25', format: 'PDF', size: '4.3 MB' },
            ].map((report, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{report.title}</span>
                    <Badge variant="outline">{report.format}</Badge>
                  </CardTitle>
                  <CardDescription>{report.period}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-600">File size: {report.size}</div>
                    <Download className="w-8 h-8 text-[#002147]" />
                  </div>
                  <Button className="w-full bg-[#002147] hover:bg-[#003366]">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {currentTab === 'settings' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl text-[#002147] mb-1">System Settings</h2>
            <p className="text-gray-600">Configure portal settings and preferences</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Portal Name</label>
                <Input defaultValue="DBT Awareness & Verification Portal" className="mt-1" />
              </div>
              <Button className="bg-[#002147] hover:bg-[#003366]">Save Changes</Button>
              <div className="border-t pt-4 mt-4">
                 <Button variant="destructive" onClick={() => {
                    supabase.auth.signOut();
                    window.location.reload();
                 }}>
                    Log Out of Admin Console
                 </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}