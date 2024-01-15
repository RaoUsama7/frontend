import React from 'react';
import HomePage from './HomePage'; 
import '@/styles/styles.css';

interface MyAppProps {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
}
function MyApp({ Component, pageProps }: MyAppProps) {
  return (
    <div>
     
     
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
