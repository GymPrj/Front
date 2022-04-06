import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import dummy from '../assets/img/slide.jpg';
import searchIcon from '../assets/img/search.svg';
import { GYM_DETAIL_INFO_REQUEST } from '../redux/types';

const MainContainer = styled.div`
  background-color: #000;
  & > .main_slider {
    .addres_area {
      position: relative;
      color: #fff;
      & > section {
        select {
          cursor: pointer;
        }
        select,
        input {
          border-radius: 4px;
          outline: none;
          border: 0;
          padding: 0 10px;
        }
        & > div {
          position: relative;
          button {
            position: absolute;
            top: 14px;
            margin-left: -40px;
            border: 0;
            background-color: transparent;
            cursor: pointer;
          }
        }
      }
    }
  }
  @media ${props => props.theme.pc} {
    & > .main_slider {
      position: relative;
      display: flex;
      align-items: top;
      width: ${props => props.theme.desktopWidth};
      height: 550px;
      margin: 0 auto;
      & > li {
        width: 50%;
        h1 {
          font-size: 36px;
          line-height: 1.35;
        }
        &.thumb_area {
          height: 550px;
          position: absolute;
          right: 0;
          top: 0;
          padding: 70px 40px;
          background-repeat: no-repeat;
          background-size: cover;
          p {
            margin-top: 12px;
            font-size: 20px;
          }
          img {
            display: none;
          }
        }
        &.addres_area {
          h1 {
            margin: 155px 0 38px;
          }
          & > section {
            select,
            input {
              font-size: 15px;
              height: 44px;
            }
            select {
              margin: 0 20px 12px 0;
              width: 194px;
            }
            input {
              width: 408px;
            }
          }
        }
      }
    }
  }
  @media ${props => props.theme.mobile} {
    & > .main_slider {
      & > li {
        background-image: none !important;
        &.thumb_area {
          position: relative;
          img {
            width: 100%;
          }
          & > div {
            position: absolute;
            left: 20px;
            top: 25px;
            h1 {
              margin-bottom: 8px;
              font-size: 20px;
              line-height: 1.3;
            }
            p {
              font-size: 16px;
            }
          }
        }
        &.addres_area {
          padding: 15px 15px 0;
          h1 {
            display: none;
          }
          & > section {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            select,
            input {
              margin-bottom: 15px;
              font-size: 14px;
              height: 44px;
            }
            #cityId {
              margin-right: 15px;
            }
            select {
              width: calc(50% - 8px);
            }
            & > div,
            input {
              width: 100%;
            }
          }
        }
      }
    }
  }
`;

const GymListArea = styled.div`
  & > ul {
    display: flex;
    flex-wrap: wrap;
    & > li {
      button {
        width: 100%;
        padding: 0;
        border: 0;
        background-color: transparent;
        text-align: left;
        font-family: 'Montserrat', 'Noto Sans KR', 'sans-serif';
        cursor: pointer;
        .thumbs {
          width: 100%;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
        }
      }
      &.empty {
        border: 0;
        width: 100%;
        text-align: center;
      }
    }
  }
  @media ${props => props.theme.pc} {
    width: ${props => props.theme.desktopWidth};
    margin: 80px auto;
    & > h1 {
      margin-bottom: 70px;
      font-size: 32px;
    }
    & > ul {
      display: flex;
      flex-wrap: wrap;
      & > li {
        width: calc(25% - 15px);
        margin-bottom: 15px;
        &:not(:nth-child(4n)) {
          margin-right: 20px;
        }
        .thumbs {
          height: 200px;
        }
        .info {
          padding: 15px 10px;
          strong {
            font-size: 17px;
          }
          p {
            margin: 8px 0 1px;
            font-size: 14px;
          }
          span {
            font-size: 15px;
          }
        }
        &.empty {
          margin: 40px 0 80px;
        }
      }
    }
  }
  @media ${props => props.theme.mobile} {
    padding-bottom: 50px;
    & > h1 {
      font-size: 20px;
      padding: 25px 15px 18px;
    }
    & > ul {
      justify-content: space-between;
      & > li {
        width: calc(50% - 5px);
        margin-bottom: 15px;
        button {
          .thumbs {
            height: 0;
            padding-bottom: 100%;
          }
          .info {
            padding: 12px 10px 5px;
            strong {
              font-size: 16px;
            }
            p {
              margin: 8px 0 1px;
              font-size: 13px;
            }
            span {
              font-size: 14px;
            }
          }
        }
        &.empty {
          margin: 60px 0 40px;
          font-size: 14px;
        }
      }
    }
  }
`;

const GymSeach = () => {
  const [city, setsCity] = useState([]);
  const [town, setTown] = useState([]);
  const [citySelct, setCitySelct] = useState('none');
  const [townSelect, setTownSelect] = useState('none');
  const [gymList, setGymList] = useState([]);
  const [gymName, setGymName] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

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

  useEffect(() => {
    getCityList();
  }, []);

  const moveToDetail = info => {
    dispatch({
      type: GYM_DETAIL_INFO_REQUEST,
      payload: info,
    });
    history.push(`/gymDetail/${info.gymId}`);
  };

  const onClick = async () => {
    const url = {
      params: {
        cityId: citySelct,
        gymName,
        townId: townSelect,
      },
    };
    if (citySelct === 'none') delete url.params.cityId;
    if (gymName === '') delete url.params.gymName;
    if (townSelect === 'none') delete url.params.townId;

    await axios
      .get('gym', url)
      .then(function (response) {
        const gymData = response.data.content;
        console.log(gymData);

        const list =
          gymData.length > 0 &&
          gymData.map(val => {
            return (
              <li key={val.gymName + val.detailAddress}>
                <button type="button" onClick={() => moveToDetail(val)}>
                  <div
                    className="thumbs"
                    style={{
                      backgroundImage:
                        'url(https://health.chosun.com/site/data/img_dir/2021/03/19/2021031902208_0.jpg)',
                    }}
                  />
                  <div className="info">
                    {val.gymName && <strong>{val.gymName}</strong>}
                    {/* {val.detailAddress && <p>{val.detailAddress}</p>} */}
                    <p>서울시 송파구</p>
                    {val.tel && <span>{val.tel}</span>}
                  </div>
                </button>
              </li>
            );
          });
        setGymList(list);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const handleGymName = e => {
    setGymName(e.target.value);
  };

  const handleTownList = async event => {
    const { value } = event.target;
    setCitySelct(value);

    // // 선택한 시의 구 api 리스트 호출
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

  return (
    <>
      <MainContainer>
        <ul className="main_slider">
          <li
            className="thumb_area"
            style={{ backgroundImage: `url(${dummy})` }}
          >
            <img src={dummy} alt="" />
            <div>
              <h1>
                추울 때 해야 제 맛, <br />
                지금 바로 운동 시작!
              </h1>
              <p>잠든 나의 몸을 깨워 봄 맞이 준비</p>
            </div>
          </li>
          <li className="addres_area">
            <h1>
              친구, 가족, 연인과 함께 <br />
              건강한 생활을 시작하세요!
            </h1>
            <section>
              <select id="cityId" value={citySelct} onChange={handleTownList}>
                <option value="none">시</option>
                {city}
              </select>
              <select id="townId" value={townSelect} onChange={handleTown}>
                <option value="none">구/군</option>
                {town}
              </select>
              <div>
                <input
                  type="text"
                  value={gymName}
                  onChange={handleGymName}
                  placeholder="헬스장검색"
                />
                <button
                  type="button"
                  variant="contained"
                  size="large"
                  onClick={onClick}
                  style={{ marginTop: '-4px' }}
                >
                  <img src={searchIcon} alt="검색하기" />
                </button>
              </div>
            </section>
          </li>
        </ul>
      </MainContainer>
      <GymListArea>
        <h1>인기 헬스장</h1>
        <ul>
          {gymList.length > 0 ? (
            gymList
          ) : (
            <li className="empty">목록이 없습니다.</li>
          )}
        </ul>
      </GymListArea>
    </>
  );
};

export default GymSeach;
