import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  CssBaseline,
  TextField,
  FormControl,
  Grid,
  Box,
  Typography,
  Container,
  MenuItem,
  Select,
  Avatar,
  FormHelperText,
} from '@mui/material/';
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

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700;
  color: #d32f2f;
`;

const TrainerRegister = () => {
  const [sex, setSex] = useState('none');
  const [sexError, setSexError] = useState('');
  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [careerError, setCareerError] = useState('');
  const [checkError, setCheckError] = useState(false);
  const [registerError, setRegisterError] = useState('');

  const handleSex = event => {
    setSex(event.target.value);
  };

  const onPost = async data => {
    const { age, career, name } = data;
    const postData = {
      age,
      career,
      name,
      sex,
    };

    console.log(postData);

    // post
    await axios
      .post('/trainer', postData)
      .then(function (response) {
        console.log(response, '성공');
        // history.push('/login');
        setRegisterError('');
      })
      .catch(function (err) {
        console.log(err);
        setCheckError(false);
        setRegisterError(
          '트레이너 등록에 실패하였습니다. 다시한번 확인해 주세요.',
        );
      });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData = {
      age: data.get('age'),
      career: data.get('career'),
      name: data.get('name'),
    };
    const { age, career, name } = joinData;

    // 이름 유효성 검사
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1) {
      setCheckError(false);
      setNameError('올바른 이름을 입력해주세요.');
    } else {
      setCheckError(true);
      setNameError('');
    }

    // 나이 체크
    const isNumber = /^[0-9]/g;
    if (!isNumber.test(age) || age.length < 0) {
      setCheckError(false);
      setAgeError('올바른 숫자를 입력해주세요.');
    } else {
      setCheckError(true);
      setAgeError('');
    }

    // 경력 체크
    if (!isNumber.test(career) || career.length < 0) {
      setCheckError(false);
      setCareerError('올바른 숫자를 입력해주세요.');
    } else {
      setCheckError(true);
      setCareerError('');
    }

    // 성별 체크
    if (sex === 'none') {
      setCheckError(false);
      setSexError('성별을 선택해주세요.');
    } else {
      setCheckError(true);
      setSexError('');
    }

    console.log(age, career);
    // console.log(checkError);

    if (checkError) onPost(joinData);
  };

  return (
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
          기업 회원가입
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
                  id="age"
                  name="age"
                  label="나이 (숫자만 입력)"
                  error={ageError !== '' || false}
                />
              </Grid>
              <FormHelperTexts>{ageError}</FormHelperTexts>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="career"
                  name="career"
                  label="경력 (숫자만 입력)"
                  error={careerError !== '' || false}
                />
              </Grid>
              <FormHelperTexts>{careerError}</FormHelperTexts>
              <Grid item xs={12}>
                <Selects
                  fullWidth
                  id="sex"
                  value={sex}
                  onChange={handleSex}
                  error={sexError !== '' || false}
                >
                  <MenuItem value="none">성별 선택</MenuItem>
                  <MenuItem value="MALE">남</MenuItem>
                  <MenuItem value="FEMALE">여</MenuItem>
                </Selects>
              </Grid>
              <FormHelperTexts>{sexError}</FormHelperTexts>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              size="large"
            >
              트레이너 등록
            </Button>
          </FormControl>
          <FormHelperTexts>{registerError}</FormHelperTexts>
        </Boxs>
      </Box>
    </Container>
  );
};

export default TrainerRegister;
