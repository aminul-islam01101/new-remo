/* eslint-disable react/jsx-no-bind */
import axios from 'axios';
import React, { useContext } from 'react';
import { BsCheckCircle, BsFillChatLeftTextFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';

const NotificationModal = ({ openNotification, setOpenNotification }) => {
  const { allNotifications, setTabActive, refresh, setRefresh, handleExpand } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const notificationsUnread = allNotifications.filter(
    (notification) => notification.status === 'unread'
  );
  const notificationsRead = allNotifications.filter(
    (notification) => notification.status === 'read'
  );
  const handleNotification = (notification) => {
    const requestBody = { status: 'read', jobId: notification.jobId, stage: notification.stage };
    let url = '';
    if (notification.type === 'talent-request') {
      if (notification.status === 'unread') {
        if (notification.stage === 'talent-request') {
          requestBody.email = notification.remoforceEmail;

          url = `${import.meta.env.VITE_APP_URL_STARTUP}/api/notification/remoforce/make-read`;
          setOpenNotification(false);
          setTabActive(4);
          navigate('/remoforce-dashboard/my_job');
        }
        if (
          notification.stage === 'interview-schedule' ||
          notification.stage === 'talent-request-rejection'
        ) {
          requestBody.email = notification.startupsEmail;
          url = `${import.meta.env.VITE_APP_URL_STARTUP}/api/notification/startup/make-read`;
          setOpenNotification(false);
          // setTabActive(4);
          handleExpand(notification.jobId);
          navigate('/dashboard/talent-request-history');
        }
        axios
          .put(url, requestBody)
          .then((response) => {
            if (response.data === 'made read') {
              setRefresh(!refresh);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (notification.status === 'read') {
        if (notification.stage === 'talent-request') {
          setTabActive(4);
          navigate('/remoforce-dashboard/my_job');
          setOpenNotification(false);
        }
        if (
          notification.stage === 'interview-schedule' ||
          notification.stage === 'talent-request-rejection'
        ) {
          handleExpand(notification.jobId);
          navigate('/dashboard/talent-request-history');
        }
      }
    }
    if (notification.type === 'application-request') {
      if (notification.status === 'unread') {
        if (notification.stage === 'application-request') {
          requestBody.email = notification.startupsEmail;

          url = `${import.meta.env.VITE_APP_URL_STARTUP}/api/notification/startup/make-read`;
          setOpenNotification(false);

          navigate(`/dashboard/gigs/${notification.jobId}/view-applicants`);
        }
        if (
          notification.stage === 'application-acceptance' ||
          notification.stage === 'acceptance'
        ) {
          requestBody.email = notification.remoforceEmail;

          url = `${import.meta.env.VITE_APP_URL_STARTUP}/api/notification/remoforce/make-read`;
          setOpenNotification(false);
          setTabActive(1);
          navigate('/remoforce-dashboard/my_job');
        }
        if (notification.stage === 'application-rejection') {
          requestBody.email = notification.remoforceEmail;

          url = `${import.meta.env.VITE_APP_URL_STARTUP}/api/notification/remoforce/make-read`;
          setOpenNotification(false);
          setTabActive(3);
          navigate('/remoforce-dashboard/my_job');
        }
        if (notification.stage === 'interview-schedule') {
          requestBody.email = notification.remoforceEmail;

          url = `${import.meta.env.VITE_APP_URL_STARTUP}/api/notification/remoforce/make-read`;
          setOpenNotification(false);
          setTabActive(2);
          navigate('/remoforce-dashboard/my_job');
        }
        axios
          .put(url, requestBody)
          .then((response) => {
            if (response.data === 'made read') {
              setRefresh(!refresh);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (notification.status === 'read') {
        if (notification.stage === 'application-request') {
          setOpenNotification(false);

          navigate(`/dashboard/${notification.jobType}/${notification.jobId}/view-applicants`);
        }
        if (
          notification.stage === 'application-acceptance' ||
          notification.stage === 'acceptance'
        ) {
          setOpenNotification(false);
          setTabActive(1);
          navigate('/remoforce-dashboard/my_job');
        }
        if (notification.stage === 'application-rejection') {
          setOpenNotification(false);
          setTabActive(3);
          navigate('/remoforce-dashboard/my_job');
        }
        if (notification.stage === 'interview-schedule') {
          setOpenNotification(false);
          setTabActive(2);
          navigate('/remoforce-dashboard/my_job');
        }
      }
    }
  };

  const handleSortMessages = (sortValue) => {
    console.log(sortValue);
  };

  return (
    <div className="menu  bg-white dropdown-content  shadow-2xl rounded-md mt-10  -mr-14">
      {openNotification && (
        <div className="p-4 text-sm 500:w-[440px] 400:w-[400px] 300:w-[300px] w-full  xs:-mr-10">
          <div className="rounded-xl">
            <div className="w-full lg:flex border-b-2 justify-between items-center pb-2">
              <div className="flex items-center gap-2 rounded-md">
                <h3 className="font-bold">Notification</h3>
                <select
                  defaultValue="All"
                  onChange={(e) => handleSortMessages(e.target.value)}
                  className="border-0 text-sm py-0"
                  name="filter"
                  id="filter"
                >
                  <option value="All">All</option>
                  <option value="Unread">Unread</option>
                  <option value="Seen">Seen</option>
                </select>
              </div>
              <div>
                <button className="flex items-center mt-3 lg:mt-0 md:mt-0 gap-2" type="button">
                  <span>Mark all as read </span>
                  <BsCheckCircle />
                </button>
              </div>
            </div>
            <div
              className={`w-full ${allNotifications.length > 8 && 'overflow-y-scroll'} h-[450px]`}
            >
              {allNotifications.length ? (
                <>
                  {notificationsUnread.length
                    ? notificationsUnread.map((unread) => (
                        <button
                          type="button"
                          onClick={() => handleNotification(unread)}
                          key={unread._id}
                          className="flex text-start items-center gap-4 p-2 border-b-2 bg-gray-300"
                        >
                          <p>
                            <BsFillChatLeftTextFill />
                          </p>
                          <p>
                            You have a <span className="font-bold">{unread.stage}</span> for &nbsp;
                            <span className="font-bold">{unread.jobTitle}</span> &nbsp;
                            <span className="">
                              {user?.user?.role === 'remoforce' && 'from '}
                              {user?.user?.role === 'startup' && 'with '}
                            </span>
                            <span className="font-bold">
                              {user?.user?.role === 'remoforce' && unread.startupName}
                              {user?.user?.role === 'startup' && unread.remoforceName}
                            </span>
                          </p>
                        </button>
                      ))
                    : ''}

                  {notificationsRead.length
                    ? notificationsRead.map((read) => (
                        <button
                          type="button"
                          onClick={() => handleNotification(read)}
                          key={read._id}
                          className="flex w-full items-center text-start gap-4 p-2 border-b-2"
                        >
                          <p>
                            <BsFillChatLeftTextFill />
                          </p>
                          <p>
                            You have a <span className="font-bold">{read.stage}</span> for &nbsp;
                            <span className="font-bold">{read.jobTitle}</span>{' '}
                            <span className="">
                              {user?.user?.role === 'remoforce' && 'from '}
                              {user?.user?.role === 'startup' && 'with '}
                            </span>
                            <span className="font-bold">
                              {user?.user?.role === 'remoforce' && read.startupName}
                              {user?.user?.role === 'startup' && read.remoforceName}
                            </span>
                          </p>
                        </button>
                      ))
                    : ''}
                </>
              ) : (
                <p className="grid place-items-center h-full">No notifications</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationModal;
