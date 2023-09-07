import './Index.scss'
import { TextField, Button, InputAdornment, IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import AccountCircle from '@mui/icons-material/AccountCircle'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EmailIcon from '@mui/icons-material/Email'
import HttpsIcon from '@mui/icons-material/Https';
import { useState, useRef } from 'react'
import Spinner from '../Spinner/Index'


const Form = () => {


    const handleSubmit = async () => {
        if (
            !firstNameRef.current.value ||
            !lastNameRef.current.value ||
            !emailRef.current.value ||
            !passwordRef.current.value
        ) {
            alert("All fields are required")
            return;
        }

        setLoading(true)

        const data = {
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        };

        try {
            const response = await fetch("http://localhost:8000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }).then((res) => res.json())
            console.log(response)
            setLoading(false)

        } catch (error) {
            console.error('An error occurred:', error);
            setLoading(false)
        }
    };


    const firstNameRef = useRef<JSX.Element>(null)
    const lastNameRef = useRef<JSX.Element>(null)
    const emailRef = useRef<JSX.Element>(null)
    const passwordRef = useRef<JSX.Element>(null)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const FormComponent = () => {
        return (
            <div className="login">
                <Box
                    className="login-item"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                        }}
                    >
                        <AccountCircle sx={{
                            color: 'action.active', mr: 1, my:
                                0.5
                        }} />
                        <TextField
                            className="component"
                            label="Firstname"
                            variant="standard"
                            inputRef={firstNameRef}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                        }}
                    >
                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField
                            className="component"
                            label="Lastname"
                            variant="standard"
                            inputRef={lastNameRef}
                        />
                    </Box>
                </Box>
                <Box
                    className="login-item"
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                    }}
                >
                    <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                        className="component"
                        label="Email"
                        variant="standard"
                        inputRef={emailRef}
                    />
                </Box>
                <Box
                    className="login-item"
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                    }}
                >
                    <HttpsIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                        className="component"
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        variant="standard"
                        inputRef={passwordRef}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => {
                                            setShowPassword(!showPassword)
                                        }}
                                    >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <Box className="login-item" sx={{ marginTop: '10px' }}>
                    <Button className="button" variant="contained" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button className="button" variant="outlined">
                        Reset
                    </Button>
                </Box>
            </div>
        )
    }

    return (
        <div className='login-form'>
            {loading ?
                <Spinner text="Loading..." small={true} /> :
                <FormComponent />}
        </div>
    )
}

export default Form

