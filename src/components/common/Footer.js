import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/img/logo-white.svg';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.subDarkColor};
  section {
    a {
      color: #fafafa;
    }
    & > ul {
      display: flex;
      align-items: center;
      li {
        position: relative;
        &:not(:last-child):after {
          content: '';
          position: absolute;
          display: block;
          width: 1px;
          background-color: #4e4e4e;
        }
      }
    }
    & > .footer_info {
      border-top: 1px solid #4e4e4e;
      color: #fafafa;
      .cs_info {
        & > p {
          color: #999;
        }
        li {
          opacity: 0.8;
        }
      }
    }
  }
  @media ${props => props.theme.pc} {
    section {
      & > ul {
        width: 1280px;
        margin: 0 auto;
        height: 50px;
        li {
          position: relative;
          margin-right: 15px;
          font-size: 15px;
          &:not(:last-child):after {
            height: 12px;
            top: 2px;
            right: -8px;
          }
        }
      }
      & > .footer_info {
        & > div {
          position: relative;
          display: flex;
          justify-content: space-between;
          width: 1280px;
          margin: 0 auto;
          padding: 40px 0 60px;
          font-size: 15px;
          img {
            width: 180px;
            margin-bottom: 28px;
          }
          .company_info {
            li {
              margin-bottom: 9px;
            }
          }
          .cs_info {
            text-align: right;
            h2 {
              font-size: 28px;
            }
            h3 {
              padding: 14px 0 3px;
              font-size: 24px;
            }
            li {
              margin-top: 8px;
              opacity: 0.6;
              &:last-child {
                padding-top: 7px;
              }
            }
            & > p {
              position: absolute;
              left: 0;
              margin-top: -13px;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
  @media ${props => props.theme.mobile} {
    section {
      & > ul {
        justify-content: center;
        padding: 14px 0;
        li {
          font-size: 14px;
          margin: 0 8px;
          &:not(:last-child):after {
            height: 10px;
            top: 3px;
            right: -8px;
          }
        }
      }
      & > .footer_info {
        padding: 30px 0 45px;
        text-align: center;
        & > div {
          font-size: 14px;
          img {
            width: 160px;
            margin-bottom: 22px;
          }
          .company_info {
            li {
              margin-bottom: 8px;
            }
          }
          .cs_info {
            h2 {
              margin: 30px 0 5px;
              font-size: 19px;
            }
            h3 {
              padding-bottom: 4 px;
              font-size: 17px;
            }
            li {
              margin-top: 6px;
            }
            & > p {
              margin-top: 30px;
            }
          }
        }
      }
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <section>
        <ul>
          <li>
            <Link to="/">회사소개</Link>
          </li>
          <li>
            <Link to="/">이용약관</Link>
          </li>
          <li>
            <Link to="/">
              <b>개인정보처리방침</b>
            </Link>
          </li>
          <li>
            <Link to="/">고객센터</Link>
          </li>
        </ul>
        <section className="footer_info">
          <div>
            <article className="company_info">
              <Link to="/">
                <img src={logo} alt="로고" />
              </Link>
              <ul>
                <li>상호명 : 세상모든헬스장</li>
                <li>사업자등록번호 : XXX-XXX-XXXX</li>
                <li>매일 : oooo@gmail.com</li>
              </ul>
            </article>
            <article className="cs_info">
              <h2>HELP DESK</h2>
              <h3>02-3496-8080</h3>
              <ul>
                <li>평일 AM 10 : 00 - PM 06 : 00</li>
                <li>점심 PM 12 : 00 - PM 01 : 30</li>
                <li>휴뮤 : 토, 일, 공휴일</li>
              </ul>
              <p>COPYRIGHTⒸ 2021 ALL RIGHTS RESERVED</p>
            </article>
          </div>
        </section>
      </section>
    </FooterContainer>
  );
};

export default Footer;
