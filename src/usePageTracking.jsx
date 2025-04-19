// usePageTracking.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-YDB18XQ54N', {
        page_path: location.pathname,
      });
    }
  }, [location]);
};

export default usePageTracking;
