import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Index.scss';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Button } from '@mui/material';


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
            <div>
                <Button>
                    Create Interview Room
                </Button>
                <Button>
                    Join Interview Room
                </Button>
            </div>
            <div className='rooms'>
                <h2>
                    Interview Rooms
                </h2>

                <div>
                    All the interview room will be listed here
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
