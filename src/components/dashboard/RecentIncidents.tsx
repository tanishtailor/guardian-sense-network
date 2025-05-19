
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, MapPin } from 'lucide-react';

// Mock data for recent incidents
const incidents = [
  {
    id: 1,
    type: 'Fire',
    location: '123 Main St',
    time: '10 minutes ago',
    status: 'emergency',
    icon: AlertTriangle,
  },
  {
    id: 2,
    type: 'Accident',
    location: 'Highway 101, Mile 24',
    time: '25 minutes ago',
    status: 'warning',
    icon: Shield,
  },
  {
    id: 3,
    type: 'Medical',
    location: 'Central Park',
    time: '45 minutes ago',
    status: 'info',
    icon: Shield,
  },
  {
    id: 4,
    type: 'Resolved',
    location: '875 Fifth Avenue',
    time: '1 hour ago',
    status: 'success',
    icon: MapPin,
  },
];

const RecentIncidents: React.FC = () => {
  // Helper function to get badge variant based on status
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'emergency':
        return 'bg-guardian-emergency text-white';
      case 'warning':
        return 'bg-guardian-warning text-white';
      case 'info':
        return 'bg-guardian-info text-white';
      case 'success':
        return 'bg-guardian-success text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  // Helper function to get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'emergency':
        return 'Active';
      case 'warning':
        return 'Responding';
      case 'info':
        return 'Monitoring';
      case 'success':
        return 'Resolved';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="space-y-4">
      {incidents.map((incident) => (
        <div
          key={incident.id}
          className={`incident-card incident-${incident.status} animate-fade-in`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <incident.icon className={`h-5 w-5 text-guardian-${incident.status}`} />
              <div>
                <h3 className="font-semibold">{incident.type}</h3>
                <p className="text-sm text-muted-foreground">{incident.location}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <Badge className={getBadgeVariant(incident.status)}>
                {getStatusText(incident.status)}
              </Badge>
              <span className="text-xs text-muted-foreground mt-1">{incident.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentIncidents;
