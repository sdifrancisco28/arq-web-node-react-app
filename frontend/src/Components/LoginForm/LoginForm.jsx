import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from 'axios';

const LoginForm = () => {
    const [action, setAction] = useState('');
    const navigate = useNavigate();
    // Variables de datos
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
    const [forgotData, setForgotData] = useState({ email: '' });
    // Variabbles para errores
    const [error, setError] = useState();
    const [errorSignup, setErrorSignup] = useState();
    const [errorForgot, setErrorForgot] = useState();

    // Función para cambiar el estilo en login/signup/forgot-password
    const registerLink = () => {
        setAction(' active');
    };

    const loginLink = () => {
        setAction('');
    };

    const forgotLink = () => {
        setAction(' forgot');
    };

    // Cambiar valor de variables
    const handleChangeSignup = ({ currentTarget: input }) => {
        setRegisterData({ ...registerData, [input.name]: input.value});
    };

    const handleChange = ({ currentTarget: input }) => {
        setLoginData({ ...loginData, [input.name]: input.value});
    };

    const handleChangeForgot = ({ currentTarget: input }) => {
        setForgotData({ ...forgotData, [input.name]: input.value});
    };

    // Función Login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data: res } = await axios.post('http://localhost:3000/user/signin', loginData);
            localStorage.setItem("token", res.loginData)
            localStorage.setItem("username", loginData.email)
            window.location = "/"
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };

    // Función signup
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const { data: res } = await axios.post('http://localhost:3000/user/signup', registerData);
            navigate("/login")
            setErrorSignup(res.message);
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ){
                setErrorSignup(error.response.data.message);
            }
        }
    };

    // Función Forgot password
    const handleForgot = async (e) => {
        e.preventDefault();
        try {
            const { data: res } = await axios.post('http://localhost:3000/user/forgot-password', forgotData);
            navigate("/login")
            setErrorForgot(res.message);
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ){
                setErrorForgot(error.response.data.message);
            }
        }
    };

    return (
        <div className={`wrapper${action}`}>
            <div className='form-box login'> 
                <form onSubmit={handleLogin}>
                    <h1>Inicio de sesión</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Usuario' name='email' onChange={handleChange} value={loginData.email} required />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Contraseña' name='password' onChange={handleChange} value={loginData.password} required />
                        <FaLock className='icon' />
                    </div>

                    <div className="remember-forgot">
                        <a href="#">{" "}</a>
                        <a href="#" onClick={forgotLink}>Olvidaste tu contraseña?</a>
                    </div>
                    <div className={`error-msg ${error ? 'visible' : ''}`}>{error}</div>
                    <button type="submit">Iniciar sesión</button>
                    <div className="register-link">
                        <p>No estás registrado aún? <a href="#" onClick={registerLink}>Registrarse</a></p>
                    </div>
                </form>
            </div>

            <div className='form-box register'> 
                <form onSubmit={handleRegister}>
                    <h1>Registrarse</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Usuario' name='username' onChange={handleChangeSignup} value={registerData.username} required />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder='Correo' name='email' onChange={handleChangeSignup} value={registerData.email} required />
                        <MdEmail className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Contraseña' name='password' onChange={handleChangeSignup} value={registerData.password} required />
                        <FaLock className='icon' />
                    </div>
                    <div className={`error-msg-signup ${errorSignup ? 'visible' : ''}`}>{errorSignup}</div>
                    <button type="submit">Registrarse</button>
                    <div className="register-link">
                        <p>Ya tenés una cuenta? <a href="#" onClick={loginLink}>Inicia sesión</a></p>
                    </div>
                </form>
            </div>

            <div className='form-box forgot'> 
                <form onSubmit={handleForgot}>
                    <h1>Recuperar contraseña</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Correo' name='email' onChange={handleChangeForgot} value={forgotData.email} required />
                        <MdEmail className='icon' />
                    </div>
                    <div className="remember-forgot">
                        <label>Si el correo ingresado existe, se enviará el link de recuperación.</label>
                    </div>
                    <div className={`error-msg-forgot ${errorForgot ? 'visible' : ''}`}>{errorForgot}</div>
                    <button type="submit">Recuperar contraseña</button>
                    <div className="register-link">
                        <p>Ya tenés una cuenta? <a href="#" onClick={loginLink}>Inicia sesión</a></p>
                    </div>
                </form>
            </div>
        </div>        
    );
};

export default LoginForm;