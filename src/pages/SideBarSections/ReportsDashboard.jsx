import React, { useState, useEffect } from 'react';
import ReportFilters from './../../components/Reports/ReportFilters';
import ReportSummary from './../../components/Reports/ReportSummary';
import SalesChart from './../../components/Reports/SalesChart';
import ReportDataTable from './../../components/Reports/ReportsDataTable';

const ReportsDashboard = () => {
  const [reportData, setReportData] = useState(null);
  const [filters, setFilters] = useState({
    dateRange: {
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      endDate: new Date(),
      key: 'selection'
    },
    reportType: 'daily',
    category: 'all'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data - Replace with API call
  useEffect(() => {
    const fetchReportData = async () => {
      try {
        // Simulated API response
        const mockData = {
          summary: {
            totalSales: 45230.50,
            averageOrder: 45.20,
            totalOrders: 1002,
            topCategory: 'Main Course'
          },
          chartData: [
            { date: '2023-06-01', sales: 1200, orders: 28 },
            { date: '2023-06-02', sales: 1450, orders: 32 },
            // ... more data
          ],
          detailedData: [
            {
              id: 1,
              date: '2023-06-01',
              category: 'Appetizers',
              sales: 450.00,
              orders: 15,
              percentage: 18.5
            },
            // ... more data
          ]
        };
        
        setReportData(mockData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  if (loading) return <div className="text-center py-8">Loading reports...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="bg-white rounded-xl shadow-sm w-full p-6 md:p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-6">Sales Analytics Report</h1>
        
        <ReportFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        
        <ReportSummary data={reportData.summary} />
        
        <SalesChart chartData={reportData.chartData} />
        
        <ReportDataTable data={reportData.detailedData} />
      </div>
    </div>
  );
};

export default ReportsDashboard;