import { differenceInDays } from 'date-fns';
import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { BiChevronLeft, BiPlus } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { toast } from 'react-hot-toast';
import AuthContext from '../../../../Context/AuthContext';

import { getStoredJob, setJob } from '../../../../Hooks/useLocalStorage';
import { minDate } from '../../../../Utilities/PreventPreviousDateSelect';
import AddSkillsReusable from '../AddSkillsReusable';

const InternshipPost = () => {
  //  All Functional is ok . You now work with only onSubmit
  // const [storedJob, setStoredJob] = useState({});
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { serviceUser } = useContext(AuthContext);
  // get stored values
  const location = useLocation();
  const path = location.pathname.split('/');
  const jobName = path[path.length - 1];

  const storedData = getStoredJob(jobName);

  const experience = [1, 2, 3, 4, 5];

  // handle skills state

  // perks state
  const [perks, setPerks] = useState('');
  const [joiningPerks, setJoiningPerks] = useState(storedData?.joiningPerks || []);

  // starting and ending date states || internship duration
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [applyBeforeDate, setApplyBeforeDate] = useState(new Date());
  const totalDays = differenceInDays(new Date(endDate), new Date(startDate));
  const [skillFileds, setSkillFields] = useState(storedData?.skills || []);

  const years = Math.floor(totalDays / 365);
  const remainigDays = totalDays % 365;
  const months = Math.floor(remainigDays / 30);
  const days = remainigDays % 30;

  const categoryName = jobName.replace(/-/g, ' ').replace(/\b[a-z]/g, (c) => c.toUpperCase());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  // handle perk
  const changePerkHandler = (e) => {
    setPerks(e.target.value);
  };

  const handlePerk = () => {
    setJoiningPerks([...joiningPerks, perks]);
    setPerks('');
  };

  // data posting to ls
  const onSubmit = (data) => {
    // validate every form field before save
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
    if (joiningPerks?.length < 1) {
      toast.error('Perks required');
      return;
    }

    const internshipData = {
      ...data,
      email: user?.user?.email || serviceUser?.email,
      startupsProfilePhoto: user?.user?.profilePhoto || '',
      startupsName: user?.user?.fullName || serviceUser?.fullName,
      categoryName,
      skills: skillFileds,
      apiPath: jobName,
      joiningPerks,
      jobStatus: 'active',
      startingDate: startDate?.toLocaleDateString(),
      endingDate: endDate?.toLocaleDateString(),
      applyBefore: applyBeforeDate?.toLocaleDateString(),
    };
    setJob(jobName, internshipData);
    navigate('/dashboard/post-job/internship/review');
  };
  const [experienceYear, setExperienceYear] = useState('');
  return (
    <div>
      <div className="flex gap-4 items-center">
        <Link to="/dashboard/post-job">
          <BiChevronLeft className="border p-1 text-4xl rounded border-black" />
        </Link>
        <p className="text-2xl font-semibold">Internship</p>
      </div>
      <p className="border-[#BCBCBC] bg-[#BCBCBC] border mt-2" />
      <p className="text-gray-400 mt-6 lg:mt-1">
        This is a kind of job where you are concerned with training the talents to grow, it can be
        paid or unpaid and you commit to certify them on completion
      </p>

      {/* Start Form  */}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* internship title */}
        <div className="space-y-1 mt-5 text-sm">
          <label className="block font-semibold text-gray-900">Internship Title</label>
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
          <label className="block font-semibold text-gray-900">Internship Description</label>
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
          <label className="block font-semibold text-gray-900">Internship Requirement</label>
          <p className="border-[#BCBCBC] lg:w-9/12 bg-[#BCBCBC] border mt-2" />
        </div>

        <div className="mt-5 lg:flex items-start justify-between">
          <div className="">
            <label htmlFor="">Years</label>
            <select
              {...register('experience', {
                required: true,
              })}
              value={experienceYear || storedData?.experience || ''}
              onChange={(e) => setExperienceYear(e.target.value)}
              className="select  mt-1 w-full block font-semibold border 
                       border-gray-400 rounded-md "
            >
              <option value="" hidden>
                select a year
              </option>
              {experience.map((D) => (
                <option key={Math.random()} value={D}>
                  {D}
                </option>
              ))}
            </select>
          </div>

          {/* Experience Year Input Field */}

          <div>
            <label className="block font-semibold text-gray-900">Experience (Optional)</label>
            <p className="p-3 lg:w-[100px] rounded-md shadow-sm">Years</p>
          </div>

          {/* Skill Section  */}

          {/* Skill required input field */}

          <div>
            <AddSkillsReusable skillFileds={skillFileds} setSkillFields={setSkillFields} />
            <div>
              {skillFileds?.length ? (
                <div className="flex flex-wrap px-2 py-4 gap-3  mt-5 rounded-md lg:w-[300px] border h-auto bg-[#F0F9FF]">
                  {skillFileds.map((value) => (
                    <div key={Math.random()}>
                      <div className="bg-[#19A5FF] py-1 px-2 text-white  text-sm text-center rounded-2xl flex gap-2 items-center justify-center  ">
                        <p>{value}</p>
                        <button
                          type="button"
                          onClick={() => {
                            setSkillFields(skillFileds?.filter((val) => val !== value));
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

        <hr className="border bg-gray-500 mt-6" />

        {/* Input Salary  */}

        <div className="space-y-1 mt-5 text-sm">
          <label className="block font-semibold text-gray-900">Stipend (Per Month)</label>
          <div className="flex justify-between items-center w-full md:w-1/2  rounded-md border border-[#b5bac3 focus:outline-none">
            <input
              type="number"
              name="salary"
              {...register('salary', {
                required: 'Salary is required',
              })}
              id="salary"
              defaultValue={storedData?.salary}
              placeholder="write salary"
              className="w-full border border-transparent   mr-3  py-3 focus:ring-0 rounded-md  text-gray-900  "
            />
            <p className="text-xl font-semibold pr-3">₳</p>
          </div>
          <p className="pt-2 ">
            {errors.salary && <span className="text-red-400 ">{errors.salary?.message}</span>}
          </p>
        </div>

        {/* Date Section  */}

        <div className="flex justify-between ">
          <div className="space-y-1 mt-5 text-sm">
            <label className="block font-semibold text-gray-900">Starting Date</label>
            <DatePicker
              selectsStart
              selected={startDate}
              className="lg:w-[330px] px-4 py-3 rounded-md border-[#e5e7eb]  text-gray-900 p-[0.65rem] w-full focus:ring  border focus:ring-opacity-75 focus:ring-violet-400  dark:text-gray-90"
              onChange={(date) => setStartDate(date)}
              minDate={minDate}
            />
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
          </div>
        </div>

        <h5 className="text-md font-bold mt-2">
          Internship Duration:{' '}
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
        </div>

        {/* Joining Perks  */}
        <div>
          <div className="space-y-1 mt-5 text-sm w-[1/3]">
            <label className="block font-semibold text-gray-900">Joining Perks</label>
            <div className="lg:w-[50%] pr-2 rounded-md border border-[#BCBCBC]  text-gray-900 justify-between flex items-center">
              <input
                type="text"
                name="inputSkill"
                value={perks}
                onChange={changePerkHandler}
                placeholder="Sample input"
                className="px-4 py-3 focus:ring-0 focus:outline-none border  rounded-md border-transparent outline-none w-full focus:bg-transparent"
              />
              <button onClick={handlePerk} type="button">
                <BiPlus className="border p-1 text-2xl" />
              </button>
            </div>

            {joiningPerks.length ? (
              <div className="flex flex-wrap rounded-md  px-2 py-4 gap-3 mt-8 lg:w-[50%] border h-auto bg-[#F0F9FF]">
                {joiningPerks.length &&
                  joiningPerks.map((value) => (
                    <div key={Math.random()}>
                      <div className="bg-[#19A5FF] py-1 px-2 text-white  text-sm text-center rounded-2xl flex gap-2 items-center justify-center  ">
                        <p>{value}</p>
                        <button
                          type="button"
                          onClick={() => {
                            setJoiningPerks(joiningPerks.filter((val) => val !== value));
                          }}
                        >
                          <RxCross2 className="font-bold text-sm" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>

        {/* Submit Button  */}

        <button
          type="submit"
          className="px-6 py-3 mt-10 lg:px-10 lg:py-5 bg-[#0B132A] text-white text-xs font-semibold rounded-md"
        >
          Post Internship Job
        </button>
      </form>
    </div>
  );
};

export default InternshipPost;
