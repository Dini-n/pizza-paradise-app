import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderPage from './components/OrderPage';
import PizzaEditPage from './components/PizzaEditPage';
import OrderManagementPage from './components/OrderManagementPage';
import OrderDetailsPage from './components/OrderDetailsPage';

import Navbar from './Navbar/Navbar';
import HomePage from './components/home';

function App() {
  return (
      <Router>
      <Navbar />
      
        <div className="App">
          <Routes>
          <Route path="/" element={<HomePage />} />

            <Route path="/order" element={<OrderPage />} />
            <Route path="/edit-pizza/:id" element={<PizzaEditPage />} />
            <Route path="/add-pizza/" element={<PizzaEditPage />} />

            <Route path="/order-management" element={<OrderManagementPage />} />
            <Route path="/order-details/:id" element={<OrderDetailsPage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
