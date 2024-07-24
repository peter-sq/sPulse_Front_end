import React, { useState, useEffect } from 'react';
import Modal from '../../../shared/Modals/Modal';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import SuccessAlert from '../../../shared/Modals/sucessAlert';  
import ErrorAlert from '../../../shared/Modals/errorAlert';

const BASE_URL = process.env.REACT_APP_API_URL;

const CreateGame = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [tableItems, setTableItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    prediction: "",
    odds: "",
    result: "",
    fixtures: "",
    time: ""
  });

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
    console.log(`Updated form data: ${name} = ${value}`);
  };

  const AddGames = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowAlert(false);
    try {
      await axios.patch(`${BASE_URL}/api/v1/admin/post/add-game/${_id}`, formData);
      setModalOpen(false);
      setFormData({ prediction: '', time: '', odds: '', result: '', fixtures: '' });
      setAlertMessage('Game Created successfully!');
      setShowAlert(true);
    } catch (error) {
      console.error('There was an error submitting this form', error);
      setAlertMessage('Failed to submit data!');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleEditGame = (data) => {
    setFormData({
      prediction: data.prediction,
      odds: data.odds,
      result: data.result,
      fixtures: data.fixtures,
      time: data.time,
    });
    setModalTitle('Edit Game');
    setModalContent(
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
        <button type="submit" className="mt-8 px-6 py-2.5 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-sm">
          Submit
        </button>
      </form>
    );
    setModalOpen(true);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="mt-3 md:mt-0">
          <button
            onClick={() => setShowModal(true)}
            className="inline-block font-[Roboto] px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
          >
            Add Game
          </button>
        </div>
      </div>
      <div className="mt-12 font-[sans-serif] shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">S/N</th>
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">Time</th>
              <th className="py-3 px-6">Odds</th>
              <th className="py-3 px-6">Prediction</th>
              <th className="py-3 px-6">Fixtures</th>
              <th className="py-3 px-6">Result</th>
              <th className="py-3 px-6">Actions</th> 
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y font-[sans-serif]">
            {tableItems.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{idx + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item._id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.time}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.odds}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.prediction}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.fixtures}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.result}</td>
                <td className="text-right px-6 whitespace-nowrap">
                  <button
                    onClick={() => handleEditGame(item)}
                    className="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
                     <input
                    type="text"
                    name="result"
                    value={formData.result}
                    onChange={handleOnChange}
                    placeholder="Predictions"
                    className="px-4 py-3 bg-blue-50 focus:bg-blue-100 w-full text-sm outline-[#333] rounded-sm transition-all"
                  />
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
            <ErrorAlert message={alertMessage} onClose={() => setShowAlert(false)} />
          )}
        </div>
      )}
    </div>
  );
};

export default CreateGame;
