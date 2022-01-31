import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { TRAINER_ADD_REQUEST, TRAINER_EDIT_REQUEST } from '../redux/types';

const TrainerContainer = styled.section`
  input[type='text'],
  input[type='number'] {
    width: 100%;
    border: 0;
    border-bottom: 1px solid #c4c4c4;
    outline: none;
    transition: 0.2s ease border;
    &:focus {
      border-color: ${props => props.theme.subDarkColor} !important;
    }
  }
  & > h1 {
    text-align: center;
  }
  & > form {
    li {
      clear: both;
      margin-bottom: 22px;
      &.sex {
        span {
          margin-bottom: 15px;
        }
        label {
          position: relative;
          display: flex;
          cursor: pointer;
          float: left;
          font-weight: 500;
          &:first-of-type {
            margin-right: 20px;
          }
          input {
            position: absolute;
            left: -9999px;
            &:checked + p:before {
              box-shadow: inset 0 0 0 4px ${props => props.theme.subRedColor};
            }
          }
          p {
            display: flex;
            align-items: center;
            transition: 0.25s ease;
            &:before {
              content: '';
              display: flex;
              flex-shrink: 0;
              background-color: #fff;
              width: 15px;
              height: 15px;
              border-radius: 50%;
              margin-right: 0.375em;
              transition: 0.25s ease;
              box-shadow: inset 0 0 0 1.5px #b3b3b3;
            }
          }
        }
      }
      & > span {
        display: block;
        font-weight: 700;
      }
      & > p {
        margin: 5px 0 8px;
        color: red;
        font-size: 12px;
      }
      input[type='text'],
      input[type='number'] {
        height: 30px;
        &::placeholder {
          color: #c4c4c4;
        }
      }
    }
    .send_btn {
      width: 100%;
      height: 52px;
      border: 0;
      font-size: 16px;
      background-color: ${props => props.theme.mainPurpleColor};
      color: #fff;
      border-radius: 4px;
      font-weight: 700;
      cursor: pointer;
    }
  }
  @media ${props => props.theme.pc} {
    width: 350px;
    margin: 80px auto 120px;
    & > h1 {
      margin-bottom: 40px;
      font-size: 24px;
    }
    & > form {
      li {
        &.sex {
          height: 55px;
        }
        & > span {
          margin-bottom: 7px;
          font-size: 17px;
        }
      }
    }
  }
  @media ${props => props.theme.mobile} {
    padding: 0 20px 80px;
    & > h1 {
      margin: 60px 0 30px;
      font-size: 22px;
    }
    & > form {
      li {
        &.sex {
          height: 50px;
        }
        & > span {
          margin-bottom: 7px;
          font-size: 16px;
        }
      }
    }
  }
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

    console.log(inputs);

    // 이름 유효성 검사
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1)
      setNameError('올바른 이름을 입력해주세요.');
    else setNameError('');

    // 나이 체크
    if (age.length < 1) setAgeError('나이를 입력해주세요.');
    else if (Number(age) < 0) setAgeError('올바른 나이를 입력해주세요.');
    else setAgeError('');

    // 경력 체크
    if (career.length < 1) setCareerError('경력을 입력해주세요.');
    else if (Number(career) < 0) setCareerError('올바른 경력을 입력해주세요.');
    else setCareerError('');

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
    <TrainerContainer>
      <button onClick={onClick} type="button">
        login
      </button>
      <h1>트레이너 {isEditMode && editMode ? '수정' : '등록'}</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <span>이름</span>
            <input
              type="text"
              id="name"
              name="name"
              onChange={onChange}
              value={name}
              style={{
                borderColor: nameError.length > 0 ? 'red' : '#c4c4c4',
              }}
            />
            <p id="name-text">{nameError}</p>
          </li>
          <li className="sex">
            <span>성별</span>
            <label htmlFor="MALE">
              <input
                type="radio"
                id="MALE"
                name="sex"
                value="MALE"
                checked={sex === 'MALE'}
                onChange={onChange}
              />
              <p>남</p>
            </label>
            <label htmlFor="FEMALE">
              <input
                type="radio"
                id="FEMALE"
                name="sex"
                value="FEMALE"
                onChange={onChange}
              />
              <p>여</p>
            </label>
          </li>
          <li>
            <span>나이</span>
            <input
              type="number"
              id="age"
              name="age"
              value={age}
              onChange={onChange}
              placeholder="(숫자)"
              style={{
                borderColor: ageError.length > 0 ? 'red' : '#c4c4c4',
              }}
            />
            <p>{ageError}</p>
          </li>
          <li>
            <span>경력</span>
            <input
              type="number"
              id="career"
              value={career}
              name="career"
              onChange={onChange}
              placeholder="(숫자)"
              style={{
                borderColor: careerError.length > 0 ? 'red' : '#c4c4c4',
              }}
            />
            <p>{careerError}</p>
          </li>
        </ul>
        <button type="submit" className="send_btn">
          {editMode && isEditMode ? '수정' : '등록'}하기
        </button>
        <p>{errorMsg}</p>
      </form>
    </TrainerContainer>
  );
};

export default TrainerRegister;
