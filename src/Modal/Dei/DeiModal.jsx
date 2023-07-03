/* eslint-disable react/jsx-no-bind */
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import Diversity from '../../Assets/DEI/Diversity.svg';
import Equality from '../../Assets/DEI/Equality.svg';
import Inclusion from '../../Assets/DEI/Inclusion.svg';
import modalSvg1 from '../../Assets/Dashboard/talentRequest/talentRequestModalSvg1.svg';
import modalSvg2 from '../../Assets/Dashboard/talentRequest/talentRequestModalSvg2.svg';
import DeiProcess from './DeiComponents/DeiProcess';
import TermsAndCondition from './TermsAndCondition';

const DieModal = ({ setIsOpen, isOpen }) => {
  const [pageNumber, setPageNumber] = useState(1);
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
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

                {/* modal design */}
                <div className="absolute max-md:-z-30 right-0 flex  gap-4 top-20">
                  <img src={modalSvg1} alt="" />
                  <img src={modalSvg2} alt="" />
                </div>

                {/* modal content */}
                <div className="pr-9">
                  {pageNumber === 1 && (
                    <div className="border-rose-400 lg:border-2 lg:p-3 rounded-xl">
                      <div className="w-full pb-5 text-center">
                        <h1 className="text-[#FF9900] lg:text-2xl text-lg font-bold mb-2">
                          How inclusive is your company/Startup? Get your free DEI score
                        </h1>
                        <p className="lg:w-1/2 leading-4 mx-auto text-md">
                          Get your investors, stakeholders and board confidence, by showing them how
                          inclusive you are and how much your DEI policies is shaping inclusinon
                        </p>
                      </div>
                      <div className="lg:flex justify-around lg:gap-20">
                        <div className="lg:w-1/2">
                          <div className="lg:flex items-center justify-center lg:gap-16">
                            <div
                              style={{
                                background:
                                  'linear-gradient(168.53deg, rgba(234, 255, 254, 0.55), 40%, rgba(255, 196, 107, 0.60) )',
                                boxShadow: '40px 40px 100px rgba(24, 48, 63, 0.2)',
                                borderRadius: '20px',
                                backdropFilter: 'blur(10px)',
                                border: '2px solid rgba(234, 255, 254, 0.40)',
                              }}
                              className="w-[100px] h-[100px] mx-auto flex items-center justify-center"
                            >
                              <img src={Diversity} alt="" />
                            </div>
                            <div className="lg:w-[400px] lg:text-start text-center">
                              <h3 className="text-[#FF9900] text-lg">Diversity</h3>
                              <p className="text-sm leading-4">
                                Representation of different groups of people, including but not
                                limited to race, gender, ethnicity, sexual orientation, and
                                disability, within a companys workforce.
                              </p>
                            </div>
                          </div>

                          <div className="lg:flex items-center justify-center lg:gap-16 my-2">
                            <div
                              style={{
                                background:
                                  'linear-gradient(168.53deg, rgba(234, 255, 254, 0.55), 40%, rgba(255, 196, 107, 0.60) )',
                                boxShadow: '40px 40px 100px rgba(24, 48, 63, 0.2)',
                                borderRadius: '20px',
                                border: '2px solid rgba(234, 255, 254, 0.40)',
                              }}
                              className="w-[100px] h-[100px] mx-auto flex items-center justify-center"
                            >
                              <img src={Equality} alt="" />
                            </div>
                            <div className="lg:w-[400px] lg:text-start text-center">
                              <h3 className="text-[#FF9900] text-lg">Equality</h3>
                              <p className="text-sm leading-4">
                                ensure fair opportunities and access to resources for all
                                individuals regardless of their background or identity.
                              </p>
                            </div>
                          </div>

                          <div className="lg:flex items-center justify-center gap-16">
                            <div
                              style={{
                                background:
                                  'linear-gradient(168.53deg, rgba(234, 255, 254, 0.55), 40%, rgba(255, 196, 107, 0.60))',
                                boxShadow: '40px 40px 100px rgba(24, 48, 63, 0.2)',
                                borderRadius: '20px',
                                border: '2px solid rgba(234, 255, 254, 0.40)',
                              }}
                              className="w-[100px] h-[100px] mx-auto flex items-center justify-center"
                            >
                              <img src={Inclusion} alt="" />
                            </div>
                            <div className="lg:w-[400px] lg:text-start text-center">
                              <h3 className="text-[#FF9900] text-lg">Inclusion</h3>
                              <p className="text-sm leading-4">
                                create an environment where all individuals feel valued, respected
                                and supported to fully participate and contribute.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="lg:w-1/2">
                          <div className="shadow-custom shadow-[#e3d5ff] rounded-xl p-5">
                            <h3 className="text-[#FF9900] text-xl font-bold px-5">
                              Benfits your statups will get from this score
                            </h3>
                            <div className="flex justify-center gap-10">
                              <p className="text-[#FF9900] lg:py-5  lg:px-7 py-2 px-4 bg-[#FFFFFF] rounded-full shadow-lg">
                                %
                              </p>
                              <p className="text-[#FF9900] lg:py-5 lg:px-7 py-2 px-4 bg-[#FFFFFF] rounded-full shadow-lg">
                                $
                              </p>
                              <p className="text-[#FF9900] lg:py-5 lg:px-7 py-2 px-4 bg-[#FFFFFF] rounded-full shadow-lg">
                                #
                              </p>
                            </div>
                            <div className="px-5">
                              <p className="mb-4">
                                Enhances your companys reputation and attractiveness to potential
                                employees.
                              </p>
                              <p className="mb-4">
                                Boost investor confidence in your startups by demonstrating your
                                commitment to diversity, equity, and inclusion, which can lead to
                                increased funding opportunities.
                              </p>
                              <p className="mb-4">
                                Increase your market reach and customer base through diversity and
                                inclusion initiatives
                              </p>
                            </div>
                          </div>
                          <div className="text-center mt-5">
                            <button
                              onClick={() => setPageNumber(2)}
                              type="button"
                              className="shadow-lg outline-none shadow-orange-300 text-[#FF9900] rounded-full p-4 bg-[#ffffff]"
                            >
                              Get My DEI score
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* DEI terms and condition  */}
                  {pageNumber === 2 && <TermsAndCondition setPageNumber={setPageNumber} />}
                  {pageNumber === 3 && <DeiProcess closeModal={closeModal} />}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DieModal;
