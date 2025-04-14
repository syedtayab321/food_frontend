import CustomerCard from './CustomerCard';

const CustomerList = ({ customers, onToggleFavorite, onMessageClick }) => {
  if (customers.length === 0) {
    return (
      <div className="col-span-full bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
        <div className="max-w-md mx-auto">
          <svg
            className="w-16 h-16 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h3 className="text-lg font-medium mb-2">No customers found</h3>
          <p className="text-sm">Try adjusting your search or filter criteria</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {customers.map((customer) => (
        <CustomerCard
          key={customer.id}
          customer={customer}
          onToggleFavorite={onToggleFavorite}
          onMessageClick={onMessageClick}
        />
      ))}
    </div>
  );
};

export default CustomerList;