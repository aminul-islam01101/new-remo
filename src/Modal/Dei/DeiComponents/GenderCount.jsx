import React, { useState } from 'react';
import LGBTQP from '../../../Assets/DEI/LGBTQ.svg';
import Female from '../../../Assets/DEI/female-avatar.svg';
import Male from '../../../Assets/DEI/male-avatar.svg';

const GenderCount = () => {
  const [male, setMale] = useState(0);
  const [female, setFemale] = useState(0);
  const [LGBTQ, setLGBTQ] = useState(0);

  const handleMaleCount = () => {
    setMale((prev) => prev + 1);
  };
  const handleFemaleCount = () => {
    setFemale((prev) => prev + 1);
  };
  const handleLGBTQCount = () => {
    setLGBTQ((prev) => prev + 1);
  };

  return (
    <div className="px-20">
      <h1 className="lg:text-2xl text-lg font-bold text-[#ff9900] mb-2">Specify Gender Count</h1>
      <div className="flex justify-between items-center">
        <div className="bg-orange-200 border-2 border-orange-200 rounded-md w-1/3 m-4 h-56 p-10 text-center">
          <img className="h-20 w-1/2 mx-auto" src={Male} alt="" />
          <input
            onClick={handleMaleCount}
            className="border-2 border-orange-200 px-10 py-2 mt-4 w-40 text-center cursor-pointer"
            type="text"
            placeholder={male <= 0 ? 'Male' : male}
            readOnly
          />
        </div>
        <div className="bg-orange-200 border-2 border-orange-200 rounded-md h-56 p-10 text-center">
          <img className="h-20 w-1/2 mx-auto" src={Female} alt="" />
          <input
            onClick={handleFemaleCount}
            className="border-2 border-orange-200 px-10 py-2 mt-4 text-center cursor-pointer"
            type="text"
            placeholder={female <= 0 ? 'Female' : female}
            readOnly
          />
        </div>
        <div className="bg-white border-2 rounded-md w-1/3 m-4 h-56 p-10 text-center">
          <img className="h-20 w-1/2 mx-auto" src={LGBTQP} alt="" />
          <input
            onClick={handleLGBTQCount}
            className="border-2 border-orange-200 px-10 py-2 mt-4 text-center cursor-pointer"
            type="text"
            placeholder={LGBTQ <= 0 ? 'LGBTQ' : LGBTQ}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default GenderCount;
