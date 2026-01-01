import React from 'react';


const NavBar = () => {
  return (
   <nav className="flex 
                  items-center
                  justify-between 
                  px-8 
                  py-4 
                  bg-white 
                  shadow-sm
                  sticky 
                  top-0 
                  z-50">
  
  {/* 1. Brand: LOGO */}
  <div className="text-2xl
                  font-bold
                  text-blue-600
                  cursor-pointer">

    Travel<span className="text-slate-800">Planner</span>
  </div>

  {/* 2.  Nav Links:  */}
  <div className="flex 
                  items-center
                  gap-8">
                    
  <a href="#destinations" className="text-sm 
                                      font-semibold text-slate-600 hover:text-blue-600 transition-colors">
    Destinations
  </a>
  <a href="#itineraries" className="text-sm 
                                    font-semibold text-slate-600 hover:text-blue-600 transition-colors">
    Itineraries
  </a>
  <a href="#bookings" className="text-sm 
                                 font-semibold 
                                 text-slate-600 hover:text-blue-600 transition-colors">
    Bookings
  </a>
  <a href="#about" className="text-sm
                              font-semibold 
                              text-slate-600 hover:text-blue-600 transition-colors">
    About Us
  </a>
  <a href="#contact" className="text-sm
                                font-semibold 
                                text-slate-600 hover:text-blue-600 transition-colors">
    Contact
  </a>
</div>
  {/* 3. Auth: Styled buttons to stand out */}
  <div className="flex 
                  items-center 
                  gap-4">
    <button className="text-sm 
                       font-semibold
                       text-slate-600 
                       hover:text-blue-600">
      Login
    </button>
    <button className="bg-blue-600
                       text-white
                       px-5 
                       py-2 
                       rounded-full
                       text-sm 
                       font-semibold 
                       hover:bg-blue-700 
                       transition-all
                       shadow-md">
      Sign Up
    </button>
  </div>

</nav>
  );
};



export default NavBar;
