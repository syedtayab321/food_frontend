import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SalesChart = ({ chartData }) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Trend</h3>
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date"
            tick={{ fill: '#6b7280' }}
            tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          />
          <YAxis tick={{ fill: '#6b7280' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="sales" 
            stroke="#dc2626" 
            strokeWidth={2}
            dot={{ fill: '#dc2626', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default SalesChart;