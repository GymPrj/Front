import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { GYM_REGISTER_REQUEST } from '../../redux/types';

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
          #tel2 {
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
        font-size: 48px;
      }
      p {
        margin: 12px 0 40px;
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
    padding: 0 25px;
    & > .tit {
      h1 {
        margin: 60px 0 12px;
        font-size: 24px;
      }
      p {
        margin-bottom: 40px;
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

const RegisterCompany = () => {
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
  const [detailAddrError, setDetailAddrError] = useState('');
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

  const handleAgree = event => {
    setChecked(event.target.checked);
  };

  const onClick = data => {
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

    dispatch({
      type: GYM_REGISTER_REQUEST,
      payload: postData,
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
      detailAddress: data.get('detailAddress'),
    };

    const { ceoName, email, password, rePassword, gymName, detailAddress } =
      joinData;

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

    let isTrue;
    // 사업자번호 유효성 검사
    if (businessNumber.length !== 10)
      setbussinessNumError('사업자 번호 10자리를 입력해주세요.');
    else {
      let sum = 0;
      const keyList = [1, 3, 7, 1, 3, 7, 1, 3, 5];
      const numberMap = businessNumber.split('');
      keyList.forEach((v, i) => {
        sum += v * numberMap[i];
      });
      sum += parseInt((keyList[8] * numberMap[8]) / 10, 10);
      isTrue = Math.floor(numberMap[9]) === (10 - (sum % 10)) % 10;

      if (isTrue) setbussinessNumError('');
      else setbussinessNumError('유효한 사업자 번호가 아닙니다.');
    }

    // 헬스장 이름 체크
    if (gymName.length < 1) setGymNameError('헬스장 이름을 입력해주세요.');
    else setGymNameError('');

    // ceo 이름 유효성 검사
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(ceoName) || ceoName.length < 1)
      setCeoNameError('올바른 이름을 입력해주세요.');
    else setCeoNameError('');

    // 연락처 유효성 검사
    const patternPhone = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/;
    const tels = `${data.get('tel1')}-${data.get('tel2')}-${data.get('tel3')}`;

    if (!patternPhone.test(tels)) setTelError('올바른 연락처를 입력해주세요.');
    else setTelError('');

    // 주소 선택
    if (citySelct === 'none' || townSelect === 'none')
      setAddressError('주소를 선택해 주세요.');
    else setAddressError('');

    // 상세주소
    if (detailAddress.length < 1)
      setDetailAddrError('상세 주소를 입력해주세요.');
    else setDetailAddrError('');

    if (!checked) alert('회원가입 약관에 동의해주세요.');

    if (
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      password === rePassword &&
      nameRegex.test(ceoName) &&
      ceoName.length >= 1 &&
      gymName.length >= 1 &&
      businessNumber.length === 10 &&
      isTrue &&
      gymName.length >= 1 &&
      ceoName.length >= 1 &&
      patternPhone.test(tels) &&
      citySelct !== 'none' &&
      townSelect !== 'none' &&
      detailAddress.length >= 1 &&
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
        <h1>헬스장 회원가입</h1>
        <p>세상모든 헬스장을 찾아보세요.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="이메일"
              style={{
                borderColor: emailError.length > 0 ? 'red' : '#c4c4c4',
              }}
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
              id="gymName"
              name="gymName"
              placeholder="헬스장 명"
              style={{
                borderColor: gymNameError.length > 0 ? 'red' : '#c4c4c4',
              }}
            />
            <p>{gymNameError}</p>
          </li>
          <li>
            <input
              type="text"
              id="ceoName"
              name="ceoName"
              placeholder="대표이름"
              style={{
                borderColor: ceoNameError.length > 0 ? 'red' : '#c4c4c4',
              }}
            />
            <p>{ceoNameError}</p>
          </li>
          <li>
            <input
              type="text"
              id="businessNumber"
              name="businessNumber"
              value={businessNumber}
              onChange={handleBusinessNumber}
              placeholder="사업자 번호 (숫자)"
              style={{
                borderColor: businessNumError.length > 0 ? 'red' : '#c4c4c4',
              }}
            />
            <p>{businessNumError}</p>
          </li>
          <li className="addr">
            <div>
              <select
                fullWidth
                id="cityId"
                value={citySelct}
                onChange={handleTownList}
                style={{
                  borderColor: addressError.length > 0 ? 'red' : '#c4c4c4',
                }}
              >
                <option value="none">시</option>
                {city}
              </select>
              <select
                fullWidth
                id="townId"
                value={townSelect}
                onChange={handleTown}
                style={{
                  borderColor: addressError.length > 0 ? 'red' : '#c4c4c4',
                }}
              >
                <option value="none">구/군</option>
                {town}
              </select>
            </div>
            <p>{addressError}</p>
          </li>
          <li>
            <input
              type="text"
              id="detailAddress"
              name="detailAddress"
              placeholder="상세주소"
              style={{
                borderColor: detailAddrError.length > 0 ? 'red' : '#c4c4c4',
              }}
            />
            <p>{detailAddrError}</p>
          </li>
          <li className="phone">
            <div>
              <input
                type="text"
                id="tel1"
                name="tel1"
                placeholder="헬스장 번호"
                style={{
                  borderColor: telError.length > 0 ? 'red' : '#c4c4c4',
                }}
              />
              <input
                type="text"
                id="tel2"
                name="tel2"
                style={{
                  borderColor: telError.length > 0 ? 'red' : '#c4c4c4',
                }}
              />
              <input
                type="text"
                id="tel3"
                name="tel3"
                style={{
                  borderColor: telError.length > 0 ? 'red' : '#c4c4c4',
                }}
              />
            </div>
            <p>{telError}</p>
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

export default RegisterCompany;
