import { useState } from 'react';

const MyToolNavbar = () => {
  const [reloadCounter, setReloadCounter] = useState(0);

  const handleReload = () => {
    setReloadCounter(reloadCounter + 1);
    window.location.reload();
  };

  return (
    <nav className="bg-gradient-to-r rounded-t-lg from-blue-500 to-purple-500">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-white font-bold lg:text-3xl text-lg">
              <button className="outline-none cursor-pointer" type="button" onClick={handleReload}>
                Interview Assistance
                <sub className="text-sm ps-1 md:inline block">By remostart</sub>
              </button>
            </h1>
          </div>
          <div className="ml-auto">
            <button
              type="button"
              className="lg:px-4 px-2 outline-none lg:py-2 py-1 font-medium text-white bg-blue-700 rounded-lg shadow-md hover:bg-blue-600"
            >
              More Tools
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MyToolNavbar;
