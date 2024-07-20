import React, { useState } from 'react';
import Modal from '../../../shared/Modals/Modal';

const CreateGame = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  const handleAddGame = () => {
    setModalTitle('Add Game');
    setModalContent(
      <form className="max-w-md mx-auto space-y-4 font-[sans-serif] bg-gray-100 text-[#333] mt-4">
        <input
          type="text"
          placeholder="Game Time"
          name="time"
          className="px-4 py-3 bg-blue-50 focus:bg-blue-100 w-full text-sm outline-[#333] rounded-sm transition-all"
        />
        <input
          type="text"
          name="odds"
          placeholder="Game Odds"
          className="px-4 py-3 bg-blue-50 focus:bg-blue-100 w-full text-sm outline-[#333] rounded-sm transition-all"
        />
        <input
          type="text"
          name="fixtures"
          placeholder="Fixtures"
          className="px-4 py-3 bg-blue-50 focus:bg-blue-100 w-full text-sm outline-[#333] rounded-sm transition-all"
        />
        <input
          type="text"
          name="prediction"
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

  const handleEditGame = (data) => {
    setModalTitle('Edit Game');
    setModalContent(
        <form className="max-w-md mx-auto space-y-4 font-[sans-serif] bg-gray-100 text-[#333] mt-4">
        <input
          type="text"
          placeholder="Game Time"
          name="time"
          className="px-4 py-3 bg-blue-50 focus:bg-blue-100 w-full text-sm outline-[#333] rounded-sm transition-all"
        />
        <input
          type="text"
          name="odds"
          placeholder="Game Odds"
          className="px-4 py-3 bg-blue-50 focus:bg-blue-100 w-full text-sm outline-[#333] rounded-sm transition-all"
        />
        <input
          type="text"
          name="fixtures"
          placeholder="Fixtures"
          className="px-4 py-3 bg-blue-50 focus:bg-blue-100 w-full text-sm outline-[#333] rounded-sm transition-all"
        />
        <input
          type="text"
          name="prediction"
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

  const tableItems = [
    {
      SN: "",
      Id: "Liam James",
      time: "liamjames@example.com",
      odds: "Software engineer",
      prediction: "$100K",
      fixtures: "$100K",
      result: ""
    },
    {
      SN: "",
      Id: "Liam James",
      time: "5:00",
      odds: "2",
      prediction: "over 2",
      fixtures: "england vs germany",
      result: "wind"
    }
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="mt-3 md:mt-0">
          <button
            onClick={handleAddGame}
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
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y font-[sans-serif]">
            {tableItems.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{item.SN}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.Id}</td>
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
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
        {modalContent}
      </Modal>
    </div>
  );
};

export default CreateGame;
