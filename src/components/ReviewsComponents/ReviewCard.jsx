import { FaStar, FaReply, FaTrash } from 'react-icons/fa';
import { useState } from 'react';

const ReviewCard = ({ 
  review, 
  onReplySubmit, 
  onDelete,
  activeReplyId,
  setActiveReplyId
}) => {
  const [replyText, setReplyText] = useState('');

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar 
        key={i} 
        className={i < rating ? 'text-yellow-400' : 'text-gray-300'} 
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <img 
              src={review.photo} 
              alt={review.customer} 
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-bold text-gray-800">{review.customer}</h3>
              <div className="flex items-center gap-1">
                {renderStars(review.rating)}
                <span className="text-gray-500 text-sm ml-2">{review.date}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveReplyId(activeReplyId === review.id ? null : review.id)}
              className="p-2 text-gray-500 hover:text-red-600"
            >
              <FaReply />
            </button>
            <button 
              onClick={() => onDelete(review.id)}
              className="p-2 text-gray-500 hover:text-red-600"
            >
              <FaTrash />
            </button>
          </div>
        </div>

        <div className="mt-4 pl-16">
          <p className="text-gray-700">{review.comment}</p>

          {review.response && (
            <div className="mt-4 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
              <div className="font-medium text-red-600">Your Response</div>
              <p className="text-gray-700">{review.response}</p>
            </div>
          )}

          {activeReplyId === review.id && (
            <div className="mt-4">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your response here..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                rows="3"
              ></textarea>
              <div className="flex justify-end gap-2 mt-2">
                <button 
                  onClick={() => setActiveReplyId(null)}
                  className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    onReplySubmit(review.id, replyText);
                    setReplyText('');
                  }}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Submit Response
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;