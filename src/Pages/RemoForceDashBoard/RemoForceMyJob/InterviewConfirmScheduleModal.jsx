import { Dialog, Transition } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { Fragment, useContext, useState } from 'react';

import { CgClose } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AuthContext from '../../../Context/AuthContext';

const InterviewConfirmScheduleModal = ({ isOpen, setIsOpen, searchData, refetch }) => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  // const { socket } = useContext(AuthContext);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedMeetLink, setSelectedMeetLink] = useState('');
  const { data: slotsData } = useQuery(['slotsData'], () =>
    axios
      .get(
        `${import.meta.env.VITE_APP_URL_STARTUP}/api/talent/available-slots?startupsEmail=${
          searchData?.startupsEmail
        }&jobId=${searchData?.jobId}`
      )
      .then((res) => res.data)
  );
  // available slots data fetching
  const availableSlots = slotsData.reduce((acc, curr) => {
    const index = acc.findIndex((item) => item.date === curr.date);
    if (index === -1) {
      acc.push({ date: curr.date, slots: [curr.time], meetLink: curr.meetLink });
    } else {
      acc[index].slots.push(curr.time);
    }
    return acc;
  }, []);
  // console.log({ availableSlots });

  const [active, setActive] = useState({ status: false, data: '', index1: '', index2: '' });
  function closeModal() {
    setIsOpen(false);
  }
  // handle data accept events
  const handleAccept = () => {
    const requestBody = {
      startupsEmail: searchData.startupsEmail,
      startupName: searchData.startupName,
      remoforceEmail: user?.user.email,
      remoforceName: user?.user.fullName,
      jobId: searchData.jobId,
      jobTitle: searchData.searchQuery.details.title,
      type: 'talent-request',
      stage: 'interview-schedule',
      interviewStatus: 'accepted',
      status: 'unread',
      slotStatus: 'booked',
      bookedSlot: { selectedDate, selectedTime, selectedMeetLink },
    };

    axios
      .post(
        `${import.meta.env.VITE_APP_URL_STARTUP}/api/talent/remo-request-acceptance`,
        requestBody
      )
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response.status === 200) {
          toast.success(response.data.message);
          // socket?.emit('sendNotification', {
          //   receiverEmail: searchData.startupsEmail,
          //   notificationArr: response.data.data,
          // });
          refetch();
          setIsOpen(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleSelectInterviewSchedule = (date, slot, meetLink, index1, index2) => {
    setActive({ status: true, data: slot, index1, index2 });
    setSelectedDate(date);
    setSelectedTime(slot);
    setSelectedMeetLink(meetLink);
  };

  console.log({ searchData });
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="flex items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full flex flex-col justify-between  h-[95vh] transform rounded-2xl bg-orange-50 p-3 lg:p-6 text-left align-middle shadow-xl transition-all relative">
                {/* cross button for close modal */}
                <div className="absolute right-4 top-4">
                  <button
                    type="button"
                    className=" p-2 rounded-full duration-300 ease-in inline-flex  hover:text-white hover:bg-[#19a5ff] text-[#19a5ff]"
                    onClick={closeModal}
                  >
                    <CgClose className="text-2xl " />
                  </button>
                </div>
                {/* modal content for interview schedules */}
                <div className="w-11/12">
                  {availableSlots.length &&
                    availableSlots.map(({ date, slots, meetLink }, index1) => (
                      <div className="border-[1px] border-blue-200 my-2 px-5 rounded-[10px]">
                        <div className="lg:flex gap-10  items-center">
                          <div className="lg:w-1/12 flex justify-center items-center gap-3">
                            <div className="w-full h-10/12 font-bold text-center my-2 bg-blue-200 rounded-xl">
                              <div className="bg-green-400 p-2 text-white rounded-t-xl -mt-1 w-full">
                                <h1 className="w-full">
                                  {date.split(' ')[1].replace(/[^0-9]/g, '')}
                                </h1>
                              </div>
                              <div className="flex justify-center gap-2 p-2  rounded-b-xl bg-white w-full">
                                <h2 className="lg:text-xs">{date.split(' ')[0]}</h2>
                                <h2 className="border-l-2 pl-2 lg:text-xs">{date.split(' ')[2]}</h2>
                              </div>
                            </div>
                          </div>
                          <div className="lg:w-8/12 border-l-2 py-2 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
                            {slots &&
                              slots.map((slot, index2) => (
                                <p
                                  className={`text-center py-2 px-5 m-1 rounded-lg cursor-pointer ${
                                    active.status &&
                                    active.data === slot &&
                                    active.index1 === index1 &&
                                    active.index2 === index2
                                      ? 'bg-green-500 text-white'
                                      : 'bg-blue-200'
                                  }`}
                                >
                                  <button
                                    onClick={() =>
                                      handleSelectInterviewSchedule(
                                        date,
                                        slot,
                                        meetLink,
                                        index1,
                                        index2
                                      )
                                    }
                                    className=" outline-none"
                                    type="button"
                                  >
                                    {slot}
                                  </button>
                                </p>
                              ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="flex justify-between">
                  <div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="bg-[#F8F1FF] duration-300 ease-in inline-flex hover:text-white hover:bg-[#19a5ff] text-blue-500 font-semibold py-2 px-4 rounded-lg"
                      type="button"
                    >
                      Back
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={handleAccept}
                      className="bg-[#F8F1FF] duration-300 ease-in  hover:text-white hover:bg-[#19a5ff] text-blue-500 font-semibold py-2 px-4 rounded-lg"
                      type="button"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InterviewConfirmScheduleModal;
