import axios from 'axios';
import { useAuth } from 'src/hooks/useAuth';


  const axiosInstance = axios.create({
      baseURL: "http://localhost:3001/api",
    });
    const hasWindow = typeof window !== 'undefined'

    axiosInstance.interceptors.request.use((config) => {
    // handle before request is sent
    console.log('check token aaaaaaaaaaaaa')
     if (hasWindow) {
          const acctssToken = window.localStorage.getItem('accessToken');
          config.headers['authorization'] = 'Bearer ' + acctssToken 
          console.log(' check token axious', acctssToken);
      }
    
         console.log('check config',config.data)
    return config;
  }, (error) => {
    // handle request error
    return Promise.reject(error);
  });


  axiosInstance.interceptors.response.use((response) => {
    // handle response data
    console.log(' axous instance data',response);
    return response.data;
  }, (error) => {
    // handle response un-authen error
        console.log('check error',error);
    if (error.response.status === 401) {
      //navigate("/login");
    }
    return Promise.reject(error);
  });

export default axiosInstance;

