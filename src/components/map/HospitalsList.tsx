
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, AlertTriangle } from 'lucide-react';

interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  emergency: string;
}

interface HospitalsListProps {
  hospitals?: Hospital[];
  isLoading: boolean;
}

const HospitalsList: React.FC<HospitalsListProps> = ({ hospitals, isLoading }) => {
  return (
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
  );
};

export default HospitalsList;
