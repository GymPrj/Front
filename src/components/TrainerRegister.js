import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
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
import { TRAINER_ADD_REQUEST, TRAINER_EDIT_REQUEST } from '../redux/types';

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
  const [inputs, setInputs] = useState({
    sex: 'MALE',
    name: '',
    age: '',
    career: '',
  });
  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [careerError, setCareerError] = useState('');
  const { errorMsg } = useSelector(state => state.trainer);
  const dispatch = useDispatch();
  const history = useHistory();
  const gymId = useSelector(state => state.gym.gymDetailInfo.gymId);
  const editMode = useSelector(state => state.trainer.editMode);
  /* eslint-disable no-unused-vars */
  const trainerDetail = useSelector(state => state.trainer.trainerDetail);
  const { pathname } = useLocation();
  const isEditMode = pathname.includes('tainerEdit');

  const { sex, name, age, career } = inputs;

  useEffect(() => {
    if (editMode && isEditMode) {
      setInputs({
        sex: trainerDetail.sex,
        name: trainerDetail.name,
        age: String(trainerDetail.age),
        career: String(trainerDetail.career),
      });
    }
  }, [editMode]);

  const onChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onPost = () => {
    const { id } = trainerDetail;

    const postData = {
      age: parseInt(age, 10),
      career: parseInt(career, 10),
      name,
      sex,
    };

    if (editMode && isEditMode) {
      dispatch({
        type: TRAINER_EDIT_REQUEST,
        payload: { postData, history, id, gymId },
      });
    } else {
      dispatch({
        type: TRAINER_ADD_REQUEST,
        payload: { postData, history, gymId },
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

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
      onPost();
    }
  };

  const onClick = async () => {
    const postData = {
      email: 'juhwa@naver.com',
      loginTypeId: 2,
      password: 'qwer12345',
    };

    await axios
      .post('/session/login', postData)
      .then(function (response) {
        console.log(response, '성공');
        // history.push('/login');
        history.push();
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <button onClick={onClick} type="button">
        login
      </button>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          트레이너 {isEditMode && editMode ? '수정' : '등록'}하기
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
                onChange={onChange}
                variant="standard"
                value={name}
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
                onChange={onChange}
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
                value={age}
                onChange={onChange}
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
                value={career}
                name="career"
                onChange={onChange}
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
            트레이너 {editMode && isEditMode ? '수정' : '등록'}
          </Button>
          <FormHelperTexts>{errorMsg}</FormHelperTexts>
        </Boxs>
      </Box>
    </Container>
  );
};

export default TrainerRegister;
