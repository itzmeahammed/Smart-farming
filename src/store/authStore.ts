import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'farmer' | 'agronomist' | 'admin' | 'buyer';
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  language: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

// Demo users for different roles
const demoUsers: Record<string, User> = {
  'farmer@demo.com': {
    id: '1',
    email: 'farmer@demo.com',
    name: 'Ahammed Farmer',
    role: 'farmer',
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: 'Farm Valley, CA'
    },
    language: 'en'
  },
  'buyer@demo.com': {
    id: '2',
    email: 'buyer@demo.com',
    name: 'Sarah Buyer',
    role: 'buyer',
    location: {
      lat: 34.0522,
      lng: -118.2437,
      address: 'Los Angeles, CA'
    },
    language: 'en'
  },
  'admin@demo.com': {
    id: '3',
    email: 'admin@demo.com',
    name: 'Mike Admin',
    role: 'admin',
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: 'San Francisco, CA'
    },
    language: 'en'
  },
  'agronomist@demo.com': {
    id: '4',
    email: 'agronomist@demo.com',
    name: 'Dr. Lisa Expert',
    role: 'agronomist',
    location: {
      lat: 41.8781,
      lng: -87.6298,
      address: 'Chicago, IL'
    },
    language: 'en'
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check demo credentials
        const demoUser = demoUsers[email];
        if (demoUser && password === 'demo123') {
          set({
            user: demoUser,
            token: 'mock-jwt-token',
            isAuthenticated: true
          });
        } else {
          throw new Error('Invalid credentials. Use demo accounts: farmer@demo.com, buyer@demo.com, admin@demo.com, agronomist@demo.com with password: demo123');
        }
      },

      register: async (userData) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const newUser: User = {
          id: Date.now().toString(),
          email: userData.email!,
          name: userData.name!,
          role: userData.role || 'farmer',
          language: userData.language || 'en'
        };

        set({
          user: newUser,
          token: 'mock-jwt-token',
          isAuthenticated: true
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false
        });
      },

      updateProfile: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates }
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);