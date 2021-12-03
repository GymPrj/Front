import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Tabs, Tab } from '@mui/material';
import styled from 'styled-components';
import GymSeach from './GymSeach';

const GTabs = styled(Tabs)`
  .MuiTabs-indicator {
    display: none;
  }
`;
const GTab = styled(Tab)`
  padding: 0 50px;
  border-radius: 5px 5px 0 0;
  &.Mui-selected {
    background-color: #1976d2;
    color: #fff;
  }
`;
const GBox = styled(Box)`
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-top: 0;
`;

const TabPanel = props => {
  const { children, value, index, ...other } =
    props; /* eslint-disable react/jsx-props-no-spreading */

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MainPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container component="main" maxWidth="xl" sx={{ mt: 9 }}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <GTabs value={value} onChange={handleChange}>
            <GTab label="헬스장" {...a11yProps(0)} />
          </GTabs>
        </Box>
        <GBox>
          <TabPanel value={value} index={0}>
            <GymSeach />
          </TabPanel>
        </GBox>
      </Box>
    </Container>
  );
};

export default MainPage;
