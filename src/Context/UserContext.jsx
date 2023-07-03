/* eslint-disable react/jsx-no-constructed-context-values */

import { useEffect, useState } from 'react';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import loadingAnimation from '../Assets/Images/LoadingAnimation.svg';
import AuthContext from './AuthContext';

const UserContext = ({ children }) => {
  // hooks
  const [tabActive, setTabActive] = useState(1);
  const [loading, setLoading] = useState(false);
  const [serviceUser, setServiceUser] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [paginationResult, setPaginationResult] = useState([]);


  const { user } = useSelector((state) => state.auth);
  const [results, setResults] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [myAllRequests, setMyAllRequests] = useState([]);
  const [allApplicants, setAllApplicants] = useState([]);
  const [myAllAppliedJobs, setMyAllAppliedJobs] = useState([]);
  const [allNotifications, setAllNotifications] = useState([]);
  const [refreshPlan, setRefreshPlan] = useState(false);
  const [startupRequests, setStartupRequests] = useState({});
  // const [socket, setsocket] = useState(null);

  const [expanded, setExpanded] = useState([]);
  const [startupDetails, setStartupDetails] = useState({});

  // talent history table opener

  const handleExpand = (_id) => {
    if (expanded.includes(_id)) {
      setExpanded(expanded.filter((item) => item !== _id));
    } else {
      setExpanded([_id]);
    }
  };
  const handleCollapse = (_id) => {
    if (expanded.includes(_id)) {
      setExpanded(expanded.filter((item) => item !== _id));
    }
  };

  //   const { data: startup } = useQuery(['startup'], () =>
  //   axios
  //     .get(
  //       `${import.meta.env.VITE_APP_URL_STARTUP}/api/talent/get-startup?email=${
  //         user?.user?.email
  //       }&jobId=${results.lastSearchResult._id}`
  //     )
  //     .then((res) => res.data)
  // );

  //% transaction details
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.user?.email && user?.user.role === 'startup') {
          const result = await axios.get(
            `${import.meta.env.VITE_APP_URL_STARTUP}/api/talent/get-startup?email=${
              user?.user?.email
            }`
          );
          setStartupDetails(result.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user, refreshPlan]);

  // console.log(user);
  const jobId = JSON.parse(localStorage.getItem('jobId'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.user?.email && user?.user.role === 'startup') {
          const result = await axios.get(
            `${import.meta.env.VITE_APP_URL_STARTUP}/api/talent/last-results?email=${
              user?.user?.email
            }`
          );
          setResults(result.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user, refresh]);

  // TODO: web sockets
  // useEffect(() => {
  //   setsocket(io(import.meta.env.VITE_APP_URL_STARTUP));
  // }, []);

  // useEffect(() => {
  //   socket?.on('getNotification', (notificationArr) => {
  //     setAllNotifications(notificationArr);
  //   });

  //   return () => {
  //     socket?.disconnect();
  //   };
  // }, [socket]);

  // all notifications
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.user?.email && user?.user.role === 'remoforce') {
          const result = await axios.get(
            `${import.meta.env.VITE_APP_URL_STARTUP}/api/notification/remoforce/all-notifications/${
              user?.user?.email
            }`
          );

          setAllNotifications(result.data);
        }
        if (user?.user?.email && user?.user.role === 'startup') {
          const result = await axios.get(
            `${import.meta.env.VITE_APP_URL_STARTUP}/api/notification/startup/all-notifications/${
              user?.user?.email
            }`
          );

          setAllNotifications(result.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user, refresh]);

  // useEffect(() => {

  //   socket?.emit('newUser', {
  //     email: user?.user?.email,
  //     role: user?.user?.role,
  //   });
  // }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.user?.email && user?.user?.role === 'startup' && jobId) {
          const result = await axios.get(
            `${
              import.meta.env.VITE_APP_URL_STARTUP
            }/api/job/user-jobs/allApplicationRequests/${jobId}`
          );

          setAllApplicants(result.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user, refresh, jobId]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.user?.email && user?.user.role === 'remoforce') {
          const result = await axios.get(
            `${import.meta.env.VITE_APP_URL_STARTUP}/api/job/remoforce/all-applied-jobs/${
              user?.user.email
            }`
          );

          setMyAllAppliedJobs(result.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user, refresh]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.user?.email && user?.user.role === 'remoforce') {
          const result = await axios.get(
            `${import.meta.env.VITE_APP_URL_STARTUP}/api/remoforce/all-my-requests/${
              user?.user.email
            }`
          );
          setMyAllRequests(result.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user, refresh]);


  const handleStartupRequests = async () => {
    try {
      if (user?.user?.email && user?.user?.role === 'startup') {
        const result = await axios.get(
          `${import.meta.env.VITE_APP_URL_STARTUP}/api/talent/my-requests?email=${user?.user.email}`
        );
        
        setStartupRequests(result.data);
        console.log(result.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePagination = async (url) => {
    const result = await axios.get(url);
    setPaginationResult(result.data);
  };


  const handleSearch = async (allData, setIsOpen) => {
    await axios
      .post(`${import.meta.env.VITE_APP_URL_STARTUP}/api/talent/talent-request`, allData)
      .then(async (res) => {
        if (res.status === 200) {
          if (res.data.requiredTalentsInHistory.length) {
            setSearchResults(res.data);
            
            setIsOpen(false);
            // reTouch();
            handleStartupRequests()
          }
          if (!res.data.requiredTalentsInHistory.length) {
            toast.error('no result found. search again');
          
            // reTouch();
            handleStartupRequests()
          
          }
        } else {
          toast.error('There is an error');
        }

        setLoading(false);
      
        // reTouch();
        const result = await axios.get(
          `${import.meta.env.VITE_APP_URL_STARTUP}/api/talent/last-results?email=${
            user?.user?.email
          }`
        );
        setResults(result.data);

        // if (res.data._id) {
        //   toast.success('Contracts job data edited successfully');

        // }
      })
      .catch((err) => {
        setLoading(false);
      
        // reTouch();
      });
  };
  // const handleViewApplicants = async (id) => {
  //   await axios.get(
  //     `${import.meta.env.VITE_APP_URL_STARTUP}/api/job/user-jobs/allApplicationRequests/${id}`
  //   )
  //     .then(async (res) => {
  //      setAllApplicants(res)

  //       }

  //     )
  //     .catch((err) => {
  //       setLoading(false);

  //     });
  // };

  useEffect(() => {
    setLoading(true);
    const getUser = () => {
      fetch(`${import.meta.env.VITE_APP_URL_STARTUP}/auth/login/success`, {
        // fetch("https://temp-back-production.up.railway.app/auth/login/success", {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error('authentication has been failed!');
        })
        .then((resObject) => {
          setLoading(false);

          setServiceUser(resObject.user);
        })
        .catch((err) => {
          setLoading(false);
        });
    };
    getUser();
  }, []);
  if (loading) {
    return (
      <div className="grid h-screen  place-items-center">
        <img src={loadingAnimation} alt="" />
      </div>
    );
  }
  console.log(startupRequests);

  return (
    <AuthContext.Provider
      value={{
        loading,
        serviceUser,
        handlePagination,
        paginationResult,
        handleSearch,
        searchResults,
        results,
        refresh,
        setRefresh,
        myAllRequests,
        allApplicants,
        myAllAppliedJobs,
        allNotifications,
        tabActive,
        setTabActive,
        handleCollapse,
        handleExpand,
        expanded,
        startupDetails,
        refreshPlan,
        setRefreshPlan,
        startupRequests,
        handleStartupRequests,
        // socket,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default UserContext;
