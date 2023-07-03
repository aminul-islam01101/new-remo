import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AuthContext from '../../../../Context/AuthContext';
import ApplicantsScheduleModal from '../../../../Modal/ApplicantsScheduleModal/ApplicantsScheduleModal';
import scheduleCheck from '../../../../Utilities/scheduleCheck';

const ApplicantsTableReusable = ({ Rejected, applicationRequests, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState({});
  const { user } = useSelector((state) => state.auth);
  const { serviceUser, } = useContext(AuthContext);
  console.log(applicationRequests);
  // accept handler
  const acceptHandler = (item, status,stage) => {
    const acceptData = {
      email: user?.user?.email || serviceUser?.email,
      jobId: item.jobId,
      applicantsEmail: item?.applicantsEmail,
      status,
      remoforceName:item.applicantsName,
      startupsName:item.startupsName,
      jobTitle:item.title,
      type:"application-request",
      stage,
      notificationStatus:"unread"
    };
    const url = `${import.meta.env.VITE_APP_URL_STARTUP}/api/job/accept/${item._id}`;

    axios
      .put(url, acceptData)
      .then((response) => {

        if (response.status === 200) {
          toast.success(response.data.message);
        
          // socket?.emit('sendNotification', {
          //   receiverEmail: item?.applicantsEmail,
          //   notificationArr: response.data.data,
          // });
        }
        refetch();

        
      })
      .catch((error) => {
        console.error('Error making PUT request:', error);
      });
  };
  // reject handler
  const rejectHandler = (item) => {
    const rejectionData = {
      email: user?.user?.email || serviceUser?.email,
      jobId: item.jobId,
      applicantsEmail: item.applicantsEmail,
      remoforceName:item.applicantsName,
      startupsName:item.startupsName,
      jobTitle:item.title,
      type:"application-request",
      stage:"application-rejection",
      notificationStatus:"unread"
    };
    const url = `${import.meta.env.VITE_APP_URL_STARTUP}/api/job/reject`;

    axios
      .put(url, rejectionData)
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.message);
        
          // socket?.emit('sendNotification', {
          //   receiverEmail: item?.applicantsEmail,
          //   notificationArr: response.data.data,
          // });
        }
        refetch();
        
      })
      .catch((error) => {
        console.error('Error making PUT request:', error);
      });
  };
  // scheduleHandler
  const scheduleHandler = (applicant) => {
    setIsOpen(true);
    setSelectedApplicant(applicant);
  };

  const { data: gotAccess } = useQuery(['gotAccess'], () =>
    axios
      .get(`${import.meta.env.VITE_APP_URL_STARTUP}/calender/got-access/${user?.user.email}`)
      .then((res) => res.data)
  );

  const handleJoin = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div>
      <div className="w-full  mb-12 xl:mb-0 mx-auto ">
        <div className="relative flex flex-col   break-words   ">
          <div className="block rounded-md  w-full overflow-x-auto">
            <table className="items-center  w-full ">
              {/* table head */}
              <thead className=" ">
                <tr className="font-semibold border-b-2">
                  <th className="px-6 bg-blueGray-50   py-2 text-xs  whitespace-nowrap    text-center ">
                    Profile Name
                  </th>
                  <th className="px-6 bg-blueGray-50   py-2 text-xs  whitespace-nowrap    text-center ">
                    Region
                  </th>
                  <th className="px-6 bg-blueGray-50   py-2 text-xs  whitespace-nowrap    text-center ">
                    Interview Details
                  </th>
                  <th className="px-6 bg-blueGray-50   py-2 text-xs  whitespace-nowrap    text-center ">
                    Status
                  </th>
                  {!Rejected && (
                    <th className="px-6 bg-blueGray-50   py-2 text-xs  whitespace-nowrap    text-center ">
                      Action
                    </th>
                  )}
                </tr>
              </thead>

              {/* table body items */}

              <tbody className="font-semibold text-sm">
                {applicationRequests &&
                  applicationRequests.map((applicant) => {
                    const {
                      _id,
                      applicantsName,
                      interviewSchedule,
                      status,
                      applicationStatus,
                      country,
                    } = applicant;
                    return (
                      <tr
                        key={_id}
                        className="border-b w-full text-center transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                      >
                        <td className="whitespace-nowrap px-2 py-4">
                          <Link
                            to={`/remoforce/profile/${applicant.applicantsEmail}`}
                            className="text-gray-900 font-semibold whitespace-no-wrap"
                          >
                            {applicantsName}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-2 py-4">{country}</td>
                        <td className="whitespace-nowrap px-2 py-4">
                          {(applicationStatus === 'pending' ||
                            applicationStatus === 'application accepted' ||
                            applicationStatus === 'rejected') &&
                          !interviewSchedule ? (
                            '---'
                          ) : (
                            <p>
                              <span className="block">{interviewSchedule?.time}</span>
                              <span>{interviewSchedule?.date}</span>
                            </p>
                          )}
                        </td>
                        {applicationStatus !== 'scheduled' && (
                          <td className="whitespace-nowrap px-2 py-4 text-center">
                            <span className="rounded-lg px-2 py-1">{applicationStatus}</span>
                          </td>
                        )}
                        {applicationStatus === 'scheduled' &&
                          scheduleCheck(interviewSchedule.date, interviewSchedule.time) && (
                            <td className="whitespace-nowrap px-2 py-4 text-center">
                              <span className="rounded-lg px-2 py-1">Interviewed</span>
                            </td>
                          )}
                        {applicationStatus === 'scheduled' &&
                          !scheduleCheck(interviewSchedule.date, interviewSchedule.time) && (
                            <td className="whitespace-nowrap px-2 py-4 text-center">
                              <span className="rounded-lg px-2 py-1">{applicationStatus}</span>
                            </td>
                          )}
                        {status === 'application accepted' && (
                          <td className="whitespace-nowrap w-full px-2  py-4 flex gap-2 text-center">
                            <button
                              className="bg-green-500 px-2 py-1 w-full mr-[3px]  text-white rounded-lg"
                              type="button"
                            >
                              Application Accepted
                            </button>
                          </td>
                        )}
                        {!Rejected && applicationStatus === 'pending' && (
                          <td className="whitespace-nowrap px-2 pl-6 py-4 flex gap-2">
                            <button
                              onClick={() => acceptHandler(applicant, 'application accepted', "application-acceptance")}
                              className="bg-green-500 px-2 py-1 w-full mr-[3px]  text-white rounded-lg"
                              type="button"
                            >
                              Accept application
                            </button>
                            <button
                              onClick={() => rejectHandler(applicant)}
                              className="bg-red-500 px-2 py-1  text-white rounded-lg"
                              type="button"
                            >
                              Reject
                            </button>
                          </td>
                        )}
                        {!Rejected &&
                          applicationStatus === 'scheduled' &&
                          scheduleCheck(interviewSchedule?.date, interviewSchedule?.time) && (
                            <td className="whitespace-nowrap px-2 pl-6 py-4 flex gap-2">
                              <button
                                onClick={() => acceptHandler(applicant, 'accepted', 'acceptance')}
                                className="bg-green-500 px-2 py-1 w-full mr-[3px]  text-white rounded-lg"
                                type="button"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => rejectHandler(applicant)}
                                className="bg-red-500 px-2 py-1  text-white rounded-lg"
                                type="button"
                              >
                                Reject
                              </button>
                            </td>
                          )}
                        {!Rejected && applicationStatus === 'application accepted' && (
                          <td className="text-center  px-2 py-4 flex gap-2">
                            <button
                              onClick={() => scheduleHandler(applicant)}
                              className="bg-sky-400 w-11/12 mx-auto ml-4  px-2 py-1 text-white rounded-lg"
                              type="button"
                            >
                              Make a schedule
                            </button>
                          </td>
                        )}
                        {!Rejected && applicationStatus === 'accepted' && (
                          <td className="whitespace-nowrap px-2 py-4 flex gap-2">
                            <button
                              onClick={() => scheduleHandler(applicant)}
                              className="bg-green-500 w-full ml-4 mx-auto py-1 text-white rounded-lg"
                              type="button"
                            >
                              send an offer
                            </button>
                          </td>
                        )}
                        {!Rejected &&
                          applicationStatus === 'scheduled' &&
                          !scheduleCheck(interviewSchedule?.date, interviewSchedule?.time) && (
                            <td className="whitespace-nowrap px-2 py-4 flex gap-2">
                              <button
                                onClick={() => handleJoin(applicant?.interviewSchedule?.meetLink)}
                                className="bg-sky-400  px-2 py-1 text-white rounded-lg"
                                type="button"
                              >
                                join
                              </button>
                            </td>
                          )}

                        <td className="whitespace-nowrap px-2 py-4">
                          {applicationStatus === 'rejected' && ''}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isOpen ? (
        <ApplicantsScheduleModal
          // selectedTalent={selectedTalent}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          gotAccess={gotAccess}
          applicant={selectedApplicant}
          refetch={refetch}

          // results={results}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default ApplicantsTableReusable;
