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
            <h2>
                Welcome to the Dashboard&nbsp;&nbsp;
                <span className='name'>
                    {userData.first_name}
                </span>
            </h2>
            <div>
                <Button>
                    Create Room
                </Button>
                <Button>
                    Join Rooms
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
