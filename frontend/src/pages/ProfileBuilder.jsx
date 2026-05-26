import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, SkipForward, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { createUserProfile } from '../services/api';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry"
];

const FIELDS_OF_STUDY = [
  "Engineering", "Medical", "Arts", "Commerce", "Science", "Law",
  "Agriculture", "Management", "Education", "Pharmacy", "Architecture", "Other"
];

export default function ProfileBuilder() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    email: '',
    state: '',
    familyIncome: '',
    field: '',
  });

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.category) {
          showToast('Please select a category to continue.');
          return false;
        }
        return true;
      case 2:
        if (!formData.name.trim()) { showToast('Name is required.'); return false; }
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
          showToast('Please enter a valid email.');
          return false;
        }
        if (!formData.state) { showToast('Please select your state.'); return false; }
        return true;
      case 3:
        if (!formData.familyIncome || Number(formData.familyIncome) <= 0) {
          showToast('Please enter a valid family income.');
          return false;
        }
        if (!formData.field) { showToast('Please select your field of study.'); return false; }
        return true;
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (step < 3) {
      setStep(step + 1);
    } else {
      // Final step — submit to backend
      setLoading(true);
      try {
        const payload = {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          category: formData.category,
          familyIncome: Number(formData.familyIncome),
          state: formData.state,
          field: formData.field,
        };

        const user = await createUserProfile(payload);
        showToast('Profile saved! Finding scholarships...', 'success');

        setTimeout(() => {
          navigate('/search', { state: { fromProfile: true, userId: user._id } });
        }, 800);
      } catch (error) {
        showToast(error.message || 'Failed to save profile. Is the backend running?');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSkip = () => {
    navigate('/search', { state: { skippedProfile: true } });
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in relative">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Your Category</h2>
              <p className="text-navy-300">Select your category/caste to find tailored opportunities.</p>
            </div>
            <div className="space-y-4">
              {['General', 'SC', 'ST', 'OBC'].map((cat) => (
                <label key={cat} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.category === cat ? 'border-emerald-500 bg-emerald-500/10' : 'border-navy-700 bg-navy-800/50 hover:bg-navy-800'}`}>
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={formData.category === cat}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="hidden"
                  />
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${formData.category === cat ? 'border-emerald-500' : 'border-navy-500'}`}>
                    {formData.category === cat && <div className="w-3 h-3 bg-emerald-500 rounded-full" />}
                  </div>
                  <span className="text-lg text-white font-medium">{cat}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in relative">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Personal Information</h2>
              <p className="text-navy-300">Tell us a bit about yourself.</p>
            </div>
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-navy-300 mb-2 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-navy-800/80 border border-navy-700 text-white rounded-xl px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-navy-500"
                />
              </div>
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-navy-300 mb-2 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. rahul@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-navy-800/80 border border-navy-700 text-white rounded-xl px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-navy-500"
                />
              </div>
              {/* State */}
              <div>
                <label className="block text-sm font-semibold text-navy-300 mb-2 uppercase tracking-wider">State / Region</label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  className="w-full bg-navy-800/80 border border-navy-700 text-white rounded-xl px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all appearance-none"
                >
                  <option value="" className="bg-navy-900">Select your state</option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s} className="bg-navy-900">{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in relative">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Academic & Financial</h2>
              <p className="text-navy-300">This helps us match income-based and field-specific scholarships.</p>
            </div>
            <div className="space-y-5">
              {/* Family Income */}
              <div>
                <label className="block text-sm font-semibold text-navy-300 mb-2 uppercase tracking-wider">Annual Family Income (₹)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-navy-400 font-semibold text-lg">₹</span>
                  <input
                    type="number"
                    placeholder="e.g. 500000"
                    value={formData.familyIncome}
                    onChange={(e) => setFormData({...formData, familyIncome: e.target.value})}
                    className="w-full bg-navy-800/80 border border-navy-700 text-white rounded-xl pl-10 pr-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-navy-500"
                  />
                </div>
                <p className="text-sm text-navy-500 mt-1">It's okay to provide an estimate.</p>
              </div>
              {/* Field of Study */}
              <div>
                <label className="block text-sm font-semibold text-navy-300 mb-2 uppercase tracking-wider">Field of Study / Course</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {FIELDS_OF_STUDY.map((f) => (
                    <label
                      key={f}
                      className={`flex items-center justify-center p-3 border rounded-xl cursor-pointer transition-all text-center ${
                        formData.field === f
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                          : 'border-navy-700 bg-navy-800/50 hover:bg-navy-800 text-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="field"
                        value={f}
                        checked={formData.field === f}
                        onChange={(e) => setFormData({...formData, field: e.target.value})}
                        className="hidden"
                      />
                      <span className="font-medium">{f}</span>
                      {formData.field === f && <CheckCircle2 className="w-4 h-4 ml-1.5 flex-shrink-0" />}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border backdrop-blur-md animate-slide-in ${
          toast.type === 'success'
            ? 'bg-emerald-900/90 border-emerald-500/50 text-emerald-100'
            : 'bg-red-900/90 border-red-500/50 text-red-100'
        }`}>
          {toast.type === 'success'
            ? <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            : <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          }
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      <div className="relative z-10 w-full max-w-2xl mx-auto flex-grow flex flex-col justify-center">
        
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-emerald-400">Step {step} of 3</span>
            <span className="text-sm font-medium text-navy-400">
              {step === 1 ? 'Category' : step === 2 ? 'Personal Info' : 'Academic & Financial'}
            </span>
          </div>
          <div className="w-full h-2 bg-navy-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Multi-step Form Card */}
        <div className="bg-navy-900/80 backdrop-blur-xl border border-navy-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          
          {/* Form Content */}
          <div className="min-h-[340px]">
             {renderStepContent()}
          </div>

          {/* Form Navigation Controls */}
          <div className="mt-10 flex items-center justify-between border-t border-navy-800 pt-6">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${step === 1 ? 'text-navy-600 cursor-not-allowed' : 'text-navy-300 hover:text-white hover:bg-navy-800'}`}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={handleNext}
              disabled={loading}
              className="bg-emerald-500 hover:bg-emerald-400 text-navy-950 flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  {step === 3 ? 'Find Scholarships' : 'Continue'} <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Skip button below card */}
        <div className="mt-10">
          <button 
            onClick={handleSkip}
            className="w-full group bg-navy-800/40 hover:bg-navy-800/80 border border-navy-700/50 hover:border-navy-600 backdrop-blur-sm text-navy-200 py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all duration-300"
          >
            <span className="group-hover:text-white transition-colors">Skip & Browse All Scholarships</span>
            <SkipForward className="w-5 h-5 text-emerald-500/70 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
          </button>
        </div>

      </div>
    </div>
  );
}
