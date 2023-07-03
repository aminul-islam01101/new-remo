import React, { useState } from 'react';
import ContactModal from '../ContactModal';

const DeiPolicy = ({ setAgreePolicy, agreePolicy }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="lg:p-16 py-5 flex justify-center items-center">
        <div>
          <h1 className="text-[#ff9900] text-center lg:text-3xl text-xl font-bold">
            Do you have our DEI policy?
          </h1>
          <div className="flex gap-3 w-32 mt-5 lg:ml-60 lg:p-10 mx-auto">
            <button
              onClick={() => setAgreePolicy({ status: true, button: 1 })}
              className={`bg-orange-100 outline-none rounded-lg lg:py-2 lg:px-10 px-5 py-2 lg:text-lg ${
                agreePolicy.button === 1 ? 'text-[#ff9900]' : 'text-gray-500'
              }`}
              type="button"
            >
              Yes
            </button>
            <button
              onClick={() => setAgreePolicy({ status: true, button: 2 })}
              className={`bg-orange-100 outline-none rounded-lg lg:py-2 lg:px-10 px-5 py-2 lg:text-lg ${
                agreePolicy.button === 2 ? 'text-[#ff9900]' : 'text-gray-500'
              }`}
              type="button"
            >
              No
            </button>
          </div>
          <p className="lg:text-[24px] text-lg my-5">
            If No, We can help you build your DEI policy , Feel free to{' '}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="text-blue-500 cursor-pointer border-0 outline-none"
            >
              contact Remostarts
            </button>
            !
          </p>
        </div>
      </div>
      {isOpen && <ContactModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

export default DeiPolicy;
