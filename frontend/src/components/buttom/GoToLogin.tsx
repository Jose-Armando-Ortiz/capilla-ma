import React from "react";
import { useNavigate } from "react-router-dom";

interface GoToLoginProps {
  buttonText: string;
}

const GoToLogin: React.FC<GoToLoginProps> = ({ buttonText }) => {
  const navigate = useNavigate();
  const handleGoToLogin = () => {
    console.log("Redirigiendo a login ");
      navigate("/login");

  };

  return (
    <button
      className="font-bold text-cyan-100 sm:rounded-3xl rounded-lg bg-blue-700 p-1.5 sm:animate-bounce cursor-pointer transform transition-all duration-500 ease-in-out
            hover:scale-105 hover:shadow-2xl hover:z-10"
      type="submit"
      onClick={handleGoToLogin}
    >
      {buttonText}
    </button>
  );
};
export default GoToLogin;
