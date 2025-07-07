
-- Add patient details columns to incidents table
ALTER TABLE public.incidents ADD COLUMN IF NOT EXISTS patient_name TEXT;
ALTER TABLE public.incidents ADD COLUMN IF NOT EXISTS patient_age INTEGER;
ALTER TABLE public.incidents ADD COLUMN IF NOT EXISTS patient_gender TEXT;
ALTER TABLE public.incidents ADD COLUMN IF NOT EXISTS patient_phone TEXT;
ALTER TABLE public.incidents ADD COLUMN IF NOT EXISTS patient_emergency_contact TEXT;
ALTER TABLE public.incidents ADD COLUMN IF NOT EXISTS patient_medical_conditions TEXT;
ALTER TABLE public.incidents ADD COLUMN IF NOT EXISTS patient_allergies TEXT;
ALTER TABLE public.incidents ADD COLUMN IF NOT EXISTS auto_filled_from_profile BOOLEAN DEFAULT FALSE;
