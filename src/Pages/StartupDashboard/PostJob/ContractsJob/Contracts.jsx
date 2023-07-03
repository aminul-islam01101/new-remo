import { differenceInDays, getMonth, getYear } from 'date-fns';
import React, { useContext, useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import Dropzone from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BiChevronLeft, BiPlus } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import currencyIcon from '../../../../Assets/Dashboard/currency.png';
import AuthContext from '../../../../Context/AuthContext';
import { setJob } from '../../../../Hooks/useLocalStorage';
import { minDate } from '../../../../Utilities/PreventPreviousDateSelect';
import AddSkillsReusable from '../AddSkillsReusable';

const Contracts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/');
  const jobName = path[path.length - 1];
  const isEdit = path.includes('edit');
  const categoryName = jobName.replace(/-/g, ' ').replace(/\b[a-z]/g, (c) => c.toUpperCase());

  // const storedJob = getStoredJob(jobName);
  const storedJob = location?.state && location?.state?.data;
  const { user } = useSelector((state) => state.auth);
  const { serviceUser } = useContext(AuthContext);
  const [file, setFile] = useState();
  // perks state
  const [deliverables, setDeliverables] = useState('');
  const [deliverablesItems, setDeliverablesItems] = useState(storedJob?.joiningPerks || []);
  // ?Domain Function start
  const [selectedValues, setSelectedValues] = useState(storedJob?.domains || []);
  const [domainValue, setDomainValue] = useState('');
  const [openOtherMenu, setOpenOtherMenu] = useState(false);
  const [otherDomainValue, setOtherDomainValue] = useState('');
  const selectRefTo = useRef(null);
  const [skillFileds, setSkillFields] = useState([]);
  // starting and ending date states || intership duration
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const totalDays = differenceInDays(new Date(endDate), new Date(startDate));
  const [applyBeforeDate, setApplyBeforeDate] = useState(new Date());
  const years = Math.floor(totalDays / 365);
  const remainigDays = totalDays % 365;
  const months = Math.floor(remainigDays / 30);
  const days = remainigDays % 30;
  const experiences = [1, 2, 3, 4, 5];

  console.log(applyBeforeDate);

  // handle perk
  const changeDeliverablesHandler = (e) => {
    setDeliverables(e.target.value);
  };

  const handlePerk = () => {
    setDeliverablesItems([...deliverablesItems, deliverables]);
    setDeliverables('');
  };

  // handle skill input button
  // const changeHandler = (e) => {
  //   setTag(e.target.value);
  // };
  // const handleTags = () => {
  //   setSkills([...skills, tag]);
  //   setTag('');
  // };

  // Domains
  const [jData, setJData] = useState({});
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/data.json');
      const jsonData = await response.json();
      setJData(jsonData);
    }
    fetchData();
  }, []);

  const [disableOption, setDisable] = useState(false);
  // Cross  Button Domains
  const buttonHandle = () => {
    setDisable(false);
  };
  const handleChange = (e) => {
    const selectedOptions = e.target.value;
    setDomainValue(e.target.value);
    if (selectedOptions === 'Other') {
      setOpenOtherMenu(true);
      setTimeout(() => {
        if (selectRefTo.current) {
          selectRefTo.current.focus();
        }
      }, 0);
      return;
    }
    setSelectedValues([...selectedValues, selectedOptions]);
  };
  const handleClick = () => {
    setDisable(true);
  };
  const handleOtherMenu = (e) => {
    setOtherDomainValue(e.target.value);
  };
  const handleAddOtherDomain = () => {
    if (otherDomainValue) {
      setSelectedValues([...selectedValues, otherDomainValue]);
      setOpenOtherMenu(false);
      setOtherDomainValue('');
    }
  };

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  // data posting to ls
  const onSubmit = async (data) => {
    if (!data?.experience) {
      toast.error('Number of experience year is required.');
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
    if (deliverablesItems.length === 0) {
      toast.error('Deliverables is required.');
      return;
    }
    const jobData = {
      ...data,
      email: user?.user?.email || serviceUser?.email,
      startupsProfilePhoto: user?.user?.profilePhoto || '',
      startupsName: user?.user?.fullName || serviceUser?.fullName,
      categoryName,
      skills: skillFileds,
      domains: selectedValues,
      joiningPerks: deliverablesItems,
      apiPath: jobName,
      jobStatus: 'active',
      startingDate: startDate?.toLocaleDateString(),
      endingDate: endDate?.toLocaleDateString(),
      applyBefore: applyBeforeDate?.toLocaleDateString(),
      // contractsPaper: _.cloneDeep(file),
    };
    setJob(jobName, jobData);
    navigate('/dashboard/post-job/contracts/review');

    // const formData = new FormData();

    // formData.append('obj', JSON.stringify(jobData));
    // const contractsFile = file && file[0];

    // formData.append('contractsPaper', contractsFile);

    // if (isEdit) {
    //   await axios
    //     .put(`${import.meta.env.VITE_APP_URL_STARTUP}/api/job/contracts/${storedJob._id}`, formData)
    //     .then((res) => {
    //       if (res.data._id) {
    //         toast.success('Contracts job data added to review');
    //         setLoading(false);
    //         navigate('/dashboard/post-job/contracts/review', {
    //           state: { data: res.data },
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       setLoading(false);
    //     });
    // } else {
    //   await axios
    //     .post(`${import.meta.env.VITE_APP_URL_STARTUP}/api/job/contracts`, formData)
    //     .then((res) => {
    //       if (res.data._id) {
    //         toast.success('Contracts job data edited successfully');
    //         setLoading(false);
    //         navigate('/dashboard/post-job/contracts/review', {
    //           state: { data: res.data },
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       setLoading(false);
    //     });
    // }

    // navigate('/dashboard/post-job/contracts/review', {
    //   state: { data: jobData },
    // });
    // const jobDataString = JSON.stringify(jobData);

    // Store the jobData in localStorage
    // localStorage.setItem('jobData', jobDataString);
    // const reader = new FileReader();
    // reader.onload = () => {
    //   const fileData = {
    //     name: file[0].name,
    //     type: file[0].type,
    //     size: file[0].size,
    //     dataUrl: reader.result,
    //   };
    //   localStorage.setItem('fileData', JSON.stringify(fileData));
    // };
    // reader.readAsDataURL(file[0]);
  };

  //     const fileDataString = localStorage.getItem('fileData');
  //    if (fileDataString) {
  //     const fileData = JSON.parse(fileDataString);
  //     const { name, type, size, dataUrl } = fileData;
  //     const files = new File([dataUrl], name, { type, lastModified: Date.now() });

  // date picker customization
  const valideYears = Array.from(
    { length: getYear(new Date()) - 1990 + 1 },
    (_, index) => 1990 + index
  );
  const allMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div>
      <div className="flex gap-4 items-center">
        <Link to="/dashboard/post-job">
          <BiChevronLeft className="border p-1 text-4xl rounded border-black" />
        </Link>
        <p className="text-2xl font-semibold">Contract</p>
      </div>
      <p className="border-[#e5e7eb] bg-[#BCBCBC] border mt-2" />
      <p className=" text-[#999999] font-medium xl:font-semibold mt-6 lg:mt-1">
        You can handover your tech and non tech projects to us, we will recruit the team, gather the
        resource, micro-mange the project till its done
      </p>

      {/* Start Form  */}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* contract title */}
        <div className="space-y-1 mt-5 text-sm">
          <label className="block font-semibold text-gray-900">Contract Title</label>
          <input
            name="title"
            {...register('title', {
              required: true,
            })}
            id="title"
            defaultValue={storedJob?.title}
            placeholder="Eg. Remostarts"
            className="lg:w-[520px] w-full px-4 py-3 rounded-md border border-[#E5E5E5]  text-gray-900 "
          />
          <p className="pt-2">
            {errors.title && (
              <span className="text-red-400 ">
                {errors.title?.type === 'required' && 'Please provide your Contract title'}
              </span>
            )}
          </p>
        </div>

        {/* Contract Description starts here 2 */}

        <div className="space-y-1 mt-5 text-sm">
          <label className="block font-semibold text-gray-900">Contract Description</label>
          <textarea
            name="description"
            {...register('description', {
              required: true,
            })}
            defaultValue={storedJob?.description}
            id="description"
            placeholder="Write about Description..."
            className="lg:w-3/4 h-28 w-full px-4 py-3 rounded-md border border-[#E5E5E5]  text-gray-900 "
          />
          <p className="pt-2">
            {errors.description && (
              <span className="text-red-400 ">
                {errors.description?.type === 'required' &&
                  'Please provide your Contract Description'}
              </span>
            )}
          </p>
        </div>

        {/* Section Of Skills Required */}

        <div className="mt-5">
          <label className="block font-semibold text-gray-900">Contract Requirement</label>
          <p className="border-[#BCBCBC] bg-[#BCBCBC] border mt-2" />
        </div>

        <div className="mt-5 lg:flex  items-start justify-between">
          <div className="">
            <label htmlFor="experience">Years</label>
            <select
              {...register('experience', {
                required: true,
              })}
              defaultValue={storedJob?.experience}
              className="select lg:w-[100px]  mt-1 w-full block font-semibold border 
                       border-[#E5E5E5] rounded-md "
            >
              <option hidden>{storedJob?.experience ? storedJob?.experience : 0} </option>
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
            <label className="block font-semibold text-gray-900">
              Experience <span className="text-gray-300"> (Optional)</span>
            </label>
            <p className="p-3 lg:w-[100px] rounded-md shadow-sm">Years</p>
          </div>

          {/* Skill Section  */}

          {/* Skill required input field */}

          <div>
            <div className="space-y-1 text-sm w-[300px]">
              <AddSkillsReusable skillFileds={skillFileds} setSkillFields={setSkillFields} />
              <div>
                {skillFileds.length ? (
                  <div className="flex flex-wrap rounded-md px-2 py-4 gap-3 mt-8 w-[300px] border h-auto bg-[#F0F9FF]">
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

        {/* domains */}
        <div className="lg:flex justify-center ">
          <div className="group w-full inline-block mt-6  lg:pr-10">
            <div>
              <label htmlFor="bio" className="text-sm block font-medium">
                Select Domains
              </label>
              <select
                onChange={handleChange}
                className="select lg:w-[220px]  mt-1 w-full font-semibold border 
                     border-[#e5e7eb] rounded-md "
                value={domainValue}
                required
              >
                <option value="" hidden>
                  Domains
                </option>
                {jData?.domains?.map((D) => (
                  <option
                    onClick={handleClick}
                    disabled={disableOption}
                    value={D}
                    key={Math.random()}
                  >
                    {D}
                  </option>
                ))}
              </select>
            </div>

            <div>
              {openOtherMenu && (
                <>
                  <label htmlFor="industryName" className="text-sm mt-2 font-medium">
                    Write your other domain
                  </label>
                  <div className="flex flex-col items-start gap-2">
                    <input
                      id="industryName"
                      ref={selectRefTo}
                      className=" rounded-md py-2.5 border-[#d6d6d6]  focus:outline-none  mt-2"
                      // onBlur={() => setOpenOtherMenu(false)}
                      type="text"
                      placeholder="Other Domain..."
                      onChange={handleOtherMenu}
                      required
                    />
                    <button
                      onClick={handleAddOtherDomain}
                      className="border py-1.5 bg-[#19A5FF] text-white px-4 rounded-md"
                      type="button"
                    >
                      Add
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          {selectedValues.length ? (
            <div className="flex flex-wrap rounded-md px-2 py-4 gap-3 mt-8 lg:w-[630px] w-full border h-auto bg-[#F0F9FF]">
              {selectedValues.map((value) => (
                <div key={Math.random()}>
                  <div className="bg-[#19A5FF] py-1 px-2 text-white  text-sm text-center rounded-2xl flex gap-2 items-center justify-center  ">
                    <p>{value}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedValues(selectedValues.filter((val) => val !== value));
                        buttonHandle();
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

        {/* Input salary  */}

        <div className="space-y-1 mt-5 text-sm">
          <label className="block font-semibold text-gray-900">Compensation</label>
          <div className="flex justify-between items-center w-full md:w-1/2 pr-2 gap-3  rounded-md border border-[#e5e7eb focus:outline-none] ">
            <input
              type="number"
              name="salary"
              {...register('salary', {
                required: true,
              })}
              defaultValue={storedJob?.salary}
              id="salary"
              placeholder="Compensation Range"
              className="w-full px-4 py-3 text-gray-900 border-transparent rounded-md focus:outline-none "
            />
            <img src={currencyIcon} alt="" />
          </div>
          <p className="pt-2">
            {errors.salary && (
              <span className="text-red-400 ">
                {errors.salary?.type === 'required' && 'Please provide  salary'}
              </span>
            )}
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
        <h5 className="text-md font-medium mt-2">
          Internship Duration:{' '}
          <span className="text-blue-400">
            {years > 0 && years} {years > 0 && 'years'} {months > 0 && months}{' '}
            {months > 0 && 'months'} {days > 0 && days} {days > 0 && 'days'}
          </span>
        </h5>

        {/* date picker apply before  */}
        <div className="space-y-1 mt-5 text-sm">
          <label className="block font-semibold text-gray-900">Apply Before</label>

          {/* <DatePicker
            selected={applyBeforeDate}
            onChange={(date) => setApplyBeforeDate(date)}
            minDate={applyBeforeDate}
          /> */}
          <DatePicker
            className="lg:w-[330px] px-4 py-3 rounded-md border-[#e5e7eb]  text-gray-900 p-[0.65rem] w-full  focus:ring outline-none  border focus:ring-opacity-75 focus:ring-violet-400"
            customInput={<input className="w-full" />}
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="flex justify-between p-2 gap-2">
                <button
                  type="button"
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  className="focus:outline-none text-xl font-semibold"
                >
                  {'<'}
                </button>
                <div className="flex gap-2">
                  <select
                    value={getYear(date)}
                    onChange={({ target: { value } }) => changeYear(value)}
                    className="outline-none rounded-md text-xs scrollbar-thin scrollbar-thumb-blue-600 scrollbar-thumb-rounded-md scrollbar-track-slate-300"
                  >
                    {valideYears.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <select
                    value={allMonths[getMonth(date)]}
                    onChange={({ target: { value } }) => changeMonth(allMonths.indexOf(value))}
                    className="outline-none text-xs rounded-md"
                  >
                    {allMonths.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  className="focus:outline-none text-xl font-semibold"
                >
                  {'>'}
                </button>
              </div>
            )}
            selected={applyBeforeDate || ''}
            onChange={(date) => setApplyBeforeDate(date)}
            placeholderText="Select date"
            minDate={applyBeforeDate}
          />
          {/* <DatePickerCustom selectedDate={applyBeforeDate} setSelectedDate={setApplyBeforeDate} /> */}
        </div>
        {/* Deliverables */}
        <div>
          <div className="space-y-2.5 mt-5 text-sm w-[1/3]">
            <label className="block font-semibold text-gray-900">Deliverables</label>
            <div className="lg:w-[50%] pr-2  rounded-md border  border-[#e5e7eb]  text-gray-900 gap-3  justify-between flex items-center">
              <input
                name="inputSkill"
                value={deliverables}
                onChange={changeDeliverablesHandler}
                placeholder="Sample Input"
                className="px-4 py-3 focus:outline-none rounded-md outline-none w-full focus:bg-transparent"
              />
              <button onClick={handlePerk} type="button">
                <BiPlus className="border p-1 text-xl" />
              </button>
            </div>

            {deliverablesItems?.length ? (
              <div className="flex flex-wrap  px-2 rounded-md py-4 gap-3 mt-10 lg:w-[50%] border h-auto bg-[#F0F9FF]">
                {deliverablesItems.map((value) => (
                  <div key={Math.random()}>
                    <div className="bg-[#19A5FF] py-1 px-2 text-white  text-sm text-center rounded-2xl flex gap-2 items-center justify-center  ">
                      <p>{value}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setDeliverablesItems(deliverablesItems.filter((val) => val !== value));
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
        {/* location */}
        <div>
          <div className="space-y-2.5 mt-5 text-sm w-[1/3]">
            <label className="block font-semibold text-gray-900">Location</label>
            <div className="lg:w-[50%] pr-2  rounded-md border  border-[#e5e7eb]  text-gray-900 gap-3  justify-between flex items-center">
              <input
                type="Text"
                name="location"
                {...register('location', {
                  required: true,
                })}
                defaultValue={storedJob?.location}
                id="location"
                placeholder="Remote"
                className=" w-full pl-4 py-3 rounded-md border border-transparent focus:ring-0 text-gray-900 "
              />
            </div>
            <p className="pt-2">
              {errors.location && (
                <span className="text-red-400 ">
                  {errors.location?.type === 'required' && 'Please provide your Location'}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* upload image or file */}
        <div className="space-y-1 mt-5 text-sm">
          <label className="block font-semibold text-gray-900 mb-2">
            Contract Terms & Condition document
          </label>

          <Dropzone className="" onDrop={(acceptedFiles) => setFile(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section className="container  lg:w-[335px]">
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  <section
                    htmlFor="dropzone-file"
                    className="justify-center cursor-pointer  lg:mt-0 flex lg:w-[335px]  flex-col items-center rounded-xl h-[213px] border-2 border-dashed border-blue-400 bg-white text-center"
                  >
                    {!file?.[0]?.size ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>

                        <h2 className="mt-4 text-xl font-medium tracking-wide">
                          Drop your files here or{' '}
                          <span className="text-blue-600 font-medium">Browse</span>
                        </h2>
                        <span className="text-xs font-medium">Maximum size: 50MB</span>
                      </>
                    ) : (
                      <div>
                        <p className="text-2xl text-blue-500">{file?.[0]?.path}</p>
                        <p>size: {file?.[0]?.size} bytes</p>
                      </div>
                    )}
                  </section>
                </div>
              </section>
            )}
          </Dropzone>
        </div>

        {/* Submit Button  */}

        {isEdit ? (
          <button
            type="submit"
            className="px-6 py-3 mt-10 lg:px-10 lg:py-5 bg-[#0B132A] text-white text-xs font-semibold rounded-md"
          >
            Edit Contract Job
          </button>
        ) : (
          <button
            type="submit"
            className="px-6 py-3 mt-10 lg:px-10 lg:py-5 bg-[#0B132A] text-white text-xs font-semibold rounded-md"
          >
            Review Contract Job
          </button>
        )}
      </form>
    </div>
  );
};

export default Contracts;
