import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { RxCross2 } from 'react-icons/rx';
import Select from 'react-select';

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
    outline: 'none !important',
    border: '1px solid #e5e7eb !important',
    ':hover': {
      outline: 'none !important',
      border: 'none',
    },
  }),
};
const TalentProcessLocation = ({ locationPreference, setLocationPreference }) => {
  const [jData, setJData] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (selectedOptions) => {
    const remote = locationPreference?.find((country) => country === 'Remote');
    if (remote === 'Remote') {
      toast.error('You cannot select country with Remote');
      return;
    }
    if (!remote && locationPreference.length >= 1) {
      if (selectedOptions.value === 'Remote') {
        toast.error('You cannot select Remote with countries');
        return;
      }
    }
    setSelectedOption(selectedOptions);
    const selectedCountry = selectedOptions?.value;
    const arr = locationPreference?.filter((ar) => selectedCountry === ar);
    if (arr?.length) {
      toast.error(`Already added ${selectedCountry} !!`);
    } else if (!arr.length) {
      setLocationPreference([...locationPreference, selectedCountry]);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/data.json');
      const jsonData = await response.json();
      setJData(jsonData?.talentCountries);
    }
    fetchData();
  }, []);

  return (
    <div className="lg:ml-20">
      <div>
        <h1 className="font-bold text-3xl">Location</h1>
        <p
          className="mt-5 cl
                    text-lg"
        >
          Please Select the locations from where you want to have your talents !
        </p>
      </div>
      {/* select option */}
      <div className="mt-10">
        <div>
          <div className="flex max-md:flex-col gap-3  lg:gap-10  justify-center ">
            <div className="group border-2  rounded-md px-3 py-2 inline-block border-dashed max-md:w-full border-[#0ea5e9] ">
              <div className=" mt-2">
                <Select
                  options={jData}
                  styles={customStyles}
                  value={selectedOption}
                  onChange={handleSelectChange}
                  placeholder="Choose"
                  className=" w-full lg:w-[250px] "
                  classNamePrefix="select2-selection"
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                />
              </div>
            </div>
            {locationPreference?.length ? (
              <div className="flex flex-wrap border-dashed  rounded-md border-[#0ea5e9] px-2 py-4 gap-3 lg:w-[630px] w-full border-2 h-auto bg-[#F0F9FF]">
                {locationPreference?.map((value) => (
                  <div key={Math.random()}>
                    <div className="bg-[#19A5FF] py-1 px-2 text-white  text-sm text-center rounded-2xl flex gap-2 items-center justify-center  ">
                      <p>{value}</p>
                      <button
                        type="button"
                        onClick={() =>
                          setLocationPreference(locationPreference?.filter((val) => val !== value))
                        }
                      >
                        <RxCross2 className="font-bold text-sm" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center px-2 py-4 gap-3  lg:w-[630px] w-full border-2 border-[#0ea5e9] border-dashed  h-auto bg-[#F0F9FF]">
                <div className="font-semibold ">No Language added yet...</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentProcessLocation;
