import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import MyToolNavbar from './MyToolNavbar';
import Table from './Table';
import User from './User';

const ExcelUploader = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(true);
  const [resetSkills, setResetSkills] = useState(false);
  const [skills, setSkills] = useState([]);
  const [strength, setStrength] = useState([]);
  const [weakness, setWeakness] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // Add new candidate
  const [candidate, setCandidate] = useState({
    firstName: '',
    lastName: '',
    email: '',
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
      score: 0,
    };

    setData((prevData) => [...prevData, newCandidate]);

    // Reset the candidate form fields
    setCandidate({
      firstName: '',
      lastName: '',
      email: '',
    });

    // Close the modal
    setShowModal(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const newData = new Uint8Array(event.target.result);
      console.log(newData);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const formattedData = jsonData.slice(1).map((row) => ({
        firstName: row[0],
        lastName: row[1],
        email: row[2],
        score: 0,
      }));

      setData(formattedData);
    };

    reader.readAsArrayBuffer(file);
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
            <div className="flex rounded-b-lg items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-5">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-8 border-2  rounded-lg">
                {data.length === 0 && (
                  <>
                    <label
                      htmlFor="fileUpload"
                      className="text-white font-bold lg:text-xl text-lg mb-4 md:inline block"
                    >
                      Upload your file here
                    </label>
                    <input
                      type="file"
                      id="fileUpload"
                      accept=".xlsx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById('fileUpload').click()}
                      className="bg-purple-500 hover:bg-purple-600 text-white border-2 w-full  font-bold ms-2 py-2 px-4 rounded"
                    >
                      Choose File
                    </button>
                    <h1 className="text-center text-white font-bold my-4">OR</h1>
                    <div className="flex items-center justify-center">
                      {/* Add Candidate button */}
                      <button
                        type="button"
                        onClick={() => setShowModal(true)}
                        className="bg-purple-500 hover:bg-purple-600 text-white border-2 text-sm font-bold ms-2 lg:py-2 py-1 lg:px-4 px-2 rounded mt-4"
                      >
                        Add Candidate Manually
                      </button>

                      {/* Modal */}
                      {showModal && (
                        <div className="fixed z-10 inset-0 overflow-y-auto">
                          <div className="flex items-center justify-center min-h-screen px-4">
                            <div className="fixed inset-0 transition-opacity">
                              <div className="absolute inset-0 bg-gray-500 opacity-75" />
                            </div>

                            <div className="bg-white rounded-lg px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl transform transition-all lg:w-1/3 w-full">
                              <div className="w-full">
                                <div className="mt-3 ">
                                  <h3
                                    className="text-lg leading-6 font-medium text-gray-900 text-center"
                                    id="modal-title"
                                  >
                                    Add First Candidate
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
                  </>
                )}
              </div>
            </div>
          )}

          {data.length > 0 && (
            <div className="py-5">
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

                        <div className="bg-white rounded-lg px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl transform transition-all w-1/4">
                          <div className="w-full">
                            <div className="mt-3 ">
                              <h3
                                className="text-lg leading-6 font-medium text-gray-900 text-center"
                                id="modal-title"
                              >
                                Add Candidate
                              </h3>
                              <div className="mt-2">
                                <form onSubmit={handleCandidateSubmit} className="p-3">
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
