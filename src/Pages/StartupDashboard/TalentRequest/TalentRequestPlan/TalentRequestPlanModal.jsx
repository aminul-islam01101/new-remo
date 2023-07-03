/* eslint-disable react/jsx-no-bind */
import { Dialog, Transition } from '@headlessui/react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import React, { Fragment } from 'react';
import { CgClose } from 'react-icons/cg';
import { TalentRequestPlanCards } from './TalentRequestPlanCards';


const TalentRequestPlanModal = ({ open, setOpen }) => {
  function closeModal() {
    setOpen(false);
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 lg:w-[1329px] lg:overflow-hidden overflow-y-auto lg:h-[785px] mx-auto">
          <div className="flex items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="lg:h-[585px] transform rounded-2xl bg-orange-50 p-3 lg:p-6 text-left align-middle shadow-xl transition-all relative">
                {/* cross button for close modal */}
                <div className="absolute right-4 top-4">
                  <button
                    type="button"
                    className=" p-2 rounded-full outline-none duration-300 ease-in inline-flex  hover:text-white hover:bg-[#19a5ff] text-[#19a5ff]"
                    onClick={closeModal}
                  >
                    <CgClose className="text-2xl " />
                  </button>
                </div>

                {/* modal content */}
                {/* <TalentRequestPlans /> */}
                <div>
                  <PayPalScriptProvider
                    options={{
                      clientId:
                        'AYpFrdEAhX8zXXSM5LfYsQiAE1Q30ewLdLmsWauS50mYbi3h0QMMeGbNy2ZguhpVUN2z76fBmxWlAq3B',
                    }}
                  >
                    <TalentRequestPlanCards setOpen={setOpen} />
                  </PayPalScriptProvider>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TalentRequestPlanModal;
