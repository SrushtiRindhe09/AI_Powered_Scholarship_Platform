import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HIDDEN_ROUTES = ['/login', '/signup', '/'];

export default function Chatbot() {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();
  
  const shouldHide = HIDDEN_ROUTES.includes(pathname) || !isAuthenticated;

  useEffect(() => {
    // Check if script already exists to avoid duplicates
    if (document.getElementById('bp-inject-script')) return;

    // Load inject.js first
    const script = document.createElement('script');
    script.id = 'bp-inject-script';
    script.src = 'https://cdn.botpress.cloud/webchat/v3.6/inject.js';
    script.async = true;
    
    script.onload = () => {
      // Once inject.js finishes, load config.js
      const configScript = document.createElement('script');
      configScript.id = 'bp-config-script';
      configScript.src = 'https://files.bpcontent.cloud/2026/04/10/13/20260410134301-F1SN1DG8.js';
      configScript.defer = true;
      document.body.appendChild(configScript);
    };

    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    // We use a CSS block to control visibility seamlessly based on route
    let styleEl = document.getElementById('bp-visibility-override');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'bp-visibility-override';
      document.head.appendChild(styleEl);
    }

    if (shouldHide) {
      styleEl.innerHTML = `#bp-web-widget-container { display: none !important; }`;
    } else {
      styleEl.innerHTML = `#bp-web-widget-container { display: block !important; }`;
    }
  }, [shouldHide]);

  return null;
}
