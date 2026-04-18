import '../styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Redirect root to landing or dashboard based on auth
    if (router.pathname === '/') {
      const token = localStorage.getItem('token');
      if (token) {
        router.push('/dashboard');
      } else {
        router.push('/landing');
      }
    }
  }, [router]);

  return <Component {...pageProps} />;
}

export default App;
