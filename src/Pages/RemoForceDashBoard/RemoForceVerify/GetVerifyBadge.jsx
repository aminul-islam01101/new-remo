import React, { useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import blueBadgeCompleted from '../../../Assets/RemoForceDashboard/verify/Blue_Completed.svg';
import goldenBadgeCompleted from '../../../Assets/RemoForceDashboard/verify/Golden_Completed.svg';
import purpleBadgeCompleted from '../../../Assets/RemoForceDashboard/verify/Purple_Completed.svg';
import blueBadge from '../../../Assets/RemoForceDashboard/verify/blue.svg';
import purpleBadge from '../../../Assets/RemoForceDashboard/verify/purple.svg';
import goldenBadge from '../../../Assets/RemoForceDashboard/verify/yellow.svg';

const GetVerifyBadge = () => {
  const [isBlueBadgeCompleted, setIsBlueBadgeCompleted] = useState(false);
  const [isGoldenBadgeCompleted, setIsGoldenBadgeCompleted] = useState(false);
  const [isPurpleBadgeCompleted, setIsPurpleBadgeCompleted] = useState(false);

  return (
    <>
      {/* blue badge  */}
      <div className="bg-[#eaf7ff] grid lg:grid-cols-5 gap-5 lg:py-20 py-10 p-2 justify-center items-center px-20">
        <div className="col-span-2 flex justify-end pr-10 ">
          <div className="w-3/4">
            <img
              src={isBlueBadgeCompleted ? blueBadgeCompleted : blueBadge}
              className="  object-right"
              alt=""
            />
          </div>
        </div>
        <div className="col-span-3 ">
          <div className="space-y-6">
            <h1 className="lg:text-4xl text-xl font-medium">Get Your Blue Badge Now!</h1>
            <p className="text-[#999999]">
              This is the most simple and basic verification method, you are <br /> meant to simply
              show us that you are really who you say you are, <br /> and your profile and
              friends(peer-to-peer) are to us the best <br /> indicators to know you
            </p>
          </div>
          <div className="mt-6 lg:ml-10">
            <ul className="lg:space-y-8 space-y-2">
              <li className="flex  items-center lg:gap-8 gap-3">
                <span>
                  <FiCheckCircle className="lg:text-2xl text-xl text-[#19A5FF]" />
                </span>
                <span className="lg:text-xl text-xs">Complete your profile</span>
              </li>
              <li className="flex items-center lg:gap-8 gap-3">
                <span>
                  <FiCheckCircle className="lg:text-2xl text-xl text-[#19A5FF]" />
                </span>
                <span className="lg:text-xl text-xs">
                  Share your link with friends to verify you
                </span>
              </li>
            </ul>
            {/* complete task button */}
            <div className="lg:ml-14 mt-10 text-center">
              {isBlueBadgeCompleted ? (
                <div className="flex justify-center items-center pb-10">
                  <h4 className="px-5 py-2 text-[#19a5ff] text-2xl font-medium">Completed!!</h4>
                  <div className="w-20 h-20">
                    <img src={blueBadge} className="  object-right" alt="" />
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsBlueBadgeCompleted(true)}
                  className="lg:px-5 lg:py-2 p-1 focus:border-blue-500 border-2  outline-none rounded-lg bg-[#d8f0ff] text-[#19a5ff] lg:text-2xl font-medium"
                  type="button"
                >
                  Complete Task
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* golden badge  */}
      <div className="bg-[#FDFCDB] lg:py-20 py-10 p-2 flex lg:flex-row flex-col-reverse gap-5  justify-center items-center">
        <div className="lg:ml-10 lg:w-3/5">
          <div className="space-y-6">
            <h1 className="lg:text-4xl text-xl font-medium">Get Your Golden Badge Now!</h1>
            <p className="text-[#999999]">
              This is the most simple and basic verification method, you are <br /> meant to simply
              show us that you are really who you say you are, <br /> and your profile and
              friends(peer-to-peer) are to us the best <br /> indicators to know you
            </p>
          </div>
          <div className="mt-6 lg:ml-10">
            <ul className="lg:space-y-8 space-y-2">
              <li className="flex  items-center lg:gap-8 gap-3">
                <span>
                  <FiCheckCircle className="lg:text-2xl text-xl text-yellow-400" />
                </span>
                <span className="lg:text-xl text-xs">Complete your profile</span>
              </li>
              <li className="flex items-center lg:gap-8 gap-3">
                <span>
                  <FiCheckCircle className="lg:text-2xl text-xl text-yellow-400" />
                </span>
                <span className="lg:text-xl text-xs">
                  Share your link with friends to verify you
                </span>
              </li>
            </ul>
            {/* complete task button */}
            <div className="lg:ml-14 mt-10 text-center">
              {isGoldenBadgeCompleted ? (
                <div className="flex justify-center items-center pb-10">
                  <div className="w-20 h-20">
                    <img src={goldenBadge} className="  object-right" alt="" />
                  </div>
                  <h4 className="px-5 py-2 text-yellow-400 text-2xl font-medium">Completed!!</h4>
                </div>
              ) : (
                <button
                  onClick={() => setIsGoldenBadgeCompleted(true)}
                  className="lg:px-5 lg:py-2 p-1 focus:border-yellow-500 border-2 outline-none  rounded-lg bg-orange-100 text-yellow-400 lg:text-2xl font-medium"
                  type="button"
                >
                  Complete Task
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="w-2/5 flex justify-center pr-10">
          <div className="lg:w-3/4">
            <img
              src={isGoldenBadgeCompleted ? goldenBadgeCompleted : goldenBadge}
              className="object-right"
              alt=""
            />
          </div>
        </div>
      </div>
      {/* purple badge  */}
      <div className="bg-[#F3E5FE] grid lg:grid-cols-5 gap-5 lg:py-20 py-10 p-2  justify-center items-center">
        <div className="col-span-2 flex justify-end pr-10">
          <div className="w-3/4">
            <img
              src={isPurpleBadgeCompleted ? purpleBadgeCompleted : purpleBadge}
              className="object-right"
              alt=""
            />
          </div>
        </div>
        <div className="col-span-3 ">
          <div className="space-y-6">
            <h1 className="lg:text-4xl text-lg font-medium">Ready to Get Your Purple Badge?</h1>
            <p className="text-[#999999]">
              This is the most simple and basic verification method, you are <br /> meant to simply
              show us that you are really who you say you are, <br /> and your profile and
              friends(peer-to-peer) are to us the best <br /> indicators to know you
            </p>
          </div>
          <div className="mt-6 lg:ml-10">
            <ul className="lg:space-y-8 space-y-2">
              <li className="flex  items-center lg:gap-8 gap-2 text-xs">
                <span>
                  <FiCheckCircle className="lg:text-2xl text-xl text-purple-600" />
                </span>
                <span className="lg:text-xl text-xs">Complete your profile</span>
              </li>
              <li className="flex items-center lg:gap-8 gap-2 text-xs">
                <span>
                  <FiCheckCircle className="lg:text-2xl text-xl text-purple-600" />
                </span>
                <span className="lg:text-xl text-xs">
                  Share your link with friends to verify you
                </span>
              </li>
            </ul>
            {/* complete task button */}
            <div className="lg:ml-14 mt-10 text-center">
              {isPurpleBadgeCompleted ? (
                <div className="flex justify-center items-center pb-10">
                  <h4 className="px-5 py-2 text-purple-600 text-2xl font-medium">Completed!!</h4>
                  <div className="w-20 h-20">
                    <img src={purpleBadge} className="object-right" alt="" />
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsPurpleBadgeCompleted(true)}
                  className="lg:px-5 lg:py-2 p-1 outline-none focus:border-purple-700 border-2  rounded-lg shadow-inner bg-purple-300 text-purple-600 lg:text-2xl font-medium"
                  type="button"
                >
                  Get Purple
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetVerifyBadge;
