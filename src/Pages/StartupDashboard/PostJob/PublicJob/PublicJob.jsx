/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BiChevronLeft } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../../../Context/AuthContext';
import { setJob } from '../../../../Hooks/useLocalStorage';
import { minDate } from '../../../../Utilities/PreventPreviousDateSelect';
import AddSkillsReusable from '../AddSkillsReusable';

const PublicJob = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/');
  const jobName = path[path.length - 1];
  const getStoredItem = () => JSON.parse(localStorage.getItem('public-job')) || {};
  const storedJob = getStoredItem();
  const categoryName = jobName.replace(/-/g, ' ').replace(/\b[a-z]/g, (c) => c.toUpperCase());

  const { user } = useSelector((state) => state.auth);
  const { serviceUser } = useContext(AuthContext);
  const experiences = [1, 2, 3, 4, 5];

  const [skillFileds, setSkillFields] = useState(storedJob?.skills || []);

  const [applyBeforeDate, setApplyBeforeDate] = useState(new Date());
  // const [applyBeforeDateValidate, setApplyBeforeDateValidate] = useState(false);
  // const today = new Date().toLocaleDateString();
  // const [openOtherMenu, setOpenOtherMenu] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  // data posting to ls
  const onSubmit = (data) => {
    if (data.experience < 1) {
      toast.error('Number of experience required');
      return;
    }
    if (skillFileds?.length < 1) {
      toast.error('Skills required');
      return;
    }
    if (!applyBeforeDate) {
      toast.error('Apply before date required');
      return;
    }

    const jobData = {
      ...data,
      applyBefore: applyBeforeDate,
      email: user?.user?.email || serviceUser?.email,
      startupsProfilePhoto: user?.user?.profilePhoto || '',
      startupsName: user?.user?.fullName || serviceUser?.fullName,
      categoryName,
      skills: skillFileds,
      apiPath: jobName,
      jobStatus: 'active',
    };
    // setApplyBeforeDateValidate(false);
    setJob(jobName, jobData);
    navigate('/dashboard/post-job/public-job/review');
  };

  useEffect(() => {
    if (storedJob?.applyBefore) {
      setApplyBeforeDate(new Date(storedJob?.applyBefore));
    }
  }, []);

  return (
    <div>
      <div className="flex gap-4 items-center">
        <Link to="/dashboard/post-job">
          <BiChevronLeft className="border p-1 text-4xl rounded border-black" />
        </Link>
        <p className="text-2xl font-semibold">Public Job</p>
      </div>
      <p className="border-[#BCBCBC] bg-[#BCBCBC] border mt-2" />
      <p className="text-gray-400 mt-6 lg:mt-1">
        Jobs posted here are not limited to only our vetted talents. We open it to everyone on the
        internet and any and everyone can apply.
      </p>

      {/* Start Form  */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1 mt-5 text-sm">
          <label className="block font-semibold text-gray-900">Job Title</label>
          <input
            type="Text"
            name="title"
            {...register('title', {
              required: true,
            })}
            defaultValue={storedJob?.title}
            id="title"
            placeholder="Eg. remostarts"
            className="lg:w-[520px] w-full px-4 py-3 rounded-md border border-[#BCBCBC]  text-gray-900 "
          />
          <p className="pt-2">
            {errors.title && (
              <span className="text-red-400 ">
                {errors.title?.type === 'required' && 'Please provide your Job Title'}
              </span>
            )}
          </p>
        </div>

        {/* Input Job Description  */}

        <div className="space-y-1 mt-5 text-sm">
          <label className="block font-semibold text-gray-900">Job Description</label>
          <textarea
            name="description"
            {...register('description', {
              required: true,
            })}
            defaultValue={storedJob?.description}
            id="description"
            placeholder="Description..."
            className="lg:w-3/4 h-40 w-full px-4 py-3 rounded-md border border-[#BCBCBC]  text-gray-900 "
          />
          <p className="pt-2">
            {errors.description && (
              <span className="text-red-400 ">
                {errors.description?.type === 'required' && 'Please provide your Job Description'}
              </span>
            )}
          </p>
        </div>

        {/* Section Of Skills Required */}

        <div className="mt-5 ">
          <label className="block font-semibold text-gray-900">Skills Required</label>
          <p className="border-[#BCBCBC]  lg:w-9/12 bg-[#BCBCBC] border mt-2" />
        </div>

        <div className="mt-5 lg:flex items-start justify-between">
          <div className="">
            <label htmlFor="">Years</label>
            <select
              {...register('experience', {
                required: true,
              })}
              defaultValue={storedJob?.experience}
              className="select lg:w-[67px]  mt-1 w-full block font-semibold border 
                     border-gray-400 rounded-md "
            >
              <option hidden>0</option>
              {experiences.map((D) => (
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
            <p>Years</p>
          </div>

          {/* Skill required input filed */}

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
        <p className="border bg-gray-500 mt-6" />

        {/* Input Location  */}

        <div className="space-y-1 mt-5 text-sm">
          <label className="block font-semibold text-gray-900">Location</label>
          <input
            type="Text"
            name="location"
            {...register('location', {
              required: true,
            })}
            id="location"
            defaultValue={storedJob?.location}
            placeholder="Eg. Remote"
            className="lg:w-[520px] w-full px-4 py-3 rounded-md border border-[#BCBCBC]  text-gray-900 "
          />
          <p className="pt-2">
            {errors.location && (
              <span className="text-red-400 ">
                {errors.location?.type === 'required' && 'Please provide your Location'}
              </span>
            )}
          </p>
        </div>

        {/* Input Salary  */}

        <div className="space-y-1 mt-5 ">
          <label className="block font-semibold text-gray-900">
            Salary <span className="text-xs">( per Month )</span>
          </label>
          <input
            type="number"
            name="Salary"
            {...register('salary', {
              required: true,
            })}
            defaultValue={storedJob?.salary}
            id="salary"
            placeholder="Salary..."
            className="lg:w-[520px] w-full px-4 py-3 rounded-md border border-[#BCBCBC]  text-gray-900 "
          />
          <p className="pt-2">
            {errors.salary && (
              <span className="text-red-400 ">
                {errors.salary?.type === 'required' && 'Please provide  Salary'}
              </span>
            )}
          </p>
        </div>

        {/* Input Apply Before  */}

        <div className="space-y-1 mt-5 text-sm">
          <label htmlFor="applyBefore" className="block font-semibold text-gray-900">
            Apply Before
            <DatePicker
              selected={applyBeforeDate}
              className="lg:w-[330px] px-4 py-3 rounded-md border-[#e5e7eb]  text-gray-900 p-[0.65rem] w-full focus:ring  border focus:ring-opacity-75 focus:ring-violet-400  dark:text-gray-90"
              onChange={(date) => setApplyBeforeDate(date)}
              minDate={minDate}
              placeholderText="Select date"
            />
          </label>
        </div>

        {/* Submit Button  */}

        <button
          type="submit"
          className="px-6 py-3 mt-10 lg:px-10 lg:py-5 bg-[#0B132A] text-white text-xs font-semibold rounded-md"
        >
          Post Public Job
        </button>
      </form>
    </div>
  );
};

export default PublicJob;
