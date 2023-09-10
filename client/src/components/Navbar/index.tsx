import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './Index.scss'
import { Box, Typography, Tooltip, IconButton, Avatar, Menu, MenuItem, Link } from '@mui/material'

const settings = ['Profile', 'Dashboard', 'Logout'];


const Navbar = () => {
  const { userData } = useContext<any>(AuthContext)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const blob = new Blob([userData.image], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);



  return (
    <div className="navbar">
      <Box sx={{ flexGrow: 3 }} >
        <Typography variant="h4" className='heading'>
          CodeR
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>

        <Link href="/editor" underline="none" sx={{ color: "white", textTransform: "uppercase" }} className='editor-link'>
          <Typography variant="h6" className='heading'>
            Editor
          </Typography>
        </Link>

      </Box>

      <Box sx={{ flexGrow: 0 }} >
        <Tooltip title="Profile Summary">
          <IconButton onClick={handleOpenUserMenu} sx={{ textTransform: "uppercase", height: 30, width: 30 }}>
            <Avatar alt={`${userData.first_name} ${userData.last_name}`} src={url} />
          </IconButton>
        </Tooltip>



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
          <MenuItem onClick={handleCloseUserMenu}>Profile </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>Dashboard</MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>Logout</MenuItem>
        </Menu>
      </Box>
    </div >
  )
}

export default Navbar
