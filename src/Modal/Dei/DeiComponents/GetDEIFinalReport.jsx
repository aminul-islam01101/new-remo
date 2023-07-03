/* eslint-disable radix */
import React, { useCallback, useEffect, useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const GetDEIFinalReport = ({ setGetReport, getReport, score, startupName }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [suggestion, setSuggestion] = useState('');
  const [fileName, setFileName] = useState('');

  const getRange = useCallback(() => {
    const ranges = [
      '0-10',
      '11-20',
      '21-30',
      '31-40',
      '41-50',
      '51-60',
      '61-70',
      '71-80',
      '81-90',
      '91-100',
    ];

    for (let i = 0; i < ranges.length; i += 1) {
      if (
        score >= parseInt(ranges[i].split('-')[0]) &&
        score <= parseInt(ranges[i].split('-')[1])
      ) {
        return ranges[i];
      }
    }

    return null;
  }, [score]);
  const fetchSuggestions = useCallback(async () => {
    try {
      const response = await fetch('/suggestions.json');
      const data = await response.json();
      setSuggestions(data);
      setFileName(getRange());
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  }, [getRange]);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  const handleGetReport = () => {
    // Find the suggestion that matches the score
    const matchedSuggestion = suggestions.find((item) => {
      const range = item.range.split('-');
      const min = parseFloat(range[0]);
      const max = parseFloat(range[1]);
      return score >= min && score <= max;
    });

    // Set the suggestion in the state
    if (matchedSuggestion) {
      setSuggestion(matchedSuggestion.suggestion);
    }
    setGetReport(true);
  };

  const handleDownload = () => {
    const fileUrl = `/DeiReports/${fileName}.pdf`;
    window.open(fileUrl, '_blank');
  };
  return (
    <div className="lg:flex justify-center lg:px-20 gap-10">
      <div className="lg:w-1/5">
        <div className="flex flex-col justify-center items-center">
          <div className="col-md-3 col-sm-6">
            <div className="p-5">
              <div
                className="radial-progress text-white shadow-xl"
                style={{
                  '--value': '100',
                  '--size': '12rem',
                  '--thickness': '1rem',
                }}
              >
                <div
                  className="radial-progress bg-slate-400 text-[#EAB308]"
                  style={{
                    '--value': 100,
                    '--size': '10rem',
                    '--thickness': '0rem',
                  }}
                >
                  <div
                    className="radial-progress bg-white text-[#EAB308]"
                    style={{
                      '--value': score,
                      '--size': '10rem',
                      '--thickness': '0.7rem',
                    }}
                  >
                    <h2 className="text-3xl text-black font-bold">{score}%</h2>
                    <p className="font-semibold text-center text-slate-600"> DEI score</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`lg:w-4/5 lg:text-start text-center ${getReport ? 'pt-6' : 'pt-10'}`}>
        <h1 className="lg:text-2xl text-lg font-bold">{startupName}</h1>
        <h3 className="lg:text-lg font-bold">So this is your DEI score! </h3>

        {!getReport && (
          <div className="lg:text-start text-center w-full mr-20 lg:pb-32">
            <h5 className="lg:text-xl font-bold mt-5">To Get DEI Detailed Info Generate Report.</h5>
            <div className="w-40 mx-auto">
              <button
                onClick={handleGetReport}
                className="bg-orange-200 text-orange-400 outline-none font-bold my-2 p-3 rounded-lg"
                type="button"
              >
                Get Report
              </button>
            </div>
          </div>
        )}
        {getReport && (
          <div className="lg:flex items-center gap-10 text-center">
            <div className="lg:text-2xl font-bold">
              <h5 className="lg:text-xl mb-2 lg:mb-0 font-bold">
                To Get DEI Detailed Info Download Report.
              </h5>
            </div>
            <button
              className="bg-orange-200 outline-none  flex justify-center items-center gap-2 font-bold p-2 border border-dashed rounded-lg mx-auto"
              type="button"
              onClick={handleDownload}
            >
              <span>My Dei-report.pdf</span>
              <FaDownload />
            </button>
          </div>
        )}
        {getReport && (
          <div className="text-center">
            <div className="w-full">
              <h6 className="text-xl font-bold text-[#ff9900]">Suggestion’s</h6>
              <p className="border-[3px] text-start rounded-lg border-orange-200 text-[#ff9900] p-1 border-dotted">
                {suggestion} <br />
                <span className="font-bold">
                  to improve your inclusivity with these communities, use our
                </span>{' '}
                &nbsp;
                <span className="text-blue-300">Talent request</span> &nbsp; below...
              </p>
            </div>
            <div className="mt-6 lg:w-40 mx-auto">
              <Link
                to="/dashboard/talent-request"
                className="bg-[#FFC46B] font-bold lg:py-2 py-1 px-5 text-white  rounded-lg"
              >
                Request Talents Now!
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetDEIFinalReport;
