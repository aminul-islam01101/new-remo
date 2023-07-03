import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const TermsAndCondition = ({ setPageNumber }) => {
  const [agree, setAgree] = useState(false);

  const handleAgree = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setAgree(true);
    } else {
      setAgree(false);
    }
  };

  const handleTermsCondition = () => {
    if (!agree) {
      return toast.error('You have to accept our terms & condition.');
    }
    return setPageNumber((prev) => prev + 1);
  };

  return (
    <div className="p-5">
      <div>
        <h1 className="text-[#FF9900] lg:text-2xl md:text-xl text-lg text-center font-bold mb-1">
          Please Accept Terms & Conditions to continue !
        </h1>
        <p className="mb-2 text-lg lg:w-2/5 text-center mx-auto">
          These terms are to be agreed upon for using this service in compliance with regulatory
          policies
        </p>
      </div>
      <div className="lg:w-4/5  mx-auto lg:p-5 p-2 bg-slate-200 rounded-lg shadow-2xl">
        <p>
          By accessing or using the DEI score feature on Remostart, you agree to be bound by these
          terms and conditions. The DEI score feature is provided solely for your internal business
          use, and you may not use it for any other purpose or disclose any information derived from
          it to any third party without our prior written consent. You agree to provide accurate and
          complete information about your startups diversity, equity, and inclusion practices when
          using the DEI score feature. Remostart does not guarantee the accuracy or completeness of
          the information provided by the DEI score feature, and you acknowledge that your use of
          the feature is at your own risk. You are solely responsible for any actions taken or
          decisions made based on the information provided by the DEI score feature. Remostart is
          not responsible for any damages or losses resulting from your use of the feature or
          reliance on the information provided by it. Remostart reserves the right to modify or
          discontinue the DEI score feature at any time without notice. We may also modify these
          terms and conditions at any time, and your continued use of the feature after any changes
          to the terms and conditions will constitute your acceptance of such changes. You agree to
          indemnify and hold harmless Remostart and its affiliates, officers, directors, employees,
          agents, and licensors from any and all claims, damages, liabilities, costs, and expenses
          arising from your use of the DEI score feature or breach of these terms and conditions.
        </p>
      </div>
      <div className="flex justify-center mt-10 lg:-mb-16 items-center gap-5">
        <label className="flex gap-2" htmlFor="terms-and-condition">
          <input
            onClick={handleAgree}
            className="rounded-full p-2"
            type="checkbox"
            name="terms-and-condition"
            id="terms-and-condition"
          />
          <p className="text-[#FF9900] text-sm">I’ve Read The Terms and Conditions.</p>
        </label>
      </div>
      <div className="flex justify-between items-center mt-5">
        <button
          onClick={() => setPageNumber(1)}
          className="text-[#FF9900] bg-yellow-200 outline-none rounded-lg font-bold lg:py-3 py-1 px-2 lg:px-10"
          type="button"
        >
          Back
        </button>
        <button
          onClick={handleTermsCondition}
          className="text-[#FF9900] outline-none bg-white shadow-lg lg:text-xl font-bold lg:py-3 py-1 px-2 lg:px-10 rounded-full"
          type="button"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default TermsAndCondition;
