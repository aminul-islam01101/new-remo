import React from 'react';
import { AiOutlineFileDone } from 'react-icons/ai';
import { BiHash } from 'react-icons/bi';
import { BsGithub, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { FaBirthdayCake, FaProjectDiagram, FaUniversity } from 'react-icons/fa';
import { FcAbout, FcGlobe, FcStumbleupon } from 'react-icons/fc';
import { ImMobile } from 'react-icons/im';
// import { IoLanguage } from 'react-icons/io';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GiSkills } from 'react-icons/gi';
import { IoLanguage } from 'react-icons/io5';
import { MdCastForEducation, MdOutlinePersonPin } from 'react-icons/md';
import { RiPagesLine } from 'react-icons/ri';
import { SiGmail } from 'react-icons/si';
import { TfiTwitter } from 'react-icons/tfi';
import { useLocation } from 'react-router-dom';
import {
  CalculatedAge,
  FormattedDate,
  getDuration,
  getEducationDuration,
} from '../../../Utilities/DateFormater';
import { convertProjectDate, getProjectDuration } from '../../../Utilities/projectDateFormater';

const StartupRemoProfile = () => {
  const location = useLocation();

  const path = location.pathname.split('/');
  const remoEmail = path[path.length - 1];

  const { data: remoProfile, refetch } = useQuery(['remoProfile'], () =>
    axios
      .get(`${import.meta.env.VITE_APP_URL_STARTUP}/api/remoforce/remoforce-profile/${remoEmail}`)
      .then((res) => res.data)
  );

  const handlePdf = () => {
    window.open(remoProfile?.resume, '_blank', 'noopener,noreferrer');
  };

  const ageInYears = CalculatedAge(remoProfile?.personalDetails?.birthDate);

  const contractInfo = [
    {
      id: 1,
      icon: <SiGmail />,
      name: remoProfile?.email,
      data: 'Mail Address',
    },
    {
      id: 2,
      icon: <ImMobile />,
      name: remoProfile?.personalPhone,
      data: 'Personal Number',
    },
    {
      id: 3,
      icon: <FaBirthdayCake />,
      name: FormattedDate(remoProfile?.personalDetails?.birthDate),
      data: `${
        remoProfile?.personalDetails?.age
          ? `${remoProfile?.personalDetails?.age} Years old`
          : 'Birth year not given'
      }`,
    },
    {
      id: 4,
      icon: <FcGlobe />,
      name: 'location',
      data: `${
        remoProfile?.jobPreference?.locationPreference
          ? remoProfile?.jobPreference?.locationPreference
          : 'Location not given'
      }`,
    },
  ];

  return (
    <div className="w-full">
      {/* Banner Section start */}
      <div className="flex border remoforceDashboardProfileBg shadow-lg shadow-[#ddb6ff49] mx-2 lg:mx-0 justify-between absolute w-full md:w-[80%] lg:w-[63%] max-w-6xl" />
      {/* Banner End  */}

      {/* User name and image  */}
      <div className="relative right-[-5px] md:right-[-36px] top-[117px] md:top-[110px] lg:top-[120px]">
        <div className="flex gap-[10px] items-center">
          <div className="">
            <img
              src={
                remoProfile?.remoforceProfilePhoto
                  ? remoProfile?.remoforceProfilePhoto
                  : 'https://static.vecteezy.com/system/resources/previews/002/387/693/original/user-profile-icon-free-vector.jpg'
              }
              className="bg-white w-20 lg:w-32 lg:h-28 md:block bg-red  shadow-xl shadow-[#ddb6ff93] rounded-full"
              alt=""
            />
          </div>
          <div className="font-bold text-[14px] mt-[49px] md:mt-14 lg:mt-4 xl:mt-10 flex justify-between w-full md:pr-12">
            <div>
              <div className="flex gap-5 items-center">
                <h3 className="text-xl lg:text-2xl font-bold">
                  {remoProfile?.fullName}{' '}
                  {remoProfile?.personalDetails?.age
                    ? `(${remoProfile?.personalDetails?.age})`
                    : ''}
                </h3>
              </div>
              <div className="flex text-xs text-[#999999]">
                <p>{remoProfile?.personalDetails?.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* personal informations starts from here  */}
      {/* about me */}
      <div className="mt-[140px] flex flex-col lg:grid grid-cols-7 pl-0 lg:pl-6">
        <div className="col-span-5 pr-0 lg:pr-2">
          <div className="rounded-lg relative bg-[#F0F9FFBF] p-2">
            <div className="space-x-2 flex items-center">
              <FcAbout className="text-2xl mt-1" />
              <span className="text-2xl font-semibold">About Me</span>
            </div>
            <p className="text-sm font-semibold mt-2">{remoProfile?.personalDetails?.aboutMe}</p>
          </div>
          <hr className="h-px my-3 bg-[#E5E5E5]" />

          {/* Personal Information */}
          <div className="rounded-lg relative bg-[#F0F9FFBF] p-2">
            <div className="space-x-2 flex items-center">
              <MdOutlinePersonPin className="text-2xl mt-1" />
              <span className="text-2xl font-semibold">Personal Information</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2">
              {contractInfo.map((item) => (
                <div
                  key={Math.random()}
                  className="lg:w-4/5 border rounded-lg mt-2 flex w-full p-2 items-center bg-white space-x-2"
                >
                  <span className="text-2xl">{item.icon} </span>
                  <div className="flex flex-col space-y-1">
                    <span className="font-semibold text-xs">{item.name} </span>
                    <span className="text-xs text-[#999999]">{item.data} </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="rounded-lg  relative bg-[#F0F9FFBF] p-2 pb-4 mt-4">
            <div className="space-x-2 flex items-center">
              <BiHash className="text-2xl mt-1" />
              <span className="text-2xl font-semibold">Skills</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {remoProfile?.selectedSkills?.length
                ? remoProfile?.selectedSkills?.map((item) => (
                    <p
                      key={Math.random()}
                      className="border bg-white  rounded-md p-px px-1.5 border-[#61C1FF] text-base"
                    >
                      {item.skillName}
                    </p>
                  ))
                : `You haven't added any skills! complete your profile first `}
            </div>
          </div>
          {/*  soft Skills ---------------- */}
          <div className="rounded-lg relative bg-[#F0F9FFBF] p-2 pb-4 mt-4">
            <div className="space-x-2 flex items-center">
              <GiSkills className="text-2xl mt-1" />
              <span className="text-2xl font-semibold"> Soft Skills</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {remoProfile?.softSkills?.length
                ? remoProfile?.softSkills?.map((item) => (
                    <p
                      key={Math.random()}
                      className="border bg-white  rounded-md p-px px-1.5 border-[#61C1FF] text-base"
                    >
                      {item}
                    </p>
                  ))
                : `You haven't added any soft skills! complete your profile first `}
            </div>
          </div>
          {/*  soft Skills end ---------------- */}

          {/* Experience */}
          <div className="rounded-lg relative bg-[#F0F9FFBF] p-2 mt-5">
            <div className="space-x-2 flex items-center">
              <AiOutlineFileDone className="text-2xl mt-1" />
              <span className="text-2xl font-semibold">Experience</span>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              {remoProfile?.experienceDetails?.length
                ? remoProfile?.experienceDetails?.map((item) => (
                    <div
                      key={Math.random()}
                      className="mt-2 flex w-full p-2 items-center space-x-6"
                    >
                      <span>
                        <GiSkills className="text-2xl" />
                      </span>
                      <div className="flex flex-col space-y-1">
                        <div className="flex space-x-4 items-center">
                          <span className="font-semibold text-base">{item.companyName} </span>
                          <span className="text-[#999999] bg-[#E5E5E566] text-xs p-1 rounded-lg">
                            {item.type}
                          </span>
                        </div>
                        <ul className="text-sm text-[#999999] list-disc flex gap-10">
                          <div className="flex gap-2">
                            <span>{item?.position} </span>
                            <span>●</span>
                            <span>{getDuration(item?.startingDate, item?.endingDate)} </span>
                          </div>
                        </ul>
                      </div>
                    </div>
                  ))
                : `You haven't added any experience`}
            </div>
          </div>

          {/* Education */}
          <div className="rounded-lg  relative bg-[#F0F9FFBF] p-2 mt-2">
            <div className="space-x-2 flex items-center">
              <MdCastForEducation className="text-2xl mt-1" />
              <span className="text-2xl font-semibold">Education</span>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              {remoProfile?.educationDetails?.length
                ? remoProfile?.educationDetails?.map((item) => (
                    <div
                      key={Math.random()}
                      className="mt-2 flex w-full p-2 items-center  space-x-6"
                    >
                      <span>
                        <FaUniversity className="text-2xl text-red-300" />
                      </span>
                      <div className="flex flex-col space-y-1">
                        <div className="flex space-x-4 items-center">
                          <span className="font-semibold text-base">{item.school} </span>
                        </div>
                        <ul className="text-sm text-[#999999] list-disc flex gap-10">
                          <div className="flex gap-2">
                            <span>{item.fieldOfStudy}</span>
                            <span>●</span>
                            <span>
                              {getEducationDuration(item?.startingDate, item?.endingDate)}{' '}
                            </span>
                          </div>
                        </ul>
                        {/* <ul className="text-sm text-[#999999] list-disc flex gap-10">
                                            date of end and start will also show in this span


                                        </ul> */}
                      </div>
                    </div>
                  ))
                : 'No education Details added!'}
            </div>
          </div>

          {/* Projects */}
          <div className="rounded-lg relative bg-[#F0F9FFBF] p-2 mt-2">
            <div className="space-x-2 flex items-center">
              <FaProjectDiagram className="text-2xl mt-1" />
              <span className="text-2xl font-semibold">Projects</span>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              {remoProfile?.projectDetails?.length ? (
                remoProfile?.projectDetails?.map((item) => (
                  <div
                    key={Math.random()}
                    className="mt-2 flex w-full p-2 items-start lg:space-x-4"
                  >
                    <div>
                      <FcStumbleupon className="text-3xl" />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <div className="flex space-x-4 items-center">
                        <span className="font-semibold text-base">{item?.projectName} </span>
                        <span className="text-[#999999] bg-[#E5E5E566] text-xs p-1 rounded-lg">
                          {item?.projectType}
                        </span>
                      </div>
                      <ul className="text-sm text-[#999999]  flex flex-col gap-y-2">
                        <li className="">
                          <div className="flex flex-wrap gap-1 lg:gap-3">
                            <span className="max-md:w-full">{item?.projectLink}</span>
                            <span>•</span>
                            <span>{getProjectDuration(item?.startingDate, item?.endingDate)}</span>
                            <span>•</span>
                            <span className="text-[#999999]  text-sm">
                              {convertProjectDate(item?.startingDate)}
                            </span>
                            <span className="text-[#999999] font-semibold ">-</span>
                            <span className="text-[#999999]  text-sm">
                              {convertProjectDate(item?.endingDate)}
                            </span>
                          </div>
                        </li>
                        <li>
                          <span className="font-semibold whitespace-pre-wrap ">
                            {item.projectDescription}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Projects Added</p>
              )}
            </div>
          </div>
          {/* Language */}
          <div className="rounded-lg relative bg-[#F0F9FFBF] p-2 pb-4 mt-4">
            <div className="space-x-2 flex items-center">
              <IoLanguage className="text-2xl mt-1" />
              <span className="text-2xl font-semibold">Language</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-2">
              {remoProfile?.selectedLanguages?.length
                ? remoProfile?.selectedLanguages?.map((item) => (
                    <div
                      key={Math.random()}
                      className="border rounded-lg mt-2 flex w-full p-2 items-center bg-white space-x-4"
                    >
                      <div className="avatar placeholder">
                        <div className="bg-neutral-focus text-neutral-content  rounded-full w-8">
                          <span className="text-xs">{item?.language?.slice(0, 2)} </span>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-px">
                        <span className="font-semibold text-base">{item?.language} </span>
                        <span className="text-xs text-[#999999]">{item?.languageLevel} </span>
                      </div>
                    </div>
                  ))
                : `You haven't added any language! please complete your profile first`}
            </div>
          </div>
        </div>

        {/* side div Accepted Positions */}
        <div className="lg:border-l-2 col-span-2 pl-0 mt-2 lg:mt-0 lg:pl-2  md:border-t-2  lg:border-t-0">
          {/* Social Links */}

          <div className="flex flex-col space-y-4 mt-6">
            <span className="text-base font-semibold pr-1">Social Links</span>
            {remoProfile?.socialLinks ? (
              <div className="space-y-4">
                {remoProfile?.socialLinks?.Github && (
                  <a
                    target="_blank"
                    href={remoProfile?.socialLinks?.Github}
                    className="flex items-center gap-4"
                    rel="noreferrer"
                  >
                    <span>
                      <BsGithub className=" text-3xl text-[#171515]" />
                    </span>
                    <span className="text-sm font-semibold">
                      {`@${remoProfile?.socialLinks?.Github.split('/').pop()}`}
                    </span>
                  </a>
                )}
                {remoProfile?.socialLinks?.Instagram && (
                  <a
                    target="_blank"
                    href={remoProfile?.socialLinks?.Instagram}
                    className="flex items-center gap-4"
                    rel="noreferrer"
                  >
                    <span>
                      <BsInstagram className="  text-3xl text-[#d62976]" />
                    </span>
                    <span className="text-sm font-semibold">
                      {`#${remoProfile?.socialLinks?.Instagram.split('.com/').pop()}`}
                    </span>
                  </a>
                )}
                {remoProfile?.socialLinks?.Linkedin && (
                  <a
                    target="_blank"
                    href={remoProfile?.socialLinks?.Linkedin}
                    className="flex items-center gap-4"
                    rel="noreferrer"
                  >
                    <span>
                      <BsLinkedin className="  text-3xl text-[#0072b1]" />
                    </span>
                    <span className="text-sm font-semibold">
                      {`${remoProfile?.socialLinks?.Linkedin.split('www.').pop()}`}
                    </span>
                  </a>
                )}
                {remoProfile?.socialLinks?.Twitter && (
                  <a
                    target="_blank"
                    href={remoProfile?.socialLinks?.Twitter}
                    className="flex items-center gap-4"
                    rel="noreferrer"
                  >
                    <span>
                      <TfiTwitter className="  text-3xl text-[#1DA1F2]" />
                    </span>
                    <span className="text-sm font-semibold">
                      {`@${remoProfile?.socialLinks?.Twitter.split('/').pop()}`}
                      {}
                    </span>
                  </a>
                )}
              </div>
            ) : (
              <p>No Social links Added</p>
            )}
          </div>

          {/* Resume */}
          <div className="flex flex-col bg-[#F0F9FFBF] w-full p-2 space-y-2 mt-2 rounded-lg">
            <span className="text-base font-semibold">Resume</span>
            {/* map this div */}
            <div className="flex flex-col w-full md:w-1/2 lg:w-full">
              <div className="p-3 bg-white rounded-lg flex space-x-1 justify-between items-center">
                {remoProfile?.resume ? (
                  <button
                    onClick={handlePdf}
                    type="button"
                    className="flex items-center gap-2 "
                    title="View File"
                  >
                    <span>
                      <RiPagesLine className="text-2xl " />
                    </span>

                    <span className="text-md  text-start  font-semibold">
                      {remoProfile?.fullName} Resume
                    </span>
                  </button>
                ) : (
                  'Resume Not available'
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupRemoProfile;
