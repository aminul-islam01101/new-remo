import React from 'react';

const ApplicantsScheduleStarted = ({applicant}) => (
  <div className=" h-[40vh] flex flex-col justify-between  pl-10">
    <div>
      <h1 className="lg:text-3xl md:text-xl font-bold">
        You have currently selected <span className='underline'>{applicant.applicantsName
}</span> for <br /> interview ! Are you sure
        you want to <br />
        interview Applicants?
      </h1>
    </div>
    <div className="flex justify-center">
      {/* <p className="text-[#999999] text-2xl font-semibold">You have found some searches</p> */}
    </div>
  </div>
);

export default ApplicantsScheduleStarted;
