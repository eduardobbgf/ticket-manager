import React from "react";
import LogoSvg from "./../logo.png";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="bg-white flex items-center h-20 border-b border-gray-300">
      <div className="ml-4 md:ml-10">
        <Image src={LogoSvg} alt="Logo" className="h-8 w-auto" />
      </div>
      <div className="flex items-center">
        <div className="ml-5 h-5 bg-primaryColor w-px mx-5"></div>
        <div className="text-primaryColor">Ticket Manager</div>
      </div>
    </nav>
  );
}
