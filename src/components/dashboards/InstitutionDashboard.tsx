import { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Input } from '../ui/input';
import {
  Home,
  Users,
  Upload,
  FileText,
  Download,
  Settings,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Bell,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface InstitutionDashboardProps {
  onNavigate: (page: string) => void;
}

export default function InstitutionDashboard({ onNavigate }: InstitutionDashboardProps) {
  const [currentTab, setCurrentTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const studentsData = [
    { id: 'ST001', name: 'Amit Sharma', course: 'B.Tech CSE', year: '3rd', dbtStatus: 'enabled', aadhaar: '•••• 2345', bank: 'SBI' },
    { id: 'ST002', name: 'Priya Patel', course: 'B.Sc Physics', year: '2nd', dbtStatus: 'enabled', aadhaar: '•••• 6789', bank: 'HDFC' },
    { id: 'ST003', name: 'Rahul Verma', course: 'B.Com', year: '1st', dbtStatus: 'pending', aadhaar: '•••• 1234', bank: 'PNB' },
    { id: 'ST004', name: 'Sneha Gupta', course: 'B.Tech EE', year: '4th', dbtStatus: 'enabled', aadhaar: '•••• 5678', bank: 'SBI' },
    { id: 'ST005', name: 'Vikram Singh', course: 'BBA', year: '2nd', dbtStatus: 'not-enabled', aadhaar: 'Not Linked', bank: 'ICICI' },
  ];

  const statsData = {
    total: 1250,
    verified: 1065,
    pending: 125,
    notEnabled: 60,
    sessions: 18,
  };

  const chartData = [
    { month: 'Jul', verified: 820 },
    { month: 'Aug', verified: 920 },
    { month: 'Sep', verified: 980 },
    { month: 'Oct', verified: 1040 },
    { month: 'Nov', verified: 1065 },
  ];

  const pieData = [
    { name: 'DBT Enabled', value: 1065, color: '#22c55e' },
    { name: 'Pending', value: 125, color: '#f59e0b' },
    { name: 'Not Enabled', value: 60, color: '#ef4444' },
  ];

  const sidebar = (
    <nav className="py-4">
      {[
        { id: 'home', label: 'Dashboard', icon: Home },
        { id: 'students', label: 'Students', icon: Users },
        { id: 'upload', label: 'Upload Data', icon: Upload },
        { id: 'reports', label: 'Reports', icon: FileText },
        { id: 'notices', label: 'Notices', icon: Bell },
        { id: 'resources', label: 'Resources', icon: Download },
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
      title="Institution Dashboard"
      userRole="Institution Admin"
      userName="ABC College"
      onNavigate={onNavigate}
      sidebar={sidebar}
    >
      {currentTab === 'home' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl text-[#002147] mb-1">Institution Overview</h2>
            <p className="text-gray-600">Monitor student DBT status and manage verification activities</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-5 gap-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Students</p>
                    <p className="text-3xl text-[#002147]">{statsData.total}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">DBT Verified</p>
                    <p className="text-3xl text-green-600">{statsData.verified}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-3xl text-yellow-600">{statsData.pending}</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Not Enabled</p>
                    <p className="text-3xl text-red-600">{statsData.notEnabled}</p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Sessions Held</p>
                    <p className="text-3xl text-purple-600">{statsData.sessions}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>DBT Verification Trend</CardTitle>
                <CardDescription>Monthly progress of student verification</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="verified" fill="#002147" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Distribution</CardTitle>
                <CardDescription>Current DBT status breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
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

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <Button className="bg-[#002147] hover:bg-[#003366]" onClick={() => setCurrentTab('upload')}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload CSV
                </Button>
                <Button variant="outline" onClick={() => setCurrentTab('reports')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" onClick={() => setCurrentTab('notices')}>
                  <Bell className="w-4 h-4 mr-2" />
                  Post Notice
                </Button>
                <Button variant="outline" onClick={() => setCurrentTab('resources')}>
                  <Download className="w-4 h-4 mr-2" />
                  Download Materials
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: 'Nov 13, 2025', action: '45 students verified in DBT camp', type: 'success' },
                  { date: 'Nov 10, 2025', action: 'Awareness session conducted in Block A', type: 'info' },
                  { date: 'Nov 8, 2025', action: 'Monthly report generated and submitted', type: 'success' },
                  { date: 'Nov 5, 2025', action: 'New batch of 120 students uploaded', type: 'info' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex-1">
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

      {currentTab === 'students' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl text-[#002147] mb-1">Student Management</h2>
              <p className="text-gray-600">View and manage registered students and their DBT status</p>
            </div>
            <Button className="bg-[#002147] hover:bg-[#003366]">
              <Users className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search by name, ID, or course..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Students Table */}
          <Card>
            <CardHeader>
              <CardTitle>Student List</CardTitle>
              <CardDescription>Showing {studentsData.length} of {statsData.total} students</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Aadhaar</TableHead>
                    <TableHead>Bank</TableHead>
                    <TableHead>DBT Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentsData.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell>{student.year}</TableCell>
                      <TableCell>{student.aadhaar}</TableCell>
                      <TableCell>{student.bank}</TableCell>
                      <TableCell>
                        {student.dbtStatus === 'enabled' && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Enabled
                          </Badge>
                        )}
                        {student.dbtStatus === 'pending' && (
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            <Clock className="w-3 h-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                        {student.dbtStatus === 'not-enabled' && (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                            <XCircle className="w-3 h-3 mr-1" />
                            Not Enabled
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {currentTab === 'upload' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl text-[#002147] mb-1">Upload Student Data</h2>
            <p className="text-gray-600">Bulk upload verified student records via CSV</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload CSV File</CardTitle>
                <CardDescription>Upload a CSV file with student verification data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#002147] transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="mb-2">Drag and drop your CSV file here</p>
                  <p className="text-sm text-gray-500 mb-4">or</p>
                  <Button variant="outline">Browse Files</Button>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• Maximum file size: 10 MB</p>
                  <p>• Supported format: CSV only</p>
                  <p>• Ensure data follows the template format</p>
                </div>
                <Button className="w-full bg-[#002147] hover:bg-[#003366]">
                  Upload & Process
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CSV Template & Guidelines</CardTitle>
                <CardDescription>Download template and follow these guidelines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-[#E6F0FF] p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Required Columns:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Student ID</li>
                    <li>• Full Name</li>
                    <li>• Course & Year</li>
                    <li>• Aadhaar Number (masked)</li>
                    <li>• Bank Name</li>
                    <li>• Account Number (masked)</li>
                    <li>• DBT Status (enabled/pending/not-enabled)</li>
                  </ul>
                </div>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download CSV Template
                </Button>
                <div className="text-sm text-gray-600">
                  <h4 className="font-medium mb-2">Important Notes:</h4>
                  <ul className="space-y-1">
                    <li>• Do not modify column headers</li>
                    <li>• Use only allowed status values</li>
                    <li>• Ensure no duplicate Student IDs</li>
                    <li>• Verify data accuracy before upload</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Uploads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: 'Nov 5, 2025', file: 'batch_nov_2025.csv', records: 120, status: 'success' },
                  { date: 'Oct 28, 2025', file: 'verification_oct.csv', records: 95, status: 'success' },
                  { date: 'Oct 15, 2025', file: 'new_students.csv', records: 150, status: 'success' },
                ].map((upload, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#002147]" />
                      <div>
                        <div className="font-medium">{upload.file}</div>
                        <div className="text-sm text-gray-600">{upload.date} • {upload.records} records</div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Success</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {currentTab === 'reports' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl text-[#002147] mb-1">Awareness Reports</h2>
            <p className="text-gray-600">Generate and download institutional reports</p>
          </div>

          <Card className="border-2 border-[#002147]">
            <CardHeader className="bg-[#E6F0FF]">
              <CardTitle>Current Month Summary</CardTitle>
              <CardDescription>November 2025</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-green-50 rounded">
                  <div className="text-3xl text-green-600 mb-1">85%</div>
                  <div className="text-sm text-gray-600">Students DBT-Enabled</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded">
                  <div className="text-3xl text-blue-600 mb-1">18</div>
                  <div className="text-sm text-gray-600">Awareness Sessions</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded">
                  <div className="text-3xl text-purple-600 mb-1">245</div>
                  <div className="text-sm text-gray-600">Students Verified</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded">
                  <div className="text-3xl text-orange-600 mb-1">6</div>
                  <div className="text-sm text-gray-600">Verification Camps</div>
                </div>
              </div>
              <Button className="w-full bg-[#002147] hover:bg-[#003366]">
                <Download className="w-4 h-4 mr-2" />
                Download Monthly Report (PDF)
              </Button>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Annual Report 2024-25', period: 'April 2024 - March 2025', type: 'Comprehensive' },
              { title: 'Quarterly Report Q3', period: 'July - September 2025', type: 'Summary' },
              { title: 'Department-wise Status', period: 'As of November 2025', type: 'Breakdown' },
              { title: 'Camp Activity Report', period: 'Last 6 months', type: 'Activity Log' },
            ].map((report, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{report.title}</CardTitle>
                  <CardDescription>{report.period}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">{report.type}</Badge>
                    <FileText className="w-8 h-8 text-[#002147]" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Excel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {currentTab === 'notices' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl text-[#002147] mb-1">Notices & Announcements</h2>
              <p className="text-gray-600">Post updates about DBT camps and verification drives</p>
            </div>
            <Button className="bg-[#002147] hover:bg-[#003366]">
              <Bell className="w-4 h-4 mr-2" />
              Post New Notice
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Create Notice</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Notice Title</label>
                <Input placeholder="e.g., DBT Verification Camp - December 2025" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Category</label>
                <select className="w-full mt-1 p-2 border rounded">
                  <option>Verification Camp</option>
                  <option>Awareness Session</option>
                  <option>Important Update</option>
                  <option>General Announcement</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Notice Description</label>
                <textarea 
                  className="w-full mt-1 p-2 border rounded h-32" 
                  placeholder="Write your notice details here..."
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Input type="date" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Venue</label>
                  <Input placeholder="e.g., College Auditorium" className="mt-1" />
                </div>
              </div>
              <Button className="w-full bg-[#002147] hover:bg-[#003366]">
                Publish Notice
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Notices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: 'DBT Verification Camp - December 2025',
                    date: 'Dec 15-16, 2025',
                    category: 'Verification Camp',
                    description: 'Two-day camp for DBT verification and Aadhaar linking support.',
                  },
                  {
                    title: 'Mandatory DBT Status Check',
                    date: 'Before Dec 31, 2025',
                    category: 'Important Update',
                    description: 'All students must verify their DBT status before year-end.',
                  },
                  {
                    title: 'Awareness Session for 1st Year Students',
                    date: 'Dec 5, 2025',
                    category: 'Awareness Session',
                    description: 'Introduction to DBT benefits and enrollment process.',
                  },
                ].map((notice, index) => (
                  <div key={index} className="p-4 border rounded hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium">{notice.title}</h3>
                      <Badge variant="outline">{notice.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notice.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{notice.date}</span>
                      <div className="space-x-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Delete</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {currentTab === 'resources' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl text-[#002147] mb-1">Training Materials & Resources</h2>
            <p className="text-gray-600">Download posters, guides, and training materials</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'DBT Awareness Poster (Hindi)', type: 'JPG', size: '2.1 MB', category: 'Poster' },
              { title: 'DBT Awareness Poster (English)', type: 'JPG', size: '1.9 MB', category: 'Poster' },
              { title: 'Institution Admin Manual', type: 'PDF', size: '4.5 MB', category: 'Guide' },
              { title: 'Verification Camp Guidelines', type: 'PDF', size: '1.2 MB', category: 'Guide' },
              { title: 'Student Presentation Template', type: 'PPT', size: '3.8 MB', category: 'Template' },
              { title: 'DBT FAQ Handout', type: 'PDF', size: '890 KB', category: 'Document' },
            ].map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-[#E6F0FF] p-4 rounded-full mb-3">
                      <FileText className="w-8 h-8 text-[#002147]" />
                    </div>
                    <Badge variant="outline" className="mb-2">{resource.category}</Badge>
                    <h3 className="mb-2">{resource.title}</h3>
                    <div className="text-sm text-gray-600 mb-4">
                      {resource.type} • {resource.size}
                    </div>
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
