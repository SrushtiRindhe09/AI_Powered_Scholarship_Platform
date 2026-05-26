import { useNavigate } from 'react-router-dom';
import Hero from '../components/home/Hero';
import FilterBar from '../components/home/FilterBar';

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = (filters) => {
    // Navigate to Discovery Hub with search filters
    navigate('/search', { state: { filters, fromHome: true } });
  };

  return (
    <div className="flex flex-col min-h-screen pb-24">
      <Hero />
      <FilterBar onSearch={handleSearch} />
      
      {/* 
        The inline search results have been moved to the Discovery Hub (/search)
        as per the new architecture. The remainder of the landing page could contain
        features, testimonials, or stats in the future.
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full text-center">
        <h3 className="text-2xl font-bold text-navy-900 mb-4">Why use Scholarship Hunter?</h3>
        <p className="text-slate-600 max-w-2xl mx-auto">
          We aggregate opportunities from government portals, private foundations, and NGOs
          so you don't have to. Set up your profile once and get matched with scholarships
          that fit your unique background.
        </p>
      </div>
    </div>
  );
}
