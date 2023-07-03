import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import contractJob from '../../../Assets/Startup/JobPost/contractsJob.svg';
import gigsJob from '../../../Assets/Startup/JobPost/gigsJob.svg';
import internJob from '../../../Assets/Startup/JobPost/internshipJob.svg';
import privateJob from '../../../Assets/Startup/JobPost/privateJobs.svg';
import publicJob from '../../../Assets/Startup/JobPost/publicJob.png';
import shadowingJob from '../../../Assets/Startup/JobPost/shadowingJob.svg';

const PostJobCategories = [
  {
    _id: '63f59a77781227375bcb71ba',
    categoryImage: publicJob,
    // categoryImage: 'https://f004.backblazeb2.com/file/image-bucket-01101/Group+566.png',
    description:
      'Jobs posted here are ot limited to only our vetted talents. We open it to everyone on the internet and any and everyone can apply.',
    categoryName: 'Public Job',
    comingSoon: 'false',
  },
  {
    _id: '63f59a77781227375bcb71bb',
    categoryImage: privateJob,
    // categoryImage: 'https://f004.backblazeb2.com/file/image-bucket-01101/Private+jobs.svg',
    description:
      'Jobs in this category are totally private, and only open to our vetted talents. We offer high quality assurance for these jobs and mediate in between',
    categoryName: 'Private Job',
    comingSoon: 'false',
  },
  {
    _id: '63f59a77781227375bcb71bc',
    categoryImage: internJob,
    // categoryImage: 'https://f004.backblazeb2.com/file/image-bucket-01101/Internship.svg',
    description:
      'This is a kind of job where you are concerned with training the talents to grow, it can be paid or unpaid and you commit to certify them on completion',
    categoryName: 'Internship',
    comingSoon: 'false',
  },
  {
    _id: '63f59a77781227375bcb71bd',
    categoryImage: contractJob,
    // categoryImage: 'https://f004.backblazeb2.com/file/image-bucket-01101/contracts.svg',
    description:
      'You can handover your tech and non tech projects to us, we will recruit the team, gather the resource, micro-mange the project till its done',
    categoryName: 'Contracts',
    comingSoon: 'false',
  },
  {
    _id: '63f59a77781227375bcb71be',
    categoryImage: gigsJob,
    // categoryImage: 'https://f004.backblazeb2.com/file/image-bucket-01101/Gigs.svg',
    description:
      'You need someone to do simple task, small tasks, no matter how small the task is, post it here and our talents will do the tasks for you',
    categoryName: 'Gigs',
    comingSoon: 'false',
  },
  {
    _id: '63f59a77781227375bcb71bf',
    categoryImage: shadowingJob,
    // categoryImage: 'https://f004.backblazeb2.com/file/image-bucket-01101/Shadowing.svg',
    description:
      'The flexible and  permissionsless job platform. Its job with social good. Pay talents while ADA  they are learning on the job, while we do the certification.',
    categoryName: 'Shadowing',
    comingSoon: 'false',
  },
];

const PostJob = () => {
  const { data: categories } = useQuery(['categories'], () =>
    axios.get(`${import.meta.env.VITE_APP_URL_STARTUP}/api/job/categories`).then((res) => res.data)
  );
  console.log(categories);
  return (
    <section className="flex flex-col w-full">
      <h1 className="text-4xl font-semibold">Post Job</h1>
      <div className="h-[2px] w-full bg-slate-500 mt-4" />
      <p className=" font-semibold text-[#999999] mt-4">
        We have different kind of jobs that you may want to post, this is where you get the jobs
        posted and it will automatically be sent to the matching talents, do not forget to put the
        qualifiers so only the right talent will apply.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-5 xl:gap-10 mt-10 px-10 md:px-0">
        {PostJobCategories.map((item) => (
          <div
            key={item._id}
            className="flex flex-col justify-between  border   rounded-[10px]  items-center py-16 space-y-3 px-4 md:px-0 jobPostCardShaddow"
          >
            <div>
              <img src={item.categoryImage} className="w-full" alt="" />
            </div>
            <div className="flex flex-col items-center text-center space-y-5 px-4">
              <span className="text-2xl font-bold">{item.categoryName}</span>
              <p className="text-xs text-[#999999] font-bold">{item.description}</p>
              {item.comingSoon === 'false' && (
                <Link
                  className="border py-1 text-sm font-bold px-6 rounded-3xl border-black  "
                  to={`/dashboard/post-job/${item.categoryName.replace(/ /g, '-').toLowerCase()}`}
                >
                  Create
                </Link>
              )}
              {item.comingSoon === 'true' && (
                <Link
                  className=""
                  to={`/dashboard/post-job/${item.categoryName.replace(/ /g, '-').toLowerCase()}`}
                >
                  <button
                    disabled
                    type="button"
                    className="border-2 py-1 text-sm font-bold px-6 rounded-3xl disabled:text-gray-400 "
                  >
                    Coming Soon
                  </button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PostJob;
