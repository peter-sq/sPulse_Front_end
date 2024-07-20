// src/shared/Alerts/ErrorAlert.js
import React from 'react';

const ErrorAlert = ({ message, onClose }) => {
  // refresh page after close modal
  const refresh = () => {
    window.location.reload(true);
  }

  return (
    <div className="fixed inset-0 flex items-end justify-center px-6 py-9 pointer-events-none sm:p-6 sm:items-start sm:justify-center">
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto">
        <div className="p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 00-2 0v4a1 1 0 002 0V7zm0 6a1 1 0 10-2 0 1 1 0 002 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm leading-5 font-medium text-gray-900">
                {message}
              </p>
              <div className="mt-3 flex space-x-7">
                <button
                  onClick={refresh}
                  className="bg-red-500 text-white rounded-md px-4 py-2 text-sm leading-5 font-medium hover:bg-red-400 focus:outline-none focus:bg-red-400"
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

export default ErrorAlert;
