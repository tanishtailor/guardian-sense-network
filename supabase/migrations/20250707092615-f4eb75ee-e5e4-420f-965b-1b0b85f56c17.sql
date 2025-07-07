
-- Drop the existing insert policy that requires authentication
DROP POLICY IF EXISTS "Users can create their own incidents" ON public.incidents;

-- Create new policy that allows anyone to insert incidents (no authentication required)
CREATE POLICY "Anyone can create incidents" 
  ON public.incidents 
  FOR INSERT 
  WITH CHECK (true);

-- Drop the existing delete policy
DROP POLICY IF EXISTS "Users can delete their own incidents" ON public.incidents;
DROP POLICY IF EXISTS "Admins can delete resolved incidents" ON public.incidents;
DROP POLICY IF EXISTS "Users can delete their own unresolved incidents" ON public.incidents;

-- Create new policy that only allows admins to delete incidents
CREATE POLICY "Only admins can delete incidents" 
  ON public.incidents 
  FOR DELETE 
  USING (public.is_admin(auth.uid()));

-- Update the incidents table to make user_id nullable since anyone can report
ALTER TABLE public.incidents ALTER COLUMN user_id DROP NOT NULL;
