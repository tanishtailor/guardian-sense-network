
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

      // Get total incidents for response time calculation
      const { data: allIncidents, error: allIncidentsError } = await supabase
        .from('incidents')
        .select('created_at, status');

      if (allIncidentsError) throw allIncidentsError;

      // Calculate average response time (mock calculation)
      const resolvedIncidents = allIncidents.filter(i => i.status === 'resolved');
      const avgResponseTime = resolvedIncidents.length > 0 ? '5.2m' : 'N/A';

      return {
        activeIncidents: activeIncidents.length,
        activeAlerts: activeAlerts.length,
        responseTime: avgResponseTime,
        safeZones: 18, // This could be from another table in the future
      };
    },
  });
};
