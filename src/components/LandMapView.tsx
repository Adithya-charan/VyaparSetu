import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DEMO_LAND_PARCELS } from '../data/landData';
import { LandParcel, ViewTab } from '../types';
import { LandMap } from './LandMap';
import { LandDetailCard } from './LandDetailCard';
import { Filter, Search, MapPin, Building2, SlidersHorizontal } from 'lucide-react';

interface LandMapViewProps {
  onNavigate: (tab: ViewTab) => void;
}

export const LandMapView: React.FC<LandMapViewProps> = ({ onNavigate }) => {
  const { t } = useTranslation();
  
  const [selectedParcelId, setSelectedParcelId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filters
  const [filterType, setFilterType] = useState<string>('all');
  const [filterListing, setFilterListing] = useState<string>('all');
  
  const selectedParcel = useMemo(() => {
    return DEMO_LAND_PARCELS.find(p => p.id === selectedParcelId) || null;
  }, [selectedParcelId]);

  const filteredParcels = useMemo(() => {
    return DEMO_LAND_PARCELS.filter(p => {
      const matchSearch = p.locality.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchType = filterType === 'all' || p.landUse === filterType;
      const matchListing = filterListing === 'all' || p.listingType === filterListing;
      return matchSearch && matchType && matchListing;
    });
  }, [searchTerm, filterType, filterListing]);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header Area */}
      <div className="mb-4 space-y-2">
        <h1 className="text-2xl font-bold text-stone-900 flex items-center gap-2">
          <MapPin className="text-emerald-600" />
          {t('landMap.title')}
        </h1>
        <p className="text-sm text-stone-500">{t('landMap.subtitle')}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 flex-1 min-h-0">
        
        {/* Left Side: Map Area */}
        <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden relative">
          
          {/* Top Filters Bar overlay */}
          <div className="absolute top-4 left-4 right-4 z-[400] flex flex-wrap gap-2">
            <div className="flex-1 min-w-[200px] bg-white rounded-lg shadow-md flex items-center px-3 py-2">
              <Search className="w-4 h-4 text-stone-400 mr-2" />
              <input 
                type="text" 
                placeholder={t('common.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 text-sm outline-none bg-transparent"
              />
            </div>
            
            <select 
              className="bg-white rounded-lg shadow-md px-3 py-2 text-sm outline-none border-none font-medium text-stone-700"
              value={filterListing}
              onChange={(e) => setFilterListing(e.target.value)}
            >
              <option value="all">{t('landMap.all')} {t('landMap.listingType')}</option>
              <option value="sale">{t('landMap.sale')}</option>
              <option value="lease">{t('landMap.lease')}</option>
            </select>
            
            <select 
              className="bg-white rounded-lg shadow-md px-3 py-2 text-sm outline-none border-none font-medium text-stone-700"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">{t('landMap.all')} Types</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
              <option value="mixed">Mixed Use</option>
            </select>
          </div>

          {/* Map Container */}
          <div className="flex-1 w-full relative z-0">
            <LandMap 
              parcels={filteredParcels}
              selectedParcelId={selectedParcelId}
              onSelectParcel={setSelectedParcelId}
            />
          </div>
        </div>

        {/* Right Side: Details Panel */}
        <div className={`w-full md:w-96 flex-shrink-0 bg-white rounded-2xl shadow-sm border border-stone-200 overflow-y-auto transition-all ${selectedParcel ? 'block' : 'hidden md:block'}`}>
          {selectedParcel ? (
            <LandDetailCard 
              parcel={selectedParcel} 
              onClose={() => setSelectedParcelId(null)}
              onNavigate={onNavigate}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center text-stone-500">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4">
                <Building2 className="w-8 h-8 text-stone-400" />
              </div>
              <h3 className="text-lg font-semibold text-stone-900 mb-2">Select a Property</h3>
              <p className="text-sm">Click on a map marker to view detailed information, suitability scores, and contact options.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
