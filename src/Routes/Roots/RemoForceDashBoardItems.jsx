/* eslint-disable no-restricted-syntax */
import React, { useContext, useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { BsLayoutTextWindowReverse } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';

const RemoForceDashBoardItems = ({ children }) => {
  const categoryActive = 'border-[#3b82f6]  text-[#3B82F6]';
  const { user } = useSelector((state) => state.auth);
  const [regions, setRegions] = useState([]);
  const [skillsData, setSkillsData] = useState([]);
  const [sort, setSort] = useState('');
  const [skills, setSkills] = useState([]);
  const [jobStatus, setJobStatus] = useState('');
  const [jobRegion, setJobRegion] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const { handlePagination } = useContext(AuthContext);

  const handleAddSkill = (e) => {
    const skill = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setSkills((prevSkills) => [...prevSkills, skill]);
    } else {
      setSkills((prevSkills) => prevSkills.filter((value) => value !== skill));
    }
  };

  const handleAddRegion = (event) => {
    const region = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setJobRegion((prevRegions) => [...prevRegions, region]);
    } else {
      setJobRegion((prevRegions) => prevRegions.filter((value) => value !== region));
    }
  };

  const queryData = {
    filters: {
      sortBy: sort,
      skills,
      jobStatus,
      jobRegion,
    },
    searchTerms: searchValue,
  };

  useEffect(() => {
    const url = `${import.meta.env.VITE_APP_URL_STARTUP}/api/job/all-jobs/${
      user?.user.email
    }?sortOrder=${sort}&skills=${skills}&jobStatus=${jobStatus}&location=${jobRegion}&searchTerm=${searchValue}&pageNumber=${pageNumber}&pageLimit=${pageLimit}`;
    handlePagination(url);
  }, [sort, skills, jobStatus, jobRegion, searchValue, pageNumber, pageLimit, user?.user.email]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setRegions(data.countries))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setSkillsData(data.skills))
      .catch((err) => console.log(err));
  }, []);

  // clear all the checked input by clicking clear button
  const handleClearInput = (field) => {
    const sortElms = document.getElementsByClassName('sortEls');
    if (field === 'sort') {
      for (const el of sortElms) {
        if (el?.checked) {
          el.checked = false;
          setSort('');
        }
      }
    }
    if (field === 'skills') {
      const skillElms = document.getElementsByClassName('skillElms');
      for (const el of skillElms) {
        if (el?.checked) {
          el.checked = false;
          setSkills([]);
        }
      }
    }
    if (field === 'job') {
      const jobElms = document.getElementsByClassName('job');
      for (const el of jobElms) {
        console.log(el?.checked);
        if (el?.checked) {
          el.checked = false;
          setJobStatus('');
        }
      }
    }
    if (field === 'region') {
      const regionElms = document.getElementsByClassName('region');
      for (const el of regionElms) {
        console.log(el?.checked);
        if (el?.checked) {
          el.checked = false;
          setJobRegion([]);
        }
      }
    }
  };

  return (
    <section className="flex flex-col w-full">
      <div className=" border-b w-[95%] border-[#BCBCBC]">
        <h1 className="text-4xl flex items-center gap-3 font-semibold">
          <span>
            <BsLayoutTextWindowReverse className="text-2xl mt-1" />
          </span>
          Jobs
        </h1>
      </div>
      <div className="flex lg:grid lg:grid-cols-3 justify-start items-start lg:justify-between   flex-col-reverse lg:flex-row">
        <nav className="flex lg:col-span-2  list-none mt-2 lg:mt-5 items-start space-y-2  pb-2 mb-6 w-[fit-content] flex-wrap">
          <li className="mt-2 font-semibold text-xs sm:text-sm">
            <NavLink
              className={({ isActive }) =>
                `border-b-[3px] flex items-center gap-2 px-3 pb-1 font-medium  ${
                  isActive && categoryActive
                }`
              }
              to="/remoforce-dashboard/all-jobs"
            >
              All
            </NavLink>
          </li>
          <li className="font-semibold text-xs sm:text-sm">
            <NavLink
              className={({ isActive }) =>
                `border-b-[3px] flex items-center gap-2 px-3 pb-1 font-medium  ${
                  isActive && categoryActive
                }`
              }
              to="/remoforce-dashboard/shadowing-jobs"
            >
              Shadowing
            </NavLink>
          </li>
          <li className="font-semibold text-xs sm:text-sm">
            <NavLink
              className={({ isActive }) =>
                `border-b-[3px] flex items-center gap-2 px-3 pb-1 font-medium  ${
                  isActive && categoryActive
                }`
              }
              to="/remoforce-dashboard/public-jobs"
            >
              Public Jobs
            </NavLink>
          </li>
          <li className="font-semibold text-xs sm:text-sm">
            <NavLink
              className={({ isActive }) =>
                `border-b-[3px] flex items-center gap-2 px-3 pb-1 font-medium  ${
                  isActive && categoryActive
                }`
              }
              to="/remoforce-dashboard/private-jobs"
            >
              Private Jobs
            </NavLink>
          </li>
          <li className="font-semibold text-xs sm:text-sm">
            <NavLink
              className={({ isActive }) =>
                `border-b-[3px] flex items-center gap-2 px-3 pb-1 font-medium  ${
                  isActive && categoryActive
                }`
              }
              to="/remoforce-dashboard/internship"
            >
              Internship
            </NavLink>
          </li>
          <li className="font-semibold text-xs sm:text-sm">
            <NavLink
              className={({ isActive }) =>
                `border-b-[3px] flex items-center gap-2 px-3 pb-1 font-medium  ${
                  isActive && categoryActive
                }`
              }
              to="/remoforce-dashboard/gigs"
            >
              Gigs
            </NavLink>
          </li>
          <li className="font-semibold text-xs sm:text-sm">
            <NavLink
              className={({ isActive }) =>
                `border-b-[3px] flex items-center gap-2 px-3 pb-1 font-medium  ${
                  isActive && categoryActive
                }`
              }
              to="/remoforce-dashboard/contracts"
            >
              Contracts
            </NavLink>
          </li>
        </nav>
        <div className="lg:col-span-1 w-full  max-lg:mt-2 lg:mt-5  relative text-gray-600">
          <input
            className="border-2 border-gray-300 bg-white w-full h-10 pr-16 rounded-md text-sm focus:outline-none px-4"
            type="text"
            name="search"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search jobs, skills, location..."
          />
          <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
            <BiSearchAlt />
          </button>
        </div>
      </div>

      <div className="flex gap-2 w-full">
        <div className="w-10/12">{children}</div>

        {/* right side bar for filtering data  */}
        {/* data sorting  */}
        <div className="w-2/12 mt-1">
          <div className="p-3 2xl:p-2.5 border shadow-lg shadow-[#78a5c554] bg-white border-[#a5dbff9d] rounded-md ">
            <div className="flex justify-between mb-2">
              <h2 className=" text-xs font-bold">Sort by</h2>
              <h2 className="font-semibold text-xs">
                <button
                  className="rounded-md"
                  onClick={() => handleClearInput('sort')}
                  type="button"
                >
                  Clear
                </button>
              </h2>
            </div>
            <div>
              <form onChange={(e) => setSort(e.target.value)}>
                <p className="w-full flex gap-2 items-center rounded-md border p-1">
                  <input
                    className="sortEls focus:ring-0 cursor-pointer"
                    type="radio"
                    name="sort"
                    id="latest"
                    value="-1"
                  />
                  <span className="font-semibold text-xs">Latest</span>
                </p>
                <p className="w-full mt-2 flex gap-2 items-center border rounded-md p-1">
                  <input
                    className="sortEls focus:ring-0 cursor-pointer"
                    type="radio"
                    name="sort"
                    id="Oldest"
                    value="1"
                  />
                  <span className="font-semibold text-xs">Oldest</span>
                </p>
              </form>
            </div>
          </div>
          <hr className="mt-5 w-10/12 h-10 mx-auto" />
          {/* filtering  */}
          <div className="p-3 text-xs -mt-6 font-semibold border shadow-lg shadow-[#78a5c554] bg-white border-[#a5dbff9d] rounded-md ">
            <p>Filter</p>
          </div>
          {/* filtering by skills  */}
          <div className="p-3 mt-5 2xl:p-2.5 border shadow-lg shadow-[#78a5c554] bg-white border-[#a5dbff9d] rounded-md ">
            <div className="flex justify-between mb-2 text-xs">
              <h2 className="font-bold text-xs">Skills</h2>
              <h2 className="font-semibold text-xs">
                <button onClick={() => handleClearInput('skills')} type="button">
                  Clear
                </button>
              </h2>
            </div>
            <div className="font-semibold scrollbar scrollbar-w-[4px] scrollbar-thumb-blue-600 scrollbar-thumb-rounded-md scrollbar-track-slate-100 h-60 overflow-hidden hover:overflow-auto pr-1">
              {skillsData.map((skill) => (
                <p className="w-full flex gap-2 my-1 items-center border rounded-md p-1">
                  <input
                    className="skillElms focus:ring-0 cursor-pointer p-0 break-words"
                    onChange={handleAddSkill}
                    type="checkbox"
                    name={skill}
                    value={skill}
                  />
                  <span className="text-xs ">{skill}</span>
                </p>
              ))}
            </div>
          </div>
          {/* filter by job status: active/inactive  */}
          <div className="p-3 mt-5 2xl:p-2.5 border shadow-lg shadow-[#78a5c554] bg-white border-[#a5dbff9d] rounded-md ">
            <div className="flex justify-between mb-2">
              <h2 className="text-xs font-bold">Job Status</h2>
              <h2 className="text-xs font-semibold">
                <button onClick={() => handleClearInput('job')} type="button">
                  Clear
                </button>
              </h2>
            </div>
            <div>
              <form onChange={(e) => setJobStatus(e.target.value)}>
                <p className="w-full flex gap-2 items-center border p-1">
                  <input
                    className="job focus:ring-0 cursor-pointer"
                    name="job"
                    type="radio"
                    value="active"
                  />
                  <span className="text-xs">Active</span>
                </p>
                <p className="w-full mt-2 flex gap-2 items-center border rounded-md p-1">
                  <input
                    className="job focus:ring-0 cursor-pointer"
                    name="job"
                    type="radio"
                    value="inactive"
                  />
                  <span className="text-xs">Inactive</span>
                </p>
              </form>
            </div>
          </div>
          {/* filtering by region  */}
          <div className="p-3 mt-5 2xl:p-2.5 border shadow-lg shadow-[#78a5c554] bg-white border-[#a5dbff9d] rounded-md ">
            <div className="flex justify-between mb-2">
              <h2 className="text-xs font-bold">Region</h2>
              <h2 className="text-xs font-semibold">
                <button onClick={() => handleClearInput('region')} type="button">
                  Clear
                </button>
              </h2>
            </div>
            <div className="font-semibold scrollbar scrollbar-w-[4px] scrollbar-thumb-blue-600 scrollbar-thumb-rounded-md scrollbar-track-slate-100 h-60 overflow-hidden hover:overflow-auto pr-1">
              {regions.map((region) => (
                <p className="w-full  my-1 rounded-md flex gap-2 items-center border p-1">
                  <input
                    onChange={handleAddRegion}
                    className="region focus:ring-0 cursor-pointer"
                    name="region"
                    type="checkbox"
                    value={region?.value}
                  />
                  <span className='text-xs break-words'>{region?.value}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RemoForceDashBoardItems;
