import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { BsStarFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import headingIcon from '../../../Assets/Dashboard/talentRequest/headingIcon.svg';
import AuthContext from '../../../Context/AuthContext';
import TalentRequestModal from '../../../Modal/TalentRequest/TalentRequestModal';
import TalentRequestBanner from './TalentRequestBanner';
import TalentsFounds from './TalentsFounds';

// Import Swiper React components

const TalentRequest = () => {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { startupRequests, handleStartupRequests, startupDetails } = useContext(AuthContext);

  useEffect(() => {
    handleStartupRequests();
  }, []);

  // const { data: results, refetch: reTouch } = useQuery(['results'], () =>
  //   axios
  //     .get(
  //       `${import.meta.env.VITE_APP_URL_STARTUP}/api/talent/last-results?email=${user?.user?.email}`
  //     )
  //     .then((res) => res.data)
  // );
  const handleTryNow = () => {
    if (
      startupRequests?.requestsInCurrentTier?.length <
      startupDetails?.talentRequestPaymentDetails?.searchLimit
    ) {
      setIsOpen(true);
    } else {
      toast.error('You have reached your free search limit.  Consider Buying a plan');
      setOpen(true);
    }
  };

  // const results = {
  //   lastSearchResult: {},
  // };
  return (
    <>
      <section>
        {/* //& banner */}
        {/* section title */}
        <div className="flex gap-3 border-b border-[#A5DBFF] ">
          <img src={headingIcon} alt="" />
          <h1 className="text-3xl font-semibold">
            {' '}
            <span className="text-[#13D1FF]">Talent</span> Request
          </h1>
        </div>
        {/* banner */}
        <div>
          <TalentRequestBanner
            refresh={refresh}
            setIsOpen={setIsOpen}
            open={open}
            setOpen={setOpen}
            // refetch={refetch}
          />
        </div>
        {/* Try Free or view plan option */}
        {/* <div className="lg:flex max-md:p-2 max-md:pb-4 items-center mt-5 justify-between pr-5 rounded-md bg-[#f0f9ff]"> */}
        {/* //& try now */}
        {startupDetails?.talentRequestPaymentDetails?.tier === 'tierFREE' && (
          <div className="max-md:flex max-md:flex-col lg:grid grid-cols-6  items-center justify-between  w-full  gap-2 px-2   mt-5  max-lg:pr-1 2xl:pr-5 rounded-md bg-[#f0f9ff] py-7">
            <div className="flex gap-2  col-span-4 ">
              <span className="mt-1">
                <BsStarFill className="text-[#ff9900]" />
              </span>
              <div>
                <h4 className="font-semibold">Try for free</h4>
                <p className="  text-[#999999] text-sm">
                  Our first 2 tries of this feature is free, you don&#39;t even need to put in your
                  card, though it has limited functionality
                </p>
              </div>
            </div>
            <div className="flex col-span-2   max-lg:mt-5  w-full justify-around max-lg:gap-5 lg:justify-center gap-3">
              <button
                onClick={handleTryNow}
                className="text-white hover:bg-[#00c42b] duration-300 ease-in bg-[#65dc7f] px-7 2xl:px-10  py-2 border  border-[#00c42b] rounded-lg"
                type="button"
              >
                Try Now!
              </button>

              {/* <button
              className="text-[#13d1ff] hover:bg-[#13d1ff] hover:text-white duration-300 ease-in  px-7 2xl:px-10 py-2 border border-[#13d1ff] rounded-lg"
              type="button"
            >
              View Plan
            </button> */}
            </div>
          </div>
        )}
        {/* //& Talent founds */}
        {/* {results?.lastSearchResult?.searchQuery?.details?.description && ( */}
          <div>
            <TalentsFounds  myRequests={startupRequests} />
          </div>
        {/* )} */}
      </section>
      {/* //& talent Modal */}
      <TalentRequestModal
        refresh={refresh}
        setRefresh={setRefresh}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        // refetch={refetch}
        // reTouch={reTouch}
      />
    </>
  );
};

export default TalentRequest;
