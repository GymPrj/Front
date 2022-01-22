import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { REGISTER_REQUEST } from '../../redux/types';

const RegisterContainer = styled.section`
  input[type='text'],
  input[type='password'],
  input[type='email'],
  select {
    outline: none;
    transition: 0.2s ease border;
    &:focus {
      border-color: ${props => props.theme.mainPurpleColor};
    }
  }
  & > .tit {
    text-align: center;
    p {
      color: #888888;
      font-size: 13px;
    }
    button {
      width: 100%;
      border: 0;
      border-radius: 4px;
      font-size: 15px;
      cursor: pointer;
      &.fb_join {
        margin: 40px 0 10px;
        color: #fff;
        background-color: #4064ac;
      }
      &.kakao_join {
        background-color: #f7de00;
      }
    }
    span {
      position: relative;
      display: block;
      margin: 12px 0;
      text-align: center;
      color: #bdbdbd;
      font-size: 13px;
      &:before,
      &:after {
        content: '';
        display: block;
        position: absolute;
        width: calc(50% - 28px);
        height: 2px;
        top: 6px;
        background-color: #d9d9d9;
      }
      &:before {
        left: 0;
      }
      &:after {
        right: 0;
      }
    }
  }
  & > form {
    li {
      margin-bottom: 8px;
      select {
        padding: 0 6px;
      }
      &.agree {
        margin-bottom: 15px;
        label {
          font-size: 13px;
        }
        input {
          position: relative;
          top: 2px;
          margin-right: 5px;
        }
      }
      &.phone,
      &.addr {
        & > div {
          display: flex;
          justify-content: space-between;
          #phone2 {
            margin: 0 8px;
          }
          #townId {
            margin-left: 8px;
          }
        }
      }
      &.agree {
        label {
          cursor: pointer;
        }
      }
      & > p {
        margin: 5px 0 8px;
        color: red;
        font-size: 12px;
      }
      input::placeholder {
        color: #c4c4c4;
      }
      input[type='text'],
      input[type='password'],
      input[type='email'] {
        width: 100%;
        padding: 0 12px;
        border: 1px solid #c4c4c4;
        border-radius: 4px;
      }
      select {
        width: 100%;
        border: 1px solid #c4c4c4;
        border-radius: 4px;
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
  & > p {
    margin-top: 15px;
    color: red;
    font-size: 13px;
    font-weight: 700;
    text-align: center;
  }

  @media ${props => props.theme.pc} {
    width: 350px;
    margin: 0 auto 120px;
    & > .tit {
      margin-top: 80px;
      h1 {
        margin-bottom: 12px;
        font-size: 48px;
      }
      button {
        height: 48px;
      }
    }
    & > form {
      li {
        select,
        input[type='text'],
        input[type='password'],
        input[type='email'] {
          height: 48px;
        }
      }
    }
  }
  @media ${props => props.theme.mobile} {
    margin-bottom: 80px;
    padding: 0 30px;
    & > .tit {
      h1 {
        margin: 60px 0 12px;
        font-size: 24px;
      }
      button {
        height: 44px;
      }
    }
    & > form {
      li {
        select,
        input[type='text'],
        input[type='password'],
        input[type='email'] {
          height: 44px;
        }
      }
    }
  }
`;

const Register = () => {
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
  const { errorMsg } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const getCityList = async () => {
    // 시 api 리스트 호출
    await axios
      .get('/category/city')
      .then(function (response) {
        const citys = response.data;
        const list = citys.map(val => (
          <option key={val.id} value={val.id}>
            {val.city}
          </option>
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
            <option key={val.townId} value={val.townId}>
              {val.town}
            </option>
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
    if (!emailRegex.test(email))
      setEmailError('올바른 이메일 형식이 아닙니다.');
    else setEmailError('');

    // 비밀번호 유효성 체크
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password))
      setPasswordState(
        '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!',
      );
    else setPasswordState('');

    // 비밀번호 같은지 체크
    if (password !== rePassword)
      setPasswordError('비밀번호가 일치하지 않습니다.');
    else setPasswordError('');

    // 이름 유효성 검사
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 1)
      setNameError('올바른 이름을 입력해주세요.');
    else setNameError('');

    // 나이 유효성 검사
    const ageRegex = /^[0-9]*$/;
    if (!ageRegex.test(age) || age.length < 1)
      setAgeErrorr('올바른 나이를 입력해주세요.');
    else setAgeErrorr('');

    // 연락처 유효성 검사
    const patternPhone = /01[016789][^0][0-9]{2,3}[0-9]{3,4}/;
    if (!patternPhone.test(phone))
      setPhoneError('올바른 연락처를 입력해주세요.');
    else setPhoneError('');

    // 성별 체크
    if (sex === 'none') setSexError('성별을 선택해주세요.');
    else setSexError('');

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
    <RegisterContainer>
      <div className="tit">
        <h1>회원가입</h1>
        <p>세상모든 헬스장을 찾아보세요.</p>
        <button type="button" className="fb_join">
          페이스북 계정으로 가입하기
        </button>
        <button type="button" className="kakao_join">
          카카오 계정으로 가입하기
        </button>
        <span>OR</span>
      </div>
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="이메일주소"
              style={{ borderColor: emailError.length > 0 ? 'red' : '#c4c4c4' }}
            />
            <p>{emailError}</p>
          </li>
          <li>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="비밀번호 (숫자, 영문, 특수문자 조합 8자리 이상)"
              style={{
                borderColor: passwordState.length > 0 ? 'red' : '#c4c4c4',
              }}
            />
            <p>{passwordState}</p>
          </li>
          <li>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              placeholder="비밀번호 확인"
              style={{
                borderColor: passwordError.length > 0 ? 'red' : '#c4c4c4',
              }}
            />
            <p>{passwordError}</p>
          </li>

          <li>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="이름"
              style={{ borderColor: nameError.length > 0 ? 'red' : '#c4c4c4' }}
            />
            <p>{nameError}</p>
          </li>
          <li>
            <input
              type="text"
              id="age"
              name="age"
              placeholder="나이"
              style={{ borderColor: ageError.length > 0 ? 'red' : '#c4c4c4' }}
            />
            <p>{ageError}</p>
          </li>
          <li className="phone">
            <div>
              <input
                type="text"
                id="phone1"
                name="phone1"
                placeholder="핸드폰번호"
                style={{
                  borderColor: phoneError.length > 0 ? 'red' : '#c4c4c4',
                }}
              />
              <input
                type="text"
                id="phone2"
                name="phone2"
                style={{
                  borderColor: phoneError.length > 0 ? 'red' : '#c4c4c4',
                }}
              />
              <input
                type="text"
                id="phone3"
                name="phone3"
                style={{
                  borderColor: phoneError.length > 0 ? 'red' : '#c4c4c4',
                }}
              />
            </div>
            <p>{phoneError}</p>
          </li>
          <li className="sex">
            <select
              id="sex"
              value={sex}
              onChange={handleChange}
              style={{ borderColor: sexError.length > 0 ? 'red' : '#c4c4c4' }}
            >
              <option value="none">성별</option>
              <option value="MALE">남성</option>
              <option value="FEMALE">여성</option>
            </select>
            <p>{sexError}</p>
          </li>
          <li className="addr">
            <div>
              <select
                id="cityId"
                value={citySelct}
                onChange={handleTownList}
                style={{
                  borderColor: sexError.length > 0 ? 'red' : '#c4c4c4',
                }}
              >
                <option value="none">시</option>
                {city}
              </select>
              <select
                id="townId"
                value={townSelect}
                onChange={handleTown}
                style={{
                  borderColor: sexError.length > 0 ? 'red' : '#c4c4c4',
                }}
              >
                <option value="none">구/군</option>
                {town}
              </select>
            </div>
            <p>{addressError}</p>
          </li>
          <li className="agree">
            <label htmlFor="agree">
              <input
                type="checkbox"
                onChange={handleAgree}
                id="agree"
                name="agree"
              />
              회원가입 약관에 동의합니다.
            </label>
          </li>
        </ul>
        <button type="submit" className="send_btn">
          가입하기
        </button>
      </form>
      <p>{errorMsg}</p>
    </RegisterContainer>
  );
};

export default Register;
