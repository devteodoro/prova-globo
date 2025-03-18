import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Users from './Pages/Users/Users';
import Movies from './Pages/Movie/Movie';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (user) => {
    setUsername(user);
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
          <Route path="/users" element={isLoggedIn ? <Users /> : <Navigate to="/login" />} />
          <Route path="/movies" element={isLoggedIn ? <Movies /> : <Navigate to="/login" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;