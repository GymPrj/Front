import React, { useState } from 'react';
import axios from 'axios';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const Register = () => {
  const onClick = async () => {
    console.log('click');

    // get test
    await axios
      .get('/test')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      rePassword: data.get('rePassword'),
      gender: data.get('gender'),
      age: data.get('age'),
      address: data.get('address'),
    });
    if (data.get('password') !== data.get('rePassword')) {
      setError(true);
      setHelperText('비밀번호가 일치하지 않습니다.');
    } else {
      setError(false);
      setHelperText('');
    }
    console.log(helperText);
  };

  return (
    <ThemeProvider theme={theme}>
      <button type="button" onClick={onClick}>
        click
      </button>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" error={error} variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    // required
                    autoFocus
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일 주소"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    // required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    // required
                    fullWidth
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    label="비밀번호 재입력"
                  />
                </Grid>
                <FormHelperText>{helperText}</FormHelperText>
                <Grid item xs={12}>
                  <TextField
                    // required
                    fullWidth
                    id="gender"
                    name="gender"
                    label="성별"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    // required
                    fullWidth
                    id="age"
                    name="age"
                    label="나이"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    // required
                    fullWidth
                    id="address"
                    name="address"
                    label="주소"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="회원가입 약관에 동의합니다."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                회원가입
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
