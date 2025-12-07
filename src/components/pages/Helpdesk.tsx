import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  HelpCircle,
  Search,
  MessageCircle,
  FileText,
  Video,
  BookOpen,
  Phone,
  Mail,
  ExternalLink,
  Download,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function Helpdesk() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      category: 'Student',
      questions: [
        {
          q: 'How do I register on the DBT portal?',
          a: 'Visit the portal, click on "Student Registration", fill in your details including Aadhaar and bank account information, upload required documents, and submit. You will receive a registration ID to track your application.'
        },
        {
          q: 'What documents are required for DBT verification?',
          a: 'You need: Aadhaar card, bank account details, student ID, income certificate, caste certificate (if applicable), previous year mark sheets, and passport-size photographs.'
        },
        {
          q: 'How long does the verification process take?',
          a: 'The complete verification process typically takes 30-35 working days, including document verification (7-10 days), institution approval (5-7 days), and DBT verification (3-5 days).'
        },
        {
          q: 'How can I track my DBT application status?',
          a: 'Log in to your student dashboard using your registration ID and password. Your application status will be displayed on the main dashboard with detailed timeline.'
        },
        {
          q: 'What if my bank account is not linked with Aadhaar?',
          a: 'You must link your Aadhaar with your bank account before applying. Visit your bank branch with Aadhaar card or use online banking services to complete the linkage.'
        }
      ]
    },
    {
      category: 'Institution',
      questions: [
        {
          q: 'How can institutions register on the portal?',
          a: 'Institutions need to submit registration with valid DISE/AISHE code, recognition certificates, nodal officer details, and digital signature. The verification takes 10-15 working days.'
        },
        {
          q: 'What is the format for bulk student data upload?',
          a: 'Download the CSV template from the portal. Fill in student details as per the format (Aadhaar, bank details, enrollment no., etc.), validate data, and upload. Maximum 1000 records per file.'
        },
        {
          q: 'How do we verify student applications?',
          a: 'Log in to institution dashboard, go to "Pending Verifications", review student details and documents, verify attendance (minimum 75%), and approve or reject with remarks.'
        },
        {
          q: 'What if there are errors in uploaded data?',
          a: 'After upload, you will see an error summary. Download the error report, correct the mistakes in your CSV file, and re-upload. Only error-free records will be processed.'
        }
      ]
    },
    {
      category: 'Panchayat',
      questions: [
        {
          q: 'What is the role of Gram Panchayat in DBT?',
          a: 'Gram Panchayats conduct awareness campaigns, verify beneficiaries at village level, assist in Aadhaar-bank linkage, monitor disbursements, and report issues to district authorities.'
        },
        {
          q: 'How to organize an awareness event?',
          a: 'Plan the event in advance, book venue, create event in portal, invite beneficiaries, prepare educational materials, conduct registration drive, and submit event report with photos within 7 days.'
        },
        {
          q: 'How can we track beneficiaries in our village?',
          a: 'Use the village-wise tracking feature in your dashboard. Filter by your panchayat code to see all registered beneficiaries, their verification status, and payment details.'
        }
      ]
    },
    {
      category: 'Technical',
      questions: [
        {
          q: 'I forgot my password. How do I reset it?',
          a: 'Click on "Forgot Password" on the login page, enter your registered email or Aadhaar number, and follow the instructions sent to your email/mobile.'
        },
        {
          q: 'Why am I unable to upload documents?',
          a: 'Ensure documents are in PDF format, file size is less than 2MB, file name has no special characters, and you have stable internet connection. Clear browser cache if issue persists.'
        },
        {
          q: 'The portal is showing error. What should I do?',
          a: 'Note down the error code/message, clear browser cache and cookies, try a different browser (Chrome/Firefox recommended), or contact helpdesk at 1800-11-8004 with the error details.'
        },
        {
          q: 'Which browsers are supported?',
          a: 'The portal works best on Google Chrome (v90+), Mozilla Firefox (v88+), Microsoft Edge (v90+), and Safari (v14+). Ensure JavaScript is enabled.'
        }
      ]
    }
  ];

  const tutorials = [
    { title: 'Student Registration Process', duration: '5:30', type: 'video', views: '125K' },
    { title: 'Institution Bulk Upload Guide', duration: '8:15', type: 'video', views: '45K' },
    { title: 'Panchayat Event Management', duration: '6:45', type: 'video', views: '32K' },
    { title: 'DBT Verification Steps', duration: '4:20', type: 'video', views: '98K' },
    { title: 'How to Track Application Status', duration: '3:10', type: 'video', views: '156K' },
    { title: 'Document Upload Guidelines', duration: '5:00', type: 'video', views: '78K' }
  ];

  const knowledgeBase = [
    { title: 'Complete User Manual', pages: '120', downloads: '45K' },
    { title: 'Quick Start Guide', pages: '15', downloads: '89K' },
    { title: 'Troubleshooting Guide', pages: '35', downloads: '67K' },
    { title: 'API Documentation', pages: '80', downloads: '12K' },
    { title: 'Security Best Practices', pages: '25', downloads: '34K' }
  ];

  const ticketStats = [
    { label: 'Avg Response Time', value: '2.5 hrs', icon: Clock, color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Resolution Rate', value: '96.8%', icon: CheckCircle, color: 'text-green-600 dark:text-green-400' },
    { label: 'Active Tickets', value: '234', icon: AlertCircle, color: 'text-orange-600 dark:text-orange-400' },
    { label: 'Satisfied Users', value: '98.2%', icon: HelpCircle, color: 'text-purple-600 dark:text-purple-400' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#002147] to-[#003366] dark:from-gray-800 dark:to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <HelpCircle className="w-12 h-12" />
            <h1 className="text-4xl">Helpdesk & Support</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl mb-8">
            Find answers to your questions, access tutorials, and get support from our dedicated team
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for help articles, FAQs, or tutorials..."
                className="pl-10 py-6 text-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Support Stats */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ticketStats.map((stat, index) => (
            <Card key={index} className="dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-3xl mt-2 dark:text-white">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-12 h-12 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Support Options */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl mb-6 text-gray-900 dark:text-white">Quick Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl mb-2 dark:text-white">Call Helpline</h3>
              <p className="text-2xl text-blue-600 dark:text-blue-400 mb-2">1800-11-8004</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Available 24x7</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl mb-2 dark:text-white">Live Chat</h3>
              <Button className="mt-2 bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-800">
                Start Chat
              </Button>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">9 AM - 6 PM</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl mb-2 dark:text-white">Email Support</h3>
              <p className="text-lg text-orange-600 dark:text-orange-400 mb-2">support@dbtportal.gov.in</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Response in 48 hours</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl mx-auto dark:bg-gray-800">
            <TabsTrigger value="faq" className="dark:data-[state=active]:bg-gray-700">
              <BookOpen className="w-4 h-4 mr-2" />
              FAQs
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="dark:data-[state=active]:bg-gray-700">
              <Video className="w-4 h-4 mr-2" />
              Tutorials
            </TabsTrigger>
            <TabsTrigger value="docs" className="dark:data-[state=active]:bg-gray-700">
              <FileText className="w-4 h-4 mr-2" />
              Documentation
            </TabsTrigger>
          </TabsList>

          {/* FAQs */}
          <TabsContent value="faq">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {faqs.map((category, idx) => (
                <Card key={idx} className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="dark:text-white">
                      {category.category} FAQs
                      <Badge className="ml-2 dark:bg-blue-900 dark:text-blue-300">{category.questions.length}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible>
                      {category.questions.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left dark:text-white">{faq.q}</AccordionTrigger>
                          <AccordionContent className="text-gray-700 dark:text-gray-300">
                            {faq.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tutorials */}
          <TabsContent value="tutorials">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Video Tutorials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tutorials.map((tutorial, index) => (
                    <div
                      key={index}
                      className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer dark:hover:bg-gray-700"
                    >
                      <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                        <Video className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                      </div>
                      <h3 className="mb-2 dark:text-white">{tutorial.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>{tutorial.duration}</span>
                        <span>{tutorial.views} views</span>
                      </div>
                      <Button variant="link" className="p-0 h-auto mt-2 text-blue-600 dark:text-blue-400">
                        Watch Now <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documentation */}
          <TabsContent value="docs">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Knowledge Base</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {knowledgeBase.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-red-600 dark:text-red-400" />
                        <div>
                          <p className="dark:text-white">{doc.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {doc.pages} pages • {doc.downloads} downloads
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="dark:hover:bg-gray-600">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Still Need Help Section */}
      <div className="bg-gradient-to-r from-[#FF9933] to-[#FF6B00] dark:from-orange-900 dark:to-orange-800 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl mb-4">Still Need Help?</h2>
          <p className="text-xl opacity-90 mb-8">
            Our support team is available to assist you
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-white text-[#FF9933] hover:bg-gray-100">
              <MessageCircle className="w-5 h-5 mr-2" />
              Submit a Ticket
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Phone className="w-5 h-5 mr-2" />
              Call Helpline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
