// src/shared/Alerts/SuccessAlert.js
import React from 'react';

const SuccessAlert = ({ message, onClose }) => {
  //refresh page after close modal
  const refres = () => {
    window.location.reload(true);
  }
  return (
    <div className="fixed inset-0 flex items-end justify-center px-6 py-9 pointer-events-none sm:p-6 sm:items-start sm:justify-center">
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto">
        <div className="p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 4.707a1 1 0 00-1.414-1.414L7 11.586 4.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm leading-5 font-medium text-gray-900">
                {message}
              </p>
              <div className="mt-3 flex space-x-7">
                <button
                  onClick={refres}
                  className="bg-green-500 text-white rounded-md px-4 py-2 text-sm leading-5 font-medium hover:bg-green-400 focus:outline-none focus:bg-green-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessAlert;
