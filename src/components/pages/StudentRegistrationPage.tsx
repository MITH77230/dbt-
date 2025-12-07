import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

// --- IMPORTS ---
import { sendOtp, verifyOtp, createProfile } from '../../authService';

export default function StudentRegistrationPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  // FORM STATE
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [loading, setLoading] = useState(false);

  // FIELDS
  const [aadhaar, setAadhaar] = useState('');
  const [mobile, setMobile] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [digilockerId, setDigilockerId] = useState('');
  
  // OTP STATE
  const [otp, setOtp] = useState('');

  // --- 1. SEND OTP ---
  const handleGetOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length !== 10) { alert("Invalid Mobile"); return; }
    
    setLoading(true);
    // Send OTP using our service
    const { error } = await sendOtp(mobile);
    setLoading(false);

    if (error) {
      alert("Error sending OTP: " + error.message);
    } else {
      alert(`OTP sent to ${mobile} (Use 123456 for test)`);
      setStep('otp'); // Switch to OTP screen
    }
  };

  // --- 2. VERIFY OTP & REGISTER ---
  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // A. Verify the OTP first
    const { user, error: otpError } = await verifyOtp(mobile, otp);

    if (otpError || !user) {
      alert("Invalid OTP. Registration Failed.");
      setLoading(false);
      return;
    }

    // B. OTP is Good! Now create the profile in database
    // MAPPING FIX: We map 'fullName' to 'full_name' for the database
    const { error: dbError } = await createProfile(user, 'student', {
      aadhaar: aadhaar,
      full_name: fullName,       // <--- Fixed to match DB
      email: email,
      digilocker_id: digilockerId // <--- Fixed to match DB
    });

    setLoading(false);

    if (dbError) {
      alert("Error saving profile: " + dbError.message);
    } else {
      alert("Registration Successful!");
      onNavigate('student-login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 sm:p-12 flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Student Registration</CardTitle>
            <CardDescription>
              {step === 'details' ? 'Enter your details' : 'Verify Mobile Number'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            
            {/* --- VIEW 1: ENTER DETAILS --- */}
            {step === 'details' && (
              <form onSubmit={handleGetOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="aadhaar">Aadhaar Number *</Label>
                  <Input
                    id="aadhaar"
                    placeholder="12-digit Aadhaar"
                    value={aadhaar}
                    maxLength={12}
                    onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <div className="flex gap-2">
                    <div className="flex items-center px-3 border rounded bg-gray-100">+91</div>
                    <Input
                      id="mobile"
                      placeholder="99999 99999"
                      value={mobile}
                      maxLength={10}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="digilockerId">DigiLocker ID</Label>
                  <Input
                    type="text"
                    id="digilockerId"
                    placeholder="Optional"
                    value={digilockerId}
                    onChange={(e) => setDigilockerId(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Get OTP & Register"}
                </Button>
              </form>
            )}

            {/* --- VIEW 2: VERIFY OTP --- */}
            {step === 'otp' && (
              <form onSubmit={handleVerifyAndRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label>Enter OTP sent to +91 {mobile}</Label>
                  <Input
                    placeholder="XXXXXX"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="text-center text-xl tracking-widest"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating Account..." : "Verify & Submit"}
                </Button>

                <button type="button" onClick={() => setStep('details')} className="text-sm text-gray-500 w-full text-center mt-2">
                  Back to Details
                </button>
              </form>
            )}

          </CardContent>
        </Card>
      </div>
    </div>
  );
}