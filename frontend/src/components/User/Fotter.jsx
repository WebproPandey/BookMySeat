import React from "react";
import buslogo from "../../assets/buslogo.png";
import { Facebook, Phone, Youtube, Instagram } from "lucide-react";

const Fotter = () => {
  return (
    <div className="h-[25vh] w-full bg-gray-100 px-6 flex items-center justify-between  ">
      <div className="websitelogo">
        <div className="w-[10vw] flex items-center  justify-center pt-6 ">
          <img src={buslogo} className="h-full  w-full  object-cover " alt="" />
        </div>
      </div>
      <div className="h-[60%] w-[1px] bg-black/80"></div>
      <div className="w-[50%] h-full flex items-start justify-center flex-col  pl-6">
        <div className="flex gap-3">
          <div className="text-[1.2vw] font-medium">About</div>
          <div className="text-[1.2vw] font-medium">Benifit</div>
          <div className="text-[1.2vw] font-medium">Support</div>
        </div>
        <div className="text-[1.2vw] font-medium">
          © 2025 YourCompanyName. All rights reserved.
        </div>
      </div>
      <div className="w-[20%] h-full flex items-start justify-center flex-col  pl-6">
        <div className="flex gap-5 text-[1.5vw]">
          <Facebook className="cursor-pointer hover:text-blue-500" />
          <Phone className="cursor-pointer hover:text-green-500" />
          <Youtube className="cursor-pointer hover:text-red-600" />
          <Instagram className="cursor-pointer hover:text-pink-500" />
        </div>

        <div className="text-[1.2vw] font-medium">example@gamil.com</div>
      </div>
    </div>
  );
};

export default Fotter;
