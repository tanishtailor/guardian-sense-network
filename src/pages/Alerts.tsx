
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, AlertTriangle, MapPin, Shield, Plus } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

// Mock data for alerts
const activeAlerts = [
  {
    id: 1,
    title: 'Flash Flood Warning',
    description: 'Heavy rainfall expected in your area. Be prepared for possible flooding.',
    time: '12:45 PM',
    severity: 'warning',
    icon: AlertTriangle,
  },
  {
    id: 2,
    title: 'Road Closure',
    description: 'Main Street between 5th and 8th Avenue closed due to construction.',
    time: '10:30 AM',
    severity: 'info',
    icon: MapPin,
  },
  {
    id: 3,
    title: 'Active Fire Response',
    description: 'Fire department responding to incident at Central Park. Avoid the area.',
    time: '9:15 AM',
    severity: 'emergency',
    icon: Shield,
  },
];

const Alerts: React.FC = () => {
  const { toast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationTracking, setLocationTracking] = useState(true);
  const [alertRadius, setAlertRadius] = useState([5]);
  
  const handleClearAll = () => {
    toast({
      title: 'Alerts Cleared',
      description: 'All alerts have been cleared from your feed.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alerts & Notifications</h1>
          <p className="text-muted-foreground">
            Manage your safety alerts and notification preferences.
          </p>
        </div>
        <Button
          className="mt-4 sm:mt-0"
          variant="outline"
          onClick={() => handleClearAll()}
        >
          Clear All Alerts
        </Button>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Alerts</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4 mt-4">
          {activeAlerts.map((alert) => (
            <Card
              key={alert.id}
              className={`incident-card incident-${alert.severity} animate-fade-in`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full bg-guardian-${alert.severity}/10 mt-1`}>
                      <alert.icon className={`h-5 w-5 text-guardian-${alert.severity}`} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{alert.title}</h3>
                        <Badge className={`bg-guardian-${alert.severity}`}>
                          {alert.severity === 'emergency' ? 'Emergency' : 
                           alert.severity === 'warning' ? 'Warning' : 'Info'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                      <div className="flex items-center mt-2">
                        <Badge variant="outline" className="text-xs">
                          {alert.time}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Dismiss
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Load More Alerts
          </Button>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Customize how and when you receive alerts about safety incidents.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="notifications">Enable Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications for critical safety alerts.
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="location">Location-Based Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts based on your current location.
                  </p>
                </div>
                <Switch
                  id="location"
                  checked={locationTracking}
                  onCheckedChange={setLocationTracking}
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="radius">Alert Radius</Label>
                  <span className="text-sm font-medium">{alertRadius[0]} miles</span>
                </div>
                <Slider
                  id="radius"
                  defaultValue={[5]}
                  max={25}
                  min={1}
                  step={1}
                  value={alertRadius}
                  onValueChange={setAlertRadius}
                />
                <p className="text-sm text-muted-foreground">
                  Receive alerts for incidents within this radius of your location.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Alert Categories</CardTitle>
              <CardDescription>
                Choose which types of incidents you want to be notified about.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-full bg-guardian-emergency/10">
                    <Shield className="h-4 w-4 text-guardian-emergency" />
                  </div>
                  <Label htmlFor="emergencies">Critical Emergencies</Label>
                </div>
                <Switch id="emergencies" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-full bg-guardian-warning/10">
                    <AlertTriangle className="h-4 w-4 text-guardian-warning" />
                  </div>
                  <Label htmlFor="warnings">Warnings & Hazards</Label>
                </div>
                <Switch id="warnings" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-full bg-guardian-info/10">
                    <MapPin className="h-4 w-4 text-guardian-info" />
                  </div>
                  <Label htmlFor="info">Information & Advisories</Label>
                </div>
                <Switch id="info" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-full bg-guardian-success/10">
                    <Bell className="h-4 w-4 text-guardian-success" />
                  </div>
                  <Label htmlFor="community">Community Updates</Label>
                </div>
                <Switch id="community" defaultChecked />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control how your data is used within Guardian Lens.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="anonymous">Anonymous Reporting</Label>
                  <p className="text-sm text-muted-foreground">
                    Submit incident reports without revealing your identity.
                  </p>
                </div>
                <Switch id="anonymous" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="data-sharing">Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow your incident reports to be shared with local authorities.
                  </p>
                </div>
                <Switch id="data-sharing" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="location-history">Location History</Label>
                  <p className="text-sm text-muted-foreground">
                    Store your location history for improved incident detection.
                  </p>
                </div>
                <Switch id="location-history" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Alerts;
