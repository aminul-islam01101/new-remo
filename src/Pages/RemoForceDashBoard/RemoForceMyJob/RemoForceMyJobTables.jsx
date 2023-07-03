import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import RemoForceMyJobRequest from './RemoForceMyJobRequest';
import RemoforceMyJobTableReusable from './RemoforceMyJobTableReusable';

import AuthContext from '../../../Context/AuthContext';

const RemoForceMyJobTables = () => {
  const { user } = useSelector((state) => state.auth);
  const { tabActive, setTabActive } = useContext(AuthContext);

  const { data: allAppliedJobs } = useQuery(['allAppliedJobs'], () =>
    axios
      .get(
        `${import.meta.env.VITE_APP_URL_STARTUP}/api/job/remoforce/all-applied-jobs/${
          user?.user.email
        }`
      )
      .then((res) => res.data)
  );

  // const [tabActive, setTabActive] = useState(location.state?.tabActive || 1);
  const jobLists = [
    // {
    //   icon: avatar,
    //   StartUp: 'RemoStart',
    //   Applied: 'November . 20 . 2004',
    //   Title: 'ui/ux designer',
    //   status: 'Applied',
    //   // link: <FiLink />,
    // },
    // {
    //   icon: avatar,
    //   StartUp: 'RemoStart',
    //   Applied: 'November . 20 . 2004',
    //   Title: 'Content Writer...',
    //   status: 'Applied',
    //   // link: <FiLink />,
    // },
    // {
    //   icon: avatar,
    //   StartUp: 'RemoStart',
    //   Applied: 'November . 20 . 2004',
    //   Title: 'WIndjob giver...',
    //   status: 'Interview',
    //   // link: <FiLink />,
    // },
    // {
    //   icon: avatar,
    //   StartUp: 'RemoStart',
    //   Applied: 'November . 20 . 2004',
    //   Title: 'Circular moton..',
    //   status: 'Interview',
    //   // link: <FiLink />,
    // },
    // {
    //   icon: avatar,
    //   StartUp: 'RemoStart',
    //   Applied: 'November . 20 . 2004',
    //   Title: 'ui/ux designer',
    //   status: 'Rejected',
    //   // link: <FiLink />,
    // },
    // {
    //   icon: avatar,
    //   StartUp: 'RemoStart',
    //   Applied: 'November . 20 . 2004',
    //   Title: 'ui/ux designer',
    //   status: 'Rejected',
    //   // link: <FiLink />,
    // },
    // {
    //   icon: avatar,
    //   StartUp: 'RemoStart',
    //   Applied: 'November . 20 . 2004',
    //   Title: 'ui/ux designer',
    //   status: 'Rejected',
    //   // link: <FiLink />,
    // },
    // {
    //   icon: avatar,
    //   StartUp: 'RemoStart',
    //   Applied: 'November . 20 . 2004',
    //   Title: 'ui/ux designer',
    //   status: 'Applied',
    //   // link: <FiLink />,
    // },
    // {
    //   icon: avatar,
    //   StartUp: 'RemoStart',
    //   Applied: 'November . 20 . 2004',
    //   Title: 'ui/ux designer',
    //   status: 'Interview',
    //   // link: <FiLink />,
    // },
    // {
    //   icon: avatar,
    //   StartUp: 'RemoStart',
    //   Applied: 'November . 20 . 2004',
    //   Title: 'ui/ux designer',
    //   status: 'Applied',
    //   // link: <FiLink />,
    // },
  ];
  const [fullList, setFullList] = useState(
    jobLists?.filter((singleJob) => singleJob?.status === 'Applied') || []
  );
  const handleChangeTabApplied = () => {
    const getApplied = jobLists?.filter((singleJob) => singleJob?.status === 'Applied');
    setFullList(getApplied);
    setTabActive(1);
  };
  const handleChangeTabInterview = () => {
    const getApplied = jobLists?.filter((singleJob) => singleJob?.status === 'Interview');
    setFullList(getApplied);
    setTabActive(2);
  };
  const handleChangeTabRejected = () => {
    const getApplied = jobLists?.filter((singleJob) => singleJob?.status === 'Rejected');
    setFullList(getApplied);
    setTabActive(3);
  };

  const scheduledJob = allAppliedJobs?.filter(
    (singleJob) => singleJob?.applicationStatus === 'scheduled'
  );

  const rejectedJob = allAppliedJobs?.filter(
    (singleJob) => singleJob?.applicationStatus === 'rejected'
  );

  return (
    <div>
      {/* states buttons section starts */}
      <div className="flex my-6  justify-between pr-3 items-center">
        <div className="flex ">
          <button
            className={`border-b-[3px] outline-none pb-1.5  px-1.5  lg:px-2.5 max-md:text-[13px]  text-[#00c42b] font-medium ${
              tabActive === 1 && 'border-[#00c42b] '
            }`}
            onClick={() => handleChangeTabApplied()}
            type="button"
            name="applied"
          >
            Applied
          </button>
          <button
            className={`border-b-[3px] outline-none pb-1.5 px-1.5  lg:px-2.5 max-md:text-[13px]  text-[#3b82f6] font-medium ${
              tabActive === 2 && 'border-[#3b82f6] '
            }`}
            onClick={() => handleChangeTabInterview()}
            type="button"
            name="interview"
          >
            Interview <span className="max-md:hidden">Scheduled</span>
          </button>
          <button
            className={`border-b-[3px] outline-none text-[#ff1830] pb-1.5 px-1.5  lg:px-2.5 max-md:text-[13px]  font-medium ${
              tabActive === 3 && 'border-[#ff1830] ] '
            }`}
            onClick={() => handleChangeTabRejected()}
            type="button"
            name="rejected"
          >
            Rejected
          </button>
        </div>

        <div>
          <button
            className={`border-b-[3px] pb-1 px-1.5 outline-none  lg:px-2.5 max-md:text-[13px]  text-[#ff9900] font-medium ${
              tabActive === 4 && 'border-[#ff9900] '
            }`}
            onClick={() => setTabActive(4)}
            type="button"
            name="applied"
          >
            Job Request
          </button>
        </div>
      </div>
      {/*  table for tab */}
      <div>
        {tabActive === 1 && <RemoforceMyJobTableReusable categorizedJobs={allAppliedJobs} />}
        {tabActive === 2 && <RemoforceMyJobTableReusable categorizedJobs={scheduledJob} />}
        {tabActive === 3 && <RemoforceMyJobTableReusable categorizedJobs={rejectedJob} />}

        {tabActive === 4 && <RemoForceMyJobRequest />}
      </div>
    </div>
  );
};

export default RemoForceMyJobTables;
