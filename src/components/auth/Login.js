import React from 'react';
// import axios from 'axios';
import styled from 'styled-components';
// import { useHistory } from 'react-router-dom';

const LoginContainer = styled.section`
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
    .join_btn {
      width: 170px;
      height: 52px;
      border: 0.5;
      border-radius: 4px;
      justify-content: space-between;
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
    padding: 0 25px;
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
const Login = () => {
  return (
    <LoginContainer>
      <div className="tit">
        <h1>로그인</h1>
        <p>세상모든 헬스장을 찾아보세요.</p>
        <button type="button" className="fb_join">
          페이스북 계정으로 로그인
        </button>
        <button type="button" className="kakao_join">
          카카오 계정으로 로그인
        </button>
        <span>OR</span>
      </div>
      {/* <form onSubmit={handleSubmit}> */}
      <form>
        <ul>
          <li>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="이메일주소"
            />
          </li>
          <li>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="비밀번호"
            />
          </li>
          <li>
            <input
              type="checkbox"
              id="일반회원"
              name="일반회원"
              value={Number('1')}
            />
            일반회원
            <input
              type="checkbox"
              id="헬스장회원"
              name="헬스장회원"
              value={Number('2')}
            />
            헬스장회원
          </li>
        </ul>
        <button type="submit" className="send_btn">
          로그인
        </button>
        <ul>
          <li>아이디 | 비밀번호 찾기</li>
        </ul>
        <button type="submit" className="join_btn">
          회원가입
        </button>
        <button type="submit" className="join_btn">
          헬스장 회원가입
        </button>
      </form>
      {/* <p>{errorMsg}</p> */}
    </LoginContainer>
  );
};

export default Login;
