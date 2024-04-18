import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from './components/comman/PrivateRoute';
import Loginpage from './pages/Loginpage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Loginpage />} />
      <Route path='*' element={<Loginpage />} />
      <Route element={<PrivateRoutes />}>
        <Route path='/register' element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
