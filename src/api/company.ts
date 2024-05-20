import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiConfig = {
  headers: {
    'Authorization': process.env.API_TOKEN,
    'Content-Type': 'application/json'
  }
};

export const CompanyApi = {
    
    getData: async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/company`,  apiConfig);

        return response.data;

    } catch (error) {
        console.error('Error fetching companies:', error);
        return null;
    }
    },

    getDetail: async (id: string) => { 
        try {
          const response = await axios.get(`${apiBaseUrl}/company/${id}`,  apiConfig); 
  
          return response; 
  
      } catch (error) {
          console.error('Error fetching company detail:', error);
          return null;
      }
    },

    createCompany: async (data: any) => { 
        try {
          const response = await axios.post(`${apiBaseUrl}/company`, data, apiConfig); 
          return response;
  
      } catch (error) {
          console.error('Error creating company:', error);
          return null;
      }
    },

    updateCompany: async (data: any) => { 
      try {
        const response = await axios.post(`${apiBaseUrl}/company/${data.id}`, data, apiConfig); 
        return response;

    } catch (error) {
        console.error('Error updating company:', error);
        return null;
    }
    },

    deleteCompany: async (id: string) => { 
      try {
        const response = await axios.delete(`${apiBaseUrl}/company/${id}`, apiConfig); 
        return response.data;

    } catch (error) {
        console.error('Error removing company:', error);
        return null;
    }
    },
}
