import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
  Button,
} from '@mui/material/';
import styled from 'styled-components';

const GymListArea = styled.ul`
  display: flex;
  flex-wrap: wrap;
  & > li {
    width: 33.3%;
    margin: 0 15px 15px 0;
    border: 1px solid rgba(0, 0, 0, 0.23);
    .thumbs {
      width: 100%;
      height: 150px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
    }
    .info {
      padding: 0 20px 30px;
      strong {
        display: block;
        margin: 40px 0 25px;
        font-size: 1.2rem;
        text-align: center;
      }
      button {
        padding: 6px 10px;
        border: 0;
        background-color: #1976d2;
        color: #fff;
        border-radius: 4px;
        &.addr {
          width: 100%;
        }
        &.tel {
          width: 50%;
        }
      }
    }

    &.empty {
      margin: 50px 0 70px;
      border: 0;
      width: 100%;
      text-align: center;
    }
  }
`;

const Selects = styled(Select)`
  height: 40px;
  border-bottom: 0;
  border-radius: 3px;
  border-color: rgba(0, 0, 0, 0.23);
  & > div {
    height: 40px !important;
    line-height: 40px;
    padding-left: 14px;
  }
`;

const GTextField = styled(TextField)`
  height: 40px;
  input {
    height: 40px;
    padding: 0 14px;
  }
`;

const GymSeach = () => {
  const [city, setsCity] = useState([]);
  const [town, setTown] = useState([]);
  const [citySelct, setCitySelct] = useState('none');
  const [townSelect, setTownSelect] = useState('none');
  const [gymList, setGymList] = useState([]);
  const [gymName, setGymName] = useState('');

  const getCityList = async () => {
    // 시 api 리스트 호출
    await axios
      .get('/category/city')
      .then(function (response) {
        const citys = response.data;
        const list = citys.map(val => (
          <MenuItem key={val.id} value={val.id}>
            {val.city}
          </MenuItem>
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
                <div
                  className="thumbs"
                  style={{
                    backgroundImage:
                      'url(https://health.chosun.com/site/data/img_dir/2021/03/19/2021031902208_0.jpg)',
                  }}
                />
                <div className="info">
                  {val.gymName && <strong>{val.gymName}</strong>}
                  {val.detailAddress && (
                    <button type="button" className="addr">
                      {val.detailAddress}
                    </button>
                  )}
                  {val.tel && (
                    <button type="button" className="tel">
                      {val.tel}
                    </button>
                  )}
                </div>
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
            <MenuItem key={val.townId} value={val.townId}>
              {val.town}
            </MenuItem>
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
    <Container component="main">
      <Grid container spacing={2} className="addres_area">
        <Grid item xs={2}>
          <Selects
            fullWidth
            id="cityId"
            value={citySelct}
            onChange={handleTownList}
          >
            <MenuItem value="none">시</MenuItem>
            {city}
          </Selects>
        </Grid>
        <Grid item xs={2}>
          <Selects
            fullWidth
            id="townId"
            value={townSelect}
            onChange={handleTown}
          >
            <MenuItem value="none">구/군</MenuItem>
            {town}
          </Selects>
        </Grid>
        <Grid item xs={2}>
          <GTextField
            fullWidth
            type="text"
            value={gymName}
            onChange={handleGymName}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            type="button"
            fullWidth
            variant="contained"
            size="large"
            onClick={onClick}
            style={{ marginTop: '-4px' }}
          >
            검색
          </Button>
        </Grid>
      </Grid>
      <br />
      <GymListArea style={{ marginTop: '30px' }}>
        {gymList.length > 0 ? (
          gymList
        ) : (
          <li className="empty">목록이 없습니다.</li>
        )}
      </GymListArea>
    </Container>
  );
};

export default GymSeach;
