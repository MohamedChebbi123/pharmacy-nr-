import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userMessage.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:7000/chatbot/chatbotai', {
        userMessage: userMessage,
      });
      setChatResponse(response.data.response);
    } catch (error) {
      console.error('Error communicating with the chatbot:', error);
      setChatResponse('Failed to get response from chatbot. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">AI Chat Assistant</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Ask me anything..."
              required
              className="w-full px-5 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200 disabled:bg-blue-400"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </form>

        {chatResponse && (
          <div className="mt-8">
            <div className="flex items-center mb-2">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700">Response</h3>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl text-gray-700 border border-gray-200 whitespace-pre-wrap">
              {chatResponse}
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Powered by AI technology</p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;