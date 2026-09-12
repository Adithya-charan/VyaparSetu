import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { LandParcel } from '../types';
import { useTranslation } from 'react-i18next';

// Fix for default Leaflet icon issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom icon for selected marker
const selectedIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface LandMapProps {
  parcels: LandParcel[];
  selectedParcelId: string | null;
  onSelectParcel: (id: string) => void;
}

// Component to handle dynamic map centering
const MapController: React.FC<{ selectedParcel: LandParcel | null; parcels: LandParcel[] }> = ({ selectedParcel, parcels }) => {
  const map = useMap();
  
  useEffect(() => {
    if (selectedParcel) {
      map.setView([selectedParcel.latitude, selectedParcel.longitude], 16, { animate: true });
    } else if (parcels.length > 0) {
      const bounds = L.latLngBounds(parcels.map(p => [p.latitude, p.longitude]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [selectedParcel, parcels, map]);

  return null;
};

export const LandMap: React.FC<LandMapProps> = ({ parcels, selectedParcelId, onSelectParcel }) => {
  const { t } = useTranslation();
  
  const selectedParcel = parcels.find(p => p.id === selectedParcelId) || null;
  
  // Default to center of India if no parcels
  const center: [number, number] = parcels.length > 0 
    ? [parcels[0].latitude, parcels[0].longitude] 
    : [20.5937, 78.9629];

  return (
    <MapContainer 
      center={center} 
      zoom={5} 
      className="w-full h-full z-0"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapController selectedParcel={selectedParcel} parcels={parcels} />
      
      <MarkerClusterGroup
        chunkedLoading
        maxClusterRadius={50}
      >
        {parcels.map((parcel) => (
          <Marker 
            key={parcel.id}
            position={[parcel.latitude, parcel.longitude]}
            icon={parcel.id === selectedParcelId ? selectedIcon : new L.Icon.Default()}
            eventHandlers={{
              click: () => onSelectParcel(parcel.id)
            }}
          >
            <Popup>
              <div className="text-sm">
                <div className="font-bold">{parcel.locality}, {parcel.city}</div>
                <div className="text-emerald-700 font-semibold mt-1">
                  {parcel.listingType === 'sale' ? 'Sale: ' : 'Rent: '}
                  ₹{parcel.price || parcel.rent}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};
