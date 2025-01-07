import { useState } from 'react';

const FilterControls = ({ onFilterChange }) => {
  const [errors, setErrors] = useState({});

  const validateAndUpdate = (name, value) => {
    let error = null;
    let parsedValue = value ? parseInt(value) : '';

    if (value && isNaN(parsedValue)) {
      error = 'Please enter a valid number';
    }

    // Year validation
    if ((name === 'startYear' || name === 'endYear') && value) {
      if (parsedValue < 1900 || parsedValue > new Date().getFullYear()) {
        error = 'Please enter a valid year';
      }
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    
    if (!error) {
      onFilterChange(name, parsedValue);
    }
  };

  const inputClassName = (error) => `
    form-input px-4 py-2.5 rounded-lg border ${error ? 'border-red-500' : 'border-gray-200'} 
    bg-white text-gray-700 shadow-sm transition-all
    hover:border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
    outline-none w-full
  `;

  return (
    <div className="mb-6 space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
      <div className="relative">
        <label className="block text-sm font-medium text-indigo-600 mb-3">
          Date Range
          <span className="ml-1 text-indigo-400 hover:text-indigo-600 cursor-help" title="Filter by year between 1900 and present">ⓘ</span>
        </label>
        <div className="flex space-x-2">
          <div className="flex-1">
            <input
              type="number"
              placeholder="Start Year"
              className={inputClassName(errors.startYear)}
              onChange={(e) => validateAndUpdate('startYear', e.target.value)}
            />
            {errors.startYear && (
              <p className="text-red-500 text-xs mt-1">{errors.startYear}</p>
            )}
          </div>
          <div className="flex-1">
            <input
              type="number"
              placeholder="End Year"
              className={inputClassName(errors.endYear)}
              onChange={(e) => validateAndUpdate('endYear', e.target.value)}
            />
            {errors.endYear && (
              <p className="text-red-500 text-xs mt-1">{errors.endYear}</p>
            )}
          </div>
        </div>
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-indigo-600 mb-3">
          Revenue Range
          <span className="ml-1 text-indigo-400 hover:text-indigo-600 cursor-help" title="Filter by revenue amount in USD">ⓘ</span>
        </label>
        <div className="flex space-x-2">
          <div className="flex-1">
            <input
              type="number"
              placeholder="Min Revenue"
              className={inputClassName(errors.minRevenue)}
              onChange={(e) => validateAndUpdate('minRevenue', e.target.value)}
            />
            {errors.minRevenue && (
              <p className="text-red-500 text-xs mt-1">{errors.minRevenue}</p>
            )}
          </div>
          <div className="flex-1">
            <input
              type="number"
              placeholder="Max Revenue"
              className={inputClassName(errors.maxRevenue)}
              onChange={(e) => validateAndUpdate('maxRevenue', e.target.value)}
            />
            {errors.maxRevenue && (
              <p className="text-red-500 text-xs mt-1">{errors.maxRevenue}</p>
            )}
          </div>
        </div>
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-indigo-600 mb-3">
          Net Income Range
          <span className="ml-1 text-indigo-400 hover:text-indigo-600 cursor-help" title="Filter by net income amount in USD">ⓘ</span>
        </label>
        <div className="flex space-x-2">
          <div className="flex-1">
            <input
              type="number"
              placeholder="Min Income"
              className={inputClassName(errors.minNetIncome)}
              onChange={(e) => validateAndUpdate('minNetIncome', e.target.value)}
            />
            {errors.minNetIncome && (
              <p className="text-red-500 text-xs mt-1">{errors.minNetIncome}</p>
            )}
          </div>
          <div className="flex-1">
            <input
              type="number"
              placeholder="Max Income"
              className={inputClassName(errors.maxNetIncome)}
              onChange={(e) => validateAndUpdate('maxNetIncome', e.target.value)}
            />
            {errors.maxNetIncome && (
              <p className="text-red-500 text-xs mt-1">{errors.maxNetIncome}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
