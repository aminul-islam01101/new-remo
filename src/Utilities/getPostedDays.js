/* eslint-disable no-new-wrappers */
import { differenceInDays, parseISO } from 'date-fns';

const getPostedDays = (createdAt = '2023-05-19T09:09:24.851+00:00') => {
  const totalDays = differenceInDays(new Date(), parseISO(createdAt));
  return totalDays;
};
export default getPostedDays;
