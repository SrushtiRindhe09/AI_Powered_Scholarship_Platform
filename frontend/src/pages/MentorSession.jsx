import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, Award, Star, Video, CheckCircle2, Loader2, ChevronRight, Users } from 'lucide-react';
import { fetchMentors } from '../services/api';

export default function MentorSession() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mentors, setMentors] = useState([]); // Store all 10 mentors
  const [activeMentor, setActiveMentor] = useState(null); // The one currently selected
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const mentorsList = await fetchMentors();
        setMentors(mentorsList);

        // If there's an ID in URL, find that mentor. Otherwise, pick the first one.
        const initial = mentorsList.find(m => m._id === id || m.id === id) || mentorsList[0];
        setActiveMentor(initial);
      } catch (error) {
        console.error("Failed to load mentors:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  // Reset booking state and slot when switching mentors
  const handleMentorChange = (m) => {
    setActiveMentor(m);
    setSelectedSlot(null);
    setIsBooked(false);
    navigate(`/mentor/${m._id || m.id}`, { replace: true });
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
    </div>
  );

  if (isBooked) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white max-w-md w-full rounded-3xl p-8 border border-slate-200 shadow-xl text-center">
          <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-navy-900 mb-2">Session Booked!</h2>
          <p className="text-slate-600 mb-6">Confirmed with {activeMentor?.name} for <span className="font-bold">{selectedSlot}</span>.</p>
          <div className="bg-blue-50 p-4 rounded-xl flex items-center gap-3 mb-8 text-left">
            <Video className="text-blue-600" />
            <a href={activeMentor?.meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm font-bold hover:underline">Join Google Meet</a>
          </div>
          <button onClick={() => setIsBooked(false)} className="w-full bg-navy-900 text-white py-3 rounded-xl font-bold">Book Another Session</button>
        </div>
      </div>
    );
  }

  if (!activeMentor) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-navy-900 mb-4">Mentor not found</h2>
        <button onClick={() => navigate(-1)} className="bg-navy-900 text-white px-6 py-2 rounded-xl font-bold">Go Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT SIDE: ALL MENTORS LIST (Choices) */}
        <div className="lg:col-span-4 space-y-4 h-[calc(100vh-12rem)] overflow-y-auto pr-2 custom-scrollbar">
          <h2 className="text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" /> Choose a Mentor
          </h2>
          {mentors.map((m) => (
            <div
              key={m._id || m.id}
              onClick={() => handleMentorChange(m)}
              className={`p-4 rounded-2xl cursor-pointer transition-all border-2 flex items-center gap-4 ${activeMentor?._id === m._id ? 'border-emerald-500 bg-white shadow-md' : 'border-transparent bg-slate-100 hover:bg-white'
                }`}
            >
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m.avatar}`} className="w-12 h-12 rounded-full bg-navy-100" />
              <div className="flex-1">
                <h3 className="font-bold text-navy-900 text-sm">{m.name}</h3>
                <p className="text-xs text-slate-500 truncate w-40">{m.role}</p>
              </div>
              <ChevronRight className={`w-4 h-4 ${activeMentor?._id === m._id ? 'text-emerald-500' : 'text-slate-300'}`} />
            </div>
          ))}
        </div>

        {/* RIGHT SIDE: ACTIVE MENTOR DETAILS & BOOKING */}
        <div className="lg:col-span-8 flex flex-col md:flex-row gap-6">
          {/* Profile Card */}
          <div className="w-full md:w-2/5">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activeMentor.avatar}`} className="w-24 h-24 mx-auto mb-4" />
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-navy-900">{activeMentor.name}</h2>
                <p className="text-emerald-600 text-sm font-medium">{activeMentor.role}</p>
              </div>
              <div className="flex justify-around bg-slate-50 p-3 rounded-xl mb-4">
                <div className="text-center"><Star className="w-4 h-4 text-amber-400 mx-auto" /><span className="text-xs font-bold">{activeMentor.rating}</span></div>
                <div className="text-center"><Clock className="w-4 h-4 text-slate-400 mx-auto" /><span className="text-xs font-bold">{activeMentor.sessions} sessions</span></div>
              </div>
              <p className="text-sm text-slate-600 text-center italic">"{activeMentor.bio}"</p>
            </div>
          </div>

          {/* Slots Card */}
          <div className="w-full md:w-3/5 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <h1 className="text-2xl font-bold text-navy-900 mb-6">Book a 1:1 Session</h1>
            <div className="grid grid-cols-1 gap-3 mb-8">
              {activeMentor.availability?.map(slot => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-4 rounded-xl border-2 text-left font-bold transition-all flex justify-between items-center ${selectedSlot === slot ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 hover:border-emerald-200'
                    }`}
                >
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {slot}</span>
                  {selectedSlot === slot && <CheckCircle2 className="w-5 h-5" />}
                </button>
              ))}
            </div>
            <button
              disabled={!selectedSlot}
              onClick={() => setIsBooked(true)}
              className={`w-full py-4 rounded-xl font-bold transition-all ${selectedSlot ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
            >
              Confirm Booking
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
