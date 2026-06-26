import React from 'react';
import servicesData from './helpers/servicesData';
import CustomTabPanel from './helpers/CustomTabPanel';
import assets from '../../../assets';

const AvitoTabPanel = () => {
  const avitoData = servicesData['avito'];
  const logo = assets.avitoLogoTwo;
  return <CustomTabPanel logo={logo} serviceData={avitoData} />;
};

export default AvitoTabPanel;
