
import React from 'react';
import { MapContainer as LeafletMapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Phone, AlertTriangle } from 'lucide-react';
import { userIcon, hospitalIcon } from './MapIcons';
import 'leaflet/dist/leaflet.css';

interface Hospital {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  emergency: string;
}

interface MapContainerProps {
  userLocation: { lat: number; lng: number };
  hospitals?: Hospital[];
}

const MapUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  
  React.useEffect(() => {
    map.setView(center, 12);
  }, [center, map]);
  
  return null;
};

const InteractiveMapContainer: React.FC<MapContainerProps> = ({ userLocation, hospitals }) => {
  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden">
      <LeafletMapContainer
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
      </LeafletMapContainer>
    </div>
  );
};

export default InteractiveMapContainer;
