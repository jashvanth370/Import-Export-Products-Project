import jwt_decode from 'jwt-decode';

const getRoleFromToken = (token) => {
    try {
      const decoded = jwt_decode(token);
      return decoded.role;  // Assuming the role is stored in the 'role' field
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };