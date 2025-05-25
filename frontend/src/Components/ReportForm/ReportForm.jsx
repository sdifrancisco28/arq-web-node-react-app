import './ReportForm.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ReportForm = () => {
    const [datos, setDatos] = useState([]);

    const handleLogout = () => {
        window.location = "/"
    };

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/user/report');
                setDatos(response.data);
            } catch (error) {
                console.error('Error al obtener los datos', error);
            }
        };

        fetchDatos();
    }, []);

    const deleteUser = async (id) => {
        try {
            console.log(id);
            await axios.post(`http://localhost:3000/user/delete`, { id: id });
            setDatos(datos.filter(user => user._id !== id));
        } catch (error) {
            console.error('Error al eliminar el usuario', error);
        }
    };

    return (
        <div className='report-form'>
            <div className='form-box'> 
                <h1>Reporte de Usuarios</h1>
                <table className="reporte-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button className="delete-button" onClick={() => deleteUser(user._id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className='white_btn' onClick={handleLogout}>Volver al inicio</button>
            </div>
        </div>
    );
    
};

export default ReportForm;