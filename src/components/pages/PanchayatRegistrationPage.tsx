import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

// --- IMPORTS ---
import { sendOtp, verifyOtp, createProfile } from '../../authService';

export default function PanchayatRegistrationPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');

  // FORM FIELDS
  const [panchayatName, setPanchayatName] = useState('');
  const [panchayatId, setPanchayatId] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [aadhaar, setAadhaar] = useState('');

  // --- 1. GET OTP ---
  const handleGetOtp = async (e: React.FormEvent) => {
    e.preventDefault();
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

  // --- 2. VERIFY & SAVE ---
  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Verify OTP
    const { user, error: otpError } = await verifyOtp(mobile, otp);

    if (otpError || !user) {
      alert("Invalid OTP");
      setLoading(false);
      return;
    }

    // Create Profile with Role 'gram_panchayat'
    // MAPPING FIX: We map camelCase vars to snake_case DB columns
    const { error: dbError } = await createProfile(user, 'gram_panchayat', {
      panchayat_name: panchayatName,   // <--- Fixed
      panchayat_id: panchayatId,       // <--- Fixed
      district: district,
      state: state,
      contact_person: contactPerson,   // <--- Fixed
      email: email,
      aadhaar: aadhaar
    });

    setLoading(false);

    if (dbError) {
      alert("Error saving details: " + dbError.message);
    } else {
      alert('Gram Panchayat Registered Successfully!');
      onNavigate('panchayat-login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 sm:p-12 flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Gram Panchayat Registration</CardTitle>
            <CardDescription>
                {step === 'details' ? 'Enter Panchayat Details' : 'Verify Mobile Number'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            
            {step === 'details' && (
                <form onSubmit={handleGetOtp} className="space-y-4">
                <div className="space-y-2">
                    <Label>Panchayat Name *</Label>
                    <Input value={panchayatName} onChange={(e) => setPanchayatName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label>Panchayat ID *</Label>
                    <Input value={panchayatId} onChange={(e) => setPanchayatId(e.target.value)} required />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                        <Label>District *</Label>
                        <Input value={district} onChange={(e) => setDistrict(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                        <Label>State *</Label>
                        <Input value={state} onChange={(e) => setState(e.target.value)} required />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Mobile Number (For Login) *</Label>
                    <div className="flex gap-2">
                        <div className="flex items-center px-3 border rounded bg-gray-100">+91</div>
                        <Input value={mobile} maxLength={10} onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))} required />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <Label>Contact Person</Label>
                    <Input value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} />
                </div>
                 <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Get OTP & Register"}
                </Button>
                </form>
            )}

            {step === 'otp' && (
                <form onSubmit={handleVerifyAndRegister} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Enter OTP sent to {mobile}</Label>
                        <Input 
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