import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IndianRupee, Calendar, CheckCircle, XCircle, ArrowRight, MessageCircle, MapPin, Building, GraduationCap, Loader2 } from 'lucide-react';
import { fetchScholarshipById } from '../services/api';

export default function ScholarshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchScholarshipById(id);
        setScholarship(data);
      } catch (error) {
        console.error("Failed to fetch scholarship:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-16 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 pb-16 flex items-center justify-center">
        <h2 className="text-xl font-bold text-navy-900">Scholarship not found.</h2>
      </div>
    );
  }

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-bl-full -z-0"></div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-md border border-blue-200">#Govt</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-2">{scholarship.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-slate-600 font-medium">
                <div className="flex items-center gap-2"><Building className="w-4 h-4 text-emerald-600"/> {scholarship.provider}</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-600"/> India</div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 min-w-[200px]">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-sm text-slate-500 mb-1">Amount Awarded</div>
                <div className="text-2xl font-bold text-emerald-600 flex items-center gap-1"><IndianRupee className="w-5 h-5"/> {scholarship.amount?.replace('₹', '')}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-navy-900 mb-4">About this Scholarship</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                This scholarship is designed to support students pursuing higher education in the field of {scholarship.field === 'All' ? 'any discipline' : scholarship.field}. 
                It is primarily targeted towards applicants who identify with the {scholarship.category === 'All' ? 'General/Unreserved' : scholarship.category} category.
              </p>
              
              <h3 className="text-lg font-bold text-navy-900 mb-4 mt-8 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-600" /> Eligibility Requirements
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Maximum Family Income: ₹{scholarship.maxIncome?.toLocaleString('en-IN')} p.a.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Category: {scholarship.category === 'All' ? 'Any Category' : scholarship.category}</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>State: {scholarship.state === 'All India' ? 'Resident of India' : `Resident of ${scholarship.state}`}</span>
                </li>
                <li className="flex items-start gap-3 text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Field of Study: {scholarship.field === 'All' ? 'Any Field' : scholarship.field}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Can I Apply Checklist */}
            <div className="bg-navy-900 rounded-3xl p-6 shadow-sm text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                Can I Apply?
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-navy-100 text-sm font-medium">Income matches profile</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-navy-100 text-sm font-medium">Category matches</span>
                </div>
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-rose-400" />
                  <span className="text-navy-100 text-sm font-medium">Document missing: Income Cert.</span>
                </div>
              </div>
              <a 
                href={scholarship.link || "https://scholarships.gov.in/"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] flex flex-col items-center gap-1 group"
              >
                <span className="flex items-center gap-2">Apply on Official Site <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/></span>
              </a>
              <div className="text-center mt-4 flex items-center justify-center gap-2 text-sm text-navy-300">
                <Calendar className="w-4 h-4" /> Closes {formatDate(scholarship.deadline)}
              </div>
            </div>

            {/* Mentor Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-blue-500"></div>
               <h3 className="font-bold text-navy-900 mb-2">Need Guidance?</h3>
               <p className="text-sm text-slate-500 mb-4">Connect with a previous winner to increase your chances.</p>
               <button 
                  onClick={() => navigate(`/mentor/${scholarship._id}`)}
                  className="w-full py-3 rounded-xl border-2 border-navy-900 text-navy-900 font-bold hover:bg-navy-900 hover:text-white transition-all flex items-center justify-center gap-2 group">
                 <MessageCircle className="w-4 h-4" />
                 Ask a Mentor
               </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
