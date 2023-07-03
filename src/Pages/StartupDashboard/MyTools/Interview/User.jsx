/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Skills from './properties/Skill';
import Strength from './properties/Strength';
import Weakness from './properties/Weakness';

const User = ({
  user,
  resetSkills,
  setResetSkills,
  skills,
  setSkills,
  strength,
  setStrength,
  weakness,
  setWeakness,
}) => {
  const [strengthsLength, setStrengthsLength] = useState(0);
  const [skillsLength, setSkillsLength] = useState(0);
  const [weaknessLength, setWeaknessLength] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0); // Add refreshKey state
  const handleStrengthsLength = (length) => {
    setStrengthsLength(length);
  };

  const handleSkillsLength = (length) => {
    setSkillsLength(length);
  };

  const handleWeaknessLength = (length) => {
    setWeaknessLength(length);
  };

  console.log(strengthsLength + skillsLength - weaknessLength);
  // const calculateResult = () => {
  //   const total = strengthsLength + skillsLength - weaknessLength;
  //   // user.score = total;
  //   return total;
  // };

  const clearFields = () => {
    setStrengthsLength(0);
    setSkillsLength(0);
    setWeaknessLength(0);
    setRefreshKey((prevKey) => prevKey + 1); // Increment refreshKey to remount child components
  };

  useEffect(() => {
    if (resetSkills) {
      clearFields();
      setResetSkills(false); // Reset the resetSkills state in the parent component
    }
  }, [resetSkills, setResetSkills]);

  return (
    <div className="py-5">
      <div className="relative mt-4">
        <div className="lg:text-2xl text-lg text-center">
          <h2 className="font-bold">
            Candidate Name:{' '}
            <span className="text-blue-500">
              {user.firstName} {user.lastName}
            </span>{' '}
          </h2>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-10 lg:gap-5 gap-2 w-full">
        <div className="flex">
          <Strength
            strength={strength}
            setStrength={setStrength}
            key={`strength_${refreshKey}`} // Add key prop for remounting
            onStrengthsLength={handleStrengthsLength}
          />
        </div>
        <div className="flex">
          <Skills
            skills={skills}
            user={user}
            setSkills={setSkills}
            key={`skills_${refreshKey}`} // Add key prop for remounting
            setSkillsLength={handleSkillsLength}
          />
        </div>
        <div className="flex">
          <Weakness
            key={`weakness_${refreshKey}`} // Add key prop for remounting
            setWeaknessLength={handleWeaknessLength}
            weakness={weakness}
            setWeakness={setWeakness}
          />
        </div>
      </div>
      {/* <div className="flex gap-5" /> */}
    </div>
  );
};

export default User;
