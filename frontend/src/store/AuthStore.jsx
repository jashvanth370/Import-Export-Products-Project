// AuthStore.js
import { create } from 'zustand';

const useAuthStore = create((set) => {
  // Retrieve user and token from localStorage on initial load
  const storedUser = JSON.parse(localStorage.getItem('user')) || null;
  const storedToken = localStorage.getItem('token') || null;
  console.log('Stored user:', storedUser);
  console.log('Stored token:', storedToken);

  return {
    user: storedUser,
    token: storedToken,

    login: ({ id, name, role, token }) => {
      const user = { id, name, role ,token };
        // Store id, name, and role in a user object

      // // Store user and token in localStorage
      localStorage.setItem('user', JSON.stringify(user)); // save user details
      localStorage.setItem('token', token); // save token

      // Update the store with user details and token
      set({ user, token });
    },

    setUser: (user) => {
      localStorage.setItem('user', JSON.stringify(user)); // save user in localStorage
      set({ user });
    },

    logout: () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      set({ user: null, token: null });
    },
  };
});

export default useAuthStore;
