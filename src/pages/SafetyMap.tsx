
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Shield, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const SafetyMap: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  
  // This would normally connect to a real map service
  // For now, we'll use a placeholder image to simulate the map
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Safety Map</h1>
          <p className="text-muted-foreground">
            Real-time visualization of safety incidents and alerts.
          </p>
        </div>
        <Button
          className="mt-4 sm:mt-0"
          variant="outline"
          onClick={() => console.log('Locate me clicked')}
        >
          <MapPin className="mr-2 h-4 w-4" />
          Locate Me
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <CardTitle>Regional Safety Overview</CardTitle>
              <CardDescription>
                View incident reports, danger zones, and safe routes
              </CardDescription>
            </div>
            <Tabs defaultValue="all" className="mt-4 sm:mt-0" onValueChange={setFilter}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="emergency">Emergency</TabsTrigger>
                <TabsTrigger value="warning">Warning</TabsTrigger>
                <TabsTrigger value="safe">Safe Zones</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          {/* Placeholder for the map */}
          <div className="map-container bg-slate-100 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="mb-4 text-muted-foreground">
                Map visualization would appear here, showing incident markers, danger zones, and safe routes.
              </div>
              <div className="flex space-x-2 justify-center">
                <Badge className="bg-guardian-emergency">Emergency</Badge>
                <Badge className="bg-guardian-warning">Warning</Badge>
                <Badge className="bg-guardian-info">Info</Badge>
                <Badge className="bg-guardian-success">Safe</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Nearby Incidents</CardTitle>
            <CardDescription>
              Showing incidents within 5 miles of your location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="incident-card incident-emergency">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-guardian-emergency mr-2" />
                      <h4 className="font-semibold">Building Fire</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">123 Main Street, 0.8 miles away</p>
                  </div>
                  <Badge className="bg-guardian-emergency">Active</Badge>
                </div>
              </div>
              
              <div className="incident-card incident-warning">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 text-guardian-warning mr-2" />
                      <h4 className="font-semibold">Traffic Accident</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Interstate 95, Exit 7, 2.3 miles away</p>
                  </div>
                  <Badge className="bg-guardian-warning">Responding</Badge>
                </div>
              </div>
              
              <div className="incident-card incident-info">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-guardian-info mr-2" />
                      <h4 className="font-semibold">Flooding</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Riverside Avenue, 3.5 miles away</p>
                  </div>
                  <Badge className="bg-guardian-info">Monitoring</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Designated Safe Zones</CardTitle>
            <CardDescription>
              Places you can go in case of emergency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="incident-card incident-success">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-guardian-success mr-2" />
                      <h4 className="font-semibold">Central Hospital</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">525 East Medical Center Dr, 1.2 miles away</p>
                  </div>
                  <Badge className="bg-guardian-success">Open 24/7</Badge>
                </div>
              </div>
              
              <div className="incident-card incident-success">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-guardian-success mr-2" />
                      <h4 className="font-semibold">Police Station</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">100 Government Center, 1.5 miles away</p>
                  </div>
                  <Badge className="bg-guardian-success">Open 24/7</Badge>
                </div>
              </div>
              
              <div className="incident-card incident-success">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-guardian-success mr-2" />
                      <h4 className="font-semibold">Community Shelter</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">250 Community Way, 0.9 miles away</p>
                  </div>
                  <Badge className="bg-guardian-success">Available</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SafetyMap;
