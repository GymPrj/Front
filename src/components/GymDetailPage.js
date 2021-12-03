import React, { useEffect } from 'react';
import axios from 'axios';

const GymDetailPage = () => {
  useEffect(() => {
    axios.get(`/trainer/gym/5`).then(res => {
      console.log(res.data);
    });
  }, []);

  return (
    <div>
      <p>GymDetailPage</p>
    </div>
  );
};
export default GymDetailPage;
