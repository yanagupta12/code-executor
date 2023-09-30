import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Index.scss';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { TextField, Button } from '@mui/material';

const User: React.FC = () => {
  const { userData, auth } = useContext(AuthContext);
  const blob = new Blob([userData.image], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);

  const navigate = useNavigate();

  const [editMode, setEditMode] = useState<boolean>(false);

  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleClick = async () => {
    if (editMode) {


      console.log(firstNameRef.current?.value)
      console.log(lastNameRef.current?.value)
      console.log(emailRef.current?.value)
      console.log(passwordRef.current?.value)


      const data = {
        first_name: firstNameRef.current!.value,
        last_name: lastNameRef.current!.value,
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
      }

      try {
        const response = await fetch('http://localhost:8000/auth/update', {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }).then((res) => res.json())

        console.log(response)
      } catch (error) {
        console.error('An error occurred:', error)
      }
    }
    setEditMode(!editMode);
  };

  if (!auth) {
    navigate('/');
  }

  return (
    <div className="page">
      <div className="profile-card">
        <div className="avatar">
          <img src={url} alt="Avatar" />
        </div>
        <div className="card-content">
          <div className="name">
            <TextField
              fullWidth
              label="First Name"
              disabled={!editMode}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder={userData.first_name}
              inputRef={firstNameRef}
            />
            <TextField
              fullWidth
              label="Last Name"
              InputLabelProps={{
                shrink: true,
              }}
              disabled={!editMode}
              placeholder={userData.last_name}
              inputRef={lastNameRef}
            />
          </div>
          <div className="email">
            <TextField
              fullWidth
              label="Email"
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={true}
              value={userData.email}
              inputRef={emailRef}
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="Password"
              disabled={!editMode}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="********"
              inputRef={passwordRef}
            />
          </div>
          <div className="actions">
            <Button
              variant="contained"
              onClick={handleClick}
            >
              {editMode
                ?
                'Save'
                :
                'Edit'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
