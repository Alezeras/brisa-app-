import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-consultoria-production.up.railway.app',
});

export interface CompanyDTO {
  name: string;
  email: string;
  phone?: string; 
}

export const companyService = {
  list: async () => {
    const response = await api.get('/companies');
    return response.data;
  },

  create: async (data: CompanyDTO) => {
    const response = await api.post('/companies', data);
    return response.data;
  },

  getById: async (id: number | string) => {
    const response = await api.get(`/companies/${id}`);
    return response.data;
  },

  update: async (id: number | string, data: Partial<CompanyDTO>) => {
    const response = await api.put(`/companies/${id}`, data);
    return response.data;
  },

  delete: async (id: number | string) => {
    const response = await api.delete(`/companies/${id}`);
    return response.data;
  }
};

export default api;