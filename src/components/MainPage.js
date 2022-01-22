import React, { useState } from 'react';
import GymSeach from './GymSeach';

const MainPage = () => {
  const [value, setValue] = useState(0); // eslint-disable-line no-unused-vars

  return (
    <section>
      <GymSeach />
    </section>
  );
};

export default MainPage;
