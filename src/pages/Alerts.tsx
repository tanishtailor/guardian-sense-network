
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, AlertTriangle, MapPin, Shield, Loader2, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAlerts, useDeleteAlert } from '@/hooks/useAlerts';
import { format } from 'date-fns';

const Alerts: React.FC = () => {
  const { toast } = useToast();
  const { data: alerts, isLoading, error } = useAlerts();
  const deleteAlert = useDeleteAlert();
  
  const handleClearAll = async () => {
    if (!alerts || alerts.length === 0) {
      toast({
        title: 'No alerts to clear',
        description: 'There are no active alerts to clear.',
      });
      return;
    }

    try {
      console.log('Clearing all alerts:', alerts.length);
      // Delete all active alerts one by one
      for (const alert of alerts) {
        console.log('Deleting alert:', alert.id);
        await deleteAlert.mutateAsync(alert.id);
      }
      toast({
        title: 'All Alerts Cleared',
        description: 'All alerts have been cleared from your feed.',
      });
    } catch (error) {
      console.error('Error clearing all alerts:', error);
      toast({
        title: 'Error',
        description: 'Failed to clear all alerts. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteAlert = async (alertId: string) => {
    console.log('Delete button clicked for alert:', alertId);
    try {
      await deleteAlert.mutateAsync(alertId);
      toast({
        title: 'Alert Deleted',
        description: 'The alert has been deleted successfully.',
      });
    } catch (error) {
      console.error('Error deleting single alert:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete alert. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getSeverityIcon = (priority: string) => {
    switch (priority) {
      case 'critical':
        return Shield;
      case 'high':
        return AlertTriangle;
      case 'medium':
        return AlertTriangle;
      default:
        return MapPin;
    }
  };

  const getSeverityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'emergency';
      case 'high':
        return 'warning';
      case 'medium':
        return 'warning';
      default:
        return 'info';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alerts & Notifications</h1>
          <p className="text-muted-foreground">
            Active safety alerts in your area.
          </p>
        </div>
        <Button
          className="mt-4 sm:mt-0"
          variant="outline"
          onClick={handleClearAll}
          disabled={deleteAlert.isPending || isLoading || !alerts || alerts.length === 0}
        >
          {deleteAlert.isPending ? 'Clearing...' : 'Clear All Alerts'}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading alerts...</span>
        </div>
      ) : error ? (
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">Failed to load alerts. Please try again.</p>
        </Card>
      ) : alerts && alerts.length > 0 ? (
        <div className="space-y-4">
          {alerts.map((alert) => {
            const Icon = getSeverityIcon(alert.priority);
            const severity = getSeverityColor(alert.priority);
            
            return (
              <Card
                key={alert.id}
                className={`incident-card incident-${severity} animate-fade-in`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full bg-guardian-${severity}/10 mt-1`}>
                        <Icon className={`h-5 w-5 text-guardian-${severity}`} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{alert.title}</h3>
                          <Badge className={`bg-guardian-${severity}`}>
                            {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                        {alert.location_address && (
                          <p className="text-sm text-muted-foreground mt-1">
                            📍 {alert.location_address}
                          </p>
                        )}
                        <div className="flex items-center mt-2">
                          <Badge variant="outline" className="text-xs">
                            {format(new Date(alert.created_at!), 'MMM dd, yyyy h:mm a')}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteAlert(alert.id)}
                      disabled={deleteAlert.isPending}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Active Alerts</h3>
          <p className="text-muted-foreground">
            You're all caught up! No safety alerts in your area at the moment.
          </p>
        </Card>
      )}
    </div>
  );
};

export default Alerts;
