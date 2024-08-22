import React from 'react'

function successModal({isOpen, onClose, message}) {
  return (
    <div>
      isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4">{message}</h2>
                <button
                    onClick={onClose}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Close
                </button>
            </div>
        </div>
      ) : null
    </div>
  )
}

export default successModal
