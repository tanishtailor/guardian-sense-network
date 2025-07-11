
-- Add the role column to the profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role public.user_role NOT NULL DEFAULT 'user';

-- Update the existing admin users to have admin role
UPDATE public.profiles 
SET role = 'admin' 
WHERE email IN (
  'rajesh.kumar@aiims.edu',
  'priya.sharma@apollohospitals.com', 
  'amit.patel@fortishealthcare.com'
);
