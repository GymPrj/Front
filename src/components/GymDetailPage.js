import React, { useEffect } from 'react';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { TRAINER_LIST_REQUEST } from '../redux/types';

const GymDetailPage = () => {
  const gymTrainerList = useSelector(state => state.gym.trainerList);
  const dispatch = useDispatch();

  useEffect(() => {
    //   axios.get(`/trainer/gym/5`).then(res => {
    //     console.log(res.data);
    //   });

    const id = 5;
    dispatch({
      type: TRAINER_LIST_REQUEST,
      payload: id,
    });

    console.log(gymTrainerList);
  }, [dispatch]);

  return (
    <div>
      <p>GymDetailPage</p>
    </div>
  );
};
export default GymDetailPage;
