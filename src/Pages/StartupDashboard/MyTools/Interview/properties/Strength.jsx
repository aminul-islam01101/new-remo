/* eslint-disable react/prop-types */
import { useEffect } from 'react';

const Strength = ({ onStrengthsLength, strength, setStrength }) => {
  const removeSkill = (i) => {
    setStrength((prevSkills) => prevSkills.filter((_, index) => index !== i));
  };

  const addSkill = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const value = e.target.value.trim();
      if (strength.some((skill) => skill.toLowerCase() === value.toLowerCase())) {
        alert('No duplicate value allowed');
      } else {
        setStrength((prevSkills) => [...prevSkills, value]);
        e.target.value = '';
      }
    } else if (e.key === 'Backspace' && e.target.value === '') {
      removeSkill(strength.length - 1);
    }
  };

  useEffect(() => {
    onStrengthsLength(strength.length); // Call onStrengthsLength when skills change
  }, [strength, onStrengthsLength]);

  return (
    <div className="flex flex-col items-center mt-4 border border-cyan-300 p-5 shadow-xl rounded-lg w-full">
      <h2 className="xl:text-xl font-bold mb-2">Candidate Strength</h2>

      <div className="bg-white border border-gray-300 rounded-sm p-2 mt-4">
        <ul className="flex flex-wrap m-0 p-0 w-full">
          {strength.map((skill, i) => (
            <li
              key={Math.random()}
              className="flex items-center bg-blue-500 rounded-sm text-white m-1 p-1"
            >
              {skill}
              <button
                type="button"
                className="flex items-center justify-center bg-gray-700 text-white cursor-pointer h-5 w-5 rounded-full text-sm ml-2 transform rotate-45"
                onClick={() => removeSkill(i)}
              >
                +
              </button>
            </li>
          ))}
          <li className="bg-transparent">
            <input
              onKeyDown={addSkill}
              type="text"
              className="border-none w-full min-w-14 focus:outline-none"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Strength;
