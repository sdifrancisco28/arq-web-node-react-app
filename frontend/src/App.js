// Importo todas las interfaces
import LoginForm from './Components/LoginForm/LoginForm';
import Main from './Components/HomeForm/HomeForm';
import ResetForm from './Components/LoginForm/ResetForm';
import ReportForm from './Components/ReportForm/ReportForm';
import { Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';



function App() {
  // Obtengo el token de localStorage para validar si está logeado
  const user = localStorage.getItem("token")
  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" exact element={<Main />} />
          <Route path="/reports" exact element={<ReportForm />} />
        </>
      ) : (
        <>
          <Route path="/login" exact element={<LoginForm />} />
          <Route path="/" exact element={<Navigate replace to="/login" />} />
          <Route path="/reports" exact element={<Navigate replace to="/login" />} />
        </>
      )}
      <Route path="/reset_password/:id/:token" element={<ResetForm />}></Route>
    </Routes>
  );
}

export default App;
