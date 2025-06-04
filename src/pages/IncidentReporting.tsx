
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, AlertTriangle, Phone, Clock } from 'lucide-react';
import { useCreateIncident } from '@/hooks/useIncidents';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const IncidentReporting: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const createIncident = useCreateIncident();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    incident_type: '',
    location_address: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to report an incident.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.title || !formData.incident_type) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createIncident.mutateAsync({
        ...formData,
        user_id: user.id,
        incident_type: formData.incident_type as any,
      });

      toast({
        title: 'Incident Reported',
        description: 'Your incident report has been submitted successfully.',
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        incident_type: '',
        location_address: '',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit incident report. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Report an Incident</h1>
        <p className="text-muted-foreground">
          Help keep your community safe by reporting incidents in your area.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2 md:col-span-1">
          <CardHeader>
            <CardTitle>Incident Details</CardTitle>
            <CardDescription>
              Provide as much detail as possible about the incident.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Incident Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Brief description of the incident"
                  required
                />
              </div>

              <div>
                <Label htmlFor="type">Incident Type *</Label>
                <Select value={formData.incident_type} onValueChange={(value) => handleInputChange('incident_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select incident type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fire">Fire</SelectItem>
                    <SelectItem value="accident">Accident</SelectItem>
                    <SelectItem value="medical">Medical Emergency</SelectItem>
                    <SelectItem value="crime">Crime</SelectItem>
                    <SelectItem value="weather">Weather Related</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location_address}
                  onChange={(e) => handleInputChange('location_address', e.target.value)}
                  placeholder="Street address or nearby landmark"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Provide additional details about the incident..."
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-guardian-emergency hover:bg-red-700"
                disabled={createIncident.isPending}
              >
                {createIncident.isPending ? 'Submitting...' : 'Report Incident'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-guardian-emergency" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-guardian-emergency/10 rounded-lg">
                <h3 className="font-semibold text-guardian-emergency">Emergency Services</h3>
                <p className="text-2xl font-bold">911</p>
                <p className="text-sm text-muted-foreground">For immediate life-threatening emergencies</p>
              </div>
              
              <div className="p-4 bg-guardian-info/10 rounded-lg">
                <h3 className="font-semibold text-guardian-info">Non-Emergency Police</h3>
                <p className="text-lg font-semibold">(415) 553-0123</p>
                <p className="text-sm text-muted-foreground">For non-urgent police matters</p>
              </div>
              
              <div className="p-4 bg-guardian-warning/10 rounded-lg">
                <h3 className="font-semibold text-guardian-warning">Poison Control</h3>
                <p className="text-lg font-semibold">1-800-222-1222</p>
                <p className="text-sm text-muted-foreground">24/7 poison emergency helpline</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-guardian-warning" />
                Reporting Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start">
                <Clock className="h-4 w-4 mt-1 mr-2 text-guardian-info" />
                <div>
                  <p className="font-medium">Report Immediately</p>
                  <p className="text-sm text-muted-foreground">Time-sensitive incidents should be reported as soon as safely possible.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mt-1 mr-2 text-guardian-info" />
                <div>
                  <p className="font-medium">Precise Location</p>
                  <p className="text-sm text-muted-foreground">Include specific addresses, landmarks, or cross streets when possible.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <AlertTriangle className="h-4 w-4 mt-1 mr-2 text-guardian-info" />
                <div>
                  <p className="font-medium">Stay Safe</p>
                  <p className="text-sm text-muted-foreground">Your safety is the priority. Don't put yourself at risk to gather information.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IncidentReporting;
