
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Shield, MapPin, Camera, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const IncidentReporting: React.FC = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [incidentType, setIncidentType] = useState('');
  const [urgency, setUrgency] = useState('medium');
  
  // This would normally handle form submission with real data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Incident Reported',
      description: 'Your report has been submitted successfully. Emergency services have been notified.',
      variant: 'default',
    });
    // In a real app, this would submit to an API and potentially alert emergency services
  };
  
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Report an Incident</h1>
        <p className="text-muted-foreground">
          Help keep your community safe by reporting incidents as they happen.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Incident Report Form</CardTitle>
          <CardDescription>
            Please provide as much detail as possible to help emergency services respond effectively.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="incident-type">Incident Type</Label>
                  <Select value={incidentType} onValueChange={setIncidentType}>
                    <SelectTrigger id="incident-type">
                      <SelectValue placeholder="Select incident type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fire">Fire</SelectItem>
                      <SelectItem value="medical">Medical Emergency</SelectItem>
                      <SelectItem value="accident">Traffic Accident</SelectItem>
                      <SelectItem value="crime">Crime in Progress</SelectItem>
                      <SelectItem value="hazard">Environmental Hazard</SelectItem>
                      <SelectItem value="other">Other (Specify)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <RadioGroup
                    defaultValue="medium"
                    value={urgency}
                    onValueChange={setUrgency}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high" className="font-normal flex items-center">
                        <AlertTriangle className="h-4 w-4 text-guardian-emergency mr-2" />
                        High - Immediate danger to life
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium" className="font-normal flex items-center">
                        <Shield className="h-4 w-4 text-guardian-warning mr-2" />
                        Medium - Urgent but not life-threatening
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low" className="font-normal flex items-center">
                        <MapPin className="h-4 w-4 text-guardian-info mr-2" />
                        Low - General information or non-urgent
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="location"
                      placeholder="Enter address or description of location"
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => console.log('Get current location')}
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Click the map marker to use your current location
                  </p>
                </div>

                <Button
                  type="button"
                  className="w-full"
                  onClick={() => setStep(2)}
                  disabled={!incidentType}
                >
                  Continue
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="description">Incident Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what happened, who is involved, and any relevant details"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Media Evidence</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button type="button" variant="outline" className="h-24 flex flex-col items-center justify-center">
                      <Camera className="h-8 w-8 mb-2" />
                      <span>Add Photo</span>
                    </Button>
                    <Button type="button" variant="outline" className="h-24 flex flex-col items-center justify-center">
                      <MessageCircle className="h-8 w-8 mb-2" />
                      <span>Add Voice Note</span>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Adding photos or voice recordings helps emergency responders assess the situation
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Information (Optional)</Label>
                  <Input id="contact" placeholder="Phone number to reach you if needed" />
                  <p className="text-xs text-muted-foreground">
                    Your information will be kept confidential and only used for emergency response
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button type="submit" className="flex-1 bg-guardian-emergency hover:bg-red-700">
                    Submit Report
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col text-center border-t pt-6">
          <div className="flex items-center justify-center mb-2">
            <Shield className="h-5 w-5 text-guardian-info mr-2" />
            <span className="font-semibold">Emergency Services Hotline</span>
          </div>
          <p className="text-muted-foreground text-sm">
            For immediate assistance, call 911 or your local emergency number
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default IncidentReporting;
