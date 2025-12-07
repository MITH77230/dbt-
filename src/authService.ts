import { supabase } from './supabaseClient';

// TYPE DEFINITIONS
interface AuthResponse {
  user: any;
  session: any;
  error: any;
}

// --- 1. SEND OTP (Step 1 of Login) ---
export const sendOtp = async (mobile: string) => {
  // Add country code if missing (assuming India +91)
  const formattedMobile = mobile.length === 10 ? `+91${mobile}` : mobile;

  const { error } = await supabase.auth.signInWithOtp({
    phone: formattedMobile,
  });

  return { error };
};

// --- 2. VERIFY OTP (Step 2 of Login) ---
export const verifyOtp = async (mobile: string, otp: string): Promise<AuthResponse> => {
  const formattedMobile = mobile.length === 10 ? `+91${mobile}` : mobile;

  const { data, error } = await supabase.auth.verifyOtp({
    phone: formattedMobile,
    token: otp,
    type: 'sms',
  });

  return { user: data.user, session: data.session, error };
};

// --- 3. REGISTER WITH MOBILE (Creates Profile) ---
export const registerWithMobile = async (mobile: string, role: string, extraData: any = {}) => {
  const formattedMobile = mobile.length === 10 ? `+91${mobile}` : mobile;

  // For Phone, "Sign Up" is the same as sending an OTP.
  // But we need to verify if they already exist in our 'profiles' table to prevent duplicates if needed.
  
  // 1. Send the OTP to start the process
  const { error } = await supabase.auth.signInWithOtp({
    phone: formattedMobile,
  });

  if (error) return { error };

  // 2. We can't insert the profile YET because we don't have the User ID until they verify OTP.
  // We will handle profile creation inside the Login Page after verification success.
  return { error: null };
};

// --- 4. CREATE PROFILE (Call this AFTER verifying OTP if it's a new user) ---
export const createProfile = async (user: any, role: string, extraData: any = {}) => {
  // Check if profile exists
  const { data: existing } = await supabase.from('profiles').select('id').eq('id', user.id).single();

  if (!existing) {
    const { error } = await supabase.from('profiles').insert([
      {
        id: user.id,
        username: user.phone, // Use phone as username
        role: role,
        ...extraData
      }
    ]);
    return { error };
  }
  return { error: null };
};

export const logoutUser = async () => {
  await supabase.auth.signOut();
};