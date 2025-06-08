import Logout from "../buttom/Logout";


export function HeaderAdmin({}) {
 
  

  return (
    <>
     
      <nav className="flex flex-col items-center px-6 bg-blue-600 py-4 sm:flex-row sm:justify-between">
  <div className="flex items-center space-x-4 mb-4 sm:mb-0"> 
    <div className="ml-2">
      <img
        className="rounded-full w-14 h-14"
        src="/img/mariaauxi.webp"
        alt="foto de MA"
      />
    </div>
    <div className="font-bold text-2xl sm:text-3xl text-cyan-100 pl-2 ">
      Capilla Maria Auxiliadora
    </div>
  </div>

  <div className="flex"> 
    <Logout buttonText="Cerrar sesion"/>
  </div>
</nav>
    </>
  );
}
