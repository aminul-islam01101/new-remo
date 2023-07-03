import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';

const AddProjectForm = ({ setProjectsLists, setBool, projectsLists }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const today = new Date();
  // Initialize use form hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  // typeLists
  const typeLists = [
    { name: 'JAVA' },
    { name: 'Python' },
    { name: 'Web Development' },
    { name: 'Android' },
  ];
  const handleAddProject = (data) => {
    if (data) {
      const newData = {
        ...data,
        id: Math.random(),
        startingDate: startDate?.toLocaleDateString(),
        endingDate: endDate?.toLocaleDateString(),
      };
      setProjectsLists([...projectsLists, newData]);
      reset();
      setBool(false);
    }
  };

  return (
    <form className="space-y-3 w-full" onSubmit={handleSubmit(handleAddProject)}>
      <p className="w-full text-[#999999] text-sm font-sans">Add your projects</p>
      {/* Add Project Beginnings */}
      <div className=" w-[70%] space-y-8 pt-4">
        {/* Project  Name Beginnings */}
        <div className="w-[75%] space-y-1">
          <label htmlFor="projectName" className="text-sm font-medium">
            Project Name
          </label>
          <input
            id="projectName"
            {...register('projectName', {
              required: 'Project Name is Required',
            })}
            type="text"
            placeholder="Your Project Name"
            className="w-full border p-3 border-gray-200 rounded-md focus:ring focus:ring-opacity-75 focus:ring-[#3b82f6] "
          />
          <p className="pt-1">
            <span className="text-red-400 ">
              {errors.projectName && <span>{errors?.projectName?.message}</span>}
            </span>
          </p>
        </div>
        {/* Project Link */}
        <div className="w-[75%]   space-y-1">
          <label htmlFor="projectLink" className="text-sm font-medium">
            Project Link
          </label>
          <input
            id="projectLink"
            {...register('projectLink', {
              required: 'Project Link is Required',
              // pattern: {
              //     value: /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/,
              //     message: 'Url is not valid',
              // },
            })}
            type="text"
            placeholder="https://"
            className="w-full border p-3 border-gray-200 rounded-md focus:ring focus:ring-opacity-75 focus:ring-[#3b82f6] "
          />
          <p className="pt-1">
            <span className="text-red-400 ">
              {errors.projectLink && <span>{errors?.projectLink?.message}</span>}
            </span>
          </p>
        </div>
        {/* Project Description */}
        <div className="w-[75%]   space-y-1">
          <label htmlFor="projectDescription" className="text-sm font-medium">
            Project Description
          </label>
          <textarea
            id="projectDescription"
            {...register('projectDescription', {
              required: 'Project Description is Required',
              minLength: {
                value: 3,
                message: 'Min 3 characters Required',
              },
            })}
            type="text"
            placeholder="Your Project Description"
            className="w-full textarea border p-3 border-gray-200 rounded-md focus:ring focus:ring-opacity-75 focus:ring-[#3b82f6] "
          />
          <p className="pt-1">
            <span className="text-red-400 ">
              {errors.projectDescription && <span>{errors?.projectDescription?.message}</span>}
            </span>
          </p>
        </div>

        {/* Project Type */}
        <div className="w-[45%]   space-y-1">
          <label htmlFor="projectType" className="text-sm font-medium">
            Type
          </label>
          <select
            name="projectType"
            id="projectType"
            className="select w-full mt-3 border border-[#e5e7eb]"
            {...register('projectType', { required: 'Project Type is Required' })}
          >
            <option value="" hidden>
              Choose
            </option>
            {typeLists.map((item) => (
              <option value={item.name} key={Math.random()} className="text-[18px]">
                {item.name}
              </option>
            ))}
          </select>
          <p className="pt-1">
            <span className="text-red-400 ">{errors.type && <span>Type is Needed!</span>}</span>
          </p>
        </div>

        {/* Dates Beginnings */}
        <div className={` w-[90%] flex justify-between items-center lg:gap-10`}>
          {/* Start Date Beginnings */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="birthDate" className="text-sm font-medium">
              Starting Date
            </label>
            <DatePicker
              selectsEnd
              selected={startDate}
              className="lg:w-[330px] px-4 py-3 rounded-md border-[#e5e7eb]  text-gray-900 p-[0.65rem] w-full focus:ring  border focus:ring-opacity-75 focus:ring-violet-400  dark:text-gray-90"
              onChange={(date) => setStartDate(date)}
              maxDate={today}
            />
            <p className="pt-1">
              <span className="text-red-400 ">
                {errors.startingDate && <span>Starting Date is Needed!</span>}
              </span>
            </p>
          </div>
          {/* End Date Beginnings */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="birthDate" className="text-sm font-medium">
              Ending Date
            </label>
            <DatePicker
              selectsEnd
              selected={endDate}
              className="lg:w-[330px] px-4 py-3 rounded-md border-[#e5e7eb]  text-gray-900 p-[0.65rem] w-full focus:ring  border focus:ring-opacity-75 focus:ring-violet-400  dark:text-gray-90"
              onChange={(date) => setEndDate(date)}
              minDate={startDate}
              maxDate={today}
            />
            <p className="pt-1">
              <span className="text-red-400 ">
                {errors.endingDate && <span>Ending Date is Needed!</span>}
              </span>
            </p>
          </div>
        </div>
      </div>
      <button
        className="my-4 bg-[#A5DBFF] py-3 px-6 font-sans text-center ml-[1rem] border-[2px] border-[#4DB9FF] rounded-md text-black"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
};

export default AddProjectForm;
