import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import { 
  FileText, 
  Download, 
  Users, 
  Building2, 
  MapPin, 
  Shield,
  CheckCircle,
  AlertCircle,
  BookOpen
} from 'lucide-react';

export default function Guidelines() {
  const studentGuidelines = [
    {
      title: 'Eligibility Criteria',
      content: [
        'Must be a citizen of India',
        'Active student status in a recognized institution',
        'Valid Aadhaar number linked to bank account',
        'Family income within prescribed limits (as per scheme)',
        'Minimum attendance requirement (75% or as specified)'
      ]
    },
    {
      title: 'Required Documents',
      content: [
        'Aadhaar Card (original and photocopy)',
        'Bank account details with IFSC code',
        'Student ID card from institution',
        'Income certificate (issued by competent authority)',
        'Caste certificate (if applicable)',
        'Previous year mark sheets',
        'Passport size photographs',
        'Domicile certificate'
      ]
    },
    {
      title: 'Registration Process',
      content: [
        'Visit the DBT Portal (dbtportal.gov.in)',
        'Click on "Student Registration"',
        'Fill in personal details accurately',
        'Upload required documents (PDF format, max 2MB)',
        'Link Aadhaar and bank account',
        'Submit application and note registration ID',
        'Track application status regularly',
        'Complete verification process at institution'
      ]
    },
    {
      title: 'Verification Timeline',
      content: [
        'Application submission: Day 0',
        'Document verification: 7-10 working days',
        'Institution approval: 5-7 working days',
        'DBT verification: 3-5 working days',
        'Fund disbursement: Within 15 days of approval',
        'Total expected timeline: 30-35 working days'
      ]
    }
  ];

  const institutionGuidelines = [
    {
      title: 'Registration Requirements',
      content: [
        'Valid recognition from competent education authority',
        'DISE/AISHE code (as applicable)',
        'Registered office address with proof',
        'Principal/Head authorization letter',
        'Institution bank account details',
        'Digital signature certificate',
        'Nodal officer appointment letter'
      ]
    },
    {
      title: 'Student Data Management',
      content: [
        'Maintain accurate student database',
        'Regular attendance tracking (minimum 75%)',
        'Timely verification of student applications',
        'Upload student data in prescribed CSV format',
        'Update student status (promoted/detained/dropout)',
        'Ensure data privacy and security',
        'Respond to queries within 48 hours'
      ]
    },
    {
      title: 'Bulk Upload Process',
      content: [
        'Download template from portal',
        'Fill student data as per format specifications',
        'Validate data before upload',
        'Upload CSV file (max 10MB, up to 1000 records)',
        'Review upload summary and errors',
        'Correct errors and re-upload if needed',
        'Approve verified records',
        'Generate acknowledgment receipt'
      ]
    }
  ];

  const panchayatGuidelines = [
    {
      title: 'Role and Responsibilities',
      content: [
        'Village-level DBT awareness campaigns',
        'Identify and verify genuine beneficiaries',
        'Assist in Aadhaar-bank account linkage',
        'Monitor benefit disbursement at village level',
        'Conduct awareness events and training',
        'Maintain village-wise beneficiary database',
        'Report fraudulent applications',
        'Coordinate with block and district authorities'
      ]
    },
    {
      title: 'Event Management',
      content: [
        'Plan awareness camps in advance',
        'Book venue and arrange facilities',
        'Invite beneficiaries and stakeholders',
        'Prepare educational materials',
        'Conduct registration drives',
        'Provide on-spot assistance',
        'Document event with photos and attendance',
        'Submit event report within 7 days'
      ]
    }
  ];

  const downloads = [
    { name: 'Student Registration Manual', size: '2.5 MB', type: 'PDF' },
    { name: 'Institution Onboarding Guide', size: '3.1 MB', type: 'PDF' },
    { name: 'CSV Upload Template', size: '45 KB', type: 'XLSX' },
    { name: 'Panchayat Handbook', size: '4.2 MB', type: 'PDF' },
    { name: 'DBT Scheme Guidelines (Hindi)', size: '5.8 MB', type: 'PDF' },
    { name: 'Frequently Asked Questions', size: '1.2 MB', type: 'PDF' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#002147] to-[#003366] dark:from-gray-800 dark:to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <BookOpen className="w-12 h-12" />
            <h1 className="text-4xl">Portal Guidelines</h1>
          </div>
          <p className="text-xl opacity-90 max-w-3xl">
            Comprehensive guidelines and instructions for all stakeholders to effectively 
            use the DBT Awareness & Verification Portal
          </p>
        </div>
      </div>

      {/* Important Notice */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Alert className="border-orange-500 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-700">
          <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          <AlertDescription className="text-orange-800 dark:text-orange-300">
            Please read all guidelines carefully before proceeding with registration or verification. 
            For any clarification, contact our helpdesk at 1800-11-8004 or email support@dbtportal.gov.in
          </AlertDescription>
        </Alert>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <Tabs defaultValue="student" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-4xl mx-auto dark:bg-gray-800">
            <TabsTrigger value="student" className="dark:data-[state=active]:bg-gray-700">
              <Users className="w-4 h-4 mr-2" />
              Students
            </TabsTrigger>
            <TabsTrigger value="institution" className="dark:data-[state=active]:bg-gray-700">
              <Building2 className="w-4 h-4 mr-2" />
              Institutions
            </TabsTrigger>
            <TabsTrigger value="panchayat" className="dark:data-[state=active]:bg-gray-700">
              <MapPin className="w-4 h-4 mr-2" />
              Panchayats
            </TabsTrigger>
            <TabsTrigger value="general" className="dark:data-[state=active]:bg-gray-700">
              <Shield className="w-4 h-4 mr-2" />
              General
            </TabsTrigger>
          </TabsList>

          {/* Student Guidelines */}
          <TabsContent value="student">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl dark:text-white">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  Student Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {studentGuidelines.map((section, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="dark:text-white">{section.title}</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {section.content.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Institution Guidelines */}
          <TabsContent value="institution">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl dark:text-white">
                  <Building2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                  Institution Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {institutionGuidelines.map((section, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="dark:text-white">{section.title}</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {section.content.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Panchayat Guidelines */}
          <TabsContent value="panchayat">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl dark:text-white">
                  <MapPin className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  Gram Panchayat Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {panchayatGuidelines.map((section, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="dark:text-white">{section.title}</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {section.content.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 dark:text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* General Guidelines */}
          <TabsContent value="general">
            <div className="space-y-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="dark:text-white">Important Points</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-l-4 border-blue-600 dark:border-blue-400 pl-4 py-2">
                    <h3 className="mb-2 dark:text-white">Aadhaar Linkage</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Linking of Aadhaar with bank account is mandatory for DBT. Ensure your Aadhaar 
                      details match with bank records.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-600 dark:border-green-400 pl-4 py-2">
                    <h3 className="mb-2 dark:text-white">Document Verification</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      All documents must be valid, self-attested, and uploaded in PDF format. Maximum 
                      file size is 2MB per document.
                    </p>
                  </div>
                  <div className="border-l-4 border-orange-600 dark:border-orange-400 pl-4 py-2">
                    <h3 className="mb-2 dark:text-white">Security Guidelines</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Never share your login credentials, OTP, or personal information with anyone. 
                      The portal will never ask for sensitive information via email or phone.
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-600 dark:border-purple-400 pl-4 py-2">
                    <h3 className="mb-2 dark:text-white">Grievance Redressal</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      If you face any issues, raise a complaint through the helpdesk. All complaints 
                      are tracked and resolved within 7 working days.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Downloads Section */}
        <Card className="mt-8 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <FileText className="w-6 h-6 text-[#002147] dark:text-blue-400" />
              Download Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {downloads.map((file, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-red-600 dark:text-red-400" />
                    <div>
                      <p className="dark:text-white">{file.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{file.type} • {file.size}</p>
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
      </div>
    </div>
  );
}
