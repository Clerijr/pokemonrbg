import React from "react";

function Navbar() {
  return (
    <nav className="bg-red-600 flex items-center justify-center shadow-2xl p-6 min-w-max">
      <div className="text-stone-300 text-lg font-bold mx-4">Profile</div>
      <div className="text-white text-lg font-bold mx-4 current">Pokédex</div>
      <div className="text-stone-300 text-lg font-bold mx-4">Battle</div>
    </nav>
  );
}

export default Navbar;
