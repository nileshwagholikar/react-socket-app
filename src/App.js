import React, { Suspense } from 'react';
import './App.css';

const Header = React.lazy(() => import('./components/common/Header/Header'));
const Footer = React.lazy(() => import('./components/common/Footer/Footer'));
const Sensors = React.lazy(() => import('./components/Sensors/Sensors'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="page-wrapper">
        <Header></Header>
        <div className="page-content">
          <Sensors />
        </div>
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;
