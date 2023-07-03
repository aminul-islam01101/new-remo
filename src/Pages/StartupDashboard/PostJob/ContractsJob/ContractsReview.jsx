import React, { useContext, useEffect, useState } from 'react';
import { BiBookmarks } from 'react-icons/bi';
import { FaRegClock } from 'react-icons/fa';
import { GiSandsOfTime } from 'react-icons/gi';
import { GoLocation } from 'react-icons/go';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { RiShareForwardLine } from 'react-icons/ri';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import contractLogo from '../../../../Assets/Dashboard/post_job/InternshipLogo.png';
import AuthContext from '../../../../Context/AuthContext';
import { setJob } from '../../../../Hooks/useLocalStorage';
import FinalConfirmation from '../../../../Modal/ConfirmationModal/FinalConfirmation';
import getPostedDays from '../../../../Utilities/getPostedDays';

const ContractsReview = () => {
  const { refresh, setRefresh } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const data = location?.state && location?.state?.data;
  const path = location.pathname.split('/');
  const review = path[path.length - 1];
  const [contract, setContract] = useState(false);
  const [storedJob, setStoredJob] = useState({});
  const postedDate = data?.createdAt || '2023-04-10T09:09:24.851+00:00';

  useEffect(() => {
    const getStoredItem = () => JSON.parse(localStorage.getItem('contracts')) || {};
    const lsData = getStoredItem();
    if (Object.keys(lsData)?.length !== 0) {
      setStoredJob(lsData);
    } else {
      setStoredJob(data);
    }
  }, [data]);

  const handlePost = () => {
    setContract(true);
  };
  const handleEdit = () => {
    navigate('/dashboard/post-job/edit/contracts', { state: { data: storedJob } });
  };

  const viewHandler = () => {
    setJob('jobId', id);
    navigate(`/dashboard/contracts/${storedJob?.jobId}/view-applicants`);
    setRefresh(!refresh);
  };

  return (
    <div className="w-full">
      {/* Banner Section start */}
      <div className="flex contract-banner justify-between absolute w-full md:w-[80%] lg:w-[63%] max-w-6xl">
        <h1 className="text-2xl md:text-3xl lg:text-5xl pt-2 md:pt-[15px] md:pl-7 pl-2 font-normal text-white">
          {storedJob?.title}
        </h1>
        <div className="flex justify-end items-end mt-[34px] gap-[10px] my-6 ">
          <a href="share">
            <BiBookmarks className="text-[#19A5FF] text-2xl text-right" />
          </a>
          <a href="/">
            <RiShareForwardLine className="text-[#19A5FF] text-2xl text-right mr-[30px]" />
          </a>
        </div>
      </div>
      {/* Banner End  */}

      {/* Icon For company  */}
      <div className="relative right-[-5px] md:right-[-36px] top-[93px] md:top-[117px] lg-[top-[126px]]">
        <div className="flex gap-[10px] items-center">
          <div className="bg-[#f0f9ff] mt-10 lg:mt-0 w-[85px] md:w-[131px] bg-red rounded-full shadow-2xl shadow-[#DDB6FF] p-4 md:p-10">
            <img src={contractLogo} alt="" />
          </div>
          <div className="font-bold text-[14px] mt-12 lg:mt-0 flex flex-col">
            <h3>Contract</h3>
            <div className="text-xs text-[#999999] md:hidden">
              <h2 className="lg:text-2xl lg:-ml-5 text-xl font-bold text-slate-500">
                {review !== 'review' ? `Posted ${getPostedDays(postedDate)} days ago` : ''}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[125px] ">
        {/* post date */}
        <div className="md:flex mx-4 gap-4 text-[#999999] font-semibold mt-[8px] hidden">
          <h2 className="lg:text-2xl text-xl font-bold text-slate-500">
            {review !== 'review' ? `Posted ${getPostedDays(postedDate)} days ago` : ''}
          </h2>
        </div>

        <div className="grid lg:grid-cols-4 mt-3 ">
          <div className=" col-span-3 lg:mx-4">
            {/* Paragraph   start */}
            <p className="whitespace-pre-wrap">{storedJob?.description}</p>

            {/* Paragraph   end --------------------------*/}

            {/* Contract details  start------------- */}
            {/* Contract Duration */}
            <div>
              <h1 className=" mt-[30px] font-semibold text-2xl">Contract Duration:</h1>
              <hr className="h-[3px] bg-[#19A5FF]  w-3/4 lg:w-2/5" />
              <div className=" mb-4 mt-[10px] flex gap-5">
                <div>
                  <h4 className="font-semibold">Start Date</h4>
                  <p className="flex items-center rounded-md gap-3 font-semibold py-2 px-4 bg-[#F0F9FF]  ">
                    <span>
                      <FaRegClock className="text-[#65DC7F] text-lg" />
                    </span>
                    <span>{storedJob?.startingDate?.slice(0, 10)}</span>
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">End Date</h4>
                  <p className="flex  rounded-md items-center gap-3 font-semibold py-2 px-4 bg-[#F0F9FF]  ">
                    <span>
                      <FaRegClock className="text-[#F60C36] text-lg" />
                    </span>
                    <span>{storedJob?.endingDate?.slice(0, 10)}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Contract Requirements year ----- */}
            <div>
              <h1 className=" mt-[30px] font-semibold text-2xl">Contract Requirements:</h1>
              <hr className="h-[3px] bg-[#19A5FF]  w-[85%] lg:w-2/5" />
              <div className=" mb-4 mt-[10px]">
                <h4 className="font-semibold">Experience Required:</h4>
                <span className=" mt-2 rounded-md inline-block  font-semibold py-2 px-4 bg-[#F0F9FF]  ">
                  {` 0 - ${storedJob?.experience} Years`}
                </span>
              </div>
            </div>

            {/* Deliverables skills section--- */}

            <div className="mt-[30px]">
              <h1 className="  font-semibold text-2xl">Deliverables:</h1>
              <hr className="h-[3px] bg-[#19A5FF]  w-2/3 lg:w-2/5" />
              {/* Deliverable Skills */}
              <div className=" mb-4 mt-[10px] grid grid-cols-2 lg:grid-cols-4 lg:flex items-center gap-[10px]">
                {storedJob?.joiningPerks?.length &&
                  storedJob?.joiningPerks?.map((items) => (
                    <p
                      key={Math.random()}
                      className="py-2 px-6 bg-[#F0F9FF] rounded-md font-semibold "
                    >
                      {items}
                    </p>
                  ))}
              </div>
            </div>

            {/* T&C Document Download--- */}

            <div className="mt-[30px]">
              <h1 className="  font-semibold text-2xl">T&C Document:</h1>
              <hr className="h-[3px] bg-[#19A5FF]  w-2/3 lg:w-2/5" />
              {/* Deliverable Skills */}
              <div className=" mb-4 mt-[12px] ">
                <button
                  type="button"
                  className="flex   gap-4 items-center border border-[#F75C09] rounded-md py-3 px-5  text-2xl"
                >
                  <span>
                    <HiOutlineClipboardDocumentList className="text-2xl" />
                  </span>
                  <span>
                    {storedJob?.contractsPaper && storedJob?.contractsPaper.split('/')[3]}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* skills required ------------------------------------- */}

          <div className="col-span-1 lg:border-l-2  lg:pl-4  md:border-t-2  lg:border-t-0">
            <div>
              <h1 className="font-semibold text-2xl mb-3">Skills Required:</h1>
              <div className="flex flex-wrap gap-2">
                {storedJob?.skills?.length &&
                  storedJob?.skills.map(() => (
                    <p key={Math.random()} className="text-sm bg-[#F0F9FF] rounded-md px-1.5 py-1 ">
                      Front-End Developer
                    </p>
                  ))}
              </div>
            </div>
            <div>
              <h1 className="font-semibold text-[16px] mt-3 mb-3">Salary Offered:</h1>
              <div className="">
                <div className="bg-[#F0F9FF] mt-3 w-[122px] flex text-center items-center gap-3 rounded-md ">
                  <p className="text-sm text-center  w-full  py-[8px] ">{storedJob?.salary} ₳</p>
                </div>
              </div>
            </div>
            <div>
              <h1 className="font-semibold text-[16px] mt-3 mb-3">Location:</h1>
              <div className="">
                <div className="bg-[#F0F9FF] mt-3 flex items-center gap-3 rounded-md ">
                  <p className="text-sm pl-[15px] py-[8px] ">
                    <GoLocation />
                  </p>
                  <p className="pr-[15px] ">{storedJob?.location}</p>
                </div>
              </div>
            </div>
            <div>
              <h1 className="font-semibold text-[16px] mt-3 mb-3">Apply Before:</h1>
              <div className="">
                <div className="bg-[#F0F9FF] mt-3 w-[170px] flex items-center gap-3 rounded-md ">
                  <p className="text-sm pl-[15px] py-[8px] ">
                    <GiSandsOfTime className="text-red-500" />
                  </p>
                  <p className="pr-[15px] font-bold ">{storedJob?.applyBefore?.slice(0, 10)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* gig post and edit button */}

      {review === 'review' && (
        <div className="flex justify-center gap-4 mt-10">
          <button type="button" onClick={handlePost}>
            <label
              htmlFor="postConfirmation"
              className="px-6 py-3 lg:px-10 lg:py-5 bg-[#0B132A] rounded-md text-white cursor-pointer"
            >
              Post Contract Job
            </label>
          </button>

          <button
            onClick={handleEdit}
            type="button"
            className="px-6 py-3 lg:px-10 lg:py-5 border-2 border-[#0B132A]  rounded-md text-black"
          >
            Edit
          </button>
        </div>
      )}
      {contract && <FinalConfirmation storedJob={storedJob} setConfirmPost={setContract} />}
      {review !== 'review' && data?.applicationRequest?.length > 0 && (
        <div className="w-[200px] px-5 py-2 mx-auto text-center rounded-md text-blue-300 bg-[#f9f1ff]">
          <button onClick={viewHandler} className="outline-none" type="button">
            View Applications
          </button>
        </div>
      )}
    </div>
  );
};

export default ContractsReview;
