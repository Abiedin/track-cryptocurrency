import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Homepage from './Pages/Homepage';
import CoinPages from './Pages/CoinPages';


function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="coins/:id" element={<CoinPages />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
