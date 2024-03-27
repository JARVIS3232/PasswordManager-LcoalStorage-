import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-800">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-16">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP</span>
          <span className="text-green-500">/&gt;</span>
        </div>
        <button className="flex justify-between items-center gap-2 bg-green-700 rounded-full">
          <img src="/github.svg" className="pl-2" />
          <span className="pr-3 text-white font-semibold">GitHub</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
