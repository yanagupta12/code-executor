import './Index.scss'
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Link,
} from '@mui/material'
import Box from '@mui/material/Box'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EmailIcon from '@mui/icons-material/Email'
import HttpsIcon from '@mui/icons-material/Https'
import { useState, useRef, useContext } from 'react'
import Spinner from '../Spinner/Index'
import { AuthContext } from '../../context/AuthContext'

const Form = ({
  setShowSignup,
}: {
  setShowSignup: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const emailRef = useRef<JSX.Element>(null)
  const passwordRef = useRef<JSX.Element>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const { login } = useContext(AuthContext)

  const handleSubmit = async () => {
    if (!emailRef.current.value || !passwordRef.current.value) {
      alert('All fields are required')
      return
    }
    setLoading(true)
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then((res) => res.json())
      login(response.data)
      setLoading(false)
    } catch (error) {
      console.error('An error occurred:', error)
      setLoading(false)
    }
  }

  const resetForm = async () => {
    if (!emailRef.current || !passwordRef.current) return
    emailRef.current.value = ''
    passwordRef.current.value = ''
  }

  const FormComponent = () => {
    return (
      <div className="login">
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
        <Box>
          <Link
            component="button"
            variant="body2"
            onClick={() => {
              setShowSignup(true)
            }}
            underline="none"
          >
            Don't have an account? Sign up
          </Link>
        </Box>
        <Box className="login-item" sx={{ marginTop: '10px' }}>
          <Button className="button" variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
          <Button className="button" variant="outlined" onClick={resetForm}>
            Reset
          </Button>
        </Box>
      </div>
    )
  }

  return (
    <div className="login-form">
      {loading ? <Spinner text="Loading..." small={true} /> : <FormComponent />}
    </div>
  )
}

export default Form
