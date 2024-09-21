import { Box, Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { User } from '../../types';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box>
        <Button onClick={handleClick} className="text-white">
          Hello, {user.username}
        </Button>

        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <NavLink to="/register">Log out</NavLink>
          </MenuItem>
        </Menu>
        <div className="text-end">
          <Button variant="outlined" onClick={() => navigate('/new-item')}>
            Add new product
          </Button>
        </div>
      </Box>
    </>
  );
};

export default UserMenu;
