import { useState, useEffect } from 'react';

const Message = ({ message, onCopy, isCopied }) => {
  const [showCopyButton, setShowCopyButton] = useState(false);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isUserMessage = message.sender === 'user';

  return (
    <div
      className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}
      onMouseEnter={() => setShowCopyButton(true)}
      onMouseLeave={() => setShowCopyButton(false)}
    >
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg px-4 py-2 relative ${
          isUserMessage
            ? 'bg-indigo-600 text-white'
            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white'
        }`}
      >
        {message.image ? (
          <div className="mb-1">
            <img
              src={message.image}
              alt="Uploaded content"
              className="rounded-md max-h-64 object-contain"
            />
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message.text}</p>
        )}
        
        <div className={`flex items-center mt-1 text-xs ${isUserMessage ? 'text-indigo-200' : 'text-gray-500 dark:text-gray-400'}`}>
          <span>{formatTime(message.timestamp)}</span>
        </div>
        
        {showCopyButton && message.text && (
          <button
            onClick={onCopy}
            className={`absolute -top-2 -right-2 p-1 rounded-full ${
              isUserMessage
                ? 'bg-indigo-700 text-white'
                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200'
            }`}
            aria-label="Copy message"
          >
            {isCopied ? (
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Message;