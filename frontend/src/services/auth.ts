import axios from "axios";
import type {LoginCredentials,RegisterData,AuthResponse,User}  from '../types/auth';


//configuracion de la url y credenciales
const API_URL='http://localhost:8080';

const api=axios.create({
    baseURL:API_URL,
    withCredentials:true,
    headers:{
        'Content-Type':'application/json',
    }
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('No autorizado - redirigir a login');
    }
    return Promise.reject(error);
  }
);

export const authService={

    register:async(userData :RegisterData):Promise<AuthResponse>=>{
        const response=await api.post('/auth/register',userData);
        return response.data;
    },
    login:async(credentials:LoginCredentials):Promise<AuthResponse>=>{
        const response=await api.post('/auth/login',credentials)
        return response.data
    },
 logout: async (): Promise<{ message: string }> => {
    const response = await api.post('/auth/logout');
    return response.data;
},
   
    getCurrentUser:async():Promise<{user:User}>=>{
        const response=await api.get('/auth/me');
        return response.data;
    }
    
    
};