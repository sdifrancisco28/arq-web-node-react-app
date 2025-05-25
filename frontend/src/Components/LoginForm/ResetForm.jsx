import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ResetForm.css';
import { FaLock } from "react-icons/fa";
import axios from 'axios';

const ResetForm = () => {
    // Datos de reseteo de password
    const [resetData, setResetData] = useState({ password: '', password2: '' });
    // Variables para errores
    const [error, setError] = useState();
    const navigate = useNavigate();
    // Recibo parámetros
    const {id, token} = useParams();
    
    // Cambios de valor de claves en resetData
    const handleChange = ({ currentTarget: input }) => {
        setResetData({ ...resetData, [input.name]: input.value});
    };

    // Reseteo de password
    const handleReset = async (e) => {
        e.preventDefault();
        try {
            // POST
            const { data: res } = await axios.post(`http://localhost:3000/user/reset-password/${id}/${token}`, resetData);
            navigate('/login')
            setError(res.message);
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className={`reset-form`}>
            <div className='form-box'> 
                <form onSubmit={handleReset}>
                    <h1>Restablecer contraseña</h1>
                    <div className="input-box">
                        <input type="password" placeholder='Contraseña' name='password' onChange={handleChange} value={resetData.password} required />
                        <FaLock className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Repetir Contraseña' name='password2' onChange={handleChange} value={resetData.password2} required />
                        <FaLock className='icon' />
                    </div>
                    <div className={`error-msg ${error ? 'visible' : ''}`}>{error}</div>
                    <button type="submit">Restablecer</button>
                </form>
            </div>
        </div>        
    );
};

export default ResetForm;