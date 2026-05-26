import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-navy-950/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-emerald-500 p-2 rounded-lg group-hover:bg-emerald-400 transition-colors">
              <GraduationCap className="w-6 h-6 text-navy-950" />
            </div>
            <span className="font-bold text-xl text-white tracking-tight">Scholar<span className="text-emerald-400">Hunter</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-navy-100 hover:text-white transition-colors font-medium">Home</Link>
            <Link to="/search" className="text-navy-100 hover:text-white transition-colors font-medium">Search</Link>
            <Link to="/community" className="text-navy-100 hover:text-white transition-colors font-medium">Community</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="text-navy-100 hover:text-white transition-colors font-medium">
                  Profile Builder
                </Link>
                <button onClick={handleLogout} className="px-5 py-2 rounded-full border border-rose-500/50 text-rose-400 hover:bg-rose-500/10 hover:border-rose-400 transition-all font-medium">
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-navy-100 hover:text-white transition-colors font-medium">
                  Log In
                </Link>
                <Link to="/signup" className="px-5 py-2 rounded-full border border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-navy-950 transition-all font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
