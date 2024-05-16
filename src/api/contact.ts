import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiConfig = {
  headers: {
    'Authorization': process.env.API_TOKEN,
    'Content-Type': 'application/json'
  }
};

export const ContactApi = {
    
    getData: async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/contact`,  apiConfig);

        return response.data;

    } catch (error) {
        console.error('Error fetching companies:', error);
        return null;
    }
    },

    getDetail: async (id: string) => { 
        try {
          const response = await axios.get(`${apiBaseUrl}/contact/${id}`,  apiConfig); 
  
          return response.data; 
  
      } catch (error) {
          console.error('Error fetching contact detail:', error);
          return null;
      }
    },

    createContact: async (data: any) => { 
        try {
          const response = await axios.post(`${apiBaseUrl}/contact`, data, apiConfig); 
          return response.data;
  
      } catch (error) {
          console.error('Error creating contact:', error);
          return null;
      }
    },
}
