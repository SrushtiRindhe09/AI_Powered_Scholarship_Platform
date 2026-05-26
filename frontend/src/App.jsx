import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ProfileBuilder from './pages/ProfileBuilder';
import DiscoveryHub from './pages/DiscoveryHub';
import ScholarshipDetails from './pages/ScholarshipDetails';
import MentorSession from './pages/MentorSession';
import CommunityHub from './pages/CommunityHub';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Chatbot />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<ProfileBuilder />} />
            <Route path="search" element={<DiscoveryHub />} />
            <Route path="details/:id" element={<ScholarshipDetails />} />
            <Route path="mentor/:id" element={<MentorSession />} />
            <Route path="community" element={<CommunityHub />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
