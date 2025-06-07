
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, AlertTriangle } from 'lucide-react';
import { useNearbyHospitals } from '@/hooks/useNearbyHospitals';

interface MapProps {
  className?: string;
}

const Map: React.FC<MapProps> = ({ className }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
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

  useEffect(() => {
    if (!mapContainer.current || !userLocation) return;

    // Initialize map with a free map style (no token required)
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'raster-tiles': {
            type: 'raster',
            tiles: [
              'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors'
          }
        },
        layers: [
          {
            id: 'simple-tiles',
            type: 'raster',
            source: 'raster-tiles',
            minzoom: 0,
            maxzoom: 22
          }
        ]
      },
      center: [userLocation.lng, userLocation.lat],
      zoom: 12
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add user location marker
    new mapboxgl.Marker({ color: 'blue' })
      .setLngLat([userLocation.lng, userLocation.lat])
      .setPopup(new mapboxgl.Popup().setHTML('<h4>Your Location</h4>'))
      .addTo(map.current);

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [userLocation]);

  // Add hospital markers when hospitals data is available
  useEffect(() => {
    if (!map.current || !hospitals) return;

    hospitals.forEach((hospital) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h4 class="font-semibold text-sm">${hospital.name}</h4>
          <p class="text-xs text-gray-600 mb-2">${hospital.address}</p>
          <div class="space-y-1">
            <div class="flex items-center text-xs">
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              ${hospital.phone}
            </div>
            <div class="flex items-center text-xs text-red-600">
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
              Emergency: ${hospital.emergency}
            </div>
          </div>
        </div>
      `);

      new mapboxgl.Marker({ color: 'red' })
        .setLngLat([hospital.longitude, hospital.latitude])
        .setPopup(popup)
        .addTo(map.current!);
    });
  }, [hospitals]);

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
              <div ref={mapContainer} className="w-full h-[500px] rounded-lg" />
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
                <div className="text-center py-4">Loading hospitals...</div>
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
