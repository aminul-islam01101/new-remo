import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import ApplicantsScheduleDate from './ApplicantsScheduleDate';

import ApplicantsScheduleStarted from './ApplicantsScheduleStarted';

import AuthContext from '../../../Context/AuthContext';

const ApplicantsScheduleProcess = ({ setIsOpen, applicant, gotAccess, refetch }) => {
  const { user } = useSelector((state) => state.auth);
  const [tabActive, setTabActive] = useState(1);
  const [selectedDate, setSelectedDate] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { socket } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname.split('/');
  const job = path[path.length - 3];
  const { id } = useParams();

  // const { data: startup } = useQuery(['startup'], () =>
  //   axios
  //     .get(
  //       `${import.meta.env.VITE_APP_URL_STARTUP}/api/talent/get-startup?email=${
  //         user?.user?.email
  //       }&jobId=${results.lastSearchResult._id}`
  //     )
  //     .then((res) => res.data)
  // );
  // const { data: createdEvents, refetch } = useQuery(['results'], () =>
  //   axios
  //     .get(
  //       `${import.meta.env.VITE_APP_URL_STARTUP}/api/talent/created-events?email=${
  //         user?.user?.email
  //       }&jobId=${results.lastSearchResult._id}`
  //     )
  //     .then((res) => res.data)
  // );
  // console.log(createdEvents);

  const handleCalenderAccess = async () => {
    try {
      window.open(
        `${import.meta.env.VITE_APP_URL_STARTUP}/calender/access/${job}/${id}/${user?.user?.email}`,
        '_self'
      );
    } catch (err) {
      console.error(err);
    }
  };
  // handle back

  const handleBack = () => {
    if (tabActive === 1) {
      setIsOpen(false);
    } else if (tabActive === 2) {
      setTabActive(1);
    } else if (tabActive === 3) {
      setTabActive(2);
    }
  };
  const handleSubmitData = () => {};
  // console.log(results);
  // console.log(selectedTalent);
  console.log(applicant);

  const handleEventCompletion = () => {
    const getStoredItem = (key) => JSON.parse(localStorage.getItem('applicant-events')) || [];
    setLoading(true);
    const lsData = getStoredItem();

    if (lsData.length < 1) {
      toast.error(`You have to select at least one event to proceed`);
      return;
    }

    const {
      applicantsEmail,
      jobId,
      startupsEmail,
      startupsProfilePhoto,
      startupsName,
      applicantsName,
      title,
    } = applicant;

    const requestBody = {
      applicantsEmail,
      jobId,
      startupsEmail,
      jobTitle: title,
      applicantsName,
      startupsName,
      interviewStatus: 'scheduled',
      scheduleDetails: lsData[0],
      type: 'application-request',
      stage: 'interview-schedule',
      status: 'unread',
    };
    axios
      .put(`${import.meta.env.VITE_APP_URL_STARTUP}/api/job/create-interview-schedule`, requestBody)
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response.status === 200) {
          toast.success(response.data.message);
          console.log(response.data.data);
          // socket?.emit('sendNotification', {
          //   receiverEmail: applicantsEmail,
          //   notificationArr: response.data.data,
          // });
          localStorage.removeItem('applicant-events');
          refetch();
          setIsOpen(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
    console.log(requestBody);
  };

  // console.log(results);
  // const handleMyRequest = () => {
  //   setRefresh(!refresh);
  //   navigate('/dashboard/talent-request-history');
  // };

  // console.log(results);
  console.log({ applicant });

  return (
    <div className="h-[100%] flex  justify-around flex-col">
      <div>
        {tabActive === 1 && <ApplicantsScheduleStarted applicant={applicant} />}

        {tabActive === 2 && (
          <ApplicantsScheduleDate
            applicant={applicant}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        )}
        {/* {tabActive === 3 && <ApplicantsScheduleFinalPage />} */}
      </div>

      {/*  */}
      <div className="flex  justify-between  lg:px-16">
        <button
          onClick={handleBack}
          className="bg-[#f8f1ff] shadow-inner outline-none  px-5 py-2.5 hover:shadow-lg hover:shadow-[#d7d4f4] hover:bg-[#13d1ff] hover:text-white duration-300 ease-in rounded-lg text-[#61c1ff] text-lg"
          type="button"
        >
          Back{' '}
        </button>
        {!gotAccess && (
          <button
            onClick={handleCalenderAccess}
            className="bg-[#f8f1ff] shadow-inner lg:px-5 px-2 lg:py-2 hover:shadow-lg hover:shadow-[#d7d4f4] hover:bg-[#13d1ff] hover:text-white duration-300 ease-in rounded-lg text-[#61c1ff] lg:text-lg"
            type="button"
          >
            access calender
          </button>
        )}
        {gotAccess && tabActive < 2 && (
          <button
            onClick={() => setTabActive(tabActive + 1)}
            className="bg-[#f8f1ff] shadow-inner lg:px-5 px-2 lg:py-2 hover:shadow-lg hover:shadow-[#d7d4f4] hover:bg-[#13d1ff] hover:text-white duration-300 ease-in rounded-lg text-[#61c1ff] lg:text-lg"
            type="button"
          >
            Select Date & Time Slots
          </button>
        )}
        {gotAccess && tabActive === 2 && (
          <button
            onClick={handleEventCompletion}
            className="bg-[#f8f1ff] shadow-inner outline-none lg:px-5 px-2 lg:py-2 hover:shadow-lg hover:shadow-[#d7d4f4] hover:bg-[#13d1ff] hover:text-white duration-300 ease-in rounded-lg text-[#61c1ff] lg:text-lg"
            type="button"
          >
            Complete Event Creation
          </button>
        )}
        {/* {tabActive === 3 && (
          <button
            type="button"
            // onClick={handleMyRequest}
            className="bg-[#f8f1ff] shadow-inner px-5 py-2.5 hover:shadow-lg hover:shadow-[#d7d4f4] hover:bg-[#13d1ff] hover:text-white duration-300 ease-in rounded-lg text-[#61c1ff] text-lg"
          >
            Go To My Request
          </button>
        )} */}
      </div>
    </div>
  );
};

export default ApplicantsScheduleProcess;
