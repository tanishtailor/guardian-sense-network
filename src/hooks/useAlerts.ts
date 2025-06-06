
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert } from '@/integrations/supabase/types';

type Alert = Tables<'alerts'>;
type AlertInsert = TablesInsert<'alerts'>;

export const useAlerts = () => {
  return useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      console.log('Fetching alerts...');
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching alerts:', error);
        throw error;
      }
      console.log('Fetched alerts:', data);
      return data as Alert[];
    },
  });
};

export const useCreateAlert = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (alert: Omit<AlertInsert, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('alerts')
        .insert([alert])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
};

export const useDismissAlert = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (alertId: string) => {
      console.log('Attempting to dismiss alert:', alertId);
      const { error } = await supabase
        .from('alerts')
        .update({ is_active: false })
        .eq('id', alertId);

      if (error) {
        console.error('Dismiss error:', error);
        throw error;
      }
      console.log('Alert dismissed successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
};

export const useDeleteAlert = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (alertId: string) => {
      console.log('Attempting to delete alert with ID:', alertId);
      
      // First, let's try to update the alert to set is_active to false instead of deleting
      const { error } = await supabase
        .from('alerts')
        .update({ is_active: false })
        .eq('id', alertId);

      if (error) {
        console.error('Delete alert error:', error);
        throw new Error(`Failed to delete alert: ${error.message}`);
      }
      
      console.log('Alert deleted successfully (set to inactive)');
      return alertId;
    },
    onSuccess: (deletedId) => {
      console.log('Invalidating queries after successful alert delete');
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
    onError: (error) => {
      console.error('Delete alert mutation error:', error);
    },
  });
};
