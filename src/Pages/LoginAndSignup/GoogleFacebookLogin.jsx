import React from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';


const GoogleFacebookLogin = () => (
  <div>
    <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
      <p className="mx-4 text-[#999999] mb-0 text-center font-semibold">Continue with</p>
    </div>
    <div className="flex gap-2   w-56 mx-auto justify-center">
      <div className="py-3 h-14  px-10 bg-white border-[1px] border-[#999999] rounded-3xl  text-blue-400 text-xl cursor-pointer">
      <FaGoogle  className="w-7 h-7 mx-auto"  />
      </div>
      <div className="py-3 w-60 h-14 bg-white px-10 border-[1px] border-[#999999] rounded-3xl  text-blue-500 text-[25px] cursor-pointer">
        <FaFacebook className="w-7 h-7 mx-auto" />
      </div>
    </div>
  </div>
);

export default GoogleFacebookLogin;