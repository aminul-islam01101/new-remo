import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FiMapPin } from 'react-icons/fi';
import { IoLanguageSharp } from 'react-icons/io5';
import { RiCloseFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import penIcon from '../../../Assets/Dashboard/talentRequest/penIcon.svg';
import penIconBlue from '../../../Assets/Dashboard/talentRequest/penIconBlue.svg';
import noJobRequest from '../../../Assets/RemoForceDashboard/dashboard/NoJobRequested.svg';
import InterviewConfirmScheduleModal from './InterviewConfirmScheduleModal';

import AuthContext from '../../../Context/AuthContext';

const RemoForceMyJobRequest = () => {
  const { user } = useSelector((state) => state.auth);

  const [expanded, setExpanded] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchData, setSearchData] = useState({});
  // const { socket } = useContext(AuthContext);

  const { data: jobs, refetch } = useQuery(['jobRequests'], () =>
    axios
      .get(
        `${import.meta.env.VITE_APP_URL_STARTUP}/api/remoforce/all-my-requests/${user?.user.email}`
      )
      .then((res) => res.data)
  );

  const jobRequests = jobs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const handleExpand = (id) => {
    if (expanded.includes(id)) {
      setExpanded(expanded.filter((item) => item !== id));
    } else {
      setExpanded([id]);
    }
  };
  const handleModal = (data) => {
    setIsOpen(true);
    setSearchData(data);
  };
  const handleJoin = (link) => {
    window.open(link);
  };
  // reject handler
  const handleReject = (request) => {
    console.log(request);

    const { jobId, remoforceEmail, startupsEmail, startupName, remoforceName, searchQuery } =
      request;

    const requestBody = {
      startupsEmail,
      startupName,
      remoforceEmail,
      remoforceName,
      jobId,
      jobTitle: searchQuery?.details.title,
      type: 'talent-request',
      stage: 'talent-request-rejection',
      interviewStatus: 'rejected',
      status: 'unread',
    };

    axios
      .put(`${import.meta.env.VITE_APP_URL_STARTUP}/api/talent/remo-request-rejection`, requestBody)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          if (response.status === 200) {
            toast.success(response.data.message);
            // socket?.emit('sendNotification', {
            //   receiverEmail:  startupsEmail,
            //   notificationArr: response.data.data,
            // });
          }
          refetch();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(request);
  };

  return (
    <div className="mt-6 py-2 pb-4 space-y-4 pr-2">
      {/* search and sorting button */}

      {/* history card */}
      {jobRequests?.length ? (
        jobRequests?.map((talentHistory) => (
          <div
            key={Math.random()}
            className="bg-white pb-2 px-2 hover:shadow-xl hover:shadow-[#e8dff5] duration-300 ease-in rounded-xl border "
          >
            <div className="lg:grid space-y-4 grid-cols-5 pt-3 2xl:pt-4 pb-1.5 px-2 2xl:px-3">
              {/* title and skills */}
              <div className="col-span-2">
                {/* title */}
                <div className="flex gap-1  lg:gap-1.5 2xl:gap-2">
                  <img className="lg:w-4 2xl:w-5" src={penIcon} alt="" />
                  <h2 className="text-base 2xl:text-xl  text-[#2d1865] font-semibold">
                    {talentHistory?.searchQuery?.details.title}
                  </h2>
                </div>
                {/* skills */}
                <div className=" flex flex-wrap mt-2 lg:mt-5 gap-1 lg:gap-2">
                  {talentHistory?.searchQuery?.selectedSkills.map((skill) => (
                    <div
                      key={Math.random()}
                      className="flex gap-1 lg:gap-2 items-center rounded-md py-0.5 px-1.5  bg-[#b9f2ff]"
                    >
                      <img className="" src={penIconBlue} alt="" />
                      <span className=" text-xs font-medium lg:text-[10px] 2xl:text-sm text-[#23aaff] lg:font-medium">
                        {skill.skillName}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* other details  */}
              <div className="lg:flex max-md:mt-3 max-md:divide-y lg:divide-x gap-x-5 max-md:justify-center lg:justify-end col-span-3  ">
                <div className="space-y-2 flex flex-col justify-center lg:items-end">
                  {talentHistory?.searchQuery?.locationPreference.map((location) => (
                    <div
                      key={Math.random()}
                      className="bg-[#ffe1b5] flex  items-center gap-1.5 py-0.5 px-1.5 2xl:px-2 rounded-md"
                    >
                      <span>
                        <FiMapPin className=" text-[#ff9900] lg:text-[10px] 2xl:text-sm" />
                      </span>
                      <p className="text-[#ff9900] lg:text-[10px] 2xl:text-sm">{location}</p>
                    </div>
                  ))}

                  {talentHistory?.searchQuery?.selectedLanguages?.map((language) => (
                    <div
                      key={Math.random()}
                      className="bg-[#ffadbb] rounded-md flex gap-1.5 px-1.5 2xl:px-2 py-0.5 items-center"
                    >
                      <span>
                        <IoLanguageSharp className="text-red-700 lg:text-[10px]" />
                      </span>
                      <p className="text-red-600 lg:text-[10px] 2xl:text-sm">{language}</p>
                    </div>
                  ))}
                </div>

                {/* view details */}
                {talentHistory.interviewStatus === 'requested' ? (
                  <div className="flex  max-md:mt-5 max-md:pt-3 justify-center gap-3 px-3 items-center">
                    <button
                      onClick={() => handleModal(talentHistory)}
                      type="button"
                      className="flex pl-2 items-center justify-center flex-col"
                    >
                      <span className=" rounded-full  border-[3px] border-[#65dc7f]">
                        <BsCheckCircleFill className="text-3xl  m-0.5 text-[#65dc7f]" />
                      </span>
                      <span className="text-[#999999] lg:text-[12px] 2xl:text-sm">Accept</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReject(talentHistory)}
                      className="flex pl-2 items-center justify-center flex-col"
                    >
                      <span className=" rounded-full   border-[3px] border-[#ff5a78]">
                        <RiCloseFill className="text-3xl bg-[#ff5a78]  m-0.5 text-[#fff] rounded-full" />
                      </span>
                      <span className="text-[#999999] lg:text-[12px] 2xl:text-sm">Reject</span>
                    </button>
                  </div>
                ) : (
                  <p className="text-green-500 font-bold p-5">Accepted</p>
                )}
              </div>
              {/* bottom item */}
            </div>
            {expanded.includes(talentHistory?._id) && (
              <div className="grid w-11/12 mx-auto mt-2 lg:grid-cols-4">
                <div
                  className={`${
                    talentHistory.interviewSchedule?.selectedDate ? 'col-span-2' : 'col-span-4'
                  } p-2 mt-2 rounded-xl `}
                >
                  <p className="whitespace-pre-wrap w-full text-[#999999]">
                    {talentHistory?.searchQuery?.details.description}
                  </p>
                </div>
                {talentHistory.interviewSchedule?.selectedDate ? (
                  <div className="col-span-2 rounded-xl my-3 flex flex-col items-center bg-[#f0f9ff]">
                    <h4 className="text-[#19a5ff] font-semibold">
                      <button type="button">Interview Details</button>
                    </h4>
                    {/* date */}
                    <div className="mt-2 p-2 flex flex-col items-center">
                      <div className=" w-full flex justify-center py-1 px-3 rounded-t-2xl bg-[#65dc7f]">
                        <h4 className="text-white font-semibold">
                          {talentHistory.interviewSchedule?.selectedDate?.split(' ')[0]}
                        </h4>
                      </div>
                      <div className="px-3 rounded-b-2xl  justify-around gap-5 bg-white divide-x-[3px] flex  items-center">
                        <h4 className="text-xl px-3 py-3 font-semibold">
                          {talentHistory.interviewSchedule?.selectedDate
                            ?.split(' ')[1]
                            .replace(/[^0-9]/g, '')}
                        </h4>
                        <h4 className="pl-3  py-3 text-xl font-semibold">
                          {talentHistory.interviewSchedule?.selectedDate?.split(' ')[2]}
                        </h4>
                      </div>
                    </div>
                    {/* time */}
                    <div className="bg-white mt-3  rounded-xl px-3 flex">
                      <h4 className="border-r-[3px] py-3 pr-2 mr-3 text-[12px] font-semibold">
                        {talentHistory.interviewSchedule?.selectedTime}
                      </h4>
                      <h4 className="text-[12px] py-3 pr-1.5 font-semibold">GMT+</h4>
                    </div>
                    {/* join meeting button */}
                    <div className="mt-3">
                      <button
                        className="bg-[#65dc7f] px-3 py-1.5 rounded-xl text-white "
                        type="button"
                        onClick={() =>
                          handleJoin(talentHistory.interviewSchedule?.selectedMeetLink)
                        }
                      >
                        Join Meeting
                      </button>
                    </div>
                    <div className="flex mt-2 justify-center">
                      <p className="text-[#a4a5a5] text-center text-[10px]">
                        This link will be active on the date and time mentioned
                      </p>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
            )}
            <div className="col-span-5 flex justify-center">
              <button
                onClick={() => handleExpand(talentHistory?._id)}
                type="button"
                className="text-sm text-gray-400 outline-none"
              >
                {expanded.includes(talentHistory?._id) ? `Show less` : `Show more`}
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center">
          <div className="flex justify-center flex-col items-center">
            <img src={noJobRequest} alt="" />
            <p className=" mt-5 text-[#999999]">Soon someone will find you!</p>
          </div>
        </div>
      )}

      {/* DEI modal  */}

      {isOpen && (
        <InterviewConfirmScheduleModal
          refetch={refetch}
          searchData={searchData}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default RemoForceMyJobRequest;
