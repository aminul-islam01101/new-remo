import React from 'react';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import getVerifiedBannerImg from '../../../Assets/RemoForceDashboard/dashboard/getVerifiedBanner.svg';
import BlueBadge from '../../../Assets/RemoForceDashboard/verify/Blue_badge.svg';
import GoldenBadge from '../../../Assets/RemoForceDashboard/verify/Golden_badge.svg';
import PurpleBadge from '../../../Assets/RemoForceDashboard/verify/Purple_Badge.svg';

const GetVerifyBanner = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#edfff1] p-2 rounded-md">
      {/* title and back button */}
      <div className="flex border-b-[2px] pb-2 border-[#65dc7f] items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="border border-black hover:bg-[#00C42B] hover:text-white hover:border-[#00C42B] duration-300 ease-in rounded-md p-1"
        >
          <HiOutlineChevronLeft className="text-2xl" />
        </button>
        <h1 className="text-[#00C42B] text-3xl font-semibold">Get Verified</h1>
      </div>

      {/* banner */}
      <div className="lg:flex items-center justify-between lg:p-10">
        <div>
          <div className="space-y-5">
            <h1 className="lg:text-3xl text-2xl mt-2 leading-tight font-semibold text-[#00C42B]">
              Verification Increases Your <br /> Chances At Getting a Job
            </h1>
            <p className="text-[#999999] text-xl font-semibold">
              If you are struggling with getting jobs its because <br /> you are yet to be verified,
              verified talents get 10X <br /> more chance at getting jobs
            </p>
          </div>
          <div className="my-5">
            <button
              className="bg-[#65DC7F] rounded-full outline-none lg:px-5 px-3 lg:py-2 py-1 lg:text-xl  text-white font-medium shadow-lg shadow-[#bef3ca]"
              type="button"
            >
              Verify Me !
            </button>
          </div>
        </div>
        <div>
          <img className="object-contain " src={getVerifiedBannerImg} alt="" />
        </div>
      </div>

      {/* badges for larger devices, tablet, laptop, desktop and more large devices */}
      <div className="xl:py-36 lg:py-36 md:py-36 py-10 xl:pl-12 remoforce-verify-container xl:w-[1000px]">
        <div className="remoforce-verify-banner md:pl-10 lg:py-20 h-40 w-10/12 mx-auto xl:flex lg:flex md:flex justify-between">
          <div className="xl:w-40 lg:w-40 md:w-24 xl:-mt-16 lg:-mt-16 md:-mt-6 xl:-ml-16 lg:-ml-6">
            <p className="text-xs xl:ml-20 lg:ml-10 md:-ml-12 mb-10 xl:-mt-16 lg:-mt-16 text-slate-400 w-72">
              Getting this badge is a proof that you have a completed profile and that you are who
              you really say you are. This gives confidence to recruiters about you.
            </p>
            <img
              className="xl:h-44 xl:w-44 lg:h-44 lg:w-44 md:h-36 md:w-36 w-28 h-28 mx-auto xl:-ml-16 md:-ml-16 lg:-ml-24 xl:-mt-16 lg:-mt-16 md:-mt-16"
              src={BlueBadge}
              alt=""
            />
          </div>
          <div className="xl:w-40 lg:w-40 md:w-24 -mr-12 xl:-ml-28 lg:-ml-36 md:-ml-36 xl:-mt-20 lg:-mt-20">
            <img
              className="xl:h-44 xl:w-44 lg:h-44 lg:w-44 md:h-36 w-28 h-28 md:w-[600px]"
              src={GoldenBadge}
              alt=""
            />
            <p className="text-slate-400 text-xs xl:-ml-56 lg:-ml-56 md:-ml-40 xl:-mt-8 lg:-mt-8 md:-mt-2 w-72">
              The badge is given to certified talent with proof of skills. Either through other
              reputable organization ot through other verifiable means.
            </p>
          </div>
          <div className="xl:w-40 lg:w-40 md:w-24 xl:-mt-40 lg:-mt-40 md:-mt-24 xl:-mr-40 lg:-mr-40 md:-mr-12">
            <p className="text-slate-400 text-xs xl:-ml-40 lg:-ml-40 md:-ml-40 xl:w-72 lg:w-72 md:w-64">
              This is the highest badge it implies that you are Remostart verified. You have either
              gone through our Shadowing program, internship, skill tests or interviews and we are
              confident of you.
            </p>
            <img
              className="xl:h-44 xl:w-44 lg:h-44 lg:w-44 md:h-36 w-28 h-28 md:w-36"
              src={PurpleBadge}
              alt=""
            />
          </div>
        </div>
      </div>

      {/* badges for small devices: mobile */}
      <div className="remoforce-verify-badge-for-mobile py-10">
        <div className="border-2 border-blue-500 p-5 rounded-md">
          <img className="w-40 mx-auto" src={BlueBadge} alt="" />
          <p className="">
            Getting this badge is a proof that you have a completed profile and that you are who you
            really say you are. This gives confidence to recruiters about you.
          </p>
        </div>
        <div className="border-2 border-yellow-300 p-5 rounded-md my-2">
          <img className="w-40 mx-auto" src={GoldenBadge} alt="" />
          <p className="">
            The badge is given to certified talent with proof of skills. Either through other
            reputable organization ot through other verifiable means.
          </p>
        </div>
        <div className="border-2 border-purple-600 p-5 rounded-md">
          <img className="w-40 mx-auto" src={PurpleBadge} alt="" />
          <p className="">
            This is the highest badge it implies that you are Remostart verified. You have either
            gone through our Shadowing program, internship, skill tests or interviews and we are
            confident of you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetVerifyBanner;
