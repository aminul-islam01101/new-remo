import axios from 'axios';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Rafs() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const aT = searchParams.get('aT');
  console.log(aT);

  const handleAddEvent = async () => {
    const event = {
      title,
      description,
      start,
      end,
      aT,
    };

    axios
      .post('http://localhost:8000/calender/create-event', event)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAccess = async () => {
    const email = 'webewe63fdf82@3mkz.com';
    try {
      window.open(`http://localhost:8000/calender/access/${email}`, '_self');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleAccess} className="">
        access calender
      </button>
      <h1>Add Event</h1>
      <form>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Start:
          <input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} />
        </label>
        <br />
        <label>
          End:
          <input type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleAddEvent}>
          Add Event
        </button>
      </form>
    </div>
  );
}

export default Rafs;
