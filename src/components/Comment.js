import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@mui/material/';
import styled from 'styled-components';
import { TRAINER_DELETE_REQUEST, TRAINER_EDIT_MODE } from '../redux/types';

const Boxs = styled.section`
  width:1280px;
  display: flex;
  margin: 100px 0 200px;
  h1 {
    margin-bottom: 30px;
  }
  .thumbs {
    display: flex;
    width: 500px;
    height: 330px;
    margin-bottom: 60px;
    ${'' /* background-size: cover; */}
    ${
      '' /* background-repeat: no-repeat;
    background-position: left center; */
    }
  }
  .health {
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
    font-size:32px;
  }
  .ex{
    padding-top: 20px;
    font-size:32px;
  }
  }
  .info {
    margin-bottom: 60px;
    margin-top: 20px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: left center;
    margin-left: 50px;
    word-spacing: 40px;
  }
  .healthbox {
    padding-top: 20px;
    word-spacing: 40px;
    line-height: 25px;
  }
  .exbox {
    padding-top: 20px;
  }
  .gym_info {

    padding-bottom: 20px;
    margin-bottom: 60px;
    border-bottom: 1px solid #ddd;
    height: 330px;
  }
`;
const Reply = styled.section`
  display: flex;
  width: 1280px;
  .trainer_info {
    flex-direction: column;
    padding-bottom: 200px;
    textarea {
      flex-direction: column;
			width: 1000px;
			height: 200px;
			padding: 10px;
			box-sizing: border-box;
			border: solid 2px #808080;
			border-radius: 5px;
			font-size: 16px;
			resize: both;
      padding-right:10px;
  }
  .sbutton{
    margin-left: auto;
    padding-left:823px;
    
  button{
    flex-direction: column;
    width:170px;
    height:40px;
    background-color:#4748C6;
    border-radius: 5px;
    color:white;
    text-align: center;
    display: inline-block;
    margin-left:20px;
    border: none;
    padding-left: 55px;
    padding-top: 10px;
  }
}
`;
const Articles = styled.section`
  display: flex;
  padidng-bottom: 30px;
  align: center;
  .abutton {
    padding-left: 300px;
    padding-bottom: 20px;
  }
  button {
    flex-direction: column;
    width: 170px;
    height: 40px;
    background-color: #4748c6;
    border-radius: 5px;
    color: white;
    text-align: center;
    display: inline-block;
    margin-left: 20px;
    border: none;
    padding-left: 55px;
    padding-top: 10px;
    padding-bottom: 20px;
  }
`;
const TrainerDetailPage = () => {
  const gymTrainerList = useSelector(state => state.trainer.trainerDetail);
  const gymId = useSelector(state => state.gym.gymDetailInfo.gymId);
  const { id, name, age, career } = gymTrainerList;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleTrainerEdit = () => {
    dispatch({
      type: TRAINER_EDIT_MODE,
      payload: true,
    });
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
              'url(https://fitnessandfashion.in/wp-content/uploads/2021/05/gorilla-freak-wt5jg8_WrJg-unsplash-2-scaled-e1621759352550.jpg)',
          }}
        />
        <div className="info">
          <div className="health">
            <strong>김헬스</strong>
          </div>
          <div className="healthbox">
            <li>나이 30세(만29세)</li>
            <li>경력 5년</li>
          </div>
          <div className="ex">
            <strong>전문가이력</strong>
          </div>
          <div className="exbox">
            <li>생활스포츠지도자자격증</li>
            <li>생활스포츠지도자자격증</li>
            <li>생활스포츠지도자자격증</li>
            <li>생활스포츠지도자자격증</li>
            <li>생활스포츠지도자자격증</li>
            <li>생활스포츠지도자자격증</li>
          </div>
        </div>
        <div className="gym_info">
          {name && <p>트레이너 이름 {name}</p>}
          {age && <p>나이 {age}</p>}
          {career && <p>경력(년) {career}</p>}
        </div>
      </Boxs>
      <Reply>
        <div className="trainer_info">
          <form>
            <textarea placeholder="입력하세요" />
            <div className="sbutton">
              <button type="submit">댓글 등록</button>
            </div>
          </form>
        </div>
      </Reply>
      <Articles>
        <div className="abutton">
          <button type="submit" onClick={handleTrainerEdit}>
            수정
          </button>
          <button type="submit" onClick={handleTrainerRemove}>
            삭제
          </button>
        </div>
      </Articles>
    </Container>
  );
};

export default TrainerDetailPage;
