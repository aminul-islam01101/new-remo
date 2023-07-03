import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import GoogleFacebookLogin from './GoogleFacebookLogin';

const StartUpAndRemoforce = ({ setLoginAction }) => (
  <div>
    <div>
      <Link className="flex gap-2" to="/">
        <span className="border-[1px] border-black rounded-md">
          <FiChevronLeft className="mt-1" />
        </span>
        <span className="font-semibold">Back</span>
      </Link>
    </div>
    <div className="flex">
      <div className="lg:flex items-center justify-between w-full lg:pr-10 ">
        <div className="lg:w-1/2 p-10 bg-white">
          <div className="flex flex-col ">
            <h1 className="my-5 font-bold text-gray-900 md:text-2xl">
              Login as <span className="text-[#65DC7F]">Startup!</span>
            </h1>
            <div>
              <h3 className="text-lg text-gray-500  my-5">
                With our advanced matching system, we ensure that you get the right talent suitable
                for the right project, every time. Say goodbye to wasted time and resources, and
                hello to efficient, Successful projects
              </h3>
            </div>
            <div className="col-span-6 sm:flex     sm:items-center flex-col sm:gap-4 justify-center items-center">
              <button
                onClick={() => setLoginAction(true)}
                type="button"
                className="bg-[#65DC7F] text-white outline-none shrink-0 mx-auto self-center flex rounded-md border px-4 text-xl pt-1 pb-2 font-medium"
              >
                Login
              </button>
            </div>
          </div>

          <div>
            <GoogleFacebookLogin />
          </div>
          <div className="mt-5">
            <p className="text-sm text-center font-semibold sm:mt-0">
              First time here?
              <Link to="/startup-signup" className="text-green-600">
                {' '}
                Register now
              </Link>
            </p>
          </div>
        </div>
        <div className="lg:w-1/2 p-10 bg-[#f0f9ff]">
          <div className="flex flex-col">
            <h1 className="my-5 font-bold text-gray-900 md:text-2xl">
              Login as <span className="text-[#13D1FF]">Remoforce!</span>
            </h1>
            <div>
              <h3 className="text-lg text-gray-500  my-5">
                if you are from underrepresented regions of the world, probably your search has
                brought you here, you never gave up, you found us, a community dedicated to you
              </h3>
            </div>
            <div className="col-span-6 sm:flex     sm:items-center flex-col sm:gap-4 justify-center items-center">
              <button
                onClick={() => setLoginAction(true)}
                type="button"
                className="text-[#13D1FF] outline-none bg-[#EBD8FF] shrink-0 mx-auto self-center flex rounded-md border px-4 text-xl pt-1 pb-2 font-medium"
              >
                Login
              </button>
            </div>
          </div>
          <GoogleFacebookLogin />
          <div className="mt-5">
            <p className="text-sm text-center font-semibold sm:mt-0">
              First time here?
              <Link to="/signup" className="text-green-600">
                {' '}
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default StartUpAndRemoforce;
