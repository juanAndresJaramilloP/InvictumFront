import React from 'react';

const ConfirmacionRetiro = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Withdraw Confirmed!</h1>
        <p className="text-lg mb-8">Your withdraw has been successfully processed.</p>
        <a
          href="/"
          className="px-6 py-3 text-white bg-green-500 rounded-lg hover:bg-green-700 focus:outline-none transition duration-300 ease-in-out"
        >
          Go to homepage
        </a>
      </div>
    </div>
  );
};

export default ConfirmacionRetiro;
