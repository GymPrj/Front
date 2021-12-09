import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Button,
  CssBaseline,
  Toolbar,
  Typography,
  GlobalStyles,
} from '@mui/material';

const Header = () => {
  return (
    <>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            <Link to="/">세상 모든 헬스장</Link>
          </Typography>
          <Button
            type="button"
            variant="contained"
            sx={{ my: 1, mx: 1 }}
            disableElevation
          >
            <Link to="/login">로그인</Link>
          </Button>
          <Button type="button" variant="outlined" sx={{ my: 1, mx: 1 }}>
            <Link to="/memberSignUp">회원가입</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
