import { FaDollarSign, FaReceipt, FaShoppingBasket, FaStar } from 'react-icons/fa';

const ReportSummary = ({ data }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
    <div className="bg-red-50 p-4 rounded-lg">
      <div className="flex items-center">
        <div className="bg-red-100 p-3 rounded-full mr-3">
          <FaDollarSign className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Sales</p>
          <p className="text-2xl font-bold text-red-600">${data.totalSales.toLocaleString()}</p>
        </div>
      </div>
    </div>

    <div className="bg-blue-50 p-4 rounded-lg">
      <div className="flex items-center">
        <div className="bg-blue-100 p-3 rounded-full mr-3">
          <FaReceipt className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Average Order</p>
          <p className="text-2xl font-bold text-blue-600">${data.averageOrder.toFixed(2)}</p>
        </div>
      </div>
    </div>

    <div className="bg-green-50 p-4 rounded-lg">
      <div className="flex items-center">
        <div className="bg-green-100 p-3 rounded-full mr-3">
          <FaShoppingBasket className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Orders</p>
          <p className="text-2xl font-bold text-green-600">{data.totalOrders.toLocaleString()}</p>
        </div>
      </div>
    </div>

    <div className="bg-purple-50 p-4 rounded-lg">
      <div className="flex items-center">
        <div className="bg-purple-100 p-3 rounded-full mr-3">
          <FaStar className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <p className="text-sm text-gray-600">Top Category</p>
          <p className="text-2xl font-bold text-purple-600">{data.topCategory}</p>
        </div>
      </div>
    </div>
  </div>
);

export default ReportSummary;