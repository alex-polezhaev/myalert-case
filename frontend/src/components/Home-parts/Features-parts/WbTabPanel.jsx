import React from 'react';
import servicesData from './helpers/servicesData';
import CustomTabPanel from './helpers/CustomTabPanel';

const WbTabPanel = () => {
  const wbData = servicesData['wb'];
  const logo = null;
  return <CustomTabPanel logo={logo} serviceData={wbData} />;
};

export default WbTabPanel;
