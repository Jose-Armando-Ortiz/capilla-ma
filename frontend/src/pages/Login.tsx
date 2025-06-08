import { useAuth } from '../context/AuthContext';
import React, { useState } from 'react';
import BackToHome from '../components/buttom/BackToHome';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate=useNavigate();
 
 const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      // Si llega aquí, el login fue exitoso 
            navigate("/admin");



      console.log('Login exitoso!');
    } catch (error: any) {
      // Manejo de errores
      setError(error.response?.data?.error || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
        
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4">
      
      <div className="bg-blue-100 rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Ingresar Para Administrar</h1>
          
          <div className="w-16 h-16 mx-auto mb-6  rounded-full flex items-center justify-center shadow-lg">
            
            
            <img
              className='w-16 h-16 rounded-full'
              src="/img/mariaauxi.webp"
              alt="foto de MA"
            />
          
          
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo
            </label>
            <input
              type="email"
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Ingresa tu correo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          {error &&<div style={{color:'red'}}>{error}</div>}

          <button
          type='submit'
          disabled={isLoading}
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-bold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >{isLoading? 'Inisiando sesión..':'Iniciar sesión'}
            
          </button>
        </div>

        <div className="mt-6 text-center">
                    <BackToHome buttonText='Volver a Inicio'/>

          {/* <a 
            href="#" 
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            ¿Olvidaste tu contraseña?
          </a> */}
        </div>
      </div>
    </div>
    
    </>
    
  );
};

export default Login;





















