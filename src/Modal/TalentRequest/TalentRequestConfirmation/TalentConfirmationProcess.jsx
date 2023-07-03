import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../Context/AuthContext';
import TalentConfirmationStarted from './TalentCofirmationStarted';
import TalentConfirmationDate from './TalentConfirmationDate';
import TalentRequestFinalPage from './TalentRequestFinalPage';

const TalentConfirmationProcess = ({ setIsOpen, selectedTalent }) => {
  const { user } = useSelector((state) => state.auth);
  const [tabActive, setTabActive] = useState(1);
  const [selectedDate, setSelectedDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const { results, refresh, setRefresh, handleExpand,startupDetails  } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: gotAccess } = useQuery(['gotAccess'], () =>
    axios
      .get(`${import.meta.env.VITE_APP_URL_STARTUP}/calender/got-access/${user?.user.email}`)
      .then((res) => res.data)
  );


  const { data: createdEvents, refetch } = useQuery(['results'], () =>
    axios
      .get(
        `${import.meta.env.VITE_APP_URL_STARTUP}/api/talent/created-events?email=${
          user?.user?.email
        }&jobId=${results?.lastSearchResult?._id}`
      )
      .then((res) => res.data)
  );
  // console.log(createdEvents);

  const handleCalenderAccess = async () => {
    try {
      window.open(
        `${import.meta.env.VITE_APP_URL_STARTUP}/calender/access/${user?.user?.email}`,
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

  const handleEventCompletion = () => {
    const getStoredItem = (key) => JSON.parse(localStorage.getItem('events')) || [];
    setLoading(true);
    const lsData = getStoredItem();

    if (lsData.length < selectedTalent.length) {
      toast.error(
        `You have to select ${selectedTalent.length} talents.Need to select Min ${
          selectedTalent.length - lsData.length
        } more slots`
      );
      return;
    }

    const talentsEmail = selectedTalent.map((talent) => talent.result.email);

    const requestBody = {
      startupsEmail: results.startupsEmail,
      searchId: results.lastSearchResult._id,
      talentsEmail,
      searchQuery: results.lastSearchResult.searchQuery,
      interviewStatus: 'requested',   
      events: lsData,
      startupName: startupDetails.startupName,
      startupIcon: startupDetails.startupIcon,
      type: 'talent-request',
      stage: 'talent-request',
      status: 'unread',
    };
    axios
      .post(`${import.meta.env.VITE_APP_URL_STARTUP}/api/talent/interview-requests`, requestBody)
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response.status === 200) {
          toast.success(response.data.message);
          // socket?.emit('sendNotificationToTalents', {
          //   emails: talentsEmail,
           
          // });
        
          localStorage.removeItem('events');
          localStorage.removeItem('selected-talents');
        }

        setTabActive(tabActive + 1);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });

    refetch();
  };

  // console.log(results);
  const handleMyRequest = () => {
    setRefresh(!refresh);
    handleExpand(results.lastSearchResult._id);
    navigate('/dashboard/talent-request-history');
  };

  console.log(results);

  return (
    <div className="h-[100%] flex  justify-around flex-col">
      <div>
        {tabActive === 1 && <TalentConfirmationStarted selectedTalent={selectedTalent} />}

        {tabActive === 2 && (
          <TalentConfirmationDate
            createdEvents={createdEvents}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        )}
        {tabActive === 3 && <TalentRequestFinalPage />}
      </div>

      {/*  */}
      <div className="flex  justify-between  lg:px-16">
        <button
          onClick={handleBack}
          className="bg-[#f8f1ff] shadow-inner  px-5 py-2.5 hover:shadow-lg hover:shadow-[#d7d4f4] hover:bg-[#13d1ff] hover:text-white duration-300 ease-in rounded-lg text-[#61c1ff] text-lg"
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
            className="bg-[#f8f1ff] shadow-inner lg:px-5 px-2 lg:py-2 hover:shadow-lg hover:shadow-[#d7d4f4] hover:bg-[#13d1ff] hover:text-white duration-300 ease-in rounded-lg text-[#61c1ff] lg:text-lg"
            type="button"
          >
            Complete Event Creation
          </button>
        )}
        {tabActive === 3 && (
          <button
            type="button"
            onClick={handleMyRequest}
            className="bg-[#f8f1ff] shadow-inner px-5 py-2.5 hover:shadow-lg hover:shadow-[#d7d4f4] hover:bg-[#13d1ff] hover:text-white duration-300 ease-in rounded-lg text-[#61c1ff] text-lg"
          >
            Go To My Request
          </button>
        )}
      </div>
    </div>
  );
};

export default TalentConfirmationProcess;
