import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
} from '@mui/material/';
import styled from 'styled-components';
import { TRAINER_ADD_REQUEST } from '../redux/types';

const GTextField = styled(TextField)`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
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
  const [sex, setSex] = useState('MALE');
  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [careerError, setCareerError] = useState('');
  const { errorMsg } = useSelector(state => state.trainer);
  const dispatch = useDispatch();

  const handleSex = event => {
    setSex(event.target.value);
  };

  const onPost = async data => {
    const { age, career, name } = data;
    const postData = {
      age: parseInt(age, 10),
      career: parseInt(career, 10),
      name,
      sex,
    };

    dispatch({
      type: TRAINER_ADD_REQUEST,
      payload: postData,
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
      setNameError('올바른 이름을 입력해주세요.');
    } else {
      setNameError('');
    }

    // 나이 체크
    if (age.length < 1) {
      setAgeError('나이를 입력해주세요.');
    } else {
      setAgeError('');
    }

    // 경력 체크
    if (career.length < 1) {
      setCareerError('경력을 입력해주세요.');
    } else {
      setCareerError('');
    }

    if (
      nameRegex.test(name) &&
      name.length >= 1 &&
      age.length >= 1 &&
      career.length >= 1
    ) {
      onPost(joinData);
    }
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
        <Typography component="h1" variant="h5">
          트레이너 등록/수정
        </Typography>
        <Boxs
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel shrink htmlFor="name">
                이름
              </InputLabel>
              <TextField
                required
                autoFocus
                fullWidth
                id="name"
                name="name"
                variant="standard"
                error={nameError !== '' || false}
              />
            </Grid>
            <FormHelperTexts id="name-text">{nameError}</FormHelperTexts>
            <Grid item xs={12}>
              <InputLabel shrink htmlFor="sex">
                성별
              </InputLabel>
              <RadioGroup
                row
                type="number"
                id="sex"
                name="sex"
                onChange={handleSex}
                value={sex}
              >
                <FormControlLabel value="MALE" control={<Radio />} label="남" />
                <FormControlLabel
                  value="FEMALE"
                  control={<Radio />}
                  label="여"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <InputLabel shrink htmlFor="age">
                나이 (숫자만 입력)
              </InputLabel>
              <GTextField
                required
                fullWidth
                type="number"
                id="age"
                name="age"
                variant="standard"
                error={ageError !== '' || false}
              />
            </Grid>
            <FormHelperTexts>{ageError}</FormHelperTexts>
            <Grid item xs={12}>
              <InputLabel shrink htmlFor="career">
                경력 (숫자만 입력)
              </InputLabel>
              <GTextField
                required
                fullWidth
                type="number"
                id="career"
                name="career"
                variant="standard"
                error={careerError !== '' || false}
              />
            </Grid>
            <FormHelperTexts>{careerError}</FormHelperTexts>
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
          <FormHelperTexts>{errorMsg}</FormHelperTexts>
        </Boxs>
      </Box>
    </Container>
  );
};

export default TrainerRegister;
