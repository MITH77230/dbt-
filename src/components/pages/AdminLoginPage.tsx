import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Shield, RefreshCw } from 'lucide-react';

// --- IMPORTS ---
import { sendOtp, verifyOtp } from '../../authService';
import { supabase } from '../../supabaseClient';

export default function AdminLoginPage({ onLoginSuccess, onBack }: { onLoginSuccess: () => void; onBack: () => void }) {
  // STATE
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  
  // CAPTCHA STATE
  const [captcha, setCaptcha] = useState(() => Math.random().toString(36).substring(2, 8).toUpperCase());
  const [captchaInput, setCaptchaInput] = useState('');

  // --- STEP 1: SEND OTP ---
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaInput.toUpperCase() !== captcha) {
      alert('Invalid CAPTCHA');
      setCaptcha(Math.random().toString(36).substring(2, 8).toUpperCase());
      setCaptchaInput('');
      return;
    }
    if (mobile.length !== 10) { alert("Invalid Mobile Number"); return; }

    setLoading(true);
    const { error } = await sendOtp(mobile);
    setLoading(false);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert(`OTP sent to ${mobile} (Use 123456 for test)`);
      setStep('otp');
    }
  };

  // --- STEP 2: VERIFY OTP & CHECK ADMIN ROLE ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // A. Verify OTP
    const { user, error } = await verifyOtp(mobile, otp);

    if (error || !user) {
      alert("Login Failed: Invalid OTP");
      setLoading(false);
      return;
    }

    // B. SECURITY CHECK: Is this user an Admin?
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    // If no profile found, or role is not admin -> BLOCK ACCESS
    if (!profile || profile.role !== 'admin') {
      alert("ACCESS DENIED: You do not have administrator privileges.");
      await supabase.auth.signOut(); // Kick them out immediately
      setLoading(false);
      return;
    }

    // C. Success
    onLoginSuccess();
  };

  const maskedMobile = (num: string) => {
    if (!num || num.length < 10) return '-';
    return num.slice(0, 2) + '******' + num.slice(-2);
  };

  const loginTips = [
    "Authorized administrators only. Activities are monitored.",
    "Do not share your OTP with anyone.",
    "If you lose access to your registered mobile, contact IT support immediately.",
    "Log out immediately after finishing your administrative tasks."
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 sm:p-12 flex items-center justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* LEFT: FORM */}
        <Card className="w-full">
          <CardHeader>
            <div className="mx-auto bg-red-100 text-red-600 p-4 rounded-full w-fit mb-4">
              <Shield className="w-10 h-10" />
            </div>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              {step === 'mobile' ? 'Enter Registered Mobile Number' : 'Enter One-Time Password'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* VIEW 1: MOBILE INPUT */}
            {step === 'mobile' && (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div className="space-y-2">
                  <Label>Mobile Number</Label>
                  <div className="flex gap-2">
                    <div className="flex items-center px-3 border rounded bg-gray-100">+91</div>
                    <Input
                      placeholder="99999 99999"
                      value={mobile}
                      maxLength={10}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                      required
                    />
                  </div>
                </div>

                {/* CAPTCHA */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center bg-gray-100 p-2 rounded">
                      <span className="font-mono text-xl tracking-widest">{captcha}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => setCaptcha(Math.random().toString(36).substring(2, 8).toUpperCase())}>
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input 
                      placeholder="Enter Captcha" 
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      required
                    />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button type="button" variant="ghost" onClick={onBack}>Back</Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Get OTP"}
                  </Button>
                </div>
              </form>
            )}

            {/* VIEW 2: OTP INPUT */}
            {step === 'otp' && (
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label>Enter OTP sent to +91 {mobile}</Label>
                  <Input
                    placeholder="XXXXXX"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="text-center text-2xl tracking-[0.5em]"
                    required
                  />
                </div>
                <div className="flex items-center justify-between pt-4">
                  <Button type="button" variant="ghost" onClick={() => setStep('mobile')}>Change Number</Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Verifying..." : "Login"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* RIGHT: LIVE PREVIEW + TIPS */}
        <div className="flex flex-col gap-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>Realtime view of the login details</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-2xl font-bold text-red-700">
                  A
                </div>

                <div className="flex-1">
                  <div className="text-sm text-slate-500">Login Type</div>
                  <div className="font-medium text-slate-800">Admin Mobile</div>

                  <div className="mt-3 text-sm text-slate-500">Mobile (masked)</div>
                  <div className="font-mono font-medium text-slate-800">{maskedMobile(mobile)}</div>

                  <div className="mt-3 text-sm text-slate-500">Status</div>
                  <div className="font-medium text-slate-800">{step === 'otp' ? 'Waiting for OTP...' : 'Enter Mobile'}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Admin Login Tips */}
          <Card className="hidden lg:block">
            <CardHeader>
              <CardTitle>Admin Login Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-3 text-sm text-gray-600 dark:text-gray-400">
                {loginTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}