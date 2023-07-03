import { useEffect, useState } from 'react';
import MyToolNavbar from './MyToolNavbar';
import Table from './Table';
import User from './User'; // Import the User component

const ExcelUploader = () => {
  const [data, setData] = useState([]);
  const [tempdata, setTempdata] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(true);
  const [resetSkills, setResetSkills] = useState(false);
  const [skills, setSkills] = useState([]);
  const [strength, setStrength] = useState([]);
  const [weakness, setWeakness] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showeModal, setShoweModal] = useState(false);
  const [editedCandidate, setEditedCandidate] = useState({}); // Add this line

  const openModal = (candidate) => {
    setEditedCandidate(candidate);
    setShoweModal(true);
  };

  const handleEditCandidate = (e) => {
    e.preventDefault();

    // Find the index of the edited candidate in the tempdata array
    const index = tempdata.findIndex((candidate) => candidate.id === editedCandidate.id);

    // Create a new array with the updated candidate data
    const updatedTempData = [...tempdata];
    updatedTempData[index] = editedCandidate;

    // Update the tempdata array
    setTempdata(updatedTempData);

    // Close the modal
    setShoweModal(false);
  };

  // Add new candidate
  const [candidate, setCandidate] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    age: '',
    nationality: '',
    background: '',
  });

  useEffect(() => {
    const initialSkills = data.find((item) => item.email === data[currentIndex].email);

    console.log(initialSkills);
    if (initialSkills?.skills) {
      setSkills(initialSkills.skills);
      setStrength(initialSkills.strength);
      setWeakness(initialSkills.weakness);
    }
  }, [currentIndex, data]);

  const handleCandidateSubmit = (e) => {
    e.preventDefault();

    const newCandidate = {
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      email: candidate.email,
      gender: candidate.gender,
      age: candidate.age,
      nationality: candidate.nationality,
      background: candidate.background,
      score: 0,
    };

    setTempdata((prevData) => [...prevData, newCandidate]);

    // Reset the candidate form fields
    setCandidate({
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      age: '',
      nationality: '',
      background: '',
    });

    // Close the modal
    setShowModal(false);
  };
  const handleCandidateSubmitin = (e) => {
    e.preventDefault();

    const newCandidate = {
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      email: candidate.email,
      gender: candidate.gender,
      age: candidate.age,
      nationality: candidate.nationality,
      background: candidate.background,
      score: 0,
    };

    setData((prevData) => [...prevData, newCandidate]);

    // Reset the candidate form fields
    setCandidate({
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      age: '',
      nationality: '',
      background: '',
    });

    // Close the modal
    setShowModal(false);
  };

  // Start Round Button
  const handleStartRound = () => {
    setData((prevData) => [...prevData, ...tempdata]);
    setTempdata([]);
  };
  // Delete Candidate
  const deleteCandidate = (index) => {
    const newData = [...tempdata];
    newData.splice(index, 1); // Remove candidate at specified index
    setTempdata(newData); // Update the tempdata array
  };
  // next button handler
  const handleNext = () => {
    const score = skills.length + strength.length - weakness.length;

    const dataToUpdateIndex = data.findIndex((item) => item.email === data[currentIndex].email);
    const updatedData = [...data];

    if (dataToUpdateIndex !== -1) {
      const dataToUpdate = { ...updatedData[dataToUpdateIndex] };
      dataToUpdate.score = score;
      dataToUpdate.skills = skills;
      dataToUpdate.strength = strength;
      dataToUpdate.weakness = weakness;

      updatedData[dataToUpdateIndex] = dataToUpdate;
    }

    setData(updatedData);

    // console.log(data[currentIndex].email)
    // setResetSkills(true);
    setStrength([]);
    setWeakness([]);
    setSkills([]);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
    // setResetSkills(false);
  };
  // show result button handler
  const handleShowResult = () => {
    const score = skills.length + strength.length - weakness.length;

    const dataToUpdateIndex = data.findIndex((item) => item.email === data[currentIndex].email);
    const updatedData = [...data];

    if (dataToUpdateIndex !== -1) {
      const dataToUpdate = { ...updatedData[dataToUpdateIndex] };
      dataToUpdate.score = score;
      dataToUpdate.skills = skills;
      dataToUpdate.strength = strength;
      dataToUpdate.weakness = weakness;

      updatedData[dataToUpdateIndex] = dataToUpdate;
    }

    setData(updatedData);

    setShowResult(false);

    // from here

    // console.log(data[currentIndex].email)
    // setResetSkills(true);
  };

  //   console.log(currentIndex);
  console.log(data);
  return (
    <div>
      <MyToolNavbar />
      {showResult ? (
        <div>
          {data.length === 0 && (
            <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-5">
              <div className="w-full py-5 shadow-xl rounded-xl border-white border-2">
                <div className="flex items-center justify-center">
                  {/* Add Candidate button */}
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="bg-purple-500 hover:bg-purple-600 text-white border-2 font-bold  py-2 px-4 rounded mt-4 mb-6"
                  >
                    Add Candidate
                  </button>

                  {/* Add Candidate  Modal */}
                  {showModal && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                      <div className="flex items-center justify-center min-h-screen px-4">
                        <div className="fixed inset-0 transition-opacity">
                          <div className="absolute inset-0 bg-gray-500 opacity-75" />
                        </div>

                        <div className="bg-white rounded-lg px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl transform transition-all lg:w-1/3">
                          <div className="w-full">
                            <div className="mt-3 ">
                              <h3
                                className="text-lg leading-6 font-medium text-gray-900 text-center"
                                id="modal-title"
                              >
                                Add Candidate
                              </h3>
                              <div className="mt-2">
                                <form
                                  onSubmit={handleCandidateSubmit}
                                  className="p-3"
                                  autoComplete="off"
                                >
                                  <div className="mb-3">
                                    <label
                                      htmlFor="firstNameInput"
                                      className="block text-sm font-medium text-gray-700 text-left"
                                    >
                                      First Name
                                    </label>
                                    <input
                                      type="text"
                                      autoComplete="off"
                                      id="firstNameInput"
                                      className="mt-1 block w-full shadow-sm  border border-black rounded-md h-9 p-2"
                                      required
                                      value={candidate.firstName}
                                      onChange={(e) =>
                                        setCandidate((prevCandidate) => ({
                                          ...prevCandidate,
                                          firstName: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                  <div className="mb-3 ">
                                    <label
                                      htmlFor="lastNameInput"
                                      className="block text-sm font-medium text-gray-700 text-left"
                                    >
                                      Last Name
                                    </label>
                                    <input
                                      type="text"
                                      id="lastNameInput"
                                      autoComplete="off"
                                      required
                                      className="mt-1 block w-full shadow-sm  border border-black rounded-md h-9 p-2"
                                      value={candidate.lastName}
                                      onChange={(e) =>
                                        setCandidate((prevCandidate) => ({
                                          ...prevCandidate,
                                          lastName: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="emailInput"
                                      className="block text-sm font-medium text-gray-700 text-left"
                                    >
                                      Email
                                    </label>
                                    <input
                                      type="email"
                                      id="emailInput"
                                      autoComplete="off"
                                      className="mt-1 block w-full shadow-sm  border border-black rounded-md h-9 p-2"
                                      required
                                      value={candidate.email}
                                      onChange={(e) =>
                                        setCandidate((prevCandidate) => ({
                                          ...prevCandidate,
                                          email: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="ageInput"
                                      className="block text-sm font-medium text-gray-700 text-left"
                                    >
                                      Age
                                    </label>
                                    <input
                                      type="number"
                                      autoComplete="off"
                                      id="ageInput"
                                      className="mt-1 block w-full shadow-sm  border border-black rounded-md h-9 p-2"
                                      value={candidate.age}
                                      onChange={(e) =>
                                        setCandidate((prevCandidate) => ({
                                          ...prevCandidate,
                                          age: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="genderInput"
                                      className="block text-sm font-medium text-gray-700 text-left"
                                    >
                                      Gender
                                    </label>
                                    <select
                                      id="genderInput"
                                      className="mt-1 block w-full shadow-sm border border-black rounded-md h-9 p-2"
                                      required
                                      value={candidate.gender}
                                      onChange={(e) =>
                                        setCandidate((prevCandidate) => ({
                                          ...prevCandidate,
                                          gender: e.target.value,
                                        }))
                                      }
                                    >
                                      <option value="" />
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                      <option value="Other">Other</option>
                                    </select>
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="nationalityInput"
                                      className="block text-sm font-medium text-gray-700 text-left"
                                    >
                                      Nationality
                                    </label>
                                    <input
                                      type="text"
                                      autoComplete="off"
                                      id="nationalityInput"
                                      className="mt-1 block w-full shadow-sm  border border-black rounded-md h-9 p-2"
                                      value={candidate.nationality}
                                      onChange={(e) =>
                                        setCandidate((prevCandidate) => ({
                                          ...prevCandidate,
                                          nationality: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="backgroundInput"
                                      className="block text-sm font-medium text-gray-700 text-left"
                                    >
                                      Background
                                    </label>
                                    <input
                                      type="text"
                                      autoComplete="off"
                                      id="backgroundInput"
                                      className="mt-1 block w-full shadow-sm  border border-black rounded-md h-9 p-2"
                                      required
                                      value={candidate.background}
                                      onChange={(e) =>
                                        setCandidate((prevCandidate) => ({
                                          ...prevCandidate,
                                          background: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                  <div className="mt-4 flex justify-center">
                                    <button
                                      type="submit"
                                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                      Submit
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setShowModal(false)}
                                      className="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <hr className="text-white mb-6" />
                <h1 className="text-white font-bold text-xl text-center mb-3">Candidate Details</h1>
                <div className="w-11/12 mx-auto overflow-auto">
                  <table className="table-auto w-full border border-black bg-white shadow-xl">
                    <thead>
                      <tr className="text-sm">
                        <th className="p-2 text-gray-800 font-semibold border border-black ">
                          First Name
                        </th>
                        <th className="p-2 text-gray-800 font-semibold border border-black">
                          Last Name
                        </th>
                        <th className="p-2 text-gray-800 font-semibold border border-black">
                          Email
                        </th>
                        <th className="p-2 text-gray-800 font-semibold border border-black">Age</th>
                        <th className="p-2 text-gray-800 font-semibold border border-black">
                          Gender
                        </th>
                        <th className="p-2 text-gray-800 font-semibold border border-black">
                          Nationality
                        </th>
                        <th className="p-2 text-gray-800 font-semibold border border-black">
                          Background
                        </th>
                        <th className="p-2 text-gray-800 font-semibold border border-black">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tempdata.map((candidateData, index) => (
                        <tr key={Math.random()}>
                          <td className="border p-2  border-black text-center">
                            {candidateData.firstName}
                          </td>
                          <td className="border p-2  border-black text-center">
                            {candidateData.lastName}
                          </td>
                          <td className="border p-2  border-black text-center">
                            {candidateData.email}
                          </td>
                          <td className="border p-2  border-black text-center">
                            {candidateData.age}
                          </td>
                          <td className="border p-2  border-black text-center">
                            {candidateData.gender}
                          </td>
                          <td className="border p-2  border-black text-center">
                            {candidateData.nationality}
                          </td>
                          <td className="border p-2  border-black text-center">
                            {candidateData.background}
                          </td>
                          <td className="border p-2 flex gap-2  text-center">
                            <button
                              type="button"
                              onClick={() => openModal(candidateData)}
                              className="rounded-lg bg-green-600 text-white px-2"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteCandidate(index)}
                              className="rounded-lg bg-red-500 text-white px-2"
                            >
                              Delete
                            </button>

                            {/* Edit Candidate Modal */}
                            {showeModal && (
                              <div className="fixed z-10 inset-0 overflow-y-auto">
                                <div className="flex items-center justify-center min-h-screen px-4">
                                  <div className="fixed inset-0 transition-opacity">
                                    <div className="absolute inset-0 bg-gray-500 opacity-30" />
                                  </div>

                                  <div className="bg-white rounded-lg px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl transform transition-all lg:w-1/3">
                                    <div className="w-full">
                                      <div className="mt-3 ">
                                        <h3
                                          className="text-lg leading-6 font-medium text-gray-900 text-center"
                                          id="modal-title"
                                        >
                                          Edit Candidate
                                        </h3>
                                        <div className="mt-2">
                                          <form onSubmit={handleEditCandidate} className="p-3">
                                            <div className="mb-3">
                                              <label
                                                htmlFor="firstNameInput"
                                                className="block text-sm font-medium text-gray-700 text-left"
                                              >
                                                First Name
                                              </label>
                                              <input
                                                type="text"
                                                id="firstNameInput"
                                                className="mt-1 block w-full shadow-sm  border border-black rounded-md h-8"
                                                required
                                                value={editedCandidate.firstName}
                                                onChange={(e) =>
                                                  setEditedCandidate((prevCandidate) => ({
                                                    ...prevCandidate,
                                                    firstName: e.target.value,
                                                  }))
                                                }
                                              />
                                            </div>
                                            <div className="mb-3 ">
                                              <label
                                                htmlFor="lastNameInput"
                                                className="block text-sm font-medium text-gray-700 text-left"
                                              >
                                                Last Name
                                              </label>
                                              <input
                                                type="text"
                                                id="lastNameInput"
                                                required
                                                className="mt-1 block w-full shadow-sm  border border-black rounded-md h-8"
                                                value={editedCandidate.lastName}
                                                onChange={(e) =>
                                                  setEditedCandidate((prevCandidate) => ({
                                                    ...prevCandidate,
                                                    lastName: e.target.value,
                                                  }))
                                                }
                                              />
                                            </div>
                                            <div className="mb-3">
                                              <label
                                                htmlFor="emailInput"
                                                className="block text-sm font-medium text-gray-700 text-left"
                                              >
                                                Email
                                              </label>
                                              <input
                                                type="email"
                                                id="emailInput"
                                                className="mt-1 block w-full shadow-sm  border border-black rounded-md h-8"
                                                required
                                                value={editedCandidate.email}
                                                onChange={(e) =>
                                                  setEditedCandidate((prevCandidate) => ({
                                                    ...prevCandidate,
                                                    email: e.target.value,
                                                  }))
                                                }
                                              />
                                            </div>
                                            <div className="mb-3">
                                              <label
                                                htmlFor="ageInput"
                                                className="block text-sm font-medium text-gray-700 text-left"
                                              >
                                                Age
                                              </label>
                                              <input
                                                type="number"
                                                autoComplete="off"
                                                id="ageInput"
                                                className="mt-1 block w-full shadow-sm  border border-black rounded-md h-9 p-2"
                                                value={editedCandidate.age}
                                                onChange={(e) =>
                                                  setEditedCandidate((prevCandidate) => ({
                                                    ...prevCandidate,
                                                    age: e.target.value,
                                                  }))
                                                }
                                              />
                                            </div>
                                            <div className="mb-3">
                                              <label
                                                htmlFor="genderInput"
                                                className="block text-sm font-medium text-gray-700 text-left"
                                              >
                                                Gender
                                              </label>
                                              <select
                                                id="genderInput"
                                                className="mt-1 block w-full shadow-sm border border-black rounded-md h-9 p-2"
                                                required
                                                value={editedCandidate.gender}
                                                onChange={(e) =>
                                                  setEditedCandidate((prevCandidate) => ({
                                                    ...prevCandidate,
                                                    gender: e.target.value,
                                                  }))
                                                }
                                              >
                                                <option value="" />
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                              </select>
                                            </div>
                                            <div className="mb-3">
                                              <label
                                                htmlFor="nationalityInput"
                                                className="block text-sm font-medium text-gray-700 text-left"
                                              >
                                                Nationality
                                              </label>
                                              <input
                                                type="text"
                                                autoComplete="off"
                                                id="nationalityInput"
                                                className="mt-1 block w-full shadow-sm  border border-black rounded-md h-9 p-2"
                                                value={editedCandidate.nationality}
                                                onChange={(e) =>
                                                  setEditedCandidate((prevCandidate) => ({
                                                    ...prevCandidate,
                                                    nationality: e.target.value,
                                                  }))
                                                }
                                              />
                                            </div>
                                            <div className="mb-3">
                                              <label
                                                htmlFor="backgroundInput"
                                                className="block text-sm font-medium text-gray-700 text-left"
                                              >
                                                Background
                                              </label>
                                              <input
                                                type="text"
                                                autoComplete="off"
                                                id="backgroundInput"
                                                className="mt-1 block w-full shadow-sm  border border-black rounded-md h-9 p-2"
                                                required
                                                value={editedCandidate.background}
                                                onChange={(e) =>
                                                  setEditedCandidate((prevCandidate) => ({
                                                    ...prevCandidate,
                                                    background: e.target.value,
                                                  }))
                                                }
                                              />
                                            </div>
                                            <div className="mt-4 flex justify-center">
                                              <button
                                                type="submit"
                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                              >
                                                Submit
                                              </button>
                                              <button
                                                type="button"
                                                onClick={() => setShoweModal(false)}
                                                className="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                              >
                                                Cancel
                                              </button>
                                            </div>
                                          </form>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleStartRound}
                    className="bg-purple-500 hover:bg-purple-600 text-white border-2 font-bold  mt-4 py-2 px-4 rounded "
                  >
                    Start Round
                  </button>
                </div>
              </div>
            </div>
          )}

          {data.length > 0 && (
            <div>
              <User
                user={data[currentIndex]}
                setResetSkills={setResetSkills}
                resetSkills={resetSkills}
                skills={skills}
                setSkills={setSkills}
                strength={strength}
                setStrength={setStrength}
                weakness={weakness}
                setWeakness={setWeakness}
              />
              <div />
              <div className="flex justify-center mt-4">
                <div>
                  {/* Modal */}
                  {showModal && (
                    <div className="fixed z-10 inset-0 overflow-y-auto">
                      <div className="flex items-center justify-center min-h-screen px-4">
                        <div className="fixed inset-0 transition-opacity">
                          <div className="absolute inset-0 bg-gray-500 opacity-75" />
                        </div>

                        <div className="bg-white rounded-lg px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl transform transition-all lg:w-1/4">
                          <div className="w-full">
                            <div className="mt-3 ">
                              <h3
                                className="text-lg leading-6 font-medium text-gray-900 text-center"
                                id="modal-title"
                              >
                                Add Candidate
                              </h3>
                              <div className="mt-2">
                                <form onSubmit={handleCandidateSubmitin} className="p-3">
                                  <div className="mb-3">
                                    <label
                                      htmlFor="firstNameInput"
                                      className="block text-sm font-medium text-gray-700 text-left"
                                    >
                                      First Name
                                    </label>
                                    <input
                                      type="text"
                                      id="firstNameInput"
                                      className="mt-1 block w-full shadow-sm  border border-black rounded-md h-8"
                                      required
                                      value={candidate.firstName}
                                      onChange={(e) =>
                                        setCandidate((prevCandidate) => ({
                                          ...prevCandidate,
                                          firstName: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                  <div className="mb-3 ">
                                    <label
                                      htmlFor="lastNameInput"
                                      className="block text-sm font-medium text-gray-700 text-left"
                                    >
                                      Last Name
                                    </label>
                                    <input
                                      type="text"
                                      id="lastNameInput"
                                      required
                                      className="mt-1 block w-full shadow-sm  border border-black rounded-md h-8"
                                      value={candidate.lastName}
                                      onChange={(e) =>
                                        setCandidate((prevCandidate) => ({
                                          ...prevCandidate,
                                          lastName: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="emailInput"
                                      className="block text-sm font-medium text-gray-700 text-left"
                                    >
                                      Email
                                    </label>
                                    <input
                                      type="email"
                                      id="emailInput"
                                      className="mt-1 block w-full shadow-sm  border border-black rounded-md h-8"
                                      required
                                      value={candidate.email}
                                      onChange={(e) =>
                                        setCandidate((prevCandidate) => ({
                                          ...prevCandidate,
                                          email: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="ageInput"
                                      className="block text-sm font-medium text-gray-700 text-left"
                                    >
                                      Age
                                    </label>
                                    <input
                                      type="number"
                                      autoComplete="off"
                                      id="ageInput"
                                      className="mt-1 block w-full shadow-sm  border border-black rounded-md h-9 p-2"
                                      value={candidate.age}
                                      onChange={(e) =>
                                        setCandidate((prevCandidate) => ({
                                          ...prevCandidate,
                                          age: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="genderInput"
                                      className="block text-sm font-medium text-gray-700 text-left"
                                    >
                                      Gender
                                    </label>
                                    <select
                                      id="genderInput"
                                      className="mt-1 block w-full shadow-sm border border-black rounded-md h-9 p-2"
                                      required
                                      value={candidate.gender}
                                      onChange={(e) =>
                                        setCandidate((prevCandidate) => ({
                                          ...prevCandidate,
                                          gender: e.target.value,
                                        }))
                                      }
                                    >
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                      <option value="Other">Other</option>
                                    </select>
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="nationalityInput"
                                      className="block text-sm font-medium text-gray-700 text-left"
                                    >
                                      Nationality
                                    </label>
                                    <input
                                      type="text"
                                      autoComplete="off"
                                      id="nationalityInput"
                                      className="mt-1 block w-full shadow-sm  border border-black rounded-md h-9 p-2"
                                      value={candidate.nationality}
                                      onChange={(e) =>
                                        setCandidate((prevCandidate) => ({
                                          ...prevCandidate,
                                          nationality: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="backgroundInput"
                                      className="block text-sm font-medium text-gray-700 text-left"
                                    >
                                      Background
                                    </label>
                                    <input
                                      type="text"
                                      autoComplete="off"
                                      id="backgroundInput"
                                      className="mt-1 block w-full shadow-sm  border border-black rounded-md h-9 p-2"
                                      required
                                      value={candidate.background}
                                      onChange={(e) =>
                                        setCandidate((prevCandidate) => ({
                                          ...prevCandidate,
                                          background: e.target.value,
                                        }))
                                      }
                                    />
                                  </div>
                                  <div className="mt-4 flex justify-center">
                                    <button
                                      type="submit"
                                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                      Submit
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setShowModal(false)}
                                      className="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="grid  lg:grid-cols-3 grid-cols-2 gap-5">
                  {/* Add Candidate button */}
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="bg-blue-500  hover:bg-blue-700 text-white font-bold rounded lg:px-5 lg:py-3 px-2 py-1"
                  >
                    Add Candidate
                  </button>
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded lg:px-5 px-2 py-1 lg:py-3 ${
                      currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Previous
                  </button>
                  {currentIndex === data.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleShowResult}
                      className="rounded border bg-red-300 lg:px-5 lg:py-3 px-2 py-1"
                    >
                      Show Result
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={currentIndex === data.length - 1}
                      className={`bg-blue-500  hover:bg-blue-700 text-white font-bold  rounded lg:px-5 lg:py-3 px-2 py-1 ${
                        currentIndex === data.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Table ApplicantData={data} />
      )}
    </div>
  );
};

export default ExcelUploader;
