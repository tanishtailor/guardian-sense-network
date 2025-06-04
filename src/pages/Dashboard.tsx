
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Shield, AlertTriangle, MessageCircle, MapPin, Bell } from 'lucide-react';
import RecentIncidents from '@/components/dashboard/RecentIncidents';
import { useDashboardStats } from '@/hooks/useDashboardStats';

// Mock data for charts
const incidentData = [
  { name: 'Mon', incidents: 4 },
  { name: 'Tue', incidents: 3 },
  { name: 'Wed', incidents: 2 },
  { name: 'Thu', incidents: 6 },
  { name: 'Fri', incidents: 8 },
  { name: 'Sat', incidents: 5 },
  { name: 'Sun', incidents: 2 },
];

const Dashboard: React.FC = () => {
  const { data: stats, isLoading } = useDashboardStats();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of public safety and emergency response data.
          </p>
        </div>
        <Link to="/report">
          <Button className="mt-4 sm:mt-0 bg-guardian-emergency hover:bg-red-700">
            Report Incident
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
            <Shield className="h-4 w-4 text-guardian-emergency" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? '...' : stats?.activeIncidents || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently being handled
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Safety Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-guardian-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? '...' : stats?.activeAlerts || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Active in your area
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Shield className="h-4 w-4 text-guardian-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? '...' : stats?.responseTime || 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              Average response time
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Safe Zones</CardTitle>
            <MapPin className="h-4 w-4 text-guardian-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? '...' : stats?.safeZones || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Verified safe locations
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Incident Overview</CardTitle>
            <CardDescription>
              7-day incident report statistics
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={incidentData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="incidents" stroke="#E53935" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Incidents</CardTitle>
            <CardDescription>
              Latest reported incidents in your area
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentIncidents />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-3 md:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/map">
              <Button className="w-full text-left justify-start" variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                View Safety Map
              </Button>
            </Link>
            <Link to="/chat">
              <Button className="w-full text-left justify-start" variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Emergency Assistance
              </Button>
            </Link>
            <Link to="/alerts">
              <Button className="w-full text-left justify-start" variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Manage Alerts
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="col-span-3 md:col-span-2">
          <CardHeader>
            <CardTitle>Safety Tips</CardTitle>
            <CardDescription>
              Stay prepared with these important safety guidelines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-guardian-info/10 p-2 rounded-full mr-4">
                  <Shield className="h-5 w-5 text-guardian-info" />
                </div>
                <div>
                  <h4 className="font-semibold">Emergency Preparedness</h4>
                  <p className="text-sm text-muted-foreground">
                    Keep emergency contacts saved and easily accessible on your device.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-guardian-warning/10 p-2 rounded-full mr-4">
                  <AlertTriangle className="h-5 w-5 text-guardian-warning" />
                </div>
                <div>
                  <h4 className="font-semibold">Natural Disaster Response</h4>
                  <p className="text-sm text-muted-foreground">
                    Identify safe locations in your home and community for different types of disasters.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-guardian-success/10 p-2 rounded-full mr-4">
                  <MapPin className="h-5 w-5 text-guardian-success" />
                </div>
                <div>
                  <h4 className="font-semibold">Location Sharing</h4>
                  <p className="text-sm text-muted-foreground">
                    Share your location with trusted contacts during emergencies or when in unfamiliar areas.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
