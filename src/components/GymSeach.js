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

const Selects = styled(Select)`
  height: 56px;
  border-bottom: 0;
  border-radius: 3px;
  border-color: rgba(0, 0, 0, 0.23);
  & > div {
    height: 47px !important;
    line-height: 47px;
    padding-left: 14px;
  }
`;

const GymSeach = () => {
  const [city, setsCity] = useState([]);
  const [town, setTown] = useState([]);
  const [citySelct, setCitySelct] = useState('none');
  const [townSelect, setTownSelect] = useState('none');
  const [gymList, setGymList] = useState(null);
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
        const d = response.data.content;
        const dd =
          d.length > 0 &&
          d.map(val => {
            return (
              <li key={val.gymName}>
                헬스장 이름 : {val.gymName} <br /> ceo 이름 : {val.ceoName}
                <br />
                전화번호 : {val.tel} <br /> 멤버수 : {val.memberCount}
              </li>
            );
          });
        setGymList(dd);
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
    <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
      <Grid container spacing={2} className="addres_area">
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="text"
            value={gymName}
            onChange={handleGymName}
          />
        </Grid>
        <Grid item xs={6}>
          <Selects
            fullWidth
            id="cityId"
            value={citySelct}
            onChange={handleTownList}
          >
            <MenuItem value="none">주소 선택 (시)</MenuItem>
            {city}
          </Selects>
        </Grid>
        <Grid item xs={6}>
          <Selects
            fullWidth
            id="townId"
            value={townSelect}
            onChange={handleTown}
          >
            <MenuItem value="none">구 선택</MenuItem>
            {town}
          </Selects>
        </Grid>
      </Grid>
      <Button
        type="button"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        size="large"
        onClick={onClick}
      >
        검색
      </Button>
      <br />
      <ul style={{ marginTop: '30px' }}>{gymList}</ul>
    </Container>
  );
};

export default GymSeach;
