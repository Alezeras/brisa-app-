import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://api-consultoria-production.up.railway.app',
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('brisa-auth-token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
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
  }
};

export default api;