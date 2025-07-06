
-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('admin', 'user');

-- Add role column to profiles table
ALTER TABLE public.profiles ADD COLUMN role public.user_role NOT NULL DEFAULT 'user';

-- Add Indian hospital authorities data
INSERT INTO public.profiles (id, full_name, email, role, phone) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Dr. Rajesh Kumar', 'rajesh.kumar@aiims.edu', 'admin', '+91-11-2658-8500'),
  ('00000000-0000-0000-0000-000000000002', 'Dr. Priya Sharma', 'priya.sharma@apollohospitals.com', 'admin', '+91-40-2355-1066'),
  ('00000000-0000-0000-0000-000000000003', 'Dr. Amit Patel', 'amit.patel@fortishealthcare.com', 'admin', '+91-124-496-2200');

-- Add patient details columns to incidents table
ALTER TABLE incidents ADD COLUMN patient_name TEXT;
ALTER TABLE incidents ADD COLUMN patient_age INTEGER;
ALTER TABLE incidents ADD COLUMN patient_gender TEXT;
ALTER TABLE incidents ADD COLUMN patient_phone TEXT;
ALTER TABLE incidents ADD COLUMN patient_emergency_contact TEXT;
ALTER TABLE incidents ADD COLUMN patient_medical_conditions TEXT;
ALTER TABLE incidents ADD COLUMN patient_allergies TEXT;
ALTER TABLE incidents ADD COLUMN auto_filled_from_profile BOOLEAN DEFAULT FALSE;

-- Create security definer function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = 'admin'
  );
$$;

-- Update incidents RLS policy for deletion (only admins can delete resolved incidents)
DROP POLICY IF EXISTS "Users can delete their own incidents" ON public.incidents;
CREATE POLICY "Admins can delete resolved incidents" 
  ON public.incidents 
  FOR DELETE 
  USING (
    status = 'resolved' AND public.is_admin(auth.uid())
  );

-- Allow users to still delete their own non-resolved incidents
CREATE POLICY "Users can delete their own unresolved incidents" 
  ON public.incidents 
  FOR DELETE 
  USING (
    user_id = auth.uid() AND status != 'resolved'
  );
