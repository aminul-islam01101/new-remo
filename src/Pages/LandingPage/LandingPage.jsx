import React from 'react';
import Banner from './Banner';
import BenefitSection from './BenefitSection';
import RemoFeatures from './RemoFeatures';
import RemoInformation from './RemoInformation';
import ReviewSection from './ReviewSection';
import SectionForDEI from './SectionForDEI';

const LandingPage = () => (
  <>
    <Banner />
    <SectionForDEI />
    <BenefitSection />
    <RemoFeatures />
    <ReviewSection />
    <RemoInformation />
  </>
);

export default LandingPage;
