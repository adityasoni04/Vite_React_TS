import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './pages/Form';
import SecondPage from './pages/SecondPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<div id="roott"><Form/></div>} />
        <Route path="/second-page" element={<SecondPage />} />
      </Routes>
    </Router>
  );
};

export default App;
