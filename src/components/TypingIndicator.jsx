const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-white dark:bg-gray-700 rounded-lg px-4 py-2">
        <div className="flex items-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
          </div>
          <span className="ml-2 text-gray-500 dark:text-gray-400 text-sm">
            Gemini is typing...
          </span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;