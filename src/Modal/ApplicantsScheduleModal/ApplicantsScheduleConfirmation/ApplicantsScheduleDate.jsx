import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { setJob } from '../../../Hooks/useLocalStorage';
import calenderTimeFormatter from '../../../Utilities/calenderTimeFormatter';
import customStyles from '../../../Utilities/customStyles';

const ApplicantsScheduleDate = ({ applicant }) => {
  const getStoredItems = () => JSON.parse(localStorage.getItem('applicant-events')) || [];
  const lsSlots = getStoredItems();
  const { user } = useSelector((state) => state.auth);
  const [slotsData, setSlotsData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [slots, setSlots] = useState(lsSlots || []);
  const { handleSubmit, reset } = useForm({ mode: 'onChange' });
  const [timeZones, setTimeZones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [refresh, setRefresh] = useState(false);

  // fetching time zone
  useEffect(() => {
    fetch('/timeZones.json')
      .then((res) => res.json())
      .then((data) => {
        setTimeZones(data);
      });
  }, []);
  // fetching time slots
  useEffect(() => {
    fetch('/slots.json')
      .then((res) => res.json())
      .then((data) => {
        setSlotsData(data.timeSlots);
      });
  }, [setSlots, startDate]);

  // select time zone
  const handleTimezoneChange = ({ value }) => {
    setSelectedZone(value);
  };
  // select time slot
  const handleTimeSlotChange = (value) => {
    setSelectedTime(value);
  };

  // slot date change handler
  const handleDateChange = (date) => {
    setStartDate(date);
    setRefresh(!refresh);
    reset();
  };
  // handle submit
  const handleCreateSlot = () => {
    if (selectedTime === 'Select Time' || !selectedTime) {
      toast.error('You must select a time slot');
      return;
    }
    if (selectedZone === 'Select Zone' || !selectedZone) {
      toast.error('You must select a time zone');
      return;
    }

    const onlyDate = new Date(startDate);
    const formatDate = onlyDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const bookedSlot = slots.find(
      (slot) => slot.date === formatDate && selectedTime?.value === slot.time
    );
    if (bookedSlot) {
      toast.error(`You already booked this slot in this ${formatDate}`);
      return;
    }

    setLoading(true);
    const remainingSlots = slotsData.filter((slot) => slot?.value !== selectedTime.value);

    const { startTime, endTime } = calenderTimeFormatter(startDate, selectedTime);
    // submit data
    const event = {
      startTime,
      endTime,
      timeZone: selectedZone,
      email: user?.user.email,
      applicantsEmail: applicant.applicantsEmail,
    };
    const newSlot = {};

    axios
      .post(`${import.meta.env.VITE_APP_URL_STARTUP}/calender/create-applicant-event`, event)
      .then((response) => {
        setLoading(false);
        reset();
        setSlotsData(remainingSlots);
        reset();
        newSlot.date = formatDate;

        // newSlot.date = `${selectedDate}${month}${year}`;
        newSlot.time = selectedTime.value;
        newSlot.timeZone = selectedZone;
        newSlot.slotStatus = 'available';
        newSlot.meetLink = response.data.hangoutLink;

        setSlots((prev) => [...prev, newSlot]);
        if (!slots.length) {
          setJob('applicant-events', [newSlot]);
        } else {
          const getStoredItem = () => JSON.parse(localStorage.getItem('events')) || {};
          const lsData = getStoredItem();
          setJob('applicant-events', [...lsData, newSlot]);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  // remove slot handler
  const handleRemoveSlots = (slot) => {
    const remaining = slots.filter((slt) => slt?.time !== slot?.time || slt?.date !== slot?.date);
    setSlots(remaining);
  };
  // no slot message element
  const noSlotMessage = (
    <tr className="lg:text-xl font-bold mt-2">
      <td>{slots.length <= 0 && 'No slot selected'}</td>
    </tr>
  );

  function compareDates(a, b) {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  }
  const sortedSlots = slots.sort(compareDates);

  return (
    <div className="lg:w-3/5 mx-auto px-5">
      <h1 className="lg:text-xl text-lg text-center font-bold">Select Date and Time Slots</h1>
      <div className="lg:flex items-center justify-center mt-2 lg:gap-10">
        <form className="w-full" onSubmit={handleSubmit(handleCreateSlot)}>
          <div className="lg:grid lg:grid-cols-3 grid-cols-2 sm:grid-cols-1 gap-4 w-full">
            <div>
              <h3>Schedule date</h3>
              <div className="flex justify-center items-center">
                <DatePicker
                  className="px-[0.65rem] py-[8px] w-full focus:ring border-gray-200  rounded-md border focus:ring-opacity-75 focus:ring-violet-400  dark:text-gray-90"
                  selected={startDate}
                  onChange={handleDateChange}
                  minDate={new Date()}
                />
              </div>
            </div>
            <div>
              <h3>Interview time</h3>
              <Select
                options={slotsData}
                styles={customStyles}
                onChange={handleTimeSlotChange}
                placeholder="Select time slot"
                classNamePrefix="select2-selection"
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
            <div className="mt-1">
              <h3 className="text-sm">Time Zone</h3>
              <Select
                options={timeZones}
                styles={customStyles}
                onChange={handleTimezoneChange}
                placeholder="Select time zone"
                classNamePrefix="select2-selection"
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
              />
              {/* <select
                className="p-[0.65rem] w-full focus:ring border-gray-200  rounded-md border focus:ring-opacity-75 focus:ring-violet-400  dark:text-gray-90"
                value={selectedZone}
                onChange={handleTimezoneChange}
                // {...register('timeZone')}
                id="timeZone"
              >
                <option defaultValue="Select Zone">Select Zone</option>
                {timeZone && timeZone.map((zone) => <option key={Math.random()}>{zone}</option>)}
              </select> */}
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-[160px] flex justify-center items-center text-center mx-auto outline-none bg-[#F8F1FF] rounded-md border-2 border-orange-300 hover:bg-blue-400 py-2 mt-3 cursor-pointer text-blue-400 hover:text-white px-3 duration-100 ease-in font-bold gap-2"
            >
              Create Event
              {loading && (
                <span className="w-5 h-5 font-bold border-4 border-dashed rounded-full animate-spin border-white" />
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="mt-2 px-5 py-2 bg-white rounded-xl">
        <h1 className="lg:text-xl text-lg font-bold">Selected Timings</h1>
        <div className="flex flex-col">
          <div className="overflow-x-auto overflow-y-auto lg:h-40  sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div>
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                    <tr>
                      <th scope="col" className="px-6 py-2">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-2">
                        Time
                      </th>
                      <th scope="col" className="px-6 py-2">
                        Meet link
                      </th>
                      <th scope="col" className="px-6 py-2">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="font-semibold">
                    {slots.length === 0 && noSlotMessage}
                    {sortedSlots &&
                      sortedSlots.map((slot, index) => (
                        <tr
                          key={Math.random()}
                          className={`border-b ${
                            index % 2 === 0 ? 'bg-[##FFFFFF]' : 'bg-blue-100'
                          }`}
                        >
                          <td className="whitespace-nowrap px-6 py-2">{slot?.date}</td>
                          <td className="whitespace-nowrap px-6 py-2">{slot?.time}</td>
                          <td className="whitespace-nowrap px-6 py-2 text-blue-500 cursor-pointer">
                            <Link to={`${slot.meetLink}`}> Meet Link </Link>
                          </td>
                          <td className="whitespace-nowrap px-6 py-2 text-blue-500">
                            <button
                              className="outline-none"
                              onClick={() => handleRemoveSlots(slot)}
                              type="button"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsScheduleDate;
