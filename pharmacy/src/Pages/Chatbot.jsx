import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/chatbot/chatbotai', {
        userMessage: userMessage,
      });
      setChatResponse(response.data.response);
    } catch (error) {
      console.error('Error communicating with the chatbot:', error);
      setChatResponse('Failed to get response from chatbot.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type your message here..."
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Send
          </button>
        </form>
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">Chatbot Response:</h3>
          <p className="mt-2 p-4 bg-gray-50 rounded-lg text-gray-700">{chatResponse}</p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;