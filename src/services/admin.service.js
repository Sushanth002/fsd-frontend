
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/admin';

const adminService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { admin_email: email, admin_password: password },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  getAdminDetails: async (adminId) => {
    try {
      const response = await axios.get(`${API_URL}/dashboard/getadmin/${adminId}`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch admin details');
    }
  }
  
};

export default adminService;


