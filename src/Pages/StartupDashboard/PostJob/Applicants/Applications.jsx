import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaUsers } from 'react-icons/fa';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import ApplicantsTableReusable from './ApplicantsTableReusable';

const Applications = () => {
  const categoryActive = 'border-[#3b82f6]  text-[#3B82F6]';
  const [tabActive, setTabActive] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: applicationRequests, refetch } = useQuery(['applicationRequests'], () =>
    axios
      .get(`${import.meta.env.VITE_APP_URL_STARTUP}/api/job/user-jobs/allApplicationRequests/${id}`)
      .then((res) => res.data)
  );

  // accepted applicants
  const acceptedApplicants = applicationRequests?.filter(
    (applicant) => applicant?.applicationStatus === 'accepted'
  );
  // rejected applicants
  const rejectedApplicants = applicationRequests?.filter(
    (applicant) => applicant?.applicationStatus === 'rejected'
  );
  // scheduled applicants
  const scheduledApplicants = applicationRequests?.filter(
    (applicant) => applicant?.applicationStatus === 'scheduled'
  );
  // scrolling problem
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(applicationRequests);

  return (
    <section className="py-1 bg-blueGray-50 shadow-xl rounded-md px-2">
      <h1 className="text-2xl flex gap-2 font-semibold border-b-2">
        <button className="p-2 text-2xl" onClick={() => navigate(-1)} type="button">
          <FaAngleLeft className="border-2" />
        </button>
        <span className="flex items-center gap-3">
          {' '}
          <FaUsers /> <small>Applicants</small>
        </span>
      </h1>
      <div className="lg:flex justify-between items-center">
        <nav className="flex list-none mt-5 items-start  space-y-2   mb-6 w-[fit-content] flex-wrap">
          <li className="space-x-1 mt-2 font-semibold text-xs sm:text-sm">
            <NavLink
              onClick={() => setTabActive(1)}
              className={`border-b-[3px] flex items-center gap-2 px-3 pb-3 font-medium  ${
                tabActive === 1 && categoryActive
              }`}
            >
              Show All
            </NavLink>
          </li>
          <li className="space-x-1 font-semibold text-xs sm:text-sm">
            <NavLink
              onClick={() => setTabActive(2)}
              className={`border-b-[3px] flex items-center gap-2 px-3 pb-3 font-medium  ${
                tabActive === 2 && categoryActive
              }`}
            >
              Interview scheduled
            </NavLink>
          </li>
          <li className="space-x-1 font-semibold text-xs sm:text-sm">
            <NavLink
              onClick={() => setTabActive(3)}
              className={`border-b-[3px] flex items-center gap-2 px-3 pb-3 font-medium  ${
                tabActive === 3 && categoryActive
              }`}
            >
              Accepted
            </NavLink>
          </li>
          <li className="space-x-1 font-semibold text-xs sm:text-sm">
            <NavLink
              onClick={() => setTabActive(4)}
              className={`border-b-[3px] flex items-center gap-2 px-3 pb-3 font-medium  ${
                tabActive === 4 && categoryActive
              }`}
            >
              Rejected
            </NavLink>
          </li>
        </nav>
        <div className="flex gap-5 pb-3">
          <p>
            Sort by:
            <select className="border-none ml-2 outline-none" name="applicants" id="applicants">
              <option value="newest">Newest</option>
              <option value="newest">Oldest</option>
            </select>
          </p>
          <p>
            Sort by:{' '}
            <select className="border-none ml-2 outline-none" name="applicants" id="applicants">
              <option value="All">All</option>
              <option value="location">Location</option>
            </select>
          </p>
        </div>
      </div>
      {tabActive === 1 && (
        <ApplicantsTableReusable
          ShowAll="ShowAll"
          applicationRequests={applicationRequests}
          refetch={refetch}
        />
      )}
      {tabActive === 2 && (
        <ApplicantsTableReusable applicationRequests={scheduledApplicants} refetch={refetch} />
      )}
      {tabActive === 3 && (
        <ApplicantsTableReusable
          applicationRequests={acceptedApplicants}
          refetch={refetch}
          Accepted="Accepted"
        />
      )}
      {tabActive === 4 && (
        <ApplicantsTableReusable
          applicationRequests={rejectedApplicants}
          refetch={refetch}
          Rejected="Rejected"
        />
      )}
    </section>
  );
};

export default Applications;
