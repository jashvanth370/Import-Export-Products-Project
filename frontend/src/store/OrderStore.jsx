// src/store/OrderStore.js
import { create } from 'zustand';

const useOrderStore = create(set => ({
  pendingCount: 0,
  setPendingCount: (count) => set({ pendingCount: count }),
  refreshPendingCount: async (exporterId) => {
    try {
      const res = await fetch(`http://localhost:8080/api/orders/pending/exporter/${exporterId}`);
      const data = await res.json();
      set({ pendingCount: data.data?.length || 0 });
    } catch (err) {
      console.error('Error refreshing pending count', err);
    }
  }
}));

export default useOrderStore;
