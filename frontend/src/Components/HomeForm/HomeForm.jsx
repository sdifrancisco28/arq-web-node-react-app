import './HomeForm.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const Main = () => {
    // Recuperar el username desde localStorage
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    // Botón cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.reload();
    };

    // Botón reportes
    const handleReports = () => {
        navigate("/reports");
    };

    return (
        <div className='home-form'>
            <div className='form-box'> 
                <form>
                    <h1>Inicio</h1>
                    <h1>Bienvenido, {username}</h1>
                    <button className='white_btn' onClick={handleReports}>Reportes</button>
                    <button className='white_btn' onClick={handleLogout}>Cerrar Sesión</button>
                </form>
            </div>
        </div>
    );
    
};

export default Main;