import { FaFilter, FaSearch } from 'react-icons/fa';

const ReviewsFilter = ({
  searchQuery,
  setSearchQuery,
  ratingFilter,
  setRatingFilter,
  responseFilter,
  setResponseFilter
}) => {
  return (
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
  );
};

export default ReviewsFilter;