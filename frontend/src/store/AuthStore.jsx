// src/store/authStore.js
import { create } from 'zustand';


const useAuthStore = create((set) => ({
  user: { role: localStorage.getItem('userRole') },
  login: (userData) => set({ user: { ...userData, role: localStorage.getItem('userRole') } }),
  logout: () => {
    set({ user: null });
    localStorage.removeItem('userRole');
  },
}));



export default useAuthStore;
