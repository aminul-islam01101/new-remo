import React, { useState } from 'react';
import DeiModal from '../../Modal/Dei/DeiModal';

const SectionForDEI = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="flex flex-col">
      <div className="mt-10 lg:grid grid-cols-7 px-10 py-8 mb-10  rounded-2xl getDmeShadowCard">
        <div className="col-span-5 space-y-5">
          <h1 className="text-[#ff9900] text-3xl font-medium">
            How inclusive is your organization? <br /> Get your free DEI score here
          </h1>
          <p className="text-[#999999] font-medium text-base">
            Get your investors stakeholders and board confidence, by showing them how inclusive you{' '}
            <br />
            are and how much your DEI policies is shaping inclusion
          </p>
        </div>
        <div className="col-span-2 max-lg:mt-10 flex justify-center items-center  lg:border-l-2 lg:border-[#ffeed4]">
          <button
            onClick={() => setIsOpen(true)}
            className="px-5 py-4 rounded-full outline-none font-semibold  text-[#FF9900] getDmeShadow"
            type="button"
          >
            Get My DEI Score
          </button>
        </div>
      </div>
      {/* DEI modal  */}
      {isOpen && <DeiModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </section>
  );
};

export default SectionForDEI;
