import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table, { AvatarCell, SelectColumnFilter, StatusPill } from './Table';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import SuccessAlert from '../../shared/Modals/sucessAlert';
import ErrorAlert from '../../shared/Modals/errorAlert';


// Define Base Url
const BASE_URL = process.env.REACT_APP_API_URL;

const ActionButtons = ({ row, onDelete }) => {
  return (
    <div className="flex space-x-1">
      <Link to='/dashboard/create-game'>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
          View
        </button>
      </Link>
      <button
        onClick={() => onDelete(row.original)}
        className="bg-red hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
      >
        Delete
      </button>
    </div>
  );
};

function Home() {
  // Define our states
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/user/all-games`)
        setDatas(response.data);
      } catch (error) {
        console.log('error fetching data', error)
        
      }
    };
    fetchGames();
  }, [])

  // Handle Add Game Button
  const AddGame = async () => {
    const data = {
      date: new Date().toISOString(),
    };
    setLoading(true);
    setShowAlert(false);

    const MINIMUM_LOADING_TIME = 1000; 
    const startTime = Date.now();

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/admin/post/create-game`, data);
      console.log('Response:', response);

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MINIMUM_LOADING_TIME - elapsedTime);

      setTimeout(() => {
        console.log('Setting success message');
        setAlertMessage('Game Created successfully!');
        setShowAlert(true);
      }, remainingTime);
    } catch (error) {
      console.log('Error:', error);
      
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MINIMUM_LOADING_TIME - elapsedTime);

      setTimeout(() => {
        console.log('Setting error message');
        setAlertMessage('Failed to submit data!');
        setShowAlert(true);
      }, remainingTime);
    } finally {
      setLoading(false);
    }
  };


  // Handle Delete Game Button
  const handleDelete = async (game) => {
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}/api/v1/admin/post/delete-game/${game._id}`);
      setDatas((prevData) => prevData.filter((item) => item._id !== game._id));
      setAlertMessage('Game deleted successfully!');
      setShowAlert(true);
    } catch (error) {
      console.log("There is an error", error);
      ErrorAlert('Failed to delete game!');
      ErrorAlert(true);
    }finally{
      setLoading(false);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'S/N',
        accessor: (row, i) => i + 1,
      },
      {
        Header: 'ID',
        accessor: 'game_id',
      },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => {
          const formattedDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }).format(new Date(value));
          return formattedDate;
        },
      },
      {
        Header: 'Action',
        accessor: 'action',
        Cell: ({ row }) => (
          <ActionButtons row={row} onDelete={handleDelete} />
        ),
      },
    ],
    []
  );

  

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div>
          <h1 className="text-xl font-semibold">
            <button
              onClick={AddGame}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color="#ffffff" /> : 'Add a New Game'}
            </button>
          </h1>
        </div>
        <div className="mt-6">
          <Table columns={columns} data={datas} />
        </div>
        {showAlert && (
          <SuccessAlert
            message={alertMessage}
            onClose={() => setShowAlert(false)}
          />
        )}
      </main>
    </div>
  );
}

export default Home;
