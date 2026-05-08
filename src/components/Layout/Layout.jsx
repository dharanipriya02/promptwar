import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import BottomNav from '../BottomNav/BottomNav';
import Navbar from '../Navbar/Navbar';

function Layout({ children, currentRoute }) {
  return (
    <div className="layout-root">
      <Sidebar currentRoute={currentRoute} />
      <div className="layout-content">
        <Navbar currentRoute={currentRoute} />
        <main className="page">
          {children}
        </main>
      </div>
      <BottomNav currentRoute={currentRoute} />
      
      <style jsx>{`
        .layout-root {
          display: flex;
          min-height: 100vh;
          background: var(--bg-primary);
        }
        
        .layout-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        
        @media (max-width: 767px) {
          .layout-content {
            padding-bottom: var(--bottom-nav-height);
          }
        }
      `}</style>
    </div>
  );
}

export default Layout;
