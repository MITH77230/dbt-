import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rztbhssmkcjrwdqvhuoz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6dGJoc3Nta2NqcndkcXZodW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMjM1NDAsImV4cCI6MjA3OTY5OTU0MH0._s0D0ZLEjNNZc2f45RX-48MmlIGF_KF0zzImob7cnlo'

export const supabase = createClient(supabaseUrl, supabaseKey)