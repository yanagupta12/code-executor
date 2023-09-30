import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Index.scss';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


const Dashboard: React.FC = () => {
    const { auth, userData } = useContext(AuthContext);

    const navigate = useNavigate();


    if (!auth) {
        navigate('/');
    }

    return (
        <div className="page">
            <h1>

                Welcome to the Dashboard {userData.first_name}
            </h1>
        </div>
    );
};

export default Dashboard;
