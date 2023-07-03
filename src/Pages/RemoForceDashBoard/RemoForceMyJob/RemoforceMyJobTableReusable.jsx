import React from 'react';
import { useNavigate } from 'react-router-dom';
import scheduleCheck from '../../../Utilities/scheduleCheck';

const RemoforceMyJobTableReusable = ({ categorizedJobs }) => {
  const navigate = useNavigate();

  const handleViewJobDetails = (job) => {
    navigate(`/remoforce-dashboard/view-jobs/${job.jobId}`);
  };

  const handleViewJobStartup = (email) => {
    navigate(`/startup/profile/${email}`);
  };
  const handleJoin = (link) => {
    window.open(link, '_blank');
  };

  // startup/profile/:email
  return (
    <div className="w-full  mb-12 xl:mb-0  mx-auto ">
      <div className="relative flex flex-col   break-words   ">
        <div className="block rounded-md  w-full overflow-x-auto">
          <table className="items-center  w-full ">
            {/* table head */}
            <thead>
              <tr className="font-semibold border-b-2">
                <th className="px-4 bg-blueGray-50   py-2 text-xs  whitespace-nowrap    text-center">
                  Company Name
                </th>
                <th className="px-4 bg-blueGray-50   py-2 text-xs  whitespace-nowrap    text-center">
                  Job Profile
                </th>
                <th className="px-4 bg-blueGray-50   py-2 text-xs  whitespace-nowrap    text-center">
                  Interview Details
                </th>
                <th className="px-4 bg-blueGray-50   py-2 text-xs  whitespace-nowrap    text-center">
                  Status
                </th>
              </tr>
            </thead>

            {/* table body items */}
            <tbody className="font-semibold text-sm">
              {categorizedJobs.length ? (
                categorizedJobs.map((job) => {
                  const { startupsName, title, interviewSchedule, applicationStatus } = job;
                  return (
                    <tr
                      key={Math.random()}
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                    >
                      <td className="whitespace-nowrap px-4 py-4">
                        {' '}
                        <button
                          type="button"
                          onClick={() => handleViewJobStartup(job.startupsEmail)}
                          className=""
                        >
                          {startupsName}
                        </button>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <button
                          type="button"
                          onClick={() => handleViewJobDetails(job)}
                          className=""
                        >
                          {title}
                        </button>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        {interviewSchedule?.date ? (
                          <p>
                            <span className="block">{interviewSchedule.time}</span>
                            <span>{interviewSchedule.date}</span>
                          </p>
                        ) : (
                          '---'
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-center">
                        {applicationStatus === 'rejected' && (
                          <button className="bg-red-600 text-white px-2 rounded-md" type="button">
                            {applicationStatus}
                          </button>
                        )}
                        {applicationStatus === 'scheduled' &&
                          !scheduleCheck(interviewSchedule.date, interviewSchedule.time) && (
                            <button
                              onClick={() => handleJoin(interviewSchedule.meetLink)}
                              className="bg-blue-600 text-white px-2 rounded-md"
                              type="button"
                            >
                              join
                            </button>
                          )}
                        {applicationStatus === 'scheduled' &&
                          scheduleCheck(interviewSchedule.date, interviewSchedule.time) && (
                            <span className="bg-blue-600 text-white px-2 rounded-md" type="button">
                              Interviewed
                            </span>
                          )}
                        {applicationStatus === 'pending' && (
                          <button className="bg-gray-600 text-white px-2 rounded-md" type="button">
                            {applicationStatus}
                          </button>
                        )}
                        {applicationStatus === 'application accepted' && (
                          <button className="bg-gray-600 text-white px-2 rounded-md" type="button">
                            {applicationStatus}
                          </button>
                        )}
                        {applicationStatus === 'accepted' ? (
                          <button className="bg-green-600 text-white px-2 rounded-md" type="button">
                            {applicationStatus}
                          </button>
                        ) : (
                          ''
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>No Job found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RemoforceMyJobTableReusable;
