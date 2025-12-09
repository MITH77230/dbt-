import { useState, FormEvent, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { 
  ArrowLeft, 
  Briefcase, 
  Award, 
  Globe, 
  CheckCircle, 
  Send, 
  MapPin, 
  BookOpen, 
  CalendarClock, 
  Laptop 
} from 'lucide-react';
import { supabase } from '../../supabaseClient';

interface VolunteerPageProps {
  onNavigate: (page: string) => void;
}

export default function VolunteerPage({ onNavigate }: VolunteerPageProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    mobile: '',
    email: '',
    state: '',
    district: '',
    duration: '1' // Default 1 month
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Eligibility Check
    if (parseInt(formData.age) < 20) {
      alert("Eligibility Failed: You must be at least 20 years old to apply.");
      return;
    }

    setLoading(true);

    // --- SAVE TO SUPABASE ---
    const { error } = await supabase.from('volunteers').insert([{
      full_name: formData.fullName,
      age: formData.age,
      mobile: formData.mobile,
      email: formData.email,
      state: formData.state,
      district: formData.district,
      duration_months: parseInt(formData.duration),
      status: 'active',
      start_date: new Date().toISOString()
    }]);

    setLoading(false);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert(`Application Submitted!\n\nWelcome, ${formData.fullName}.\nYour ${formData.duration}-month internship tracking has started.`);
      onNavigate('home');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#002147] to-[#003366] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20 mb-4 pl-0"
            onClick={() => onNavigate('home')}
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
          </Button>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <Badge className="bg-[#FF9933] text-white border-none mb-2">Govt. of India Initiative</Badge>
              <h1 className="text-4xl font-bold mb-2">DBT Sahayak Internship</h1>
              <p className="text-lg opacity-90 max-w-2xl">
                Work on the ground, educate students about Aadhaar Seeding, and earn a Ministry Certificate.
              </p>
            </div>
            <div className="h-24 w-24 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20">
               <Award className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 space-y-12">
        
        {/* SECTION 1: INFO & CRITERIA */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Eligibility Criteria */}
          <Card className="border-l-4 border-l-[#FF9933]">
            <CardHeader>
              <CardTitle className="text-[#002147] flex items-center gap-2">
                <CheckCircle className="w-5 h-5"/> Eligibility Criteria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 p-2 bg-gray-50 rounded border">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Age: 20 Years or above</span>
                </li>
                <li className="flex items-center gap-3 p-2 bg-gray-50 rounded border">
                  <Laptop className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Capable of Remote Work & Reporting</span>
                </li>
                <li className="flex items-center gap-3 p-2 bg-gray-50 rounded border">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  <span className="font-medium">Willing to do Ground Work (Panchayat Visits)</span>
                </li>
                <li className="flex items-center gap-3 p-2 bg-gray-50 rounded border">
                  <Globe className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">Basic Internet & Smartphone Knowledge</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Role & Responsibilities */}
          <Card className="border-l-4 border-l-[#002147]">
            <CardHeader>
              <CardTitle className="text-[#002147] flex items-center gap-2">
                <Briefcase className="w-5 h-5"/> Your Role
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>As a <strong>DBT Sahayak</strong>, you act as the bridge between the government and rural students.</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Visit assigned Gram Panchayats and schools.</li>
                <li>Conduct awareness camps about <strong>NPCI Mapping</strong>.</li>
                <li>Help students verify their bank accounts on this portal.</li>
                <li>Submit weekly reports via the Volunteer Dashboard.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* SECTION 2: CERTIFICATE PREVIEW */}
        <div className="bg-blue-50 rounded-xl p-8 border border-blue-100 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-[#002147] mb-4 flex items-center justify-center gap-2">
              <Award className="w-6 h-6 text-[#FF9933]"/> Get Recognized by the Ministry
            </h2>
            <p className="text-gray-600 mb-6">
              Upon successful completion of your tenure (1, 2, or 3 months), you will receive an official 
              <strong> Certificate of Internship</strong> signed by the Ministry of Education and MoSJE.
            </p>
            
            {/* SAMPLE CERTIFICATE IMAGE */}
            <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-2xl border-4 border-white max-w-lg mx-auto">
              <img 
                src="/intern certificate .jpg" 
                alt="Sample Certificate" 
                className="w-full h-auto transform transition-transform group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Certificate+Loading+Error';
                }}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">*Sample certificate design for reference only.</p>
          </div>
        </div>

        {/* SECTION 3: CENTERED APPLICATION FORM */}
        <div className="max-w-2xl mx-auto">
          <Card className="border-t-4 border-t-[#FF9933] shadow-2xl">
            <CardHeader className="text-center bg-gray-50 border-b">
              <CardTitle className="text-2xl text-[#002147]">Internship Application Form</CardTitle>
              <CardDescription>Join the mission. Start your journey today.</CardDescription>
            </CardHeader>
            <CardContent className="pt-8 px-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Full Name <span className="text-red-500">*</span></Label>
                    <Input name="fullName" required placeholder="As per Govt ID" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label>Age <span className="text-red-500">*</span></Label>
                    <Input type="number" name="age" required min="20" placeholder="Must be 20+" onChange={handleChange} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Mobile Number <span className="text-red-500">*</span></Label>
                    <Input type="tel" name="mobile" required placeholder="10-digit number" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email ID <span className="text-red-500">*</span></Label>
                    <Input type="email" name="email" required placeholder="For certificate delivery" onChange={handleChange} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Current State</Label>
                        <Input name="state" required placeholder="State of residence" onChange={handleChange} />
                    </div>
                    <div className="space-y-2">
                        <Label>Preferred District</Label>
                        <Input name="district" required placeholder="For ground work" onChange={handleChange} />
                    </div>
                </div>

                <div className="space-y-2 bg-blue-50 p-4 rounded border border-blue-100">
                  <Label className="flex items-center gap-2 font-bold text-[#002147]">
                    <CalendarClock className="w-5 h-5 text-[#FF9933]"/> Select Internship Duration
                  </Label>
                  <select 
                    name="duration" 
                    className="w-full p-3 border rounded-md bg-white focus:ring-2 focus:ring-[#002147] outline-none"
                    onChange={handleChange}
                    value={formData.duration}
                  >
                    <option value="1">1 Month (Short Term Project)</option>
                    <option value="2">2 Months (Standard Program)</option>
                    <option value="3">3 Months (Core Leadership)</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Certificate will be issued only after completing this tenure.</p>
                </div>

                <Button type="submit" className="w-full bg-[#002147] hover:bg-[#003366] h-12 text-lg font-bold shadow-lg" disabled={loading}>
                  {loading ? "Submitting Application..." : "Submit Application"} 
                  {!loading && <Send className="w-5 h-5 ml-2" />}
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to the Terms of Service of the National Scholarship Portal.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}