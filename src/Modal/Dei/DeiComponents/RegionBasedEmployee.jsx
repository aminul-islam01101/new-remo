import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BiX } from 'react-icons/bi';
import Select from 'react-select';

const regions = [
  {
    value: 'Asia',
    label: 'Asia',
  },
  {
    value: 'Europe',
    label: 'Europe',
  },
  {
    value: 'Africa',
    label: 'Africa',
  },
  {
    value: 'North America',
    label: 'North America',
  },
  {
    value: 'Middle East',
    label: 'Middle East',
  },
  {
    value: 'South America',
    label: 'South America',
  },
  {
    value: 'Oceania',
    label: 'Oceania',
  },
  {
    value: 'Central Asia',
    label: 'Central Asia',
  },
  {
    value: 'South Asia',
    label: 'South Asia',
  },
  {
    value: 'Caribbean',
    label: 'Caribbean',
  },
  {
    value: 'America',
    label: 'America',
  },
  {
    value: 'Asia-Pacific',
    label: 'Asia-Pacific',
  },
  {
    value: 'Central America',
    label: 'Central America',
  },
  {
    value: 'Latin America',
    label: 'Latin America',
  },
  {
    value: 'Western Europe',
    label: 'Western Europe',
  },
];

const RegionBasedEmployee = ({ setRegionBasedEmployee, regionBasedEmployee }) => {
  const { register, handleSubmit, reset } = useForm({ mode: 'onChange' });
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleRegionCount = ({ employees }) => {
    if (!selectedRegion) {
      toast.error('Region is required');
      return;
    }
    if (!employees) {
      toast.error('Employee count required');
      return;
    }
    // one region could not be selected many times
    const isExist = regionBasedEmployee.find((region) => region.region === selectedRegion);
    if (isExist) {
      toast.error('This region already added');
      return;
    }
    // create new region object
    const newRegion = {
      region: selectedRegion,
      employees: Number(employees),
    };

    // place new region object with the existing regions
    setRegionBasedEmployee([...regionBasedEmployee, newRegion]);
    reset();
  };
  // keep the selected region on state
  const handleSelectChange = (selectedOptions) => {
    setSelectedOption(selectedOptions);
    const selectedValue = selectedOptions?.value;
    setSelectedRegion(selectedValue);
  };

  // region remove handler
  const handleRemoveRegion = (region) => {
    const remainings = regionBasedEmployee.filter((reg) => reg?.region !== region?.region);
    setRegionBasedEmployee(remainings);
  };

  // custom stype for select element imported from "react-select" package
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
    <div className="lg:px-20 lg:py-10">
      <h1 className="lg:text-3xl text-xl font-bold mb-4">Region Based Employee</h1>
      <div className="lg:flex justify-between">
        <form className="mb-4 lg:mb-0" onSubmit={handleSubmit(handleRegionCount)}>
          <div className=" flex justify-between   items-center flex-wrap lg:flex-nowrap mt-2 space-y-2 p-2 lg:p-6">
            <div>
              <label htmlFor="age" className="text-sm font-medium">
                Region
              </label>
              <Select
                options={regions}
                styles={customStyles}
                defaultValue={selectedOption}
                onChange={handleSelectChange}
                placeholder="Enter Region name"
                className="mt-1 w-full lg:w-[280px] "
                classNamePrefix="select2-selection"
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
          </div>
          <div className="mt-5 ml-6">
            <p>Enter Count</p>
            <div className="flex">
              <div className="rounded-md">
                <input
                  className="w-full border-[#e5e7eb] rounded-sm outline-none focus:disabled"
                  type="number"
                  {...register('employees')}
                  placeholder="Enter total employee"
                />
              </div>
              <button
                className="text-[#ff9900] bg-[#FFC46B33] outline-none px-5 py-2 rounded-md ml-2"
                type="submit"
              >
                Add
              </button>
            </div>
          </div>
        </form>
        <div
          className={`lg:p-2 mb-5 lg:mb-0 lg:w-1/2 border-2 border-dashed border-orange-300 rounded-lg h-60 ${
            regionBasedEmployee.length > 4 ? 'overflow-y-auto' : ''
          }`}
        >
          {regionBasedEmployee.length === 0 && (
            <h3 className="lg:text-xl font-bold">No region based employee selected</h3>
          )}
          {regionBasedEmployee.map((region) => (
            <div key={Math.random()} className="flex justify-center items-center my-1">
              <div className="flex w-4/5 items-center justify-center gap-3 bg-[#FFC46B33] m-1 p-2 text-[#ff9900] rounded-md">
                <p>{region.region}</p>
                <p>{region.employees}</p>
              </div>
              <BiX className="text-2xl cursor-pointer" onClick={() => handleRemoveRegion(region)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionBasedEmployee;
