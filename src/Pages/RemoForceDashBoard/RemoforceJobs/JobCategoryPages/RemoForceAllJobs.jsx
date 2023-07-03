/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../../Context/AuthContext';
import RemoForceDashBoardItems from '../../../../Routes/Roots/RemoForceDashBoardItems';
import NoJob from '../../../StartupDashboard/DashboardPages/NoJob';
import JobCard from './JobCardComponent/JobCard';

const RemoForceAllJobs = () => {
  const { user } = useSelector((state) => state.auth);
  const { paginationResult: allJobs } = useContext(AuthContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(8);
  const [totalJob, setTotalJob] = useState(40);
  const pages = Math.ceil(totalJob / pageLimit);
  // const { data: allJobs } = useQuery(['items'], () =>
  //   axios
  //     .get(`${import.meta.env.VITE_APP_URL_STARTUP}/api/job/all-jobs/${user?.user.email}`)
  //     .then((res) => res.data)
  // );
  const navigate = useNavigate();

  const handleApplyNow = (item) => {
    navigate(`/remoforce-dashboard/all-jobs/${item._id}`, { state: { data: item } });
  };

  return (
    <RemoForceDashBoardItems>
      <section>
        {/* card section */}
        {allJobs.length ? (
          <div>
            <section className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 2xl:grid-cols-4 mx-auto gap-3">
              {allJobs.map((item) => (
                <JobCard key={Math.random()} items={item} applyNowBtn={handleApplyNow} />
              ))}
            </section>
            <div className="mt-5  text-center">
              <div className="flex justify-center flex-wrap gap-3">
                {[...Array(pages).keys()].map((number) => (
                  <p>
                    <button
                      type="button"
                      key={number}
                      className={`px-3 rounded-md  ${
                        pageNumber === number + 1 ? 'bg-[#7dec96]' : 'bg-green-100'
                      }`}
                      onClick={() => setPageNumber(number + 1)}
                    >
                      {number + 1}
                    </button>
                  </p>
                ))}
                <select
                  className="rounded-md px-8 text-xs py-0"
                  onChange={(event) => setPageLimit(event.target.value)}
                >
                  <option value="5">5</option>
                  <option value="10" selected>
                    10
                  </option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
              </div>
            </div>
          </div>
        ) : (
          <NoJob />
        )}
      </section>
    </RemoForceDashBoardItems>
  );
};

export default RemoForceAllJobs;
