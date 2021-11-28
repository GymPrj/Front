import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, MenuItem, Select } from '@mui/material/';
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
    console.log(citySelct, townSelect);
    let cityIsNull;
    let townIsNull;

    if (citySelct === 'none') cityIsNull = '';
    else cityIsNull = citySelct;

    if (townSelect === 'none') townIsNull = '';
    else townIsNull = townSelect;

    await axios
      .get(`gym?cityId=${cityIsNull}&gymName=${null}&townId=${townIsNull}`)
      .then(function (response) {
        const d = response.data;
        console.log(d);
      })
      .catch(function (err) {
        console.log(err);
        // if (citySelct === 'none') alert('시를 선택해주세요.');
      });
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
    <div>
      <Grid container spacing={2} className="addres_area">
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
      <button type="button" onClick={onClick}>
        {' '}
        click
      </button>
    </div>
  );
};

export default GymSeach;
