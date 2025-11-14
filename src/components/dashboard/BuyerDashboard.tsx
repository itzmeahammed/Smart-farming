import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Search, 
  Filter,
  Star,
  MapPin,
  Package,
  CreditCard,
  Truck
} from 'lucide-react';
import { useMarketplaceStore } from '../../store/marketplaceStore';

const BuyerDashboard: React.FC = () => {
  const { listings, createOrder } = useMarketplaceStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedListing, setSelectedListing] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'wheat', name: 'Wheat' },
    { id: 'rice', name: 'Rice' },
    { id: 'maize', name: 'Maize' },
    { id: 'soybean', name: 'Soybean' }
  ];

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.sellerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || listing.cropType === selectedCategory;
    return matchesSearch && matchesCategory && listing.status === 'active';
  });

  const handlePurchase = (listingId: string, quantity: number) => {
    const listing = listings.find(l => l.id === listingId);
    if (!listing) return;

    createOrder({
      listingId,
      buyerId: '2', // Current buyer ID
      sellerId: listing.sellerId,
      quantity,
      totalPrice: quantity * listing.pricePerKg,
      status: 'pending'
    });

    setSelectedListing(null);
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'organic': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <ShoppingCart className="w-8 h-8 text-blue-600" />
        <h2 className="text-3xl font-bold text-gray-800">Buyer Marketplace</h2>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products or sellers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Available Products</h3>
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-600">{filteredListings.length}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-green-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">My Orders</h3>
            <Truck className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-600">12</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-yellow-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Total Spent</h3>
            <CreditCard className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="text-3xl font-bold text-yellow-600">$4,250</div>
        </motion.div>
      </div>

      {/* Product Listings */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing, index) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-blue-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-48 bg-gradient-to-br from-blue-100 to-green-100">
              <img
                src={listing.images[0]}
                alt={listing.cropType}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getQualityColor(listing.quality)}`}>
                  {listing.quality}
                </span>
              </div>
              <div className="absolute top-4 left-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs font-semibold">4.8</span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-800 capitalize">
                  {listing.cropType}
                </h3>
                <div className="text-2xl font-bold text-blue-600">
                  ${listing.pricePerKg}/kg
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
                <div className="text-sm text-gray-600">
                  Seller: {listing.sellerName}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedListing(listing.id)}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Purchase Now
              </motion.button>
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
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
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

export default BuyerDashboard;