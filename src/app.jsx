import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AppRouter from './router/AppRouter';

const App = () => {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '1rem' }}>
          <AppRouter />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
