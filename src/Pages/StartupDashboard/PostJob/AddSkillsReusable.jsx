import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import customStyles from '../../../Utilities/customStyles';

const AddSkillsReusable = ({ skillFileds, setSkillFields }) => {
  const [openOtherMenu, setOpenOtherMenu] = useState(false);
  const selectRefTo = useRef(null);
  const [skill, setSkill] = useState('');
  const [technologies, setTechnologies] = useState([]);

  const handleSkills = () => {
    if (skill === 'Other') {
      setOpenOtherMenu(true);
      setTimeout(() => {
        if (selectRefTo.current) {
          selectRefTo.current.focus();
        }
      }, 0);
    } else {
      setSkillFields([...skillFileds, skill]);
      setOpenOtherMenu(false);
    }
  };

  const [newOtherSkill, setNewOtherSkill] = useState('');
  const handleAddOtherSkill = () => {
    setSkillFields([...skillFileds, newOtherSkill]);
    setNewOtherSkill('');
    setOpenOtherMenu(false);
  };

  // fetch technologies
  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => {
        setTechnologies(data?.technologies);
      });
  }, []);

  const handleAddSkill = ({ value }) => {
    setSkill(value);
  };

  // handle others techs select
  useEffect(() => {
    if (skill === 'Others') {
      setOpenOtherMenu(true);
    }
  }, [skill]);
  return (
    <div className="space-y-1 text-sm w-full  lg:w-[300px]">
      <div>
        <label className="block font-semibold text-gray-900">Skills Required</label>
        <div className="flex w-full my-2">
          <Select
            options={technologies}
            styles={customStyles}
            onChange={handleAddSkill}
            placeholder="Select your skills"
            className="w-full"
            classNamePrefix="select2-selection"
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
          />
          <button
            onClick={handleSkills}
            className="bg-blue-500 py-2 px-4 ml-2 rounded-md text-white"
            type="button"
          >
            Add
          </button>
        </div>
      </div>

      {/* others domain form  */}
      {openOtherMenu && (
        <div className="w-full">
          <p className="text-base font-medium">Write others skills</p>
          <input
            id="industryName"
            ref={selectRefTo}
            className=" rounded-md w-[78%]  py-2 border-[#d6d6d6]  focus:outline-none   mt-2"
            type="text"
            value={newOtherSkill}
            placeholder="Other skills"
            onChange={(e) => setNewOtherSkill(e.target.value)}
            required
          />
          <button
            onClick={handleAddOtherSkill}
            className="bg-blue-500 outline-none py-2 px-4 ml-2 rounded-md text-white"
            type="button"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default AddSkillsReusable;
