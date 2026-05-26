import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMentors } from '../services/api';
import { Star, Users, ChevronRight } from 'lucide-react';

export default function MentorList() {
  const [mentors, setMentors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMentors().then(setMentors);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-navy-900 mb-8">Our Expert Mentors</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((m) => (
            <div key={m._id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m.avatar}`} 
                className="w-20 h-20 rounded-full mb-4 bg-navy-50" 
                alt={m.name} 
              />
              <h3 className="text-xl font-bold text-navy-900">{m.name}</h3>
              <p className="text-emerald-600 text-sm font-medium mb-4">{m.role}</p>
              
              <div className="flex gap-4 mb-6 text-sm text-slate-500">
                <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400"/> {m.rating}</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4"/> {m.sessions} sessions</span>
              </div>

              <button 
                onClick={() => navigate(`/mentor/${m._id}`)}
                className="w-full py-3 bg-navy-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-navy-800"
              >
                Book Session <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}