import React, { useEffect, useState } from 'react';
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
  border-bottom: 0;
  border-radius: 3px;
  border-color: rgba(0, 0, 0, 0.23);
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

const FormHelperTextError = styled(FormHelperTexts)`
  margin-bottom: 40px;
`;

const EmptyArea = styled.div`
  clear: both;
  width: 100%;
  height: 72px;
`;

const Grids = styled(Grid)`
  position: relative;
  margin-top: -212px;
`;

const Boxs = styled(Box)`
  position: relative;
  margin-bottom: 16px;
  padding-bottom: 124px;
  &.on_error_box {
    .on_error {
      position: relative;
      top: 20px;
      margin-bottom: 20px;
    }
    .addres_area {
      margin-top: -232px;
    }
  }
`;

const RegisterCompany = () => {
  const theme = createTheme();
  const [city, setsCity] = useState([]);
  const [town, setTown] = useState([]);
  const [businessNumber, SetBusinessNumber] = useState('');
  const [citySelct, setCitySelct] = useState('none');
  const [townSelect, setTownSelect] = useState('none');
  const [emailError, setEmailError] = useState('');
  const [checked, setChecked] = useState(false);
  const [passwordState, setPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [businessNumError, setbussinessNumError] = useState('');
  const [ceoNameError, setCeoNameError] = useState('');
  const [gymNameError, setGymNameError] = useState('');
  const [telError, setTelError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [checkError, setCheckError] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const history = useHistory();

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

  useEffect(() => {
    getCityList();
  }, []);

  const handleBusinessNumber = e => {
    const { value } = e.target;

    // 10자리 숫자인지 체크
    const regex = /^[0-9\b -]{0,10}$/;
    if (regex.test(value)) {
      SetBusinessNumber(value);
    }
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

  const handleAgree = event => {
    setChecked(event.target.checked);
  };

  const onClick = async data => {
    const { ceoName, email, password, gymName, tel } = data;
    const postData = {
      businessNumber,
      ceoName,
      cityId: citySelct,
      email,
      gymName,
      password,
      tel,
      townId: townSelect,
    };
    console.log(postData);

    // post
    await axios
      .post('/gym/join', postData)
      .then(function (response) {
        console.log(response, '성공');
        history.push('/login');
      })
      .catch(function (err) {
        console.log(err);
        setRegisterError('회원가입에 실패하였습니다. 다시한번 확인해 주세요.');
      });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData = {
      ceoName: data.get('ceoName'),
      email: data.get('email'),
      password: data.get('password'),
      rePassword: data.get('rePassword'),
      gymName: data.get('gymName'),
      tel: `${data.get('tel1')}${data.get('tel2')}${data.get('tel3')}`,
    };

    const { ceoName, email, password, rePassword, gymName } = joinData;

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

    // 사업자번호 유효성 검사
    if (businessNumber.length !== 10) {
      setCheckError(true);
      setbussinessNumError('사업자 번호 10자리를 입력해주세요.');
    } else {
      let sum = 0;
      const keyList = [1, 3, 7, 1, 3, 7, 1, 3, 5];
      const numberMap = businessNumber.split('');
      keyList.forEach((v, i) => {
        sum += v * numberMap[i];
      });
      sum += parseInt((keyList[8] * numberMap[8]) / 10, 10);
      const isTrue = Math.floor(numberMap[9]) === (10 - (sum % 10)) % 10;

      if (isTrue) {
        setCheckError(false);
        setbussinessNumError('');
      } else {
        setCheckError(true);
        setbussinessNumError('유효한 사업자 번호가 아닙니다.');
      }
    }

    // ceo 이름 유효성 검사
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(ceoName) || ceoName.length < 1) {
      setCheckError(false);
      setCeoNameError('올바른 이름을 입력해주세요.');
    } else {
      setCheckError(true);
      setCeoNameError('');
    }

    // 헬스장 이름 체크
    if (gymName.length < 1) {
      setCheckError(false);
      setGymNameError('헬스장 이름을 입력해주세요.');
    } else {
      setCheckError(true);
      setGymNameError('');
    }

    // 연락처 유효성 검사
    const patternPhone = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/;
    const tels = `${data.get('tel1')}-${data.get('tel2')}-${data.get('tel3')}`;

    if (!patternPhone.test(tels)) {
      setCheckError(false);
      setTelError('올바른 연락처를 입력해주세요.');
    } else {
      setCheckError(true);
      setTelError('');
    }

    // 주소 선택
    if (citySelct === 'none' || townSelect === 'none') {
      setCheckError(false);
      setAddressError('주소를 선택해 주세요.');
    } else {
      setCheckError(true);
      setAddressError('');
    }

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
            className={addressError === '' ? '' : 'on_error_box'}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
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
                    id="gymName"
                    name="gymName"
                    label="헬스장 명"
                    error={gymNameError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{gymNameError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="ceoName"
                    name="ceoName"
                    label="대표 이름"
                    error={ceoNameError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{ceoNameError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="businessNumber"
                    id="businessNumber"
                    name="businessNumber"
                    value={businessNumber}
                    onChange={handleBusinessNumber}
                    label="사업자 번호 (숫자)"
                    error={businessNumError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{businessNumError}</FormHelperTexts>
                <Grid item xs={4}>
                  <TextField
                    required
                    id="tel1"
                    name="tel1"
                    label="연락처"
                    fullWidth
                    error={telError !== '' || false}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="tel2"
                    name="tel2"
                    fullWidth
                    error={telError !== '' || false}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="tel3"
                    name="tel3"
                    fullWidth
                    error={telError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{telError}</FormHelperTexts>
                <EmptyArea />
                <Grid
                  item
                  xs={12}
                  className={addressError === '' ? '' : 'on_error'}
                >
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

            <Grids container spacing={2} className="addres_area">
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
            </Grids>
          </Boxs>
        </Box>
      </Container>

      <FormHelperTextError>{registerError}</FormHelperTextError>
    </ThemeProvider>
  );
};

export default RegisterCompany;
