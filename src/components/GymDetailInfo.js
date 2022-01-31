import React, { useState } from 'react';
import styled from 'styled-components';

const Thumbs = styled.div`
  .thumbs {
    position: relative;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }
  img {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    opacity: 0;
    width: 100%;
    height: 100%;
  }
  ul {
    display: flex;
    justify-content: space-between;
    li {
      position: relative;
      width: calc(25% - 8px);
      background-repeat: no-repeat;
      background-size: cover;
      &.active {
        &:after {
          content: '';
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          background-color: rgba(0, 0, 0, 0.4);
        }
      }
      button {
        padding: 0;
        border: 0;
        background-color: transparent;
        cursor: pointer;
      }
    }
  }
  @media ${props => props.theme.pc} {
    width: 640px;
    .thumbs {
      height: 468px;
    }
    ul {
      margin-top: 10px;
      li {
        height: 100px;
      }
    }
  }
  @media ${props => props.theme.mobile} {
    .thumbs {
      height: 250px;
    }
  }
`;
const GymInfo = styled.div`
  h1 {
    border-bottom: 1px solid #c4c4c4;
  }
  dl {
    color: #323232;
    background-color: #f3f3f3;
    display: flex;
    flex-wrap: wrap;
    padding: 10px 15px;
    font-size: 14px;
    dt {
      padding: 4px 0;
      width: 80px;
      font-weight: 700;
    }
    dd {
      width: calc(100% - 80px);
      padding: 4px 0;
    }
  }
  .map {
    overflow: hidden;
  }
  @media ${props => props.theme.pc} {
    width: 620px;
    h1 {
      padding-bottom: 8px;
      margin-bottom: 30px;
      font-size: 24px;
      line-height: 1.5;
    }
    .map {
      height: 375px;
      margin-top: 20px;
    }
  }
  @media ${props => props.theme.mobile} {
  }
`;

const dummyImg = [
  'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202011/03/4a2f14df-1918-4011-9570-5620f9e0b983.jpg',
  'http://www.goryeong.go.kr/art/images/content/img_0036_photo02.jpg',
  'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202108/22/e6193ab8-5e72-45b0-84f9-49e863570c97.jpg',
  'https://www.yong-san.or.kr/sc/upload/photo/fe7aa4e3d7c9eb4a7837df2de5d0f0b5.jpg',
];

const GymDetailInfo = info => {
  const { gymName, ceoName, tel, memberCount, detailAddress } = info;
  const [image, setImage] = useState(dummyImg[0]);
  const [active, setActive] = useState(0);

  const changeimg = (src, index) => {
    setImage(src);
    setActive(index);
  };

  const imageLists = dummyImg.map((img, index) => {
    return (
      <li
        className={active === index ? 'active' : ''}
        style={{ backgroundImage: `url(${img})` }}
      >
        <button type="button" onClick={() => changeimg(img, index)}>
          <img src={img} alt="" />
        </button>
      </li>
    );
  });

  return (
    <>
      <Thumbs>
        <div className="thumbs" style={{ backgroundImage: `url(${image})` }}>
          <img src={image} alt="" />
        </div>
        {imageLists && <ul>{imageLists}</ul>}
      </Thumbs>
      <GymInfo className="gym_info">
        <h1>{gymName}</h1>
        <dl>
          <dt>대표이름</dt>
          <dd>{ceoName}</dd>
          <dt>전화번호</dt>
          <dd>{tel}</dd>
          <dt>회원수</dt>
          <dd>{memberCount}</dd>
          <dt>주소</dt>
          <dd>{detailAddress}</dd>
          {detailAddress && (
            <>
              <dt>주소</dt>
              <dd>{detailAddress}</dd>
            </>
          )}
        </dl>
        <div className="map">
          <img
            src="https://file.mk.co.kr/meet/neds/2020/11/image_readtop_2020_1206310_16061899354442297.jpg"
            alt=""
            style={{ width: '100%' }}
          />
        </div>
      </GymInfo>
    </>
  );
};

export default GymDetailInfo;
