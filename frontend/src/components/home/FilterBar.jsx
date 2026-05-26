import { useState } from 'react';
import { Search, MapPin, Briefcase, ChevronDown } from 'lucide-react';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

export default function FilterBar({ onSearch }) {
  const [filters, setFilters] = useState({
    category: '',
    income: '',
    state: '',
    education: ''
  });

  const handleChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div className="w-full max-w-5xl mx-auto -mt-16 z-10 relative">
      <form onSubmit={handleSearch} className="glass-card rounded-2xl p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Category Dropdown */}
        <div className="flex-1 w-full relative">
          <label className="block text-xs font-semibold text-navy-600 uppercase tracking-wider mb-1 ml-1 cursor-pointer">Category</label>
          <div className="relative">
            <select 
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-lg pl-3 pr-10 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            >
              <option value="">All Categories</option>
              <option value="General">General</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="OBC">OBC</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
          </div>
        </div>

        {/* Income Input */}
        <div className="flex-1 w-full relative">
          <label className="block text-xs font-semibold text-navy-600 uppercase tracking-wider mb-1 ml-1 cursor-pointer">Annual Income (₹)</label>
          <div className="relative">
            <input 
              type="number"
              name="income"
              placeholder="e.g. 500000"
              value={filters.income}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            <Briefcase className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
          </div>
        </div>

        {/* State Dropdown */}
        <div className="flex-1 w-full relative">
          <label className="block text-xs font-semibold text-navy-600 uppercase tracking-wider mb-1 ml-1 cursor-pointer">State/Region</label>
          <div className="relative">
            <select 
              name="state"
              value={filters.state}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-lg pl-3 pr-10 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            >
              <option value="">Select State</option>
              {INDIAN_STATES.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
          </div>
        </div>

        {/* Education Level */}
        <div className="flex-1 w-full relative">
          <label className="block text-xs font-semibold text-navy-600 uppercase tracking-wider mb-1 ml-1 cursor-pointer">Education</label>
          <div className="relative">
            <select 
              name="education"
              value={filters.education}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-lg pl-3 pr-10 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            >
              <option value="">Any Level</option>
              <option value="10th">10th Pass</option>
              <option value="12th">12th Pass</option>
              <option value="Graduate">Graduate</option>
              <option value="Post-Graduate">Post Graduate</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
          </div>
        </div>

        {/* Search Button */}
        <div className="w-full md:w-auto mt-5 md:mt-6">
          <button 
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl px-8 py-3 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </button>
        </div>

      </form>
    </div>
  );
}
