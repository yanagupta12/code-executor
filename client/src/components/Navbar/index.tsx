import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import './Index.scss';
import {
  Box,
  Typography,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { deepOrange } from '@mui/material/colors';





const Navbar = () => {
  const { userData, auth, logout } = useContext(AuthContext);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }

  const blob = new Blob([userData.image], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);

  return (
    <div className="navbar">
      <Box sx={{
        flexGrow: 3,
        display: 'flex',
        flexDirection: "column",
      }}>
        <Typography variant="h4" className="heading">
          CodeR
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Link
          to="/editor"
          className="editor-link"
        >
          Editor
        </Link>
      </Box>

      <Box sx={{ flexGrow: 0 }}>
        {auth && (
          <Tooltip title="Profile Summary">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ textTransform: 'uppercase' }}
            >
              <Avatar
                alt={`${userData.first_name} ${userData.last_name}`}
                src={url}
                sx={{ width: 50, height: 50, bgcolor: deepOrange[500] }}
              />
            </IconButton>
          </Tooltip>
        )}

        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Link to="/user/summary">Profile</Link>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Link to="/user/dashboard">Dashboard</Link>
          </MenuItem>
          <MenuItem onClick={() => {
            logout()
            handleCloseUserMenu();
          }}>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </div>
  );
}

export default Navbar;
