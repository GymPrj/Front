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
    width: ${props => props.theme.desktopWidth};
    margin: 0 auto;
    display: flex;
    align-items: top;
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
            border: 0;
            background-color: transparent;
            cursor: pointer;
          }
        }
      }
    }
    .thumb_area {
      background: url(${dummy}) no-repeat center / cover;
    }
  }
  @media ${props => props.theme.pc} {
    & > .main_slider {
      position: relative;
      height: 550px;
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
          p {
            margin-top: 12px;
            font-size: 20px;
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
            & > div {
              button {
                position: absolute;
                top: 14px;
                margin-left: -40px;
              }
            }
          }
        }
      }
    }
  }
  @media ${props => props.theme.mobile} {
  }
`;

const GymListArea = styled.div`
  & > h1 {
    font-size: 32px;
  }
  & > ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    & > li {
      .thumbs {
        width: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }

      &.empty {
        margin: 50px 0 70px;
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
    }
    & > ul {
      display: flex;
      flex-wrap: wrap;
      & > li {
        width: calc(25% - 15px);
        .thumbs {
          height: 200px;
        }
      }
    }
  }
  @media ${props => props.theme.mobile} {
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
    history.push(`/gymDetail/${info.id}`);
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
                    {val.detailAddress && <p>{val.detailAddress}</p>}
                    {val.tel && <p>{val.tel}</p>}
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
          <li className="thumb_area">
            <h1>
              추울 때 해야 제 맛, <br />
              지금 바로 운동 시작!
            </h1>
            <p>잠든 나의 몸을 깨워 봄 맞이 준비</p>
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
