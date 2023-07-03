/* eslint-disable react/prop-types */
import { useEffect } from 'react';

const Weakness = ({ setWeaknessLength, weakness, setWeakness }) => {
  const removeSkill = (i) => {
    setWeakness((prevSkills) => prevSkills.filter((_, index) => index !== i));
  };

  const addSkill = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const value = e.target.value.trim();
      if (weakness.some((skill) => skill.toLowerCase() === value.toLowerCase())) {
        alert('No duplicate value allowed');
      } else {
        setWeakness((prevSkills) => [...prevSkills, value]);
        e.target.value = '';
      }
    } else if (e.key === 'Backspace' && e.target.value === '') {
      removeSkill(weakness.length - 1);
    }
  };

  useEffect(() => {
    setWeaknessLength(weakness.length); // Call onStrengthsLength when skills change
  }, [weakness, setWeaknessLength]);

  return (
    <div className="mt-4 flex flex-col items-center border border-cyan-300 p-5 shadow-xl rounded-lg w-full">
      <h2 className="xl:text-xl font-bold mb-2">Candidate Weakness</h2>

      <div className="bg-white border border-gray-300 rounded-sm p-2 mt-4">
        <ul className="flex flex-wrap m-0 p-0 w-full">
          {weakness.map((skill, i) => (
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
            <input onKeyDown={addSkill} type="text" className="border-none w-full" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Weakness;
