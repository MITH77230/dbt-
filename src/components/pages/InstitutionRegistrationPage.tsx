import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

// --- IMPORTS ---
import { sendOtp, verifyOtp, createProfile } from '../../authService';

export default function InstitutionRegistrationPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');

  // FORM FIELDS
  const [institutionName, setInstitutionName] = useState('');
  const [institutionId, setInstitutionId] = useState('');
  const [address, setAddress] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [mobile, setMobile] = useState(''); // Mobile is Key!
  const [aadhaar, setAadhaar] = useState('');
  const [digilockerId, setDigilockerId] = useState('');

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

    // Create Profile with Role 'institute'
    const { error: dbError } = await createProfile(user, 'institute', {
      full_name: institutionName, 
      institution_id: institutionId, // Saving the extra fields
      address: address,
      contact_person: contactPerson,
      email: contactEmail,
      aadhaar: aadhaar,
      digilocker_id: digilockerId
    });

    setLoading(false);

    if (dbError) {
      alert("Error saving details: " + dbError.message);
    } else {
      alert('Institution Registered Successfully!');
      onNavigate('institution-login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 sm:p-12 flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Institution Registration</CardTitle>
            <CardDescription>
                {step === 'details' ? 'Enter Institute Details' : 'Verify Mobile Number'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            
            {step === 'details' && (
                <form onSubmit={handleGetOtp} className="space-y-4">
                <div className="space-y-2">
                    <Label>Institution Name *</Label>
                    <Input value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label>Institution ID</Label>
                    <Input value={institutionId} onChange={(e) => setInstitutionId(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Address</Label>
                    <Input value={address} onChange={(e) => setAddress(e.target.value)} />
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
                    <Label>Contact Email</Label>
                    <Input value={contactEmail} type="email" onChange={(e) => setContactEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Aadhaar (Authorized Person)</Label>
                    <Input value={aadhaar} maxLength={12} onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))} />
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