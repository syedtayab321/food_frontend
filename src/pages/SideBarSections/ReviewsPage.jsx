import React, { useState, useEffect } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchVendorReviews, 
  respondToReview,
  updateReviewResponse,
  deleteReviewResponse,
  clearReviewError
} from './../../Services/Reviews/vendorReviewsSlice';
import ReviewCard from './../../components/ReviewsComponents/ReviewCard';
import ReviewsFilter from './../../components/ReviewsComponents/ReviewFilters';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReviewsPage = () => {
  const dispatch = useDispatch();
  const { reviews, loading, error, responseLoading, responseError } = useSelector((state) => state.reviews);
  
  // Local state for filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [responseFilter, setResponseFilter] = useState('all');
  const [activeReplyId, setActiveReplyId] = useState(null);

  // Fetch reviews on component mount
  useEffect(() => {
    dispatch(fetchVendorReviews())
      .unwrap()
      .catch(err => {
        toast.error(err.message || 'Failed to load reviews');
      });
  }, [dispatch]);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearReviewError());
    };
  }, [dispatch]);

  // Show error toast when responseError changes
  useEffect(() => {
    if (responseError) {
      toast.error(responseError);
      dispatch(clearReviewError());
    }
  }, [responseError, dispatch]);

  // Filter reviews
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.customer?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         review.comment?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = ratingFilter === 'all' || review.rating === parseInt(ratingFilter);
    const matchesResponse = responseFilter === 'all' || 
                          (responseFilter === 'responded' && review.response) || 
                          (responseFilter === 'unresponded' && !review.response);
    return matchesSearch && matchesRating && matchesResponse;
  });

  // Handle reply submission
  const handleReplySubmit = async (reviewId, responseText) => {
    if (!responseText.trim()) {
      toast.warning('Please enter a response');
      return;
    }

    try {
      const review = reviews.find(r => r.id === reviewId);
      const action = review.response 
        ? updateReviewResponse({ reviewId, responseText })
        : respondToReview({ reviewId, responseText });
      
      await dispatch(action).unwrap();
      setActiveReplyId(null);
      toast.success('Response submitted successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to submit response');
    }
  };

  // Delete review
  const handleDeleteReview = async (reviewId) => {
    try {
      await dispatch(deleteReviewResponse(reviewId)).unwrap();
      toast.success('Response deleted successfully');
    } catch (err) {
      toast.error(err.message || 'Failed to delete response');
    }
  };

  // Refresh reviews
  const refreshReviews = () => {
    dispatch(fetchVendorReviews())
      .unwrap()
      .then(() => toast.success('Reviews refreshed'))
      .catch(err => {
        toast.error(err.message || 'Failed to refresh reviews');
      });
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200"></div>
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                <div className="h-3 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="mt-4 pl-16 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );

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
          className={`p-2 bg-white rounded-lg border hover:bg-gray-50 transition-colors ${
            loading ? 'animate-spin' : ''
          }`}
          disabled={loading}
          aria-label="Refresh reviews"
        >
          <FiRefreshCw />
        </button>
      </div>

      {/* Search & Filter Bar */}
      <ReviewsFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
        responseFilter={responseFilter}
        setResponseFilter={setResponseFilter}
        disabled={loading}
      />

      {/* Reviews List */}
      <div className="space-y-4 transition-opacity duration-300">
        {loading && !reviews.length ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="text-red-500 mb-2">Failed to load reviews</div>
            <button
              onClick={refreshReviews}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
            {searchQuery || ratingFilter !== 'all' || responseFilter !== 'all' ? (
              <>
                <p>No reviews match your current filters</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setRatingFilter('all');
                    setResponseFilter('all');
                  }}
                  className="mt-2 px-4 py-2 text-red-600 hover:underline"
                >
                  Clear all filters
                </button>
              </>
            ) : (
              'No reviews available yet'
            )}
          </div>
        ) : (
          filteredReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onReplySubmit={handleReplySubmit}
              onDelete={handleDeleteReview}
              activeReplyId={activeReplyId}
              setActiveReplyId={setActiveReplyId}
              isSubmitting={responseLoading}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;