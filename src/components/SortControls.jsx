const SortControls = ({ onSortChange }) => {
  const handleFieldChange = (field) => {
    if (field) {
      onSortChange(`${field}:desc`); 
    }
  };

  const handleDirectionChange = (direction) => {
    onSortChange(`${currentField}:${direction}`);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-indigo-600 mb-3">Sort By</label>
      <div className="flex space-x-4">
        <select
          className="form-select px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 
                     shadow-sm transition-all hover:border-indigo-300 focus:border-indigo-500 
                     focus:ring-2 focus:ring-indigo-200 outline-none"
          onChange={(e) => handleFieldChange(e.target.value)}
          defaultValue=""
        >
          <option value="">Select field...</option>
          <option value="date">Date</option>
          <option value="revenue">Revenue</option>
          <option value="netIncome">Net Income</option>
        </select>
        
        <select
          className="form-select px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 
                     shadow-sm transition-all hover:border-indigo-300 focus:border-indigo-500 
                     focus:ring-2 focus:ring-indigo-200 outline-none"
          onChange={(e) => onSortChange(`${currentField}:${e.target.value}`)}
          defaultValue="desc"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default SortControls;
