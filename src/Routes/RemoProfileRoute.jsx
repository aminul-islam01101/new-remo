/* eslint-disable import/no-cycle */
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import useAuth from '../Hooks/useAuth';

import AuthContext from '../Context/AuthContext';

const RemoProfileRoute = ({ children }) => {
  const { isLoading, user, loading } = useAuth();
  const { results, allApplicants } = useContext(AuthContext);
  const location = useLocation();
  const path = location.pathname.split('/');
  const pathId = path[path.length - 1];


  

  const jobId = JSON.parse(localStorage.getItem('jobId'));

  
  const dataJobId = allApplicants.find((applicant) => applicant.jobId === jobId);

  
  const startupsEmail = allApplicants.find((applicant) => applicant.startupsEmail === user?.user?.email);

  
  const remoEmailFromJob = allApplicants.find((applicant) => applicant.applicantsEmail === pathId);

  

  const remoForceEmail = results?.lastSearchResult?.requiredTalentsInHistory?.find(
    (users) => users.email === pathId
  );

  if (
    (remoForceEmail && user?.user?.email === results?.startupsEmail) ||
    (dataJobId && startupsEmail && remoEmailFromJob)
  ) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RemoProfileRoute;
