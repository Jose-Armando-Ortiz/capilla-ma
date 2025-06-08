import React from "react";
import { useNavigate } from "react-router-dom";

interface BackToHome {
  buttonText: string;
}

const BackToHome: React.FC<BackToHome> = ({ buttonText }) => {
  const navigate = useNavigate();
  const handleGoToLogin = () => {
    console.log("Redirigiendo a home ");
      navigate("/");

  };

  return (
    <button
      className="font-bold text-cyan-100 rounded-lg bg-blue-600 p-1.5 cursor-pointer hover:bg-blue-700  transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      type="submit"
      onClick={handleGoToLogin}
    >
      {buttonText}
    </button>
  );
};
export default BackToHome;
