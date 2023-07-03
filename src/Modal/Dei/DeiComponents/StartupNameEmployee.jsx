import React from 'react';
import { useForm } from 'react-hook-form';

const StartupNameEmployee = ({
  setStartupName,
  setNumberOfEmployee,
  startupName,
  numberOfEmployee,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const handleDEIDetails = ({ startupName: name, numberOfEmployee: employee }) => {
    setStartupName(name);
    setNumberOfEmployee(Number(employee));
  };

  return (
    <form className="lg:px-20 lg:py-20" onChange={handleSubmit(handleDEIDetails)}>
      <div>
        <div>
          <h1 className="font-bold lg:text-3xl md:text-xl">Startup Name</h1>
        </div>
        <div className="border-dashed border-[#0EA5E9] border-[2px] rounded-md my-2 lg:w-4/5">
          <input
            {...register('startupName')}
            type="text"
            defaultValue={startupName}
            className="w-full rounded-md border-transparent focus:ring-0  p-3   bg-transparent "
            placeholder="Please enter your startup name."
          />
        </div>
        {errors?.startupName?.message && (
          <p className="text-sm w-full md:w-3/12 lg:w-[10%] lg:text-center bg-red-600 text-white px-1 py-0.5 rounded-md">
            {errors?.startupName?.message}
          </p>
        )}
      </div>
      {/* description */}
      <div className="mt-5">
        <h1 className="font-bold lg:text-3xl md:text-xl">Number of Employee</h1>
      </div>
      <div className="border-dashed border-[#0EA5E9] border-[2px] rounded-md my-2 lg:w-4/5">
        <input
          {...register('numberOfEmployee')}
          defaultValue={numberOfEmployee}
          type="number"
          className="w-full  rounded-md border-transparent focus:ring-0  p-3   bg-transparent "
          placeholder="Please enter the number of employee."
        />
      </div>
      {errors?.numberOfEmployee?.message && (
        <p className="text-sm w-full md:w-3/12 lg:w-[12%] lg:text-center bg-red-600 text-white px-1 py-0.5 rounded-md">
          {errors?.numberOfEmployee?.message}
        </p>
      )}
    </form>
  );
};

export default StartupNameEmployee;
