import { useState } from 'react';

const Table = ({ ApplicantData }) => {
  const sortedData = ApplicantData.sort((a, b) => b.score - a.score);
  const [rowCount, setRowCount] = useState(sortedData.length); // Track the number of rows to show

  const handleRowCountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setRowCount(value);
  };

  const visibleData = sortedData.slice(0, rowCount);

  return (
    <>
      <h1 className="text-center font-bold text-xl pt-16 pb-4">RESULTS</h1>
      <div className="mb-3">
        <p className="text-center mb-2">How Many Candidates do You Want To Qualify: </p>
        <div className="flex justify-center">
          <input
            type="number"
            autoComplete="off"
            id="Input"
            className="mt-1 block text-center shadow-sm  border border-black rounded-md h-9 p-2"
            onChange={handleRowCountChange}
            value={rowCount}
          />
        </div>
      </div>
      <div className="container mx-auto flex justify-center">
        <table className="table-auto border border-black">
          <thead>
            <tr className="text-sm">
              <th className="p-2 text-gray-800 font-semibold border border-black">First Name</th>
              <th className="p-2 text-gray-800 font-semibold border border-black">Last Name</th>
              <th className="p-2 text-gray-800 font-semibold border border-black">Email</th>
              <th className="p-2 text-gray-800 font-semibold border border-black">Age</th>
              <th className="p-2 text-gray-800 font-semibold border border-black">Gender</th>
              <th className="p-2 text-gray-800 font-semibold border border-black">Nationality</th>
              <th className="p-2 text-gray-800 font-semibold border border-black">Background</th>
              <th className="p-2 text-gray-800 font-semibold border border-black">Skills</th>
              <th className="p-2 text-gray-800 font-semibold border border-black">Strength</th>
              <th className="p-2 text-gray-800 font-semibold border border-black">Weakness</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((item) => (
              <tr key={Math.random()} className="text-sm">
                <td className="border p-2 border-black">{item.firstName}</td>
                <td className="border p-2 border-black">{item.lastName}</td>
                <td className="border p-2 border-black">{item.email}</td>
                <td className="border p-2 border-black">{item.age}</td>
                <td className="border p-2 border-black">{item.gender}</td>
                <td className="border p-2 border-black">{item.nationality}</td>
                <td className="border p-2 border-black">{item.background}</td>
                <td className="border p-2 border-black">{item.skills?.join(', ')}</td>
                <td className="border p-2 border-black">{item.strength?.join(', ')}</td>
                <td className="border p-2 border-black">{item.weakness?.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
