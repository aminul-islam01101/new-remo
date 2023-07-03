import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { BsEmojiWink } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';
import { HiLanguage } from 'react-icons/hi2';
import { IoLocationOutline } from 'react-icons/io5';
import { RiUser6Line } from 'react-icons/ri';
import { TbEditCircle } from 'react-icons/tb';
import LGBTQP from '../../../Assets/DEI/LGBTQ.svg';
import Female from '../../../Assets/DEI/female-avatar.svg';
import Male from '../../../Assets/DEI/male-avatar.svg';
import tabBlue from '../../../Assets/Dashboard/talentRequest/tabBlue.svg';
import tabGreen from '../../../Assets/Dashboard/talentRequest/tabGreen.svg';

import DeiPolicy from './DeiPolicy';
import GetDEIFinalReport from './GetDEIFinalReport';

import RegionBasedEmployee from './RegionBasedEmployee';
import StartupNameEmployee from './StartupNameEmployee';
import WorkingStatus from './WorkingStatus';

const DeiProcess = ({ closeModal }) => {
  const [tabActive, setTabActive] = useState(1);
  const [startupName, setStartupName] = useState('');
  const [numberOfEmployee, setNumberOfEmployee] = useState(0);
  const [genderCount, setGenderCount] = useState({ male: 0, female: 0, LGBTQ: 0 });
  const [regionBasedEmployee, setRegionBasedEmployee] = useState([]);
  const [workingStatus, setWorkingStatus] = useState([]);
  const [agreePolicy, setAgreePolicy] = useState({ status: false, button: 0 });
  const [getReport, setGetReport] = useState(false);
  const [score, setScore] = useState(0);

  const DEIData = {
    startupName,
    numberOfEmployee,
    genderCount,
    regionBasedEmployee,
    workingStatus,
    isAgreeWithPolicy: agreePolicy.status,
  };

  // total number of employee from genders
  const totalEmployeeGender = genderCount.male + genderCount.female + genderCount.LGBTQ;
  // total region based employee
  const regionBasedEmployees = regionBasedEmployee.reduce(
    (total, region) => total + region.employees,
    0
  );

  // total status based employee
  const statusBasedEmployees = workingStatus.reduce((total, status) => total + status.employees, 0);

  const handleTabActive = () => {
    if (tabActive === 1) {
      if (!startupName || !numberOfEmployee) {
        toast.error('Startup name and number of employee is required');
        return;
      }
      setTabActive(2);
    }
    if (tabActive === 2) {
      if (genderCount.male === 0 && genderCount.female === 0) {
        toast.error('Gender count is required');
        return;
      }
      if (numberOfEmployee !== totalEmployeeGender) {
        toast.error(`Total employees should  be equal to NumberOfEmployee: ${numberOfEmployee}`);
        return;
      }

      setTabActive(3);
    }

    if (tabActive === 3) {
      if (!regionBasedEmployee.length) {
        toast.error('Region based employee is required');
        return;
      }

      if (numberOfEmployee !== regionBasedEmployees) {
        toast.error(`Total employees should  be equal to Number Of Employee: ${numberOfEmployee}`);
        return;
      }

      setTabActive(4);
    }

    if (tabActive === 4) {
      if (!workingStatus?.length) {
        toast.error('Working status is required');
        return;
      }
      if (numberOfEmployee !== statusBasedEmployees) {
        toast.error(`Total employees should  be equal to Number Of Employee: ${numberOfEmployee}`);
      } else {
        setTabActive(5);
      }
    }
  };

  const handleGenerateReport = () => {
    console.log(DEIData);
    let result = 0;

    result += genderCount.LGBTQ > 0 ? 10 : 0;
    if (genderCount.male > genderCount.female) {
      result += 15;
    } else if (genderCount.male < genderCount.female) {
      result += 17;
    } else {
      result += 20;
    }
    result += Math.min(regionBasedEmployee.length, 6) * 5;

    workingStatus.forEach((employee) => {
      result +=
        employee.workingStatus === 'Remote' || employee.workingStatus === 'Hybrid' ? 12.5 : 5;
    });

    result += agreePolicy.status ? 10 : 0;
    setScore(result);
    if (tabActive === 5) {
      setTabActive(6);
    }
  };

  return (
    <div className="h-[100%] relative flex flex-col justify-end lg:p-10">
      <div className="flex items-center  gap-1 lg:gap-3">
        <div>
          <img src={tabGreen} alt="" />
        </div>
        <div>
          <button
            type="button"
            className="p-2 lg:p-3 rounded-full bg-[#ff9900] border-4 border-white shadow-xl shadow-[#5e59e64b]"
          >
            <TbEditCircle className="text-white text-2xl lg:text-3xl" />
          </button>
        </div>

        {/* tab two */}

        <div>{tabActive >= 2 ? <img src={tabGreen} alt="" /> : <img src={tabBlue} alt="" />}</div>
        <div>
          <button
            type="button"
            className={`p-2 lg:p-3 rounded-full border-4 border-white duration-300 ease-in shadow-xl shadow-[#5e59e64b] ${
              tabActive >= 2 ? 'bg-[#ff9900]' : 'bg-white'
            }`}
          >
            <FaUsers
              className={`${
                tabActive >= 2 ? 'text-white' : 'text-black'
              } duration-300 ease-in text-2xl lg:text-3xl`}
            />
          </button>
        </div>
        <div>{tabActive >= 3 ? <img src={tabGreen} alt="" /> : <img src={tabBlue} alt="" />}</div>
        <div>
          <button
            type="button"
            className={`p-2 lg:p-3 rounded-full duration-300 ease-in border-4 border-white shadow-xl shadow-[#5e59e64b] ${
              tabActive >= 3 ? 'bg-[#ff9900]' : 'bg-white'
            }`}
          >
            <IoLocationOutline
              className={`${
                tabActive >= 3 ? 'text-white' : 'to-black'
              } duration-300 ease-in text-2xl lg:text-3xl`}
            />
          </button>
        </div>
        <div>{tabActive >= 4 ? <img src={tabGreen} alt="" /> : <img src={tabBlue} alt="" />}</div>
        <div>
          <button
            type="button"
            className={`p-2 lg:p-3 rounded-full duration-300 ease-in border-4 border-white shadow-xl shadow-[#5e59e64b] ${
              tabActive >= 4 ? 'bg-[#ff9900]' : 'bg-white'
            }`}
          >
            <HiLanguage
              className={`${
                tabActive >= 4 ? 'text-white' : 'to-black'
              } duration-300 ease-in text-2xl lg:text-3xl`}
            />
          </button>
        </div>
        <div>{tabActive >= 5 ? <img src={tabGreen} alt="" /> : <img src={tabBlue} alt="" />}</div>

        <div>
          <button
            type="button"
            className={`p-2 lg:p-3 rounded-full duration-300 ease-in border-4 border-white shadow-xl shadow-[#5e59e64b] ${
              tabActive >= 5 ? 'bg-[#ff9900]' : 'bg-white'
            }`}
          >
            <BsEmojiWink
              className={`${
                tabActive >= 5 ? 'text-white' : 'to-black'
              } duration-300 ease-in text-2xl lg:text-3xl`}
            />
          </button>
        </div>
        <div>{tabActive >= 6 ? <img src={tabGreen} alt="" /> : <img src={tabBlue} alt="" />}</div>

        <div>
          <button
            type="button"
            className={`p-2 lg:p-3 rounded-full duration-300 ease-in border-4 border-white shadow-xl shadow-[#5e59e64b] ${
              tabActive >= 6 ? 'bg-[#ff9900]' : 'bg-white'
            }`}
          >
            <RiUser6Line
              className={`${
                tabActive >= 6 ? 'text-white' : 'to-black'
              } duration-300 ease-in text-2xl lg:text-3xl`}
            />
          </button>
        </div>
      </div>
      <div>
        {/* dynamic modal content */}
        {tabActive === 1 && (
          <StartupNameEmployee
            startupName={startupName}
            numberOfEmployee={numberOfEmployee}
            setStartupName={setStartupName}
            setNumberOfEmployee={setNumberOfEmployee}
          />
        )}

        {tabActive === 2 && (
          <div className="lg:px-20 py-10">
            <h1 className="lg:text-2xl text-xl font-bold text-[#ff9900] mb-4">
              Specify Gender Count
            </h1>
            <div className="lg:flex justify-between items-center">
              <div className="bg-[#FFEDD2] border-2 border-orange-200 rounded-md lg:w-1/3 m-4 h-56 p-10 text-center">
                <img className="h-20 w-1/2 mx-auto" src={Male} alt="" />
                <p className="mt-4 font-semibold">Male</p>
                <input
                  type="number"
                  defaultValue={genderCount?.male}
                  className="w-full border-2 border-orange-200 py-2  text-center rounded-lg"
                  onChange={(e) => setGenderCount({ ...genderCount, male: Number(e.target.value) })}
                />
              </div>

              <div className="bg-[#FFEDD2] border-2 border-orange-200 rounded-md lg:w-1/3 m-4 h-56 p-10 text-center">
                <img className="h-20 w-1/2 mx-auto" src={Female} alt="" />
                <p className="mt-4 font-semibold">Female</p>
                <input
                  type="number"
                  defaultValue={genderCount?.female}
                  className="w-full border-2 border-orange-200 py-2 text-center rounded-lg"
                  onChange={(e) =>
                    setGenderCount({ ...genderCount, female: Number(e.target.value) })
                  }
                />
              </div>

              <div className="bg-[#FFEDD2] border-2 border-orange-200 rounded-md lg:w-1/3 m-4 h-56 p-10 text-center">
                <img className="h-20 w-1/2 mx-auto" src={LGBTQP} alt="" />
                <p className="mt-4 font-semibold">LGBTQ</p>
                <input
                  type="number"
                  defaultValue={genderCount?.LGBTQ}
                  className="w-full border-2 border-orange-200 py-2  text-center rounded-lg"
                  onChange={(e) =>
                    setGenderCount({ ...genderCount, LGBTQ: Number(e.target.value) })
                  }
                />
              </div>
            </div>
          </div>
        )}

        {tabActive === 3 && (
          <RegionBasedEmployee
            numberOfEmployee={numberOfEmployee}
            regionBasedEmployee={regionBasedEmployee}
            setRegionBasedEmployee={setRegionBasedEmployee}
          />
        )}

        {tabActive === 4 && (
          <WorkingStatus workingStatus={workingStatus} setWorkingStatus={setWorkingStatus} />
        )}

        {tabActive === 5 && <DeiPolicy agreePolicy={agreePolicy} setAgreePolicy={setAgreePolicy} />}

        {tabActive === 6 && (
          <GetDEIFinalReport
            score={score}
            DEIData={DEIData}
            getReport={getReport}
            setGetReport={setGetReport}
            startupName={startupName}
          />
        )}
      </div>
      <div
        className={`flex ${
          tabActive === 1 || getReport ? 'justify-end' : 'justify-between'
        }  lg:px-16`}
      >
        {getReport ? (
          ''
        ) : (
          <div>
            {tabActive !== 1 && (
              <button
                onClick={() => setTabActive(tabActive - 1)}
                className="bg-[#ff9900] shadow-inner   px-5 lg:py-2.5 hover:shadow-lg outline-none text-white duration-300 ease-in rounded-lg text-lg"
                type="button"
              >
                Back{' '}
              </button>
            )}
          </div>
        )}
        {tabActive < 5 && (
          <button
            onClick={handleTabActive}
            className="bg-[#ff9900] text-white outline-none shadow-inner px-5 lg:py-2.5 hover:shadow-lg duration-300 ease-in rounded-lg text-lg"
            type="button"
          >
            Next{' '}
          </button>
        )}
        {tabActive === 5 && (
          <button
            onClick={handleGenerateReport}
            className="bg-[#ff9900] text-white shadow-inner px-5 py-2.5 hover:shadow-lg duration-300 ease-in rounded-lg text-lg"
            type="button"
          >
            Generate Report{' '}
          </button>
        )}
        {tabActive === 6 && (
          <button
            onClick={closeModal}
            className="bg-yellow-400  shadow-inner outline-none  px-5 lg:py-2.5 hover:shadow-lg text-white duration-300 ease-in rounded-lg text-lg"
            type="button"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default DeiProcess;
