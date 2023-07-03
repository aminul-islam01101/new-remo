import React from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { MdOutlineClear } from 'react-icons/md';

export const PricePlanCard = ({
  itemType,
  price,
  itemColor,
  borderColor,
  description,
  handlePaypalButton,
  featuresLists
}) => {
  console.log('first');
  return (
    <div
      className={`border m-2 py-6 shadow-sm duration-300 ease-in-out hover:shadow-2xl hover:shadow-[${itemColor}] shadow-[${itemColor}] px-5 rounded-lg ${borderColor}`}
    >
      {/* heading */}
      <div>
        <h1 className={`text-[${itemColor}] font-bold`}>{itemType}</h1>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex items-end gap-2">
          <h2 className="text-3xl font-bold">${price} </h2>
          <span className={`text-[${itemColor}]`}>user/validity</span>
        </div>

        <div>
          <button
            className={`${
              itemType === 'STARTER' &&
              `bg-[${itemColor}] hover:bg-white hover:text-[#19a5ff] hover:border-[#19a5ff] border border-transparent text-white outline-none`
            }      ${
              itemType === 'TEAM' &&
              `hover:bg-white bg-[#ff9900] text-white hover:border-[#ffc46b] border border-transparent hover:text-[#ff9900] outline-none`
            }
                                    ${
                                      itemType === 'BUSINESS' &&
                                      `hover:bg-white bg-[#ff3449] text-white hover:border-[#ff3449] border border-transparent hover:text-[#ff3449]`
                                    }
                                rounded-lg py-1.5 2xl:px-8 px-5 duration-300 ease-in-out outline-none`}
            type="button"
            onClick={() => handlePaypalButton(price, itemType)}
          >
            Buy
          </button>
        </div>
      </div>
      {/* description */}
      <div className="mt-3">
        <p>
          <span className="text-xl font-semibold">{description.searches}</span>{' '}
          {description.fullDescription}
        </p>
      </div>
      {/* border */}
      <div className="my-5">
        <hr className={`border ${borderColor} `} />
      </div>
      {/* features */}
      <div>
            <ul className="flex flex-col gap-5">
              {featuresLists?.map((feature) => (
                <li key={Math.random()} className="flex gap-2  2xl:gap-3 items-start">
                  <span
                    className={`border p-0.5 2xl:p-1 mt-1 rounded-full ${
                      feature?.availability === true
                        ? 'border-[#31be00] text-[#31be00]'
                        : 'border-[#181818] text-[#181818]'
                    }`}
                  >
                    {feature?.availability === true ? <BsCheckLg /> : <MdOutlineClear />}
                  </span>
                  <p className={`text-sm `}>{feature?.name}</p>
                </li>
              ))}
            </ul>
          </div>
    </div>
  );
};
