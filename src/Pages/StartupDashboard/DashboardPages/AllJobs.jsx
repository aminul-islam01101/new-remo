/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import DeiGlobe from '../../../Assets/DEI/Globe.svg';
import AuthContext from '../../../Context/AuthContext';
import DieModal from '../../../Modal/Dei/DeiModal';
import DashBoardItems from '../../../Routes/Roots/DashBoardItems';
import StartupJobCard from './JobCardStartup/StartupJobCard';
import NoJob from './NoJob';

const AllJobs = () => {
  const { serviceUser } = useContext(AuthContext);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { data: items, refetch } = useQuery(['items'], () =>
    axios
      .get(
        `${import.meta.env.VITE_APP_URL_STARTUP}/api/job/user-jobs/${
          user?.user?.email || serviceUser?.email
        }`
      )
      .then((res) => res.data)
  );
  console.log(items);
  const handleDelete = (id) => {
    axios
      .delete(`${import.meta.env.VITE_APP_URL_STARTUP}/api/job/user-jobs/${id}`)
      .then((response) => {
        refetch();
        toast.success(`${response.data.title} deleted successfully`);
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
    refetch();
  };
  const handleClose = async (id) => {
    await axios
      .put(`${import.meta.env.VITE_APP_URL_STARTUP}/api/job/user-jobs/close/${id}`)
      .then((response) => {
        refetch();
        toast.success(`${response.data.title} closed successfully`);
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
    refetch();
  };

  // /dashboard/post-job/public-job/:id
  const viewHandler = (item) => {
    const path = item?.categoryName?.toLowerCase().replace(/\s+/g, '-');

    path === 'public-job' && navigate(`/dashboard/public/${item.jobId}`, { state: { data: item } });

    path === 'private-job' &&
      navigate(`/dashboard/private/${item.jobId}`, { state: { data: item } });
    path === 'internship' &&
      navigate(`/dashboard/internship/${item.jobId}`, { state: { data: item } });

    path === 'contracts' &&
      navigate(`/dashboard/contracts/${item.jobId}`, { state: { data: item } });
    path === 'shadowing' &&
      navigate(`/dashboard/shadowing/${item.jobId}`, { state: { data: item } });
    path === 'gigs' && navigate(`/dashboard/gigs/${item.jobId}`, { state: { data: item } });
  };

  return (
    <DashBoardItems>
      <section>
        {/* card section */}
        {items?.length ? (
          <div className="flex gap-2">
            <section className="w-9/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
              {items?.map((item) => (
                <StartupJobCard
                  key={Math.random()}
                  jobInfo={item}
                  handleDelete={handleDelete}
                  handleClose={handleClose}
                  viewHandler={viewHandler}
                />
              ))}
            </section>
            <div className="w-3/12">
              <div className="bg-[#F0F9FF] p-2 shadow-xl rounded-md">
                <div className="flex flex-col justify-center items-center">
                  <div className="p-2">
                    <div
                      className="radial-progress text-white shadow-xl"
                      style={{
                        '--value': 100, // do not change this value
                        '--size': '8rem',
                        '--thickness': '1rem',
                      }}
                    >
                      <div
                        className="radial-progress bg-slate-400 text-[#EAB308]"
                        style={{
                          '--value': 100, // do not change this value
                          '--size': '6rem',
                          '--thickness': '0rem',
                        }}
                      >
                        <div
                          className="radial-progress bg-white text-[#EAB308]"
                          style={{
                            '--value': 75, // this value should be dynamic
                            '--size': '6rem',
                            '--thickness': '0.5rem',
                          }}
                        >
                          <h2 className="text-xl text-center text-black font-bold">
                            {/* this value should be dynamic */}
                            {50}%
                          </h2>
                          <p className="font-semibold px-5 text-xs text-center text-slate-600">
                            Secondary level
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h2 className="text-center font-bold">Complete your profile</h2>
                <p className="text-xs text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus impedit repellat
                  unde porro atque corrupti deserunt beatae asperiores illum veniam!
                </p>
                <p className="text-center my-3">
                  <Link to="/dashboard/settings/profile">
                    <button
                      className="bg-[#A5DBFF] text-xs px-4 py-1 font-semibold rounded-md flex items-center gap-2 justify-center mx-auto"
                      type="button"
                    >
                      <span>Update</span>
                      <FaArrowRight />
                    </button>
                  </Link>
                </p>
              </div>
              <div className="bg-[#FFF3E0] p-2 shadow-xl mt-5 rounded-md">
                <div className="flex flex-col justify-center items-center">
                  <img src={DeiGlobe} alt="" />
                </div>
                <h2 className="text-xl text-center text-[#FF9900]  font-bold">DEI</h2>
                <p className="text-xs text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus impedit repellat
                  unde porro atque corrupti deserunt beatae asperiores illum veniam!
                </p>
                <p className="text-center my-3">
                  <button
                    onClick={() => setIsOpen(true)}
                    type="button"
                    className="shadow-lg text-xs outline-none shadow-orange-300 text-[#FF9900] rounded-full px-4 py-2 bg-[#ffffff]"
                  >
                    Get My DEI score
                  </button>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="">
            <NoJob />
          </div>
        )}

        {/* DEI modal  */}
        {isOpen && <DieModal isOpen={isOpen} setIsOpen={setIsOpen} />}
      </section>
    </DashBoardItems>
  );
};

export default AllJobs;
