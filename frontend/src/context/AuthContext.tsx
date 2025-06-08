import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types/auth';
import { authService } from '../services/auth';
import type { ReactNode } from 'react';


interface AuthContextType{
    user:User |null;
    isLoading:boolean;
    isAuthenticated:boolean;
    login:(email:string,password:string)=> Promise<void>;
    register:(email:string,password:string,nommbre?:string)=> Promise<void>;
    logout:()=> Promise<void>;
}

export const AuthContext=createContext<AuthContextType | undefined>(undefined);

interface AuthProviderPorps{
    children:ReactNode;

}

export const AuthProvider :React.FC<AuthProviderPorps>=({children})=>{
 const[user,setUser]=useState<User |null>(null);
 const[isLoading,setLoading]=useState(true);

    //veridicar si hay una sesion activa para cargar la app
    useEffect(()=>{

        checkAuthStatus();
    },[]
    
    
    );
    const checkAuthStatus =async()=>{
        try{
            const reponse=await authService.getCurrentUser();
            setUser(reponse.user);
        }catch(err){
            setUser(null);
            
        }finally{
            setLoading(false);
        }
    }

    const login =async (email:string,password:string)=>{
        try{
            const response=await authService.login({email,password});
            setUser (response.user)

        }catch(err){
            throw(err);
            console.log('error al enviar las credenciles')
        }

    }
    const register = async (email: string, password: string, nombre?: string) => {
    try {
      const response = await authService.register({ email, password, nombre });
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      setUser(null); // Limpiar estado local aunque falle
    }
  };
 const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};



