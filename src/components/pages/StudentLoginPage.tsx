import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { RefreshCw, ArrowLeft } from 'lucide-react'; // <--- Added ArrowLeft

// --- IMPORTS ---
import { sendOtp, verifyOtp } from '../../authService';
import { supabase } from '../../supabaseClient';

type Props = {
  onLoginSuccess: () => void;
  onBack: () => void;
  onNavigate: (page: string) => void;
};

const generateCaptcha = () => Math.random().toString(36).substring(2, 8).toUpperCase();

export default function StudentLoginPage({ onLoginSuccess, onBack, onNavigate }: Props) {
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [tabValue, setTabValue] = useState<'aadhaar' | 'otr'>('aadhaar');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaInput.toUpperCase() !== captcha) {
      alert('Invalid CAPTCHA');
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
      return;
    }
    if (mobile.length !== 10) { alert("Invalid Mobile"); return; }

    setLoading(true);
    const { error } = await sendOtp(mobile);
    setLoading(false);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert(`OTP sent to ${mobile}`);
      setStep('otp');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { user, error } = await verifyOtp(mobile, otp);

    if (error) {
      alert("Invalid OTP");
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile && profile.role !== 'student') {
        alert("Access Denied: Not a student account");
        await supabase.auth.signOut();
        setLoading(false);
        return;
    }
    onLoginSuccess();
  };

  const maskedMobile = (m: string) => {
    if (m.length < 10) return '-';
    return '+91 ' + m.slice(0, 2) + '******' + m.slice(-2);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 sm:p-12 flex items-center justify-center relative">
      
      {/* --- BACK TO HOME BUTTON --- */}
      <div className="absolute top-6 left-6">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Button>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-12">
        {/* LEFT: FORM */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Student Login</CardTitle>
            <CardDescription>
              New user?{' '}
              <button type="button" className="text-blue-600 hover:underline" onClick={() => onNavigate('student-registration')}>
                Register yourself
              </button>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={tabValue} onValueChange={(v: string) => setTabValue(v as 'aadhaar' | 'otr')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="aadhaar">Login with Mobile</TabsTrigger>
                <TabsTrigger value="otr">Login with OTR</TabsTrigger>
              </TabsList>

              <TabsContent value="aadhaar">
                {step === 'mobile' ? (
                  <form onSubmit={handleSendOtp} className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Mobile Number</Label>
                      <div className="flex gap-2">
                        <div className="flex items-center px-3 border rounded bg-gray-100">+91</div>
                        <Input placeholder="99999 99999" value={mobile} maxLength={10} onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))} />
                      </div>
                    </div>
                    {/* CAPTCHA */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center bg-gray-100 p-2 rounded">
                        <span className="font-mono text-xl tracking-widest">{captcha}</span>
                        <Button type="button" variant="ghost" size="sm" onClick={() => setCaptcha(generateCaptcha())}>
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                        </div>
                        <Input placeholder="Enter Captcha" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>{loading ? "Sending..." : "Get OTP"}</Button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Enter OTP sent to +91 {mobile}</Label>
                      <Input placeholder="XXXXXX" value={otp} onChange={(e) => setOtp(e.target.value)} className="text-center text-xl tracking-widest" />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>{loading ? "Verifying..." : "Login"}</Button>
                    <button type="button" onClick={() => setStep('mobile')} className="text-sm text-blue-600 w-full text-center mt-2">Change Number</button>
                  </form>
                )}
              </TabsContent>
              <TabsContent value="otr"><div className="p-8 text-center">OTR Login Not Implemented</div></TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* RIGHT: PREVIEW */}
        <div className="flex flex-col gap-6">
          <Card className="w-full">
            <CardHeader><CardTitle>Live Preview</CardTitle></CardHeader>
            <CardContent>
               <div className="flex items-center gap-4">
                 <div className="w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center text-2xl font-bold text-sky-700">U</div>
                 <div className="flex-1">
                   <div className="text-sm text-slate-500">Mobile</div>
                   <div className="font-medium text-slate-800">{maskedMobile(mobile)}</div>
                   <div className="mt-2 text-sm text-slate-500">Status</div>
                   <div className="font-medium text-slate-800">{step === 'otp' ? 'Waiting for OTP' : 'Enter Mobile'}</div>
                 </div>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}