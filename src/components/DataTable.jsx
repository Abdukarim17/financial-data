const DataTable = ({ data, loading }) => {
    
  const formatLargeNumber = (number) => {
    if (number >= 1e9) {
      return `$${(number / 1e9).toFixed(2)}B`;
    } else if (number >= 1e6) {
      return `$${(number / 1e6).toFixed(2)}M`;
    }
    return `$${number.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  if (loading) {
    return (
      <div className="animate-pulse p-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gradient-to-r from-indigo-100 to-purple-100 mb-2 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
        <p className="text-indigo-600">No matching data found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gradient-to-r from-indigo-50 to-purple-50">
            <th className="sticky top-0 px-8 py-4 border-b border-gray-200 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider w-1/6">
              Date
              <span className="block text-xs font-normal text-indigo-500">YYYY-MM-DD</span>
            </th>
            <th className="sticky top-0 px-8 py-4 border-b border-gray-200 text-right text-xs font-semibold text-indigo-700 uppercase tracking-wider w-1/6">
              Revenue
              <span className="block text-xs font-normal text-indigo-500">In USD</span>
            </th>
            <th className="sticky top-0 px-8 py-4 border-b border-gray-200 text-right text-xs font-semibold text-indigo-700 uppercase tracking-wider w-1/6">
              Net Income
              <span className="block text-xs font-normal text-indigo-500">In USD</span>
            </th>
            <th className="sticky top-0 px-8 py-4 border-b border-gray-200 text-right text-xs font-semibold text-indigo-700 uppercase tracking-wider w-1/6">
              Gross Profit
              <span className="block text-xs font-normal text-indigo-500">In USD</span>
            </th>
            <th className="sticky top-0 px-8 py-4 border-b border-gray-200 text-right text-xs font-semibold text-indigo-700 uppercase tracking-wider w-1/6">
              Operating Expenses
              <span className="block text-xs font-normal text-indigo-500">In USD</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.date} className="hover:bg-indigo-50 transition-colors duration-150">
              <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(item.date)}
              </td>
              <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900 text-right tabular-nums">
                {formatLargeNumber(item.revenue)}
              </td>
              <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900 text-right tabular-nums">
                {formatLargeNumber(item.netIncome)}
              </td>
              <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900 text-right tabular-nums">
                {formatLargeNumber(item.grossProfit)}
              </td>
              <td className="px-8 py-4 whitespace-nowrap text-sm text-gray-900 text-right tabular-nums">
                {formatLargeNumber(item.operatingExpenses)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
