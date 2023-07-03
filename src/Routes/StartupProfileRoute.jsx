/* eslint-disable import/no-cycle */
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import useAuth from '../Hooks/useAuth';

import AuthContext from '../Context/AuthContext';

const StartupProfileRoute = ({ children }) => {
  const { isLoading, user, loading } = useAuth();
  const { myAllRequests, myAllAppliedJobs } = useContext(AuthContext);
  const location = useLocation();
  const path = location.pathname.split('/');
  const pathId = path[path.length - 1];

  console.log({ myAllAppliedJobs});


  const applicationStartupEmail=myAllAppliedJobs.find(appliedJobs => appliedJobs.startupsEmail===pathId);
  const applicationRemoforceEmail=myAllAppliedJobs.find(appliedJobs => appliedJobs.applicantsEmail===user?.user?.email);

  console.log(applicationStartupEmail);

  
  const startupsEmail = myAllRequests?.find((users) => users.startupsEmail === pathId);
  const remoforceEmail = myAllRequests?.find((users) => users.remoforceEmail === user?.user?.email);
  console.log(startupsEmail.startupsEmail);
  console.log(myAllRequests);
  console.log(user?.user?.email);

  if ((startupsEmail.startupsEmail && remoforceEmail)|| (applicationStartupEmail && applicationRemoforceEmail) )  {
   

    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default StartupProfileRoute;
