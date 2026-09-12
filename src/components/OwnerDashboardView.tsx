import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { INITIAL_CONTACT_REQUESTS, DEMO_LAND_PARCELS } from '../data/landData';
import { ContactRequest } from '../types';
import { Building2, MapPin, CheckCircle2, XCircle, Clock, Plus } from 'lucide-react';

export const OwnerDashboardView: React.FC = () => {
  const { t } = useTranslation();
  const [requests, setRequests] = useState<ContactRequest[]>(INITIAL_CONTACT_REQUESTS);

  const handleStatusChange = (id: string, newStatus: 'accepted' | 'declined') => {
    setRequests(prev => 
      prev.map(req => req.id === id ? { ...req, status: newStatus } : req)
    );
  };

  const myProperties = DEMO_LAND_PARCELS; // Mock: assume all demo properties belong to the current user

  return (
    <div className="space-y-6 pb-16">
      
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200">
        <h1 className="text-2xl font-bold text-stone-900 mb-2">{t('ownerDashboard.title')}</h1>
        <p className="text-sm text-stone-500 mb-6">{t('ownerDashboard.subtitle')}</p>
        
        <div className="flex gap-4">
          <div className="flex-1 bg-stone-50 rounded-2xl p-4 border border-stone-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Total Properties</p>
              <p className="text-2xl font-bold text-stone-900 mt-1">{myProperties.length}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Building2 className="w-6 h-6" />
            </div>
          </div>
          
          <div className="flex-1 bg-stone-50 rounded-2xl p-4 border border-stone-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Pending Requests</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">
                {requests.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Contact Requests */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200">
          <h2 className="text-lg font-bold text-stone-900 mb-4">{t('ownerDashboard.contactRequests')}</h2>
          
          <div className="space-y-4">
            {requests.length === 0 ? (
              <p className="text-sm text-stone-500 italic">{t('ownerDashboard.noRequests')}</p>
            ) : (
              requests.map(req => {
                const property = DEMO_LAND_PARCELS.find(p => p.id === req.landId);
                return (
                  <div key={req.id} className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-stone-900">{req.requesterName}</h3>
                        <p className="text-xs text-stone-600">{req.requesterBusiness}</p>
                      </div>
                      {req.status === 'pending' && (
                        <span className="px-2 py-1 rounded text-[10px] font-bold bg-amber-100 text-amber-800 uppercase tracking-wide">
                          {t('ownerDashboard.statusPending')}
                        </span>
                      )}
                      {req.status === 'accepted' && (
                        <span className="px-2 py-1 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                          {t('ownerDashboard.statusAccepted')}
                        </span>
                      )}
                      {req.status === 'declined' && (
                        <span className="px-2 py-1 rounded text-[10px] font-bold bg-red-100 text-red-800 uppercase tracking-wide">
                          {t('ownerDashboard.statusDeclined')}
                        </span>
                      )}
                    </div>
                    
                    {property && (
                      <div className="flex items-center gap-1.5 text-xs text-stone-500 bg-white p-2 rounded-lg border border-stone-100">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>Property #{property.parcelId} - {property.locality}</span>
                      </div>
                    )}
                    
                    {req.status === 'pending' && (
                      <div className="flex gap-2 pt-2 border-t border-stone-200">
                        <button 
                          onClick={() => handleStatusChange(req.id, 'accepted')}
                          className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          {t('ownerDashboard.accept')}
                        </button>
                        <button 
                          onClick={() => handleStatusChange(req.id, 'declined')}
                          className="flex-1 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <XCircle className="w-4 h-4" />
                          {t('ownerDashboard.decline')}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Property Listings */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-stone-900">My Properties</h2>
            <button className="flex items-center gap-1 text-sm text-emerald-700 font-semibold hover:text-emerald-800">
              <Plus className="w-4 h-4" />
              {t('ownerDashboard.addProperty')}
            </button>
          </div>
          
          <div className="space-y-4">
            {myProperties.map(property => (
              <div key={property.id} className="flex gap-4 p-3 rounded-2xl border border-stone-200">
                <div className="w-20 h-20 rounded-xl bg-stone-100 overflow-hidden shrink-0">
                  <img 
                    src={`https://source.unsplash.com/200x200/?${property.landUse}`} 
                    alt="Property"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 py-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm">Property #{property.parcelId}</h3>
                      <p className="text-xs text-stone-500">{property.locality}, {property.city}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-stone-600 uppercase">
                      {property.listingType}
                    </span>
                  </div>
                  <div className="mt-2 text-xs font-semibold text-emerald-700">
                    ₹{property.price || property.rent} {property.listingType === 'lease' && '/mo'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
