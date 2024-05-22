import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiConfig = {
  headers: {
    'Authorization': process.env.API_TOKEN,
    'Content-Type': 'application/json'
  }
};

export const ContractApi = {
    
    getData: async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/contract`,  apiConfig);

        return response.data;

    } catch (error) {
        console.error('Error fetching companies:', error);
        return null;
    }
    },

    getDetail: async (id: string) => { 
        try {
          const response = await axios.get(`${apiBaseUrl}/contract/${id}`,  apiConfig); 
  
          return response.data; 
  
      } catch (error) {
          console.error('Error fetching contract detail:', error);
          return null;
      }
    },

    createContract: async (data: any) => { 
        try {
          const response = await axios.post(`${apiBaseUrl}/contract`, data, apiConfig); 
          return response.data;
  
      } catch (error) {
          console.error('Error creating contract:', error);
          return null;
      }
    },


    updateContract: async (data: any) => { 
      try {
        const response = await axios.post(`${apiBaseUrl}/contract/${data.contract_id}`, data, apiConfig); 
        return response;

    } catch (error) {
        console.error('Error updating contract:', error);
        return null;
    }
    },

    deleteContract: async (id: string) => { 
      try {
        const response = await axios.delete(`${apiBaseUrl}/contract/${id}`, apiConfig); 
        return response.data;

    } catch (error) {
        console.error('Error removing contract:', error);
        return null;
    }
    },
}
