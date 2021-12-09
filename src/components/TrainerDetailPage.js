import React from 'react';
// import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Container } from '@mui/material/';
import styled from 'styled-components';

const Boxs = styled(Box)`
  margin: 100px 0 200px;
  h1 {
    margin-bottom: 30px;
  }
  .thumbs {
    width: 100%;
    height: 330px;
    margin-bottom: 60px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .gym_info {
    padding-bottom: 20px;
    margin-bottom: 60px;
    border-bottom: 1px solid #ddd;
  }
`;

const TrainerDetailPage = () => {
  const gymTrainerList = useSelector(state => state.trainer.trainerDetail);
  const { name, age, career } = gymTrainerList;

  return (
    <Container component="main" maxWidth="md">
      <Boxs>
        <div
          className="thumbs"
          style={{
            backgroundImage:
              'url(https://health.chosun.com/site/data/img_dir/2021/03/19/2021031902208_0.jpg)',
          }}
        />
        <div className="gym_info">
          {name && <p>트레이너 이름 {name}</p>}
          {age && <p>나이 {age}</p>}
          {career && <p>경력(년) {career}</p>}
        </div>
        <div className="trainer_info">댓글 부분</div>
      </Boxs>
    </Container>
  );
};

export default TrainerDetailPage;
