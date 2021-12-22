import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Container, Button } from '@mui/material/';
import styled from 'styled-components';
import { TRAINER_DELETE_REQUEST } from '../redux/types';

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
  const gymId = useSelector(state => state.gym.gymDetailInfo.gymId);
  const { id, name, age, career } = gymTrainerList;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleTrainerEdit = () => {
    history.push(`/tainerEdit/${id}`);
  };
  const handleTrainerRemove = () => {
    dispatch({
      type: TRAINER_DELETE_REQUEST,
      payload: { id, history, gymId },
    });
  };

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
      <Button
        type="button"
        onClick={handleTrainerEdit}
        variant="contained"
        sx={{ my: 1, mx: 1 }}
        disableElevation
      >
        수정
      </Button>
      <Button
        type="button"
        onClick={handleTrainerRemove}
        variant="contained"
        sx={{ my: 1, mx: 1 }}
        disableElevation
      >
        삭제
      </Button>
    </Container>
  );
};

export default TrainerDetailPage;
