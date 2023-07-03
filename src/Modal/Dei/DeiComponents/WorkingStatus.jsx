import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BiX } from 'react-icons/bi';
import Select from 'react-select';

const statuses = [
  {
    value: 'Remote',
    label: 'Remote',
  },
  {
    value: 'Office',
    label: 'Office',
  },
  {
    value: 'Hybrid',
    label: 'Hybrid',
  },
];

const WorkingStatus = ({ workingStatus, setWorkingStatus }) => {
  const { register, handleSubmit, reset } = useForm({ mode: 'onChange' });
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleWorkingStatus = ({ employees }) => {
    if (!selectedStatus) {
      toast.error('Status is required');
      return;
    }
    if (!employees ) {
      toast.error(' Employee count is required');
      return;
    }

    const isExist = workingStatus.find((region) => region.workingStatus === selectedStatus);
    if (isExist) {
      toast.error('This working status already added');
      return;
    }

    const newStatus = {
      workingStatus: selectedStatus,
      employees: Number(employees),
    };
    setWorkingStatus([...workingStatus, newStatus]);
    reset();
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedOption(selectedOptions);
    const selectedValue = selectedOptions?.value;
    setSelectedStatus(selectedValue);
  };

  const handleRemoveStatus = (region) => {
    const remainings = workingStatus.filter((reg) => reg?.workingStatus !== region?.workingStatus);
    setWorkingStatus(remainings);
  };

  const customStyles = {
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#d6edf7' : 'white',
      color: state.isSelected ? 'white' : 'black',
      outline: 'none !important',
      boxShadow: 'rgba(192, 37, 37, 0.24) 0px 3px 8px;',
      ':hover': {
        backgroundColor: 'lightblue',
        borderColor: '#cccccc',
      },
    }),
    control: (base) => ({
      ...base,
      border: '1px solid #e5e7eb !important',
      ':hover': {
        outline: 'none !important',
        border: 'none',
      },
    }),
  };

  return (
    <div className="lg:px-20 lg:py-16">
      <h1 className="lg:text-3xl text-xl font-bold text-[#ff9900]">Working Status</h1>
      <div className="lg:flex justify-between">
        <form className="mb-5 lg:mb-0" onSubmit={handleSubmit(handleWorkingStatus)}>
          <div className="flex justify-between  items-center flex-wrap lg:flex-nowrap mt-2 space-y-2 p-2 lg:p-6">
            <div>
              <label htmlFor="status" className="text-sm font-medium">
                Select status
              </label>
              <Select
                options={statuses}
                styles={customStyles}
                defaultValue={selectedOption}
                onChange={handleSelectChange}
                className="mt-1 w-full lg:w-[280px]"
                placeholder="Choose status"
                classNamePrefix="select2-selection"
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
          </div>
          <div className="mt-5 ml-6">
            <p className="text-sm font-medium">Enter Count</p>
            <div className="flex">
              <div>
                <input
                  className="w-full border-[#e5e7eb] rounded-sm outline-none focus:disabled"
                  type="number"
                  {...register('employees')}
                  placeholder="Enter total employee"
                />
              </div>
              <button
                className="text-[#ff9900] bg-[#FFC46B33] outline-none  px-5 py-2 rounded-md ml-2"
                type="submit"
              >
                Add
              </button>
            </div>
          </div>
        </form>
        <div className="lg:p-5 mb-3 lg:w-1/2 border-2 border-dashed border-orange-300 rounded-md">
          {workingStatus.map((region) => (
            <div key={Math.random()} className="flex justify-center items-center">
              <div className="flex w-4/5 items-center justify-center gap-3 bg-[#FFC46B33] m-1 p-2">
                <p>{region.workingStatus}</p>
                <p>{region.employees}</p>
              </div>
              <BiX className="text-2xl cursor-pointer" onClick={() => handleRemoveStatus(region)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkingStatus;
