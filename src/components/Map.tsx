
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, AlertTriangle } from 'lucide-react';
import { useNearbyHospitals } from '@/hooks/useNearbyHospitals';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const hospitalIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapProps {
  className?: string;
}

const MapUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, 12);
  }, [center, map]);
  
  return null;
};

const Map: React.FC<MapProps> = ({ className }) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { data: hospitals, isLoading } = useNearbyHospitals(userLocation?.lat, userLocation?.lng);

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to San Francisco if location access is denied
          setUserLocation({ lat: 37.7749, lng: -122.4194 });
        }
      );
    } else {
      // Default location if geolocation is not supported
      setUserLocation({ lat: 37.7749, lng: -122.4194 });
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

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
              <div className="w-full h-[500px] rounded-lg overflow-hidden">
                <MapContainer
                  center={[userLocation.lat, userLocation.lng]}
                  zoom={12}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  <MapUpdater center={[userLocation.lat, userLocation.lng]} />
                  
                  <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
                    <Popup>
                      <div className="text-center">
                        <h4 className="font-semibold">Your Location</h4>
                      </div>
                    </Popup>
                  </Marker>

                  {hospitals?.map((hospital) => (
                    <Marker
                      key={hospital.id}
                      position={[hospital.latitude, hospital.longitude]}
                      icon={hospitalIcon}
                    >
                      <Popup>
                        <div className="p-2 min-w-[200px]">
                          <h4 className="font-semibold text-sm mb-2">{hospital.name}</h4>
                          <p className="text-xs text-gray-600 mb-2">{hospital.address}</p>
                          <div className="space-y-1">
                            <div className="flex items-center text-xs">
                              <Phone className="w-3 h-3 mr-1" />
                              <a href={`tel:${hospital.phone}`} className="text-blue-600 hover:underline">
                                {hospital.phone}
                              </a>
                            </div>
                            <div className="flex items-center text-xs text-red-600">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Emergency: {hospital.emergency}
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Nearby Hospitals</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto mb-2"></div>
                  Loading hospitals...
                </div>
              ) : hospitals && hospitals.length > 0 ? (
                <div className="space-y-4">
                  {hospitals.slice(0, 5).map((hospital) => (
                    <div key={hospital.id} className="border rounded-lg p-3">
                      <h4 className="font-semibold text-sm">{hospital.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{hospital.address}</p>
                      <div className="space-y-1">
                        <div className="flex items-center text-xs">
                          <Phone className="w-3 h-3 mr-1" />
                          <a href={`tel:${hospital.phone}`} className="text-blue-600 hover:underline">
                            {hospital.phone}
                          </a>
                        </div>
                        <div className="flex items-center text-xs text-red-600">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Emergency: {hospital.emergency}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No hospitals found nearby
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Map;
