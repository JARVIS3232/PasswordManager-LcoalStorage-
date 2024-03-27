import React from "react";

const Footer = () => {
  return (
    <footer className="flex items-center justify-around bg-slate-700 py-1">
      <div className="logo font-bold text-white text-2xl">
        <span className="text-green-500">&lt;</span>
        Pass
        <span className="text-green-500">OP</span>
        <span className="text-green-500">/&gt;</span>
      </div>
      <span className="text-white font-semibold text-xl">Created by XYZ</span>
    </footer>
  );
};

export default Footer;
