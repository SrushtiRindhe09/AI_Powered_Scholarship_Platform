import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { IndianRupee, Calendar, ChevronRight, AlertCircle, Sparkles, Filter, Loader2, Trophy, MapPin, BookOpen, ExternalLink } from 'lucide-react';
import { getRecommendations, fetchAllScholarships } from '../services/api';

export default function DiscoveryHub() {
  const location = useLocation();
  const navigate = useNavigate();

  const fromProfile = location.state?.fromProfile;
  const userId = location.state?.userId;

  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRecommended, setIsRecommended] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (userId && fromProfile) {
          // Personalized recommendations
          const data = await getRecommendations(userId);
          setScholarships(data.recommendations || []);
          setIsRecommended(true);
        } else {
          // Browse all scholarships
          const data = await fetchAllScholarships();
          setScholarships(data || []);
          setIsRecommended(false);
        }
      } catch (err) {
        setError(err.message || 'Failed to load scholarships. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, fromProfile]);

  const getScoreBadge = (score) => {
    if (score >= 80) return { label: 'Excellent Match', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
    if (score >= 60) return { label: 'Good Match', color: 'bg-blue-100 text-blue-700 border-blue-200' };
    if (score >= 40) return { label: 'Fair Match', color: 'bg-amber-100 text-amber-700 border-amber-200' };
    return { label: 'Low Match', color: 'bg-slate-100 text-slate-600 border-slate-200' };
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Banner: Recommended */}
        {isRecommended && !loading && scholarships.length > 0 && (
          <div className="mb-8 flex items-center gap-4 bg-emerald-50 border border-emerald-200 text-emerald-900 p-4 rounded-2xl shadow-sm">
            <div className="bg-emerald-100 p-2 rounded-full">
              <Sparkles className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Personalized Recommendations</h3>
              <p className="text-emerald-700 text-sm">Ranked by how well each scholarship matches your profile. Higher scores = better fit!</p>
            </div>
          </div>
        )}

        {/* Banner: No profile */}
        {!isRecommended && !loading && (
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-navy-100 text-navy-900 p-5 rounded-2xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-amber-100 p-2 rounded-full">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Want personalized matches?</h3>
                <p className="text-navy-500 text-sm">Complete your profile to unlock AI-powered recommendations with match scores.</p>
              </div>
            </div>
            <Link to="/profile" className="w-full sm:w-auto px-6 py-2.5 bg-navy-900 text-white rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors text-center">
              Build Profile
            </Link>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
            <p className="text-navy-500 font-medium text-lg">
              {userId ? 'Finding your best matches...' : 'Loading scholarships...'}
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
            <div className="bg-red-100 p-4 rounded-full">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-navy-900">Something went wrong</h3>
            <p className="text-navy-500 max-w-md">{error}</p>
            <p className="text-sm text-navy-400">Make sure the backend server is running on port 5000 and MongoDB is connected.</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && scholarships.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
            <div className="bg-navy-100 p-4 rounded-full">
              <BookOpen className="w-10 h-10 text-navy-400" />
            </div>
            <h3 className="text-xl font-bold text-navy-900">No scholarships found</h3>
            <p className="text-navy-500 max-w-md">Run the seed script to populate demo scholarships:</p>
            <code className="bg-navy-900 text-emerald-400 px-4 py-2 rounded-lg text-sm font-mono">cd backend && node seed.js</code>
          </div>
        )}

        {/* Results Grid */}
        {!loading && !error && scholarships.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6 px-1">
              <h2 className="text-2xl font-bold text-navy-900">
                {isRecommended ? 'Your Matches' : 'All Scholarships'}
              </h2>
              <span className="text-slate-500 text-sm font-medium bg-slate-200 px-3 py-1 rounded-full">
                {scholarships.length} Result{scholarships.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scholarships.map((scholarship, index) => {
                const scoreBadge = isRecommended ? getScoreBadge(scholarship.matchScore) : null;
                return (
                  <div key={scholarship._id || index} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all p-6 group flex flex-col h-full relative overflow-hidden">
                    {/* Decorative shape */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -z-0 transition-transform duration-500 group-hover:scale-110" />

                    <div className="relative z-10 flex-grow flex flex-col">
                      {/* Tags Row */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {isRecommended && scoreBadge && (
                          <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md border flex items-center gap-1 ${scoreBadge.color}`}>
                            <Trophy className="w-3 h-3" />
                            {scholarship.matchScore}% — {scoreBadge.label}
                          </span>
                        )}
                        {scholarship.category && scholarship.category !== 'All' && (
                          <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md border bg-purple-100 text-purple-700 border-purple-200">
                            #{scholarship.category}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-navy-900 mb-2 group-hover:text-emerald-600 transition-colors pr-8">
                        {scholarship.title}
                      </h3>
                      <p className="text-sm font-medium text-navy-500 mb-5">{scholarship.provider}</p>

                      <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 mt-auto">
                        <div className="flex items-center text-sm text-slate-700 gap-3">
                          <div className="bg-emerald-100 p-1.5 rounded text-emerald-600">
                            <IndianRupee className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-slate-900">{scholarship.amount}</span>
                        </div>
                        <div className="flex items-center text-sm text-slate-700 gap-3">
                          <div className="bg-rose-100 p-1.5 rounded text-rose-600">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <span className="font-medium">Due: <span className="font-bold text-slate-900">{formatDate(scholarship.deadline)}</span></span>
                        </div>
                        {scholarship.state && (
                          <div className="flex items-center text-sm text-slate-700 gap-3">
                            <div className="bg-blue-100 p-1.5 rounded text-blue-600">
                              <MapPin className="w-4 h-4" />
                            </div>
                            <span className="font-medium text-slate-900">{scholarship.state}</span>
                          </div>
                        )}
                        {scholarship.field && scholarship.field !== 'All' && (
                          <div className="flex items-center text-sm text-slate-700 gap-3">
                            <div className="bg-violet-100 p-1.5 rounded text-violet-600">
                              <BookOpen className="w-4 h-4" />
                            </div>
                            <span className="font-medium text-slate-900">{scholarship.field}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3 mt-2">
                      <button
                        onClick={() => navigate(`/details/${scholarship._id || scholarship.id}`)}
                        className="flex-1 py-3 rounded-xl border-2 border-navy-900 text-navy-900 font-bold hover:bg-navy-900 hover:text-white transition-all flex items-center justify-center gap-2"
                      >
                        Details
                      </button>
                      <a
                        href={scholarship.link || "https://scholarships.gov.in/"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-[1.5] py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                      >
                        Apply Now
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
