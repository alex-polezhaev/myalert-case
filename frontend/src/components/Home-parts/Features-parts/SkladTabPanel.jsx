import React from 'react';
import servicesData from './helpers/servicesData';
import CustomTabPanel from './helpers/CustomTabPanel';

const SkladTabPanel = () => {
  const skladData = servicesData['sklad'];
  const logo = null;
  return <CustomTabPanel logo={logo} serviceData={skladData} />;
};

export default SkladTabPanel;
