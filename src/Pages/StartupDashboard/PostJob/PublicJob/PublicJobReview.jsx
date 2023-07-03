import React, { useContext, useEffect, useState } from 'react';
import { BiBookmarks, BiUser } from 'react-icons/bi';
import { GiSandsOfTime } from 'react-icons/gi';
import { GoLocation } from 'react-icons/go';
import { RiShareForwardLine } from 'react-icons/ri';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import internshipLogo from '../../../../Assets/Dashboard/post_job/InternshipLogo.png';
import AuthContext from '../../../../Context/AuthContext';
import { setJob } from '../../../../Hooks/useLocalStorage';
import FinalConfirmation from '../../../../Modal/ConfirmationModal/FinalConfirmation';
import getPostedDays from '../../../../Utilities/getPostedDays';

const PublicJobReview = () => {
  const { refresh, setRefresh } = useContext(AuthContext);
  const [publicJob, setPublicJob] = useState(false);
  const [storedJob, setStoredJob] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const data = location?.state && location?.state?.data;
  const path = location.pathname.split('/');
  const review = path[path.length - 1];
  const postedDate = data?.createdAt || '2023-02-10T09:09:24.851+00:00';

  useEffect(() => {
    const getStoredItem = () => JSON.parse(localStorage.getItem('public-job')) || {};
    const lsData = getStoredItem();
    if (Object.keys(lsData).length !== 0) {
      setStoredJob(lsData);
    } else {
      setStoredJob(data);
    }
  }, [data]);

  const handlePost = () => {
    setPublicJob(true);
  };

  const viewHandler = () => {
    setJob('jobId', id);
    navigate(`/dashboard/public/${storedJob?.jobId}/view-applicants`);
    setRefresh(!refresh);
  };

  console.log({ storedJob, review });

  return (
    <div className="w-full">
      {/* Banner Section start */}
      <div className="flex publicJobReview justify-between absolute w-full md:w-[85%] lg:w-[65%] max-w-6xl">
        <h1 className="text-2xl md:text-3xl lg:text-5xl pt-2 md:pt-[15px] md:pl-7 pl-2 font-normal text-white">
          {storedJob.title}
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
            <img src={internshipLogo} alt="" />
          </div>
          <div className="font-bold text-[14px] mt-12 lg:mt-0 flex flex-col">
            <h3>{storedJob.categoryName}</h3>

            <div className="flex text-xs text-[#999999] md:hidden">
              <h2 className="lg:text-2xl lg:-ml-5 text-xl font-bold text-slate-500">
                {review !== 'review' ? `Posted ${getPostedDays(postedDate)} days ago` : ''}
              </h2>
            </div>
          </div>
        </div>
        <div className="md:flex gap-4 text-[#999999] font-semibold mt-[8px] hidden">
          <h2 className="lg:text-2xl lg:-ml-7 text-xl font-bold text-slate-500">
            {review !== 'review' ? `Posted ${getPostedDays(postedDate)} days ago` : ''}
          </h2>
        </div>
      </div>

      {/* public job details starts---------- */}
      <div className="mt-[121px] lg:grid lg:grid-cols-4  ">
        <div className="lg:col-span-3">
          {/* Job Description   */}
          <p className="whitespace-pre-wrap">{storedJob?.description}</p>

          {/* Job Requirments Section */}
          <h1 className=" mt-[30px] font-semibold text-2xl">Job Requirements:</h1>
          <hr className="h-[3px] bg-[#19A5FF]  w-2/3" />
          <div className="mt-[30px] mb-4 ">
            <h2 className="font-semibold">Experience Required:</h2>
            <p className="mt-[9px] w-28 text-center py-2 bg-[#F0F9FF] rounded-md font-semibold">
              {storedJob?.experience} Years
            </p>
          </div>
        </div>

        {/* all Skills section starts------------ */}
        <div className="lg:col-span-1 lg:border-l-2 pl-4  md:border-t-2  lg:border-t-0">
          <div>
            <div>
              <h1 className="font-semibold text-2xl mb-3">Skills Required:</h1>
              <div className="flex flex-wrap  w-full gap-2">
                {storedJob?.skills?.map((requiredSkill) => (
                  <div key={Math.random()} className="bg-[#F0F9FF]  rounded-md ">
                    <p className="text-sm px-[10px] py-[8px] ">{requiredSkill}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-[16px] mt-3 mb-3">Salary Offered:</h1>
            <div className="">
              <div className="bg-[#F0F9FF] mt-3 w-[122px] flex items-center gap-3 rounded-md ">
                <p className="text-sm pl-[25px] py-[8px] ">{storedJob?.salary} </p>
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-[16px] mt-3 mb-3">Location:</h1>
            <div className="">
              <div className="bg-[#F0F9FF] mt-3  flex items-center gap-3 rounded-md ">
                <p className="text-sm pl-[15px] py-[8px] ">
                  <GoLocation />
                </p>

                <p className="pr-[15px] ">{storedJob?.location}</p>
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-[16px] mt-3 mb-3">Number of Applicants:</h1>
            <div className="">
              <div className="bg-[#F0F9FF] mt-3 w-[90px] flex items-center gap-3 rounded-md ">
                <p className="text-sm pl-[20px] py-[8px] ">
                  <BiUser />
                </p>
                <p className="pr-[25px] ">{data?.applicationRequest?.length}</p>
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
        {/* all Skills section ends------------ */}
      </div>

      {/* public job details ends---------- */}
      {review === 'review' && (
        <div className="flex justify-center gap-4 mt-10">
          <button type="button" onClick={handlePost}>
            <label
              htmlFor="postConfirmation"
              className="px-6 py-3 lg:px-10 lg:py-5 bg-[#0B132A] rounded-md text-white cursor-pointer"
            >
              Post Public Job
            </label>
          </button>
          <Link to="/dashboard/post-job/public-job">
            <button
              type="button"
              className="px-6 py-3 lg:px-10 lg:py-5 border-2 border-[#0B132A]  rounded-md text-black"
            >
              Edit
            </button>
          </Link>
        </div>
      )}

      {publicJob && <FinalConfirmation storedJob={storedJob} setConfirmPost={setPublicJob} />}
      {review !== 'review' && data.applicationRequest.length > 0 && (
        <div className="w-[200px] px-5 py-2 mx-auto text-center rounded-md text-blue-300 bg-[#f9f1ff]">
          <button type="button" onClick={viewHandler}>
            View Applications
          </button>
        </div>
      )}
    </div>
  );
};

export default PublicJobReview;
