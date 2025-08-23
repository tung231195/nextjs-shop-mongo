import axios from 'axios';

  const axiosInstance = axios.create({
      baseURL: "http://localhost:3001/api",
    });
    const hasWindow = typeof window !== 'undefined'
    axiosInstance.interceptors.request.use((config) => {
     if (hasWindow) {
          const acctssToken = window.localStorage.getItem('accessToken');
          config.headers['authorization'] = 'Bearer ' + acctssToken 
      }

      return config;
  }, (error) => {

    return Promise.reject(error);
  });
  axiosInstance.interceptors.response.use((response) => {

    return response.data;
  }, (error) => {
    if (error.response.status === 401) {
    }

    return Promise.reject(error);
  });

export default axiosInstance;

