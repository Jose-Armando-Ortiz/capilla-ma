import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
interface LogoutProps {
  buttonText: string;
}

const Logout: React.FC<LogoutProps> = ({ buttonText }) => {
const {logout}=useAuth();
  const navigate = useNavigate();
  const handleGoToHome =async () => {
    try{
        await logout();
              navigate("/");
                  console.log("Redirigiendo a home ");


    }catch(error){
     console.log("Error al querer cerrar sesion ",error);

    }

  };

  return (
    <button
      className="font-bold text-cyan-100 sm:rounded-3xl rounded-lg bg-blue-700 p-1.5 sm:animate-bounce cursor-pointer transform transition-all duration-500 ease-in-out
            hover:scale-105 hover:shadow-2xl hover:z-10"
      type="submit"
      onClick={handleGoToHome}
    >
      {buttonText}
    </button>
  );
};
export default Logout;
