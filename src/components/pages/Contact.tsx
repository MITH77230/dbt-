import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  Building2,
  Globe,
  MessageSquare
} from 'lucide-react';

export default function Contact() {
  const regionalOffices = [
    {
      region: 'North Zone',
      address: 'DBT Regional Office, A-Block, India Gate Circle, New Delhi - 110001',
      phone: '+91-11-2345-6789',
      email: 'north.dbt@gov.in',
      states: 'Delhi, Punjab, Haryana, Himachal Pradesh, J&K, Uttarakhand'
    },
    {
      region: 'South Zone',
      address: 'DBT Regional Office, MG Road, Bangalore, Karnataka - 560001',
      phone: '+91-80-2345-6789',
      email: 'south.dbt@gov.in',
      states: 'Karnataka, Tamil Nadu, Kerala, Telangana, Andhra Pradesh, Puducherry'
    },
    {
      region: 'East Zone',
      address: 'DBT Regional Office, Salt Lake City, Kolkata, West Bengal - 700091',
      phone: '+91-33-2345-6789',
      email: 'east.dbt@gov.in',
      states: 'West Bengal, Odisha, Bihar, Jharkhand, Sikkim'
    },
    {
      region: 'West Zone',
      address: 'DBT Regional Office, Bandra Kurla Complex, Mumbai, Maharashtra - 400051',
      phone: '+91-22-2345-6789',
      email: 'west.dbt@gov.in',
      states: 'Maharashtra, Gujarat, Goa, Rajasthan, Madhya Pradesh'
    },
    {
      region: 'North-East Zone',
      address: 'DBT Regional Office, GS Road, Guwahati, Assam - 781005',
      phone: '+91-361-234-5678',
      email: 'northeast.dbt@gov.in',
      states: 'Assam, Meghalaya, Manipur, Mizoram, Nagaland, Tripura, Arunachal Pradesh'
    },
    {
      region: 'Central Zone',
      address: 'DBT Regional Office, Civil Lines, Lucknow, Uttar Pradesh - 226001',
      phone: '+91-522-234-5678',
      email: 'central.dbt@gov.in',
      states: 'Uttar Pradesh, Chhattisgarh'
    }
  ];

  const quickContacts = [
    {
      icon: Phone,
      title: 'Toll-Free Helpline',
      value: '1800-11-8004',
      description: 'Available 24x7 for all queries',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Mail,
      title: 'Email Support',
      value: 'support@dbtportal.gov.in',
      description: 'Response within 48 hours',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      icon: MessageSquare,
      title: 'SMS Service',
      value: '567678',
      description: 'Send DBT <query> to 567678',
      color: 'text-orange-600 dark:text-orange-400'
    },
    {
      icon: Globe,
      title: 'Website',
      value: 'www.dbtportal.gov.in',
      description: 'Official portal for DBT',
      color: 'text-purple-600 dark:text-purple-400'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#002147] to-[#003366] dark:from-gray-800 dark:to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl mb-4">Contact Us</h1>
          <p className="text-xl opacity-90 max-w-3xl">
            We're here to help. Reach out to us through any of the following channels 
            and we'll respond as quickly as possible.
          </p>
        </div>
      </div>

      {/* Quick Contacts */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickContacts.map((contact, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6 text-center">
                <contact.icon className={`w-12 h-12 mx-auto mb-4 ${contact.color}`} />
                <h3 className="mb-2 dark:text-white">{contact.title}</h3>
                <p className="text-lg text-gray-900 dark:text-white mb-2">{contact.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{contact.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <Send className="w-6 h-6 text-[#002147] dark:text-blue-400" />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="dark:text-gray-300">Full Name *</Label>
                    <Input id="name" placeholder="Enter your name" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="dark:text-gray-300">Email Address *</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="dark:text-gray-300">Phone Number *</Label>
                    <Input id="phone" placeholder="+91 XXXXX XXXXX" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="dark:text-gray-300">Query Category *</Label>
                    <Select>
                      <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                        <SelectItem value="registration">Registration Issues</SelectItem>
                        <SelectItem value="verification">Verification Queries</SelectItem>
                        <SelectItem value="payment">Payment Related</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="dark:text-gray-300">Subject *</Label>
                  <Input id="subject" placeholder="Brief subject of your query" className="dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="dark:text-gray-300">Message *</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Describe your query in detail..." 
                    rows={6}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <Button className="w-full bg-[#002147] dark:bg-blue-600 hover:bg-[#003366] dark:hover:bg-blue-700 text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Query
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Head Office & Timings */}
          <div className="space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Building2 className="w-6 h-6 text-[#002147] dark:text-blue-400" />
                  Head Office
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#002147] dark:text-blue-400 mt-1" />
                  <div>
                    <p className="dark:text-white">DBT Division</p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Ministry of Electronics & Information Technology<br />
                      Electronics Niketan, 6, CGO Complex<br />
                      Lodhi Road, New Delhi - 110003<br />
                      India
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#002147] dark:text-blue-400" />
                  <div>
                    <p className="dark:text-white">+91-11-2430-1234</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Main Office Line</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#002147] dark:text-blue-400" />
                  <div>
                    <p className="dark:text-white">dbt@gov.in</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Official Email</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Clock className="w-6 h-6 text-[#002147] dark:text-blue-400" />
                  Office Timings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Monday - Friday</span>
                  <span className="dark:text-white">9:30 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Saturday</span>
                  <span className="dark:text-white">9:30 AM - 1:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Sunday & Holidays</span>
                  <span className="text-red-600 dark:text-red-400">Closed</span>
                </div>
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-900 dark:text-blue-300">
                    <strong>Note:</strong> Helpline (1800-11-8004) is available 24x7 for urgent queries
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Regional Offices */}
        <div className="mt-12">
          <h2 className="text-2xl mb-6 text-gray-900 dark:text-white">Regional Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionalOffices.map((office, index) => (
              <Card key={index} className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-[#002147] dark:text-blue-400">{office.region}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">{office.address}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">{office.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">{office.email}</p>
                  </div>
                  <div className="pt-2 border-t dark:border-gray-700">
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      <strong className="dark:text-gray-300">Coverage:</strong> {office.states}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
