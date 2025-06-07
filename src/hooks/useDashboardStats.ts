
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      // Get active incidents count
      const { data: activeIncidents, error: incidentsError } = await supabase
        .from('incidents')
        .select('id')
        .eq('status', 'active');

      if (incidentsError) throw incidentsError;

      // Get active alerts count
      const { data: activeAlerts, error: alertsError } = await supabase
        .from('alerts')
        .select('id')
        .eq('is_active', true);

      if (alertsError) throw alertsError;

      return {
        activeIncidents: activeIncidents.length,
        activeAlerts: activeAlerts.length,
      };
    },
  });
};
