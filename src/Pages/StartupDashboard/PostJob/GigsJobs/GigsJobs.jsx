import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { BiChevronLeft, BiPlus } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { differenceInDays } from 'date-fns';
import { toast } from 'react-hot-toast';
import AuthContext from '../../../../Context/AuthContext';

import { getStoredJob, setJob } from '../../../../Hooks/useLocalStorage';
import { minDate } from '../../../../Utilities/PreventPreviousDateSelect';
import AddSkillsReusable from '../AddSkillsReusable';

const GigsJobs = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { serviceUser } = useContext(AuthContext);
  // get stored values
  const location = useLocation();
  const path = location.pathname.split('/');
  const jobName = path[path.length - 1];
  const storedData = getStoredJob(jobName);
  const experience = [1, 2, 3, 4, 5];

  // perks state
  const [deliverables, setDeliverables] = useState('');
  const [deliverablesItems, setDeliverablesItems] = useState(storedData?.joiningPerks || []);

  const categoryName = jobName.replace(/-/g, ' ').replace(/\b[a-z]/g, (c) => c.toUpperCase());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  // handle perk
  const changeDeliverableskHandler = (e) => {
    setDeliverables(e.target.value);
  };

  const handleDeliverables = () => {
    setDeliverablesItems([...deliverablesItems, deliverables]);
    setDeliverables('');
  };

  // starting and ending date states || intership duration
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [applyBeforeDate, setApplyBeforeDate] = useState(new Date());
  const totalDays = differenceInDays(new Date(endDate), new Date(startDate));
  const [skillFileds, setSkillFields] = useState(storedData?.skills || []);

  const years = Math.floor(totalDays / 365);
  const remainigDays = totalDays % 365;
  const months = Math.floor(remainigDays / 30);
  const days = remainigDays % 30;

  const onSubmit = (data) => {
    if (data?.experience < 1) {
      toast.error('Number of experience year is required.');
      return;
    }
    if (skillFileds?.length < 1) {
      toast.error('Skills required');
      return;
    }
    if (startDate?.toLocaleDateString() === new Date().toLocaleDateString() || '') {
      toast.error('Starting date is required.');
      return;
    }
    if (endDate?.toLocaleDateString() === new Date().toLocaleDateString() || '') {
      toast.error('Ending date is required.');
      return;
    }
    if (applyBeforeDate?.toLocaleDateString() === new Date().toLocaleDateString() || '') {
      toast.error('Apply before date is required.');
      return;
    }

    if (deliverablesItems?.length === 0) {
      toast.error('Deliverables is required.');
      return;
    }

    const gigsData = {
      ...data,
      email: user?.user?.email || serviceUser?.email,
      startupsProfilePhoto: user?.user?.profilePhoto || '',
      startupsName: user?.user?.fullName || serviceUser?.fullName,
      categoryName,
      skills: skillFileds,
      apiPath: jobName,
      joiningPerks: deliverablesItems,
      jobStatus: 'active',
      startingDate: startDate?.toLocaleDateString(),
      endingDate: endDate?.toLocaleDateString(),
      applyBefore: applyBeforeDate?.toLocaleDateString(),
    };
    setJob(jobName, gigsData);
    navigate('/dashboard/post-job/gigs/review');
  };
  return (
    <div>
      <div className="flex gap-4 items-center">
        <Link to="/dashboard/post-job">
          <BiChevronLeft className="border p-1 text-4xl rounded border-black" />
        </Link>
        <p className="text-2xl font-semibold">Gigs</p>
      </div>
      <p className="border-[#BCBCBC] bg-[#BCBCBC] border mt-2" />
      <p className="text-gray-400 mt-6 lg:mt-1">
        You need someone to do simple task, small tasks, no matter how small the task is, post it
        here and our talents will do the tasks for you
      </p>

      {/* Start Form  */}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* internship title */}
        <div className="space-y-1 mt-5 text-sm">
          <label className="block font-semibold text-gray-900">Gigs Title</label>
          <input
            type="Text"
            name="title"
            {...register('title', {
              required: true,
            })}
            id="title"
            defaultValue={storedData?.title}
            placeholder="Eg. Remostarts"
            className="lg:w-[520px] w-full px-4 py-3 rounded-md border border-[#BCBCBC]  text-gray-900 "
          />
          <p className="pt-2">
            {errors.title && (
              <span className="text-red-400 ">
                {errors.title?.type === 'required' && 'Please provide your Internship title'}
              </span>
            )}
          </p>
        </div>

        {/* Input Job Description  */}

        <div className="space-y-1 mt-5 text-sm">
          <label className="block font-semibold text-gray-900">Gigs Description</label>
          <textarea
            type="Text"
            name="description"
            {...register('description', {
              required: true,
            })}
            id="description"
            defaultValue={storedData?.description}
            placeholder="Write your description"
            className="lg:w-3/4 h-40 w-full px-4 py-3 rounded-md border border-[#BCBCBC]  text-gray-900 "
          />
          <p className="pt-2">
            {errors.description && (
              <span className="text-red-400 ">
                {errors.description?.type === 'required' &&
                  'Please provide your internship Description'}
              </span>
            )}
          </p>
        </div>

        {/* Section Of Skills Required */}

        <div className="mt-5">
          <label className="block font-semibold text-gray-900">Gig Requirement</label>
          <p className="border-[#BCBCBC] lg:w-9/12 bg-[#BCBCBC] border mt-2" />
        </div>

        <div className="mt-5 lg:flex items-start justify-between">
          <div className="">
            <label htmlFor="">Years</label>
            <select
              {...register('experience', {
                required: true,
              })}
              className="select lg:w-[80px]  mt-1 w-full block font-semibold border 
                       border-gray-400 rounded-md "
            >
              <option defaultValue={storedData?.experience || 'select a year'}>
                {storedData?.experience || 0}
              </option>
              {experience.map((D) => (
                <option key={Math.random()}>{D}</option>
              ))}
            </select>
            <p className="pt-2">
              {errors.experience && (
                <span className="text-red-400 ">
                  {errors.experience?.type === 'required' && 'Please provide your Number Of Years'}
                </span>
              )}
            </p>
          </div>

          {/* Experience Year Input Field */}

          <div>
            <label className="block font-semibold text-gray-900">Experience (Optional)</label>
            <p className="p-3 lg:w-[50px] rounded-md shadow-sm">Years</p>
          </div>

          {/* Skill Section  */}

          {/* Skill required input field */}

          <div>
            <div className="space-y-1 text-sm w-full  lg:w-[300px]">
              <AddSkillsReusable skillFileds={skillFileds} setSkillFields={setSkillFields} />
              <div>
                {skillFileds.length ? (
                  <div className="flex flex-wrap px-2 py-4 gap-3  mt-5 rounded-md lg:w-[300px] border h-auto bg-[#F0F9FF]">
                    {skillFileds.map((value) => (
                      <div key={Math.random()}>
                        <div className="bg-[#19A5FF] py-1 px-2 text-white  text-sm text-center rounded-2xl flex gap-2 items-center justify-center  ">
                          <p>{value}</p>
                          <button
                            type="button"
                            onClick={() => {
                              setSkillFields(skillFileds.filter((val) => val !== value));
                            }}
                          >
                            <RxCross2 className="font-bold text-sm" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap px-2 py-4 gap-3 mt-8 rounded-md lg:w-[300px] border h-auto bg-[#F0F9FF]">
                    <p>No skill Selected yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <hr className="border bg-gray-500 mt-6" />

        {/* Input Salary  */}

        <div className="space-y-1 mt-5 text-sm">
          <label className="block font-semibold text-gray-900">Compensation (Per Month)</label>

          <div className="flex justify-between items-center w-full md:w-[30%]  rounded-md border border-[#BCBCBC focus:outline-none]">
            <input
              type="number"
              name="salary"
              {...register('salary', {
                required: true,
              })}
              id="salary"
              defaultValue={storedData?.salary}
              placeholder="Compensation Range"
              className="w-full  px-4 py-3 focus:ring-0 border border-transparent rounded-md  text-gray-900 focus:outline-none "
            />
            <p
              className="text-xl pr-3 font-semibol
                      "
            >
              ₳
            </p>
          </div>
          <p className="pt-2">
            {errors.salary && (
              <span className="text-red-400 ">
                {errors.salary?.type === 'required' && 'Please provide  Salary'}
              </span>
            )}
          </p>
        </div>

        {/* Date Section  */}
        <div className="lg:flex   lg:gap-20 ">
          <div className="space-y-1 mt-5 text-sm">
            <label className="block font-semibold text-gray-900">Starting Date</label>
            <DatePicker
              selectsStart
              selected={startDate}
              className="lg:w-[330px] px-4 py-3 rounded-md border-[#e5e7eb]  text-gray-900 p-[0.65rem] w-full focus:ring  border focus:ring-opacity-75 focus:ring-violet-400  dark:text-gray-90"
              onChange={(date) => setStartDate(date)}
              minDate={minDate}
            />
            <p className="pt-2">
              {errors.startingDate && (
                <span className="text-red-400 ">
                  {errors.startingDate?.type === 'required' && 'Please provide your Starting Date'}
                </span>
              )}
            </p>
          </div>
          <div className="space-y-1 mt-5 text-sm">
            <label className="block font-semibold text-gray-900">Ending Date</label>
            <DatePicker
              selectsEnd
              selected={endDate}
              className="lg:w-[330px] px-4 py-3 rounded-md border-[#e5e7eb]  text-gray-900 p-[0.65rem] w-full focus:ring  border focus:ring-opacity-75 focus:ring-violet-400  dark:text-gray-90"
              onChange={(date) => setEndDate(date)}
              minDate={startDate}
            />
            <p className="pt-2">
              {errors.endingDate && (
                <span className="text-red-400 ">
                  {errors.endingDate?.type === 'required' && 'Please provide your Ending Date'}
                </span>
              )}
            </p>
          </div>
        </div>

        <h5 className="text-md font-bold mt-2">
          Gigs Duration:{' '}
          <span className="text-blue-400">
            {years > 0 && years} {years > 0 && 'years'} {months > 0 && months}{' '}
            {months > 0 && 'months'} {days > 0 && days} {days > 0 && 'days'}
          </span>
        </h5>

        <div className="space-y-1 mt-5 text-sm">
          <label className="block font-semibold text-gray-900">Apply Before</label>
          <DatePicker
            selected={applyBeforeDate}
            className="lg:w-[330px] px-4 py-3 rounded-md border-[#e5e7eb]  text-gray-900 p-[0.65rem] w-full focus:ring  border focus:ring-opacity-75 focus:ring-violet-400  dark:text-gray-90"
            onChange={(date) => setApplyBeforeDate(date)}
            minDate={minDate}
            maxDate={startDate}
          />
          <p className="pt-2">
            {errors.applyBefore && (
              <span className="text-red-400 ">
                {errors.applyBefore?.type === 'required' && 'Please provide your Apply Before'}
              </span>
            )}
          </p>
        </div>

        {/* Joining Perks  */}

        <div>
          <div className="space-y-1 mt-5 text-sm ">
            <label className="block font-semibold text-gray-900">Deliverables</label>
            <div className="lg:flex justify-between max-lg:space-y-5 gap-4 items-start">
              <div className="lg:w-full pr-2 gap-3 rounded-md border border-[#BCBCBC]  text-gray-900 justify-between flex items-center">
                <input
                  type="text"
                  name="deliverables"
                  value={deliverables}
                  onChange={changeDeliverableskHandler}
                  placeholder="Add Deliverables"
                  className="px-4 py-3 focus:ring-0 focus:outline-none border  rounded-md border-transparent outline-none w-full focus:bg-transparent"
                />
                <button onClick={handleDeliverables} type="button">
                  <BiPlus className="border p-1 text-3xl" />
                </button>
              </div>

              {deliverablesItems.length ? (
                <div className="flex flex-wrap  rounded-md  px-2 py-4 gap-3  lg:w-full border h-auto bg-[#F0F9FF]">
                  {deliverablesItems.length &&
                    deliverablesItems.map((value) => (
                      <div key={Math.random()}>
                        <div className="bg-[#19A5FF] py-1 px-2 text-white  text-sm text-center rounded-2xl flex gap-2 items-center justify-center  ">
                          <p>{value}</p>
                          <button
                            type="button"
                            onClick={() => {
                              setDeliverablesItems(
                                deliverablesItems.filter((val) => val !== value)
                              );
                            }}
                          >
                            <RxCross2 className="font-bold text-sm " />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="w-full  bg-[#F0F9FF] py-5 text-center rounded-md">
                  No deliverables added
                </div>
              )}
            </div>

            <p className="pt-2">
              {errors.Skills && (
                <span className="text-red-400 ">
                  {errors.Skills?.type === 'required' && 'Please provide your Skills'}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Submit Button  */}

        <button
          type="submit"
          className="px-6 py-3 mt-10  lg:px-10 lg:py-5 bg-[#0B132A] text-white text-xs font-semibold rounded-md"
        >
          Review Gigs
        </button>
      </form>
    </div>
  );
};

export default GigsJobs;
