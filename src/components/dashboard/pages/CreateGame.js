import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import SuccessAlert from '../../../shared/Modals/sucessAlert';  
import ErrorAlert from '../../../shared/Modals/errorAlert';

const BASE_URL = process.env.REACT_APP_API_URL;

const CreateGame = () => {
  const [editModal, setEditModal] = useState(false);
  const [tableItems, setTableItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [formDatas, setFormDatas] = useState({
    prediction: "",
    odds: "",
    result: "",
    fixtures: "",
    time: "",
  });
  const [formData, setFormData] = useState({
    prediction: "",
    odds: "",
    result: "",
    fixtures: "",
    time: ""
  });

  const [itemId, setItemId] = useState(null);

  const { _id } = useParams();

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/user/all-games/${_id}`);
        console.log('API response:', response.data);

        if (response.data && Array.isArray(response.data.predictions)) {
          setTableItems(response.data.predictions);
        } else {
          console.error('Expected an object with predictions array but received:', response.data);
          setTableItems([]);
        }
      } catch (error) {
        console.error('There is an error', error);
        setTableItems([]);
      }
    };

    if (_id) {
      fetchPredictions();
    }
  }, [_id]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditOnChange = (e) => {
    const { name, value } = e.target;
    setFormDatas((prevData) => ({ ...prevData, [name]: value }));
    console.log(`Updated form data: ${name} = ${value}`);
  };

  const AddGames = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowAlert(false);
    try {
      const response = await axios.patch(`${BASE_URL}/api/v1/admin/post/add-game/${_id}`, formData, {
        withCredentials: true
      });

      console.log("Login response:", response);
  
      setModalOpen(false);
      setFormData({ prediction: '', time: '', odds: '', result: '', fixtures: '' });
      setAlertMessage('Game Created successfully!');
      setShowAlert(true);
    } catch (error) {
      console.error('There was an error submitting this form', error);
      ErrorAlert('Failed to submit data!');
      ErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleEditGame = (data) => {
    setFormDatas({
      prediction: data.prediction,
      odds: data.odds,
      result: data.result,
      fixtures: data.fixtures,
      time: data.time,
    });
    setItemId(data._id);
    setEditModal(true);
  };

  //handle edit Game
  const handleEditGameSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowAlert(false);
    try {
      const response = await axios.patch(`${BASE_URL}/api/v1/admin/post/edit-game/${_id}/item/${itemId}`, formDatas);
      setEditModal(false);
      setFormDatas({ prediction: '', time: '', odds: '', result: '', fixtures: '' });
      setAlertMessage('Game Updated successfully!');
      setShowAlert(true);
      // Optionally refetch the predictions to update the table
      const updatedResponse = await axios.get(`${BASE_URL}/api/v1/user/all-games/${_id}`);
      setTableItems(updatedResponse.data.predictions);
    } catch (error) {
      console.error('There was an error updating this game', error);
      ErrorAlert('Failed to update data!');
      ErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  //handle delete game
  const handleDeleteGame = async (itemId) => {
    setLoading(true);
    setShowAlert(false);
     try {
    
      await axios.delete(`${BASE_URL}/api/v1/admin/post/delete-game/${_id}/item/${itemId._id}`);
      setAlertMessage('Game Deleted successfully!');
      setShowAlert(true);
      // Refetch the predictions to update the table
      const updatedResponse = await axios.get(`${BASE_URL}/api/v1/user/all-games/${_id}`);
      setTableItems(updatedResponse.data.predictions);
      
     } catch (error) {
      console.error('There was an error deleting this game', error);
      ErrorAlert('Failed to delete data!');
      ErrorAlert(true);
      
     } finally{
      setLoading(false);
     }

  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:pl-[5rem]">
      <div className="items-start justify-between md:flex">
        <div className="mt-3 md:mt-0">
          <button
            onClick={() => setShowModal(true)}
            className="inline-block font-[Roboto] px-4 py-2 text-white duration-150
             font-medium bg-[#38bdf8] rounded-lg hover:bg-indigo-500 py-2 active:bg-indigo-700 md:text-lg"
          >
            Add Game
          </button>
        </div>
      </div>
      <div className="mt-12 font-[sans-serif] shadow-sm border rounded-lg overflow-x-auto">
      {tableItems.length > 0 ? (
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-red text-red font-medium border-b">
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-[14px] font-bold text-white leading-4 uppercase tracking-wide">S/N</th>
              <th className="px-6 py-3 bg-gray-50 text-[14px] font-bold text-white leading-4 uppercase tracking-wide">ID</th>
              <th className="px-6 py-3 bg-gray-50 text-[14px] font-bold text-white leading-4 uppercase tracking-wide">Time</th>
              <th className="px-6 py-3 bg-gray-50 text-[14px] font-bold text-white leading-4 uppercase tracking-wide">Odds</th>
              <th className="px-6 py-3 bg-gray-50 text-[14px] font-bold text-white leading-4 uppercase tracking-wide">Prediction</th>
              <th className="px-6 py-3 bg-gray-50 text-[14px] font-bold text-white leading-4 uppercase tracking-wide">Fixtures</th>
              <th className="px-6 py-3 bg-gray-50 text-[14px] font-bold text-white leading-4 uppercase tracking-wide">Result</th>
              <th className="px-6 py-3 bg-gray-50 text-[14px] font-bold text-white leading-4 uppercase tracking-wide">Actions</th> 
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y font-[sans-serif]">
            {tableItems.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 text-lg capitalize whitespace-nowrap">{idx + 1}</td>
                <td className="px-6 py-4 text-lg capitalize whitespace-nowrap">{item._id}</td>
                <td className="px-6 py-4 text-lg capitalize whitespace-nowrap">{item.time}</td>
                <td className="px-6 py-4 text-lg capitalize whitespace-nowrap">{item.odds}</td>
                <td className="px-6 py-4 text-lg capitalize whitespace-nowrap">{item.prediction}</td>
                <td className="px-6 py-4 text-lg capitalize whitespace-nowrap">{item.fixtures}</td>
                <td className="px-6 py-4 text-lg capitalize whitespace-nowrap">{item.result}</td>
                <td className="text-right px-6 whitespace-nowrap">
                  <button
                    onClick={() => handleEditGame(item)}
                    className="py-2 px-3 text-[#38bdf8] font-medium text-blue hover:text-indigo-500 
                    duration-150 hover:bg-blue rounded-lg text-lg"
                  >
                    Edit
                  </button>
                  <button
                     onClick={() => handleDeleteGame(item)}
                    className="py-2 leading-none text-lg px-3 font-medium text-red hover:text-red
                     duration-150 hover:bg-gray-50 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
           ) : (
            <p className="p-4 text-center text-gray-600">No games available.</p>
          )}
      </div>
      {/* start add game modal */}
      {showModal && (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-3xl font=semibold">Add a New Game</h3>
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={() => setShowModal(false)}
                >
                  <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                    <p className="text-xl font-bold">X</p>
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <form onSubmit={AddGames} className="max-w-md mx-auto space-y-4 font-[sans-serif] bg-gray-100 text-[#333] mt-4">
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleOnChange}
                    placeholder="Game Time"
                    className="px-4 py-3 bg-blue-50 focus:bg-blue-100 w-full text-sm outline-[#333] rounded-sm transition-all"
                  />
                  <input
                    type="text"
                    name="odds"
                    value={formData.odds}
                    onChange={handleOnChange}
                    placeholder="Game Odds"
                    className="px-4 py-3 bg-blue-50 focus:bg-blue-100 w-full text-sm outline-[#333] rounded-sm transition-all"
                  />
                  <input
                    type="text"
                    name="fixtures"
                    value={formData.fixtures}
                    onChange={handleOnChange}
                    placeholder="Fixtures"
                    className="px-4 py-3 bg-blue-50 focus:bg-blue-100 w-full text-sm outline-[#333] rounded-sm transition-all"
                  />
                  <input
                    type="text"
                    name="prediction"
                    value={formData.prediction}
                    onChange={handleOnChange}
                    placeholder="Predictions"
                    className="px-4 py-3 bg-blue-50 focus:bg-blue-100 w-full text-sm outline-[#333] rounded-sm transition-all"
                  />
                          <select
                            name="result"
                            value={formData.result}
                            onChange={handleOnChange}
                            className="px-4 py-3 bg-blue-50 focus:bg-blue-100 w-full text-sm outline-[#333] rounded-sm transition-all"
                          >
                            <option value="">Select Game Result</option>
                            <option value="win">Win</option>
                            <option value="lose">Lose</option>
                            <option value="Pending">Pending</option>
                          </select>
                   
                  <button type="submit" className="mt-8 px-6 py-2.5 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-sm">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 z-50">
          <ClipLoader color="#ffffff" loading={loading} size={50} />
        </div>
      )}
      {showAlert && (
        <div className="fixed bottom-4 right-4 z-50">
          {alertMessage === 'Game Created successfully!' ? (
            <SuccessAlert message={alertMessage} onClose={() => setShowAlert(false)} />
          ) : (
            <SuccessAlert message={alertMessage} onClose={() => setShowAlert(false)} />
          )}
        </div>
      )}
      {/* end add game modal */}

    {/* start edit modal */}
    {editModal && (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-3xl font=semibold">Edit Game</h3>
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={() => setEditModal(false)}
                >
                  <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                    <p className="text-xl font-bold">X</p>
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <form onSubmit={handleEditGameSubmission} className="max-w-md mx-auto space-y-4 font-[sans-serif] bg-gray-100 text-[#333] mt-4">
                  <input
                    type="time"
                    name="time"
                    value={formDatas.time}
                    onChange={handleEditOnChange}
                    placeholder="Game Time"
                    className="px-4 py-3 bg-blue-50 focus:bg-blue-100 w-full text-sm outline-[#333] rounded-sm transition-all"
                  />
                  <input
                    type="text"
                    name="odds"
                    value={formDatas.odds}
                    onChange={handleEditOnChange}
                    placeholder="Game Odds"
                    className="px-4 py-3 bg-blue-50 focus:bg-blue-100 w-full text-sm outline-[#333] rounded-sm transition-all"
                  />
                  <input
                    type="text"
                    name="fixtures"
                    value={formDatas.fixtures}
                    onChange={handleEditOnChange}
                    placeholder="Fixtures"
                    className="px-4 py-3 bg-blue-50 focus:bg-blue-100 w-full text-sm outline-[#333] rounded-sm transition-all"
                  />
                  <input
                    type="text"
                    name="prediction"
                    value={formDatas.prediction}
                    onChange={handleEditOnChange}
                    placeholder="Predictions"
                    className="px-4 py-3 bg-blue-50 focus:bg-blue-100 w-full text-sm outline-[#333] rounded-sm transition-all"
                  />
                    <select
                      name="result"
                      value={formDatas.result}
                      onChange={handleEditOnChange}
                      className="px-4 py-3 bg-blue-50 focus:bg-blue-100 w-full text-sm outline-[#333] rounded-sm transition-all"
                    >
                      <option value="">Select Game Result</option>
                      <option value="win">Win</option>
                      <option value="lose">Lose</option>
                      <option value="Pending">Pending</option>
                    </select>
                  <button type="submit" className="mt-8 px-6 py-2.5 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-sm">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 z-50">
          <ClipLoader color="#ffffff" loading={loading} size={50} />
        </div>
      )}
      {showAlert && (
        <div className="fixed bottom-4 right-4 z-50">
          {alertMessage === 'Game updated successfully!' ? (
            <SuccessAlert message={alertMessage} onClose={() => setShowAlert(false)} />
          ) : (
            <ErrorAlert message={alertMessage} onClose={() => setShowAlert(false)} />
          )}
        </div>
      )}
      {/* end edit modal */}
    </div>
  );
};

export default CreateGame;
