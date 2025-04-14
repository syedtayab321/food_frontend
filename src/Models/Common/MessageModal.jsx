import { FaTimes } from 'react-icons/fa';

const MessageModal = ({ 
  isOpen, 
  customer, 
  messageText, 
  onClose, 
  onMessageChange, 
  onSend 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md animate-fade-in">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-red-600">
            Message {customer?.name}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 transition-colors"
            aria-label="Close modal"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Message</label>
            <textarea
              value={messageText}
              onChange={onMessageChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 transition"
              rows="4"
              placeholder={`Write your message to ${customer?.name}...`}
            ></textarea>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSend}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;