import React, { useState } from 'react';
import { FaStar, FaFilter, FaSearch, FaReply, FaTrash, FaEllipsisV } from 'react-icons/fa';
import { FiRefreshCw } from 'react-icons/fi';

const ReviewsPage = () => {
  // Sample reviews data
  const [reviews, setReviews] = useState([
    {
      id: 1,
      customer: 'Alex Johnson',
      rating: 5,
      comment: 'The food was absolutely delicious! Best steak I\'ve ever had.',
      date: '2 hours ago',
      response: null,
      photo: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: 2,
      customer: 'Sarah Miller',
      rating: 4,
      comment: 'Great service and atmosphere. The pasta could use more seasoning though.',
      date: '1 day ago',
      response: 'Thank you! We\'ll share your feedback with our chef.',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: 3,
      customer: 'Michael Chen',
      rating: 2,
      comment: 'Waited 45 minutes for our food. Not coming back.',
      date: '3 days ago',
      response: null,
      photo: 'https://randomuser.me/api/portraits/men/67.jpg'
    },
    {
      id: 4,
      customer: 'Emily Wilson',
      rating: 5,
      comment: 'Perfect anniversary dinner! The staff went above and beyond.',
      date: '1 week ago',
      response: 'We\'re honored to be part of your special occasion!',
      photo: 'https://randomuser.me/api/portraits/women/63.jpg'
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [responseFilter, setResponseFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Filter reviews
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         review.comment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = ratingFilter === 'all' || review.rating === parseInt(ratingFilter);
    const matchesResponse = responseFilter === 'all' || 
                          (responseFilter === 'responded' && review.response) || 
                          (responseFilter === 'unresponded' && !review.response);
    return matchesSearch && matchesRating && matchesResponse;
  });

  // Handle reply submission
  const handleReplySubmit = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, response: replyText } : review
    ));
    setActiveReplyId(null);
    setReplyText('');
  };

  // Delete review
  const handleDeleteReview = (reviewId) => {
    setReviews(reviews.filter(review => review.id !== reviewId));
  };

  // Refresh reviews
  const refreshReviews = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Render star ratings
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar 
        key={i} 
        className={i < rating ? 'text-yellow-400' : 'text-gray-300'} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-red-600">Customer Reviews</h1>
          <p className="text-gray-600">Manage and respond to customer feedback</p>
        </div>
        
        <button 
          onClick={refreshReviews}
          className={`p-2 bg-white rounded-lg border hover:bg-gray-50 ${isRefreshing ? 'animate-spin' : ''}`}
        >
          <FiRefreshCw />
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search reviews..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-500" />
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={responseFilter}
              onChange={(e) => setResponseFilter(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
            >
              <option value="all">All Reviews</option>
              <option value="responded">Responded</option>
              <option value="unresponded">Unresponded</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
            No reviews found matching your criteria
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
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
                      onClick={() => handleDeleteReview(review.id)}
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
                          onClick={() => handleReplySubmit(review.id)}
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
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;