// src/store/authStore.js
import { create } from 'zustand';


// AuthStore.js
const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));




export default useAuthStore;
