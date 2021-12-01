import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  Button,
  CssBaseline,
  TextField,
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
import { REGISTER_REQUEST } from '../../redux/types';

const Selects = styled(Select)`
  height: 56px;
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

const Register = () => {
  const theme = createTheme();
  const [sex, setSex] = useState('none');
  const [city, setsCity] = useState([]);
  const [town, setTown] = useState([]);
  const [citySelct, setCitySelct] = useState('none');
  const [townSelect, setTownSelect] = useState('none');
  const [checked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [ageError, setAgeErrorr] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [sexError, setSexError] = useState('');
  const [addressError, setAddressError] = useState('');
  // const history = useHistory();
  const { errorMsg } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const getCityList = async () => {
    // 시 api 리스트 호출
    await axios
      .get('/category/city')
      .then(function (response) {
        const citys = response.data;
        const list = citys.map(val => (
          <MenuItem key={val.id} value={val.id}>
            {val.city}
          </MenuItem>
        ));
        setsCity(list);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const handleTownList = async event => {
    const { value } = event.target;
    setCitySelct(value);

    // 선택한 시의 구 api 리스트 호출
    if (value !== 'none') {
      await axios
        .get(`/category/city/${value}/town`)
        .then(function (response) {
          const towns = response.data;
          const townList = towns.map(val => (
            <MenuItem key={val.townId} value={val.townId}>
              {val.town}
            </MenuItem>
          ));
          setTown(townList);
          setTownSelect('none');
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      setCitySelct('none');
      setTownSelect('none');
      setTown([]);
    }
  };

  const handleTown = event => {
    const { value } = event.target;

    if (value !== 'none') setTownSelect(value);
    else setTownSelect('none');
  };

  const handleChange = event => {
    setSex(event.target.value);
  };

  const handleAgree = event => {
    setChecked(event.target.checked);
  };

  const onClick = data => {
    const { age, email, name, password, phone } = data;
    const postData = {
      age,
      city: citySelct,
      email,
      name,
      password,
      phone,
      sex,
      town: townSelect,
    };

    dispatch({
      type: REGISTER_REQUEST,
      payload: postData,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData = {
      age: data.get('age'),
      email: data.get('email'),
      name: data.get('name'),
      password: data.get('password'),
      rePassword: data.get('rePassword'),
      phone: `${data.get('phone1')}${data.get('phone2')}${data.get('phone3')}`,
      sex,
    };
    const { age, email, name, password, rePassword, phone } = joinData;

    // 이메일 유효성 체크
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!emailRegex.test(email)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
    } else {
      setEmailError('');
    }

    // 비밀번호 유효성 체크
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password)) {
      setPasswordState(
        '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!',
      );
    } else {
      setPasswordState('');
    }

    // 비밀번호 같은지 체크
    if (password !== rePassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError('');
    }

    // 이름 유효성 검사
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1) {
      setNameError('올바른 이름을 입력해주세요.');
    } else {
      setNameError('');
    }

    // 나이 유효성 검사
    const ageRegex = /^[0-9]*$/;
    if (!ageRegex.test(age) || age.length < 1) {
      setAgeErrorr('올바른 나이를 입력해주세요.');
    } else {
      setAgeErrorr('');
    }

    // 연락처 유효성 검사
    const patternPhone = /01[016789][^0][0-9]{2,3}[0-9]{3,4}/;
    if (!patternPhone.test(phone)) {
      setPhoneError('올바른 연락처를 입력해주세요.');
    } else {
      setPhoneError('');
    }

    // 성별 체크
    if (sex === 'none') {
      setSexError('성별을 선택해주세요.');
    } else {
      setSexError('');
    }

    // 주소 선택
    if (citySelct === 'none' || townSelect === 'none') {
      setAddressError('주소를 선택해 주세요.');
    } else {
      setAddressError('');
    }

    // 회원가입 동의 체크
    if (!checked) {
      alert('회원가입 약관에 동의해주세요.');
    }

    if (
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      password === rePassword &&
      nameRegex.test(name) &&
      ageRegex.test(age) &&
      age.length >= 1 &&
      patternPhone.test(phone) &&
      sex !== 'none' &&
      citySelct !== 'none' &&
      townSelect !== 'none' &&
      checked
    ) {
      onClick(joinData);
    }
  };

  useEffect(() => {
    getCityList();
  }, []);

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
          <form onSubmit={handleSubmit} style={{ marginTop: '50px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
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
              <Grid item xs={6}>
                <Selects
                  fullWidth
                  id="cityId"
                  value={citySelct}
                  onChange={handleTownList}
                  error={addressError !== '' || false}
                >
                  <MenuItem value="none">시</MenuItem>
                  {city}
                </Selects>
              </Grid>
              <Grid item xs={6}>
                <Selects
                  fullWidth
                  id="townId"
                  value={townSelect}
                  onChange={handleTown}
                  error={addressError !== '' || false}
                >
                  <MenuItem value="none">구/군</MenuItem>
                  {town}
                </Selects>
              </Grid>
              <FormHelperTexts>{addressError}</FormHelperTexts>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox onChange={handleAgree} color="primary" />}
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
          </form>
        </Box>
        <FormHelperTexts>{errorMsg}</FormHelperTexts>
      </Container>
    </ThemeProvider>
  );
};

export default Register;
