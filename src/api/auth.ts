import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiConfig = {
  headers: {
    'Authorization': process.env.API_TOKEN,
    'Content-Type': 'application/json'
  }
};

export const authApi = {

    handleLogin: async (data: any) => { 
      try {
        const response = await axios.post(`${apiBaseUrl}/login`, data, apiConfig); 
        return response;

      } catch (error) {
          console.error('Error login:', error);
          return null;
      }
    },

    handleRegister: async (data: any) => { 
      try {
        const response = await axios.post(`${apiBaseUrl}/register`, data, apiConfig); 
        return response;

      } catch (error) {
          console.error('Error register:', error);
          return null;
      }
    },
}
