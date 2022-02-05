import React, { useEffect, useState, useCallback } from 'react';
// eslint-disable-next-line
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { TRAINER_LIST_REQUEST, TRAINER_DETAIL_REQUEST } from '../redux/types';
import GymDetailInfo from './GymDetailInfo';

const GymContainer = styled.section`
  @media ${props => props.theme.pc} {
    width: 1280px;
    margin: 0 auto;
    & > .gym_info_container {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
    }
    .gym_detail {
      h1 {
        margin-bottom: 50px;
        font-size: 24px;
      }
    }
  }
  @media ${props => props.theme.mobile} {
    .gym_detail {
      h1 {
        margin: 15px 0 25px;
        padding-top: 30px;
        font-size: 20px;
        border-top: 1px solid #c4c4c4;
      }
    }
  }
  .btn_area {
    text-align: center;
    a {
      display: inline-block;
      height: 46px;
      line-height: 46px;
      background-color: ${props => props.theme.mainPurpleColor};
      color: #fff;
      font-size: 16px;
      border-radius: 4px;
    }
  }
  @media ${props => props.theme.pc} {
    .btn_area {
      margin: 80px 0 100px;
      a {
        width: 150px;
        margin: 0 20px;
      }
    }
  }
  @media ${props => props.theme.mobile} {
    .gym_info {
      padding: 0 15px;
    }
    .gym_detail {
      padding: 0 15px;
    }
    .btn_area {
      max-width: 360px;
      padding: 0 10px;
      margin: 50px auto 75px;
      a {
        width: calc(50% - 15px);
        &:first-child {
          margin-right: 10px;
        }
        &:nth-child(2) {
          margin-left: 10px;
        }
      }
    }
  }
`;

const Tab = styled.div`
  @media ${props => props.theme.pc} {
    margin: 40px 0 50px;
    border-bottom: 2px solid #c4c4c4;
    button {
      position: relative;
      margin-right: 50px;
      padding: 0 0 5px;
      cursor: pointer;
      border: 0;
      background-color: transparent;
      font-size: 18px;
      font-weight: 700;
      &.active {
        color: ${props => props.theme.mainPurpleColor};
        &:after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 2px;
          background-color: ${props => props.theme.mainPurpleColor};
        }
      }
    }
  }
  @media ${props => props.theme.mobile} {
    display: none;
  }
`;

const Ul = styled.ul`
  & > li {
    &:not(:last-child) {
      margin-bottom: 45px;
    }
    button {
      display: flex;
      border: 0;
      padding: 0;
      align-items: center;
      background-color: transparent;
      cursor: pointer;
      font-weight: 700;
      font-size: 17px;
      .trainer_pic {
        width: 85px;
        height: 85px;
        border-radius: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
    p {
      margin: 20px 0 35px;
      font-size: 14px;
      line-height: 1.3;
      word-break: keep-all;
    }
    h3 {
      font-size: 16px;
      margin-bottom: 12px;
      font-weight: 500;
    }
    li {
      position: relative;
      padding-left: 15px;
      font-family: 'Noto Sans KR', 'sans-serif';
      font-size: 16px;
      &:not(:last-child) {
        margin-bottom: 5px;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        display: block;
        width: 4px;
        height: 4px;
        border-radius: 100%;
        background-color: #000;
      }
    }
  }
  @media ${props => props.theme.pc} {
    button {
      .trainer_pic {
        margin-right: 30px;
      }
    }
  }
  @media ${props => props.theme.mobile} {
    button {
      .trainer_pic {
        margin-right: 12px;
      }
    }
  }
`;

const GymDetailPage = () => {
  const gymTrainerList = useSelector(state => state.gym.trainerList);
  const gymDetailInfo = useSelector(state => state.gym.gymDetailInfo);
  const [trainerList, setTainerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [menu, setMenu] = useState(0);
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
      type: TRAINER_DETAIL_REQUEST,
      payload: trainer,
    });

    history.push(`/trainerDetail/${gymId}/${trainer.name}`);
  };

  const TrainerLists = trainerList.map(val => {
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
          <strong>{val.name}</strong>
        </button>
        <p>
          안녕하세요. 근력운동 전문가 김헬스 입니다. <br />
          운동을 재미있고 쉽게 알려드려요. <br />
          <br />
          건강을 위해서 근육운동은 필수 입니다. 운동이 지루하고 재미 없었다면
          저화 함께 재미있게 근력운동을 해봐요.
        </p>
        <div>
          <h3>[주요이력]</h3>
          <ol>
            <li>헬스대학교 졸업</li>
            <li>생활스포츠 지도자2급</li>
            <li>주짓수 강사 자격증</li>
            <li>Strength Coaching Master class 수료</li>
          </ol>
        </div>
      </li>
    );
  });

  const changeMenu = index => {
    setMenu(index);
  };

  const TrainerInfo = (
    <div className="trainer_info">
      <h1>트레이너 소개</h1>
      <Ul>{TrainerLists}</Ul>
    </div>
  );

  const GtmPlace = <div className="gym_place">헬스장 장소</div>;

  const menuList = {
    0: TrainerInfo,
    1: GtmPlace,
  };

  return (
    <GymContainer>
      <article className="gym_info_container">
        <GymDetailInfo
          gymName={gymName}
          ceoName={ceoName}
          tel={tel}
          memberCount={memberCount}
          detailAddress={detailAddress}
        />
      </article>
      <Tab>
        <button
          type="button"
          onClick={() => changeMenu(0)}
          className={`${menu === 0 ? 'active' : ''}`}
        >
          트레이너 소개
        </button>
        <button
          type="button"
          onClick={() => changeMenu(1)}
          className={`${menu === 1 ? 'active' : ''}`}
        >
          장소
        </button>
      </Tab>
      <article className="gym_detail">{menuList[menu]}</article>
      <article className="btn_area">
        <Link to="/tainerCreate">트레이너 등록</Link>
        <Link to="/">문의하기</Link>
      </article>
    </GymContainer>
  );
};
export default GymDetailPage;
