import React from 'react';

const QAItem = ({ qa }) => {
  return (
    <div className="mt-10 p-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg max-w-3xl mx-auto">
      <h2 className="font-semibold text-2xl sm:text-3xl text-center">
        <span className="text-yellow-300">Question:</span> {qa?.question}
      </h2>

      <div className="mt-6 bg-white text-gray-900 p-5 rounded-lg shadow-md border-l-8 border-yellow-400">
        <h4 className="font-medium text-xl sm:text-2xl text-center">
          <span className="text-blue-500 font-bold">Answer:</span> {qa?.answer}
        </h4>
      </div>
    </div>
  );
};

export default QAItem;
