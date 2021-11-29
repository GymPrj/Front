import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
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
  MenuItem,
  Select,
} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';

const Selects = styled(Select)`
  height: 56px;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-bottom: 0;
  border-radius: 3px;
  & > div {
    height: 47px !important;
    line-height: 47px;
    padding-left: 14px;
  }
`;

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700;
  color: #d32f2f;
`;

const Boxs = styled(Box)`
  padding-bottom: 40px;
`;

const Register = () => {
  const theme = createTheme();
  const [sex, setSex] = useState('none');
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [ageError, setAgeErrorr] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [sexError, setSexError] = useState('');
  const [cityError, setCityError] = useState('');
  const [townError, setTownError] = useState('');
  const [checkError, setCheckError] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const history = useHistory();

  const handleChange = event => {
    setSex(event.target.value);
  };

  const handleAgree = event => {
    setChecked(event.target.checked);
  };

  const onClick = async data => {
    console.log(data);

    const { age, city, email, name, password, phone, town } = data;
    const postData = {
      age,
      city,
      email,
      name,
      password,
      phone,
      sex,
      town,
    };

    // post
    await axios
      .post('/member/join', postData)
      .then(function (response) {
        console.log(response, '성공');
        history.push('/login');
      })
      .catch(function (err) {
        console.log(err);
        setRegisterError('회원가입에 실패하였습니다. 다시한번 확인해 주세요.');
      });

    // get test
    // await axios
    //   .get('/test')
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData = {
      age: data.get('age'),
      city: data.get('city'),
      email: data.get('email'),
      name: data.get('name'),
      password: data.get('password'),
      rePassword: data.get('rePassword'),
      phone: `${data.get('phone1')}${data.get('phone2')}${data.get('phone3')}`,
      sex,
      town: data.get('town'),
    };
    const { age, city, email, name, password, rePassword, phone, town } =
      joinData;

    // 이메일 유효성 체크
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email)) {
      setCheckError(false);
      setEmailError('올바른 이메일 형식이 아닙니다.');
    } else {
      setCheckError(true);
      setEmailError('');
    }

    // 비밀번호 유효성 체크
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password)) {
      setCheckError(false);
      setPasswordState(
        '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!',
      );
    } else {
      setCheckError(true);
      setPasswordState('');
    }

    // 비밀번호 같은지 체크
    if (password !== rePassword) {
      setCheckError(false);
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setCheckError(true);
      setPasswordError('');
    }

    // 이름 유효성 검사
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1) {
      setCheckError(false);
      setNameError('올바른 이름을 입력해주세요.');
    } else {
      setCheckError(true);
      setNameError('');
    }

    // 나이 유효성 검사
    const ageRegex = /^[0-9]*$/;
    if (!ageRegex.test(age) || age.length < 1) {
      setCheckError(false);
      setAgeErrorr('올바른 나이를 입력해주세요.');
    } else {
      setCheckError(true);
      setAgeErrorr('');
    }

    // 연락처 유효성 검사
    const patternPhone = /01[016789][^0][0-9]{2,3}[0-9]{3,4}/;
    if (!patternPhone.test(phone)) {
      setCheckError(false);
      setPhoneError('올바른 연락처를 입력해주세요.');
    } else {
      setCheckError(true);
      setPhoneError('');
    }

    // 성별 체크
    if (sex === 'none') {
      setCheckError(false);
      setSexError('성별을 선택해주세요.');
    } else {
      setCheckError(true);
      setSexError('');
    }

    // 시 입력 체크
    if (city.length < 1) {
      setCheckError(false);
      setCityError('시를 입력해주세요.');
    } else {
      setCheckError(true);
      setCityError('');
    }

    // 구 입력 체크
    if (town.length < 1) {
      setCheckError(false);
      setTownError('구를 입력해주세요.');
    } else {
      setCheckError(true);
      setTownError('');
    }

    // 회원가입 동의 체크
    if (!checked) {
      setCheckError(false);
      alert('회원가입 약관에 동의해주세요.');
    } else setCheckError(true);

    if (checkError) onClick(joinData);
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Boxs
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    name="name"
                    label="이름"
                    error={nameError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{nameError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일"
                    error={emailError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{emailError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    error={passwordState !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordState}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    label="비밀번호 확인"
                    error={passwordError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="age"
                    name="age"
                    label="나이 (숫자)"
                    error={ageError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{ageError}</FormHelperTexts>
                <Grid item xs={4}>
                  <TextField
                    required
                    id="phone1"
                    name="phone1"
                    label="연락처"
                    fullWidth
                    error={phoneError !== '' || false}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="phone2"
                    name="phone2"
                    fullWidth
                    error={phoneError !== '' || false}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="phone3"
                    name="phone3"
                    fullWidth
                    error={phoneError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{phoneError}</FormHelperTexts>
                <Grid item xs={12}>
                  <Selects
                    fullWidth
                    id="sex"
                    value={sex}
                    onChange={handleChange}
                    error={sexError !== '' || false}
                  >
                    <MenuItem value="none">성별</MenuItem>
                    <MenuItem value="MALE">남성</MenuItem>
                    <MenuItem value="FEMALE">여성</MenuItem>
                  </Selects>
                </Grid>
                <FormHelperTexts>{sexError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="city"
                    name="city"
                    label="시 (서울시, 부산시)"
                    error={cityError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{cityError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="town"
                    name="town"
                    label="구 (용산구, 해운대구)"
                    error={townError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{townError}</FormHelperTexts>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleAgree} color="primary" />
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
                계정 만들기
              </Button>
            </FormControl>
            <FormHelperTexts>{registerError}</FormHelperTexts>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
