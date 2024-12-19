import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import axios, { InternalAxiosRequestConfig } from "axios";

axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const token = await localStorage.getItem("AccessToken");
    
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }
);

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
 
    <App />
 
);
