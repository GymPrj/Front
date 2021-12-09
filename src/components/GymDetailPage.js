import React, { useEffect, useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Button } from '@mui/material/';
import styled from 'styled-components';
import { TRAINER_LIST_REQUEST, TRAINER_DETAIL_SUCCESS } from '../redux/types';

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

const Ul = styled.ul`
  li {
    &:not(:last-child) {
      margin-bottom: 60px;
    }
    button {
      display: flex;
      align-items: flex-end;
      border: 0;
      width: 100%;
      background-color: transparent;
      .trainer_pic {
        width: 40%;
        height: 160px;
        margin-right: 40px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
  }
`;

const GymDetailPage = () => {
  const gymTrainerList = useSelector(state => state.gym.trainerList);
  const gymDetailInfo = useSelector(state => state.gym.gymDetailInfo);
  const [trainerList, setTainerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  // eslint-disable-next-line
  const history = useHistory();

  const { gymName, ceoName, tel, memberCount, detailAddress, gymId } =
    gymDetailInfo;

  const handleTrainerList = useCallback(async () => {
    // 헬스장 id에 맞는 트레이너 리스트 get 요청 및 저장
    dispatch({
      type: TRAINER_LIST_REQUEST,
      payload: gymId,
    });

    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (!isLoading) handleTrainerList();
    else setTainerList(gymTrainerList);
  }, [isLoading, trainerList, gymTrainerList]);

  const handleTrainerDetail = trainer => {
    // 선택한 트레이너 정보 store 저장
    dispatch({
      type: TRAINER_DETAIL_SUCCESS,
      payload: trainer,
    });

    history.push(`/trainerDetail/${gymId}/${trainer.name}`);
  };

  const Li = trainerList.map(val => {
    return (
      <li key={val.name + val.age}>
        <button type="button" onClick={() => handleTrainerDetail(val)}>
          <div
            className="trainer_pic"
            style={{
              backgroundImage:
                'url(https://health.chosun.com/site/data/img_dir/2021/03/19/2021031902208_0.jpg)',
            }}
          />
          <p>{val.name}</p>
        </button>
      </li>
    );
  });

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
          <h1>{gymName}</h1>
          {detailAddress && <p>주소 {detailAddress}</p>}
          {tel && <p>전화번호 {tel}</p>}
          {ceoName && <p>대표이름 {ceoName}</p>}
          <p>회원 수 {memberCount}</p>
        </div>
        <div className="trainer_info">
          <h1>강사진</h1>
          <Ul>{Li}</Ul>
        </div>
        <Button
          type="button"
          variant="contained"
          size="medium"
          style={{ margin: '80px auto 0', display: 'block' }}
        >
          <Link to="/tainerCreate">트레이너 등록</Link>
        </Button>
      </Boxs>
    </Container>
  );
};
export default GymDetailPage;
