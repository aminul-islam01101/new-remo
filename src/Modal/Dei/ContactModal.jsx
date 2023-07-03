/* eslint-disable react/jsx-no-bind */
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { CgClose } from 'react-icons/cg';
import { HiOutlineMail } from 'react-icons/hi';

const ContactModal = ({ isOpen, setIsOpen }) => {
  const { register, handleSubmit } = useForm();

  function closeModal() {
    setIsOpen(false);
  }

  const submitToSupport = (data) => {
    console.log(data);

    // after saving data to db modal should be close
    closeModal();
  };

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

        <div className="fixed top-20 inset-0 my-auto  mx-auto">
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
              <Dialog.Panel className="w-[500px] transform rounded-2xl bg-orange-50 p-3 lg:p-6 text-left align-middle shadow-xl transition-all relative contactModalBg">
                {/* cross button for close modal */}
                <div className="absolute right-4 top-4 ">
                  <button
                    type="button"
                    className=" p-2 rounded-full outline-none duration-300 ease-in inline-flex  hover:text-white hover:bg-orange-400 text-black"
                    onClick={closeModal}
                  >
                    <CgClose className="text-2xl " />
                  </button>
                </div>
                {/* modal content */}
                <form onSubmit={handleSubmit(submitToSupport)} className="lg:pl-2 pt-2 pb-5 ">
                  <h3 className="font-semibold text-lg">Get Support With Us!!</h3>
                  {/* email  */}
                  <div className="relative   py-2">
                    <label htmlFor="UserEmail" className="sr-only">
                      {' '}
                      Email{' '}
                    </label>

                    <input
                      {...register('email', { required: true })}
                      type="email"
                      id="UserEmail"
                      placeholder="Your Email Id"
                      className="w-full rounded-lg bg-transparent border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B] pl-10 py-3 outline-none px-2 shadow-sm sm:text-sm"
                    />

                    <span className="pointer-events-none absolute inset-y-0 left-0 grid w-10 place-content-center text-[#7B7B7B]">
                      <HiOutlineMail />
                    </span>
                  </div>

                  {/* text area */}
                  <div className="form-control mt-5">
                    <textarea
                      {...register('message', { required: true })}
                      className="textarea bg-transparent  focus:outline-none textarea-bordered h-24  placeholder:text-[#7B7B7B] placeholder:lg:text-base placeholder:text-sm resize-none"
                      placeholder="What do want to know about or get support about! Please feel free to ask for anything even about my ex!"
                    />
                  </div>
                  {/* submit button */}
                  <div className="mt-5">
                    <button
                      type="submit"
                      className="border rounded-md px-10 py-3 bg-[#0B132A] text-white text-sm  "
                    >
                      Contact Now
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ContactModal;
