import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MyTools = () => {
  const navigate = useNavigate();

  const handleUseToolNow = (tool) => {
    navigate();
    console.log(tool);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold  border-b-2 mb-2  ">Remostart Tools</h1>
      <div className="py-5">
        <div className="lg:flex lg:p-0 p-5 justify-between items-center border-2 border-[#13D1FF] rounded-xl lg:h-[200px] lg:text-start text-center">
          <div className="lg:w-1/2 w-full p-5">
            <h2 className="lg:text-2xl text-xl font-bold text-blue-400">The Interview Assistant</h2>
            <p className="text-[#13D1FF]">Take interview notes easily</p>
          </div>
          <div className="startUpMyToolsInterview lg:h-[200px] lg:w-1/2 p-0 lg:relative">
            <button
              onClick={() => handleUseToolNow('interview')}
              className="bg-[#13D1FF] px-5 py-2 outline-none rounded-lg text-white lg:absolute lg:bottom-2 lg:right-2"
              type="button"
            >
              <a
                href="https://user-talent-points.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Use Tool Now
              </a>
              {/* <Link to="/dashboard/my-tools/new-tool/interview">Use Tool Now</Link> */}
            </button>
          </div>
        </div>

        <div className="lg:flex lg:p-0 py-5  justify-between items-center border-2 border-[#FF9900] rounded-xl lg:h-[200px] my-5 lg:text-start text-center">
          <div className="lg:w-1/2 p-5">
            <h2 className="text-2xl font-bold text-[#FF9900]">DEI</h2>
            <p className="text-[#FF9900] pb-5">Diversity Equity Inclusion</p>
            <p className="text-[#FF9900]">
              check your standards for diversity, equity and inclusion
            </p>
          </div>
          <div className="startUpMyToolsDei lg:h-[200px] lg:w-1/2 p-0 lg:relative">
            <button
              onClick={() => handleUseToolNow('dei')}
              className="bg-[#FF9900] px-5 py-2 outline-none rounded-lg text-white lg:absolute lg:bottom-2 lg:right-2"
              type="button"
            >
              <Link to="/dashboard/my-tools/new-tool/dei">Use Tool Now</Link>
            </button>
          </div>
        </div>

        <div className="lg:flex lg:p-0 py-5 justify-between items-center border-2 border-[#00C42B] rounded-xl lg:h-[200px] lg:text-start text-center">
          <div className="lg:w-1/2 p-5">
            <h2 className="lg:text-2xl text-xl font-bold text-[#00C42B] pb-5">
              Resume Description Tool
            </h2>
            <p className="text-[#00C42B]">
            Describe your resume in a few sentences.
            </p>
          </div>
          <div className="startUpMyToolsResume lg:h-[180px] lg:-mb-5 lg:w-1/2 p-0 lg:relative">
            <button
              onClick={() => handleUseToolNow('resume')}
              className="bg-[#00C42B] px-5 py-2 outline-none rounded-lg text-white lg:absolute lg:bottom-2 lg:right-2"
              type="button"
            >
              <Link to="/dashboard/my-tools/new-tool/resume">Use Tool Now</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTools;
