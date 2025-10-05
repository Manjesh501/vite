const ChatroomList = ({ chatrooms, onSelectChatroom, onDeleteChatroom }) => {
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {chatrooms.map((chatroom) => (
        <div
          key={chatroom.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300"
        >
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div
                className="cursor-pointer flex-1"
                onClick={() => onSelectChatroom(chatroom)}
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                  {chatroom.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Created {formatTime(chatroom.createdAt)}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChatroom(chatroom.id);
                }}
                className="ml-2 text-gray-400 hover:text-red-500 focus:outline-none"
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatroomList;