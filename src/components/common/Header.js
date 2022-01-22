import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/img/logo.svg';

const HeaderContainer = styled.header`
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #c4c4c4;
  & > section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
  a:hover {
    color: ${props => props.theme.mainPurpleColor};
  }
  @media ${props => props.theme.pc} {
    height: 100px;
    .mo_btn {
      display: none;
    }
    & > section {
      width: 1280px;
      margin: 0 auto;
      .logo {
        img {
          width: 160px;
        }
      }
      & > div {
        .join_btn {
          margin-left: 20px;
        }
      }
    }
  }
  @media ${props => props.theme.mobile} {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    height: 50px;
    & > section {
      padding: 0 20px;
      & > .mo_btn {
        position: relative;
        width: 28px;
        height: 19px;
        padding: 0;
        transform: rotate(0deg);
        transition: 0.3s ease-in-out;
        border: 0;
        background-color: transparent;
        cursor: pointer;
        & > span {
          display: block;
          position: absolute;
          height: 3px;
          width: 100%;
          background: #000;
          left: 0;
          transform: rotate(0deg);
          transition: 0.25s ease-in-out;
          &:nth-child(1) {
            top: 0px;
            transform-origin: left center;
          }
          &:nth-child(2) {
            top: 8px;
            transform-origin: left center;
          }
          &:nth-child(3) {
            top: 16px;
            transform-origin: left center;
          }
        }
        &.open > span {
          &:nth-child(1) {
            transform: rotate(45deg);
            top: -3px;
            left: 4px;
          }
          &:nth-child(2) {
            width: 0%;
            opacity: 0;
          }
          &:nth-child(3) {
            transform: rotate(-45deg);
            top: 17px;
            left: 4px;
          }
        }
      }
      .logo {
        img {
          width: 140px;
        }
      }
      & > div {
        font-size: 15px;
        .join_btn {
          display: none;
        }
      }
    }
  }
`;

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleMobileMuen = () => {
    setOpen(!open);
  };
  return (
    <HeaderContainer>
      <section>
        <button
          type="button"
          className={`mo_btn ${open ? 'open' : ''}`}
          onClick={handleMobileMuen}
        >
          <span />
          <span />
          <span />
        </button>
        <Link to="/" className="logo">
          <img src={logo} alt="로고" />
        </Link>
        <div>
          <Link to="/login">로그인</Link>
          <Link to="/memberSignUp" className="join_btn">
            회원가입
          </Link>
        </div>
      </section>
    </HeaderContainer>
  );
};

export default Header;
