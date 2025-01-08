import { useState, useEffect } from 'react'
import './App.css'
import DataTable from './components/DataTable'
import FilterControls from './components/FilterControls'
import SortControls from './components/SortControls'

function App() {
  const [financialData, setFinancialData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ field: 'date', direction: 'desc' });

  // Replace with your API key
  const API_KEY = 'iNP4OfYihFwP1SdedgzvKjmIHy1EwHZ4';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${API_KEY}`
        );
        const data = await response.json();
        
        // Transform the data to include all required fields
        const transformedData = data.map(item => ({
          date: item.date,
          revenue: item.revenue,
          netIncome: item.netIncome,
          grossProfit: item.grossProfit,
          operatingExpenses: item.operatingExpenses
        }));
        
        setFinancialData(transformedData);
        setFilteredData(transformedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (filterName, value) => {
    if (value === '') {
      const newFilters = { ...filters };
      delete newFilters[filterName];
      setFilters(newFilters);
      applyFilters(newFilters);
      return;
    }

    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleSortChange = (sortField) => {
    let [field, direction] = sortField.split(':');
    
    if (!direction) {
      direction = sortConfig.direction;
    }

    const newSortConfig = { field, direction };
    setSortConfig(newSortConfig);
    
    const sortedData = applySorting([...filteredData], newSortConfig);
    setFilteredData(sortedData);
  };

  const applySorting = (data, { field, direction }) => {
    if (!field || field === '') return data;

    return data.sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];

      if (field === 'date') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  const applyFilters = (currentFilters) => {
    let result = [...financialData];
    
    if (currentFilters.startYear) {
      result = result.filter(item => new Date(item.date).getFullYear() >= currentFilters.startYear);
    }
    if (currentFilters.endYear) {
      result = result.filter(item => new Date(item.date).getFullYear() <= currentFilters.endYear);
    }

    if (currentFilters.minRevenue) {
      result = result.filter(item => item.revenue >= currentFilters.minRevenue);
    }
    if (currentFilters.maxRevenue) {
      result = result.filter(item => item.revenue <= currentFilters.maxRevenue);
    }

    if (currentFilters.minNetIncome) {
      result = result.filter(item => item.netIncome >= currentFilters.minNetIncome);
    }
    if (currentFilters.maxNetIncome) {
      result = result.filter(item => item.netIncome <= currentFilters.maxNetIncome);
    }

    result = applySorting(result, sortConfig);
    setFilteredData(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-indigo-900 text-center">
          Apple Inc. Financial Data
        </h1>
        
        <div className="bg-white rounded-xl shadow-xl p-6 mb-8 hover:shadow-2xl transition-shadow">
          <h2 className="text-xl font-semibold mb-4 text-indigo-500">Filters</h2>
          <FilterControls onFilterChange={handleFilterChange} />
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6 mb-8 hover:shadow-2xl transition-shadow">
          <h2 className="text-xl font-semibold mb-4 text-indigo-700">Sort Options</h2>
          <SortControls onSortChange={handleSortChange} />
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
          <DataTable data={filteredData} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default App;
