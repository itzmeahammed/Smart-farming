import { create } from 'zustand';

interface MarketplaceListing {
  id: string;
  sellerId: string;
  sellerName: string;
  cropType: string;
  quantity: number; // kg
  pricePerKg: number;
  quality: 'premium' | 'standard' | 'organic';
  harvestDate: Date;
  location: string;
  description: string;
  images: string[];
  status: 'active' | 'sold' | 'expired';
  createdAt: Date;
}

interface Order {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  deliveryDate?: Date;
}

interface MarketplaceState {
  listings: MarketplaceListing[];
  orders: Order[];
  filters: {
    cropType: string;
    quality: string;
    priceRange: [number, number];
    location: string;
  };
  createListing: (listing: Omit<MarketplaceListing, 'id' | 'createdAt'>) => void;
  updateListing: (id: string, updates: Partial<MarketplaceListing>) => void;
  createOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  setFilters: (filters: Partial<MarketplaceState['filters']>) => void;
}

export const useMarketplaceStore = create<MarketplaceState>((set, get) => ({
  listings: [
    {
      id: '1',
      sellerId: '1',
      sellerName: 'Green Valley Farm',
      cropType: 'wheat',
      quantity: 500,
      pricePerKg: 2.50,
      quality: 'premium',
      harvestDate: new Date('2024-07-15'),
      location: 'Farm Valley, CA',
      description: 'High-quality organic wheat, pesticide-free',
      images: ['https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg'],
      status: 'active',
      createdAt: new Date('2024-07-16')
    },
    {
      id: '2',
      sellerId: '2',
      sellerName: 'Sunrise Agriculture',
      cropType: 'rice',
      quantity: 750,
      pricePerKg: 1.80,
      quality: 'organic',
      harvestDate: new Date('2024-08-01'),
      location: 'Rice Valley, TX',
      description: 'Premium basmati rice, certified organic',
      images: ['https://images.pexels.com/photos/33239/wheat-field-wheat-yellow-grain.jpg'],
      status: 'active',
      createdAt: new Date('2024-08-02')
    },
    {
      id: '3',
      sellerId: '3',
      sellerName: 'Golden Harvest Co.',
      cropType: 'maize',
      quantity: 1200,
      pricePerKg: 1.20,
      quality: 'standard',
      harvestDate: new Date('2024-09-10'),
      location: 'Corn Fields, IA',
      description: 'Fresh sweet corn, perfect for processing',
      images: ['https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg'],
      status: 'active',
      createdAt: new Date('2024-09-11')
    }
  ],
  orders: [],
  filters: {
    cropType: '',
    quality: '',
    priceRange: [0, 10],
    location: ''
  },

  createListing: (listingData) => {
    const newListing: MarketplaceListing = {
      ...listingData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    set(state => ({ listings: [...state.listings, newListing] }));
  },

  updateListing: (id, updates) => {
    set(state => ({
      listings: state.listings.map(listing =>
        listing.id === id ? { ...listing, ...updates } : listing
      )
    }));
  },

  createOrder: (orderData) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    set(state => ({ orders: [...state.orders, newOrder] }));
  },

  updateOrder: (id, updates) => {
    set(state => ({
      orders: state.orders.map(order =>
        order.id === id ? { ...order, ...updates } : order
      )
    }));
  },

  setFilters: (newFilters) => {
    set(state => ({
      filters: { ...state.filters, ...newFilters }
    }));
  }
}));