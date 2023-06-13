import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

const Navbar = () => {
  const location = useLocation();

  const renderSearchBar = () => {
    if (location.pathname === '/search') {
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit">
            <Search />
          </IconButton>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            fullWidth
            style={{ marginLeft: 1 }}
          />
        </div>
      );
    } else {
      return (
        <IconButton color="inherit" component={Link} to="/search">
          <Search />
        </IconButton>
      );
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/">Pokedex</Link>
        </Typography>
        {renderSearchBar()}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
