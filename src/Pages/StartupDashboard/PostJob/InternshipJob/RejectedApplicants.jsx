import React from 'react';

const fakeDataRejected = [
  {
    name: 'Rubel',
    region: 'Bangladesh',
    interviewDetails: '5-10-23 05:30 PM GMT',
    status: 'Rejected',
  },
  {
    name: 'Aminul',
    region: 'Bangladesh',
    interviewDetails: '5-10-23 05:30 PM GMT',
    status: 'Rejected',
  },
  {
    name: 'Shafinur',
    region: 'Bangladesh',
    interviewDetails: '5-10-23 05:30 PM GMT',
    status: 'Rejected',
  },
  { name: 'Aniket', region: 'India', interviewDetails: '5-10-23 05:30 PM GMT', status: 'Rejected' },
  {
    name: 'Nishanth',
    region: 'India',
    interviewDetails: '5-10-23 05:30 PM GMT',
    status: 'Rejected',
  },
];

const RejectedApplicants = () => (
  <div className="w-full  mb-12 xl:mb-0 lg:px-4 mx-auto ">
    <div className="relative max-w-[800px] flex flex-col   break-words   ">
      <div className="block rounded-md  w-full overflow-x-auto">
        <table className="items-center  w-full ">
          {/* table head */}
          <thead className=" ">
            <tr className="font-semibold border-b-2">
              <th className="px-6 bg-blueGray-50   py-2 text-xs  whitespace-nowrap    text-center">
                Profile Name
              </th>
              <th className="px-6 bg-blueGray-50   py-2 text-xs  whitespace-nowrap    text-center">
                Region
              </th>
              <th className="px-6 bg-blueGray-50   py-2 text-xs  whitespace-nowrap    text-center">
                Status
              </th>
            </tr>
          </thead>

          {/* table body items */}

          {fakeData &&
            fakeData.map((applicant) => {
              const { name, region, status } = applicant;
              return (
                <tbody className="font-semibold text-sm">
                  <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                    <td className="whitespace-nowrap px-6 py-4 text-center">{name}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">{region}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      <button className="bg-red-500 text-white rounded-lg px-2 py-1" type="button">
                        {status}
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>
    </div>
  </div>
);

export default RejectedApplicants;
