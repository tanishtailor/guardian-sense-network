
-- First, let's clean up all existing delete policies to avoid conflicts
DROP POLICY IF EXISTS "Users can delete their own incidents" ON public.incidents;
DROP POLICY IF EXISTS "Admins can delete resolved incidents" ON public.incidents;
DROP POLICY IF EXISTS "Users can delete their own unresolved incidents" ON public.incidents;
DROP POLICY IF EXISTS "Only admins can delete incidents" ON public.incidents;

-- Create a single, clear policy that allows admins to delete any incident
CREATE POLICY "Admins can delete any incident" 
  ON public.incidents 
  FOR DELETE 
  USING (public.is_admin(auth.uid()));

-- Also ensure the is_admin function exists and works correctly
-- Let's recreate it to make sure it's working
DROP FUNCTION IF EXISTS public.is_admin(uuid);
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
