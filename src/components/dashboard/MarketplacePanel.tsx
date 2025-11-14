import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Plus, 
  Filter, 
  Star, 
  MapPin, 
  Calendar,
  DollarSign,
  Package
} from 'lucide-react';
import { useMarketplaceStore } from '../../store/marketplaceStore';
import { useAuthStore } from '../../store/authStore';

const MarketplacePanel: React.FC = () => {
  const { listings, filters, setFilters, createOrder } = useMarketplaceStore();
  const { user } = useAuthStore();
  const [showCreateListing, setShowCreateListing] = useState(false);
  const [selectedListing, setSelectedListing] = useState<string | null>(null);

  const filteredListings = listings.filter(listing => {
    if (filters.cropType && listing.cropType !== filters.cropType) return false;
    if (filters.quality && listing.quality !== filters.quality) return false;
    if (listing.pricePerKg < filters.priceRange[0] || listing.pricePerKg > filters.priceRange[1]) return false;
    return true;
  });

  const handlePurchase = (listingId: string, quantity: number) => {
    const listing = listings.find(l => l.id === listingId);
    if (!listing || !user) return;

    createOrder({
      listingId,
      buyerId: user.id,
      sellerId: listing.sellerId,
      quantity,
      totalPrice: quantity * listing.pricePerKg,
      status: 'pending'
    });

    // Show success animation
    setSelectedListing(null);
  };

  const getQualityBadgeColor = (quality: string) => {
    switch (quality) {
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'organic': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ShoppingCart className="w-8 h-8 text-green-600" />
          <h2 className="text-3xl font-bold text-gray-800">Marketplace</h2>
        </div>
        
        {user?.role === 'farmer' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateListing(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span>List Produce</span>
          </motion.button>
        )}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6 border border-green-100"
      >
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-bold text-gray-800">Filters</h3>
        </div>
        
        <div className="grid md:grid-cols-4 gap-4">
          <select
            value={filters.cropType}
            onChange={(e) => setFilters({ cropType: e.target.value })}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">All Crops</option>
            <option value="wheat">Wheat</option>
            <option value="rice">Rice</option>
            <option value="maize">Maize</option>
            <option value="soybean">Soybean</option>
          </select>

          <select
            value={filters.quality}
            onChange={(e) => setFilters({ quality: e.target.value })}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">All Quality</option>
            <option value="premium">Premium</option>
            <option value="organic">Organic</option>
            <option value="standard">Standard</option>
          </select>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Price:</span>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={filters.priceRange[1]}
              onChange={(e) => setFilters({ 
                priceRange: [filters.priceRange[0], parseFloat(e.target.value)] 
              })}
              className="flex-1"
            />
            <span className="text-sm text-gray-600">${filters.priceRange[1]}/kg</span>
          </div>

          <input
            type="text"
            placeholder="Location..."
            value={filters.location}
            onChange={(e) => setFilters({ location: e.target.value })}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </motion.div>

      {/* Listings Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing, index) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-48 bg-gradient-to-br from-green-100 to-yellow-100">
              <img
                src={listing.images[0]}
                alt={listing.cropType}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getQualityBadgeColor(listing.quality)}`}>
                  {listing.quality}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-800 capitalize">
                  {listing.cropType}
                </h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">4.8</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {listing.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Package className="w-4 h-4" />
                  <span>{listing.quantity} kg available</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{listing.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Harvested {listing.harvestDate.toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-green-600">
                  ${listing.pricePerKg}/kg
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedListing(listing.id)}
                  className="bg-gradient-to-r from-green-500 to-yellow-500 text-white px-4 py-2 rounded-xl font-semibold hover:from-green-600 hover:to-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Buy Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Purchase Modal */}
      {selectedListing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedListing(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
          >
            {(() => {
              const listing = listings.find(l => l.id === selectedListing);
              if (!listing) return null;

              return (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800">Purchase {listing.cropType}</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per kg:</span>
                      <span className="font-semibold">${listing.pricePerKg}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available:</span>
                      <span className="font-semibold">{listing.quantity} kg</span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity (kg)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={listing.quantity}
                        defaultValue="100"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        id="quantity-input"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedListing(null)}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const quantityInput = document.getElementById('quantity-input') as HTMLInputElement;
                        const quantity = parseInt(quantityInput.value);
                        handlePurchase(listing.id, quantity);
                      }}
                      className="flex-1 bg-gradient-to-r from-green-500 to-yellow-500 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Confirm Purchase
                    </motion.button>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default MarketplacePanel;