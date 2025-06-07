
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { useNearbyHospitals } from '@/hooks/useNearbyHospitals';
import { useUserLocation } from '@/hooks/useUserLocation';
import InteractiveMapContainer from './map/MapContainer';
import HospitalsList from './map/HospitalsList';

interface MapProps {
  className?: string;
}

const Map: React.FC<MapProps> = ({ className }) => {
  const { userLocation, getCurrentLocation } = useUserLocation();
  const { data: hospitals, isLoading } = useNearbyHospitals(userLocation?.lat, userLocation?.lng);

  if (!userLocation) {
    return (
      <div className={className}>
        <Card>
          <CardContent className="flex items-center justify-center h-[500px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p>Getting your location...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Interactive Safety Map</CardTitle>
                <Button onClick={getCurrentLocation} variant="outline" size="sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  Update Location
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <InteractiveMapContainer userLocation={userLocation} hospitals={hospitals} />
            </CardContent>
          </Card>
        </div>

        <div>
          <HospitalsList hospitals={hospitals} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Map;
