import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import TabPanelHeading from './TabPanelHeading';
import StrategyBox from './StrategyBox';
import StrategyDescBox from './StrategyDescBox';

const getAllStrategyKeys = (serviceObj) => {
  const boxValues = Object.values(serviceObj);
  const allStrategyKeys = boxValues.reduce((acc, { strategies }) => {
    if (!strategies) return acc;
    const strategyKeys = Object.keys(strategies);
    return [...acc, ...strategyKeys];
  }, []);
  return allStrategyKeys;
};

const CustomTabPanel = ({ serviceData, logo }) => {
  const allStrategyKeys = getAllStrategyKeys(serviceData);
  const initStrategiesTabsState = allStrategyKeys.reduce(
    (acc, key) => ({ ...acc, [key]: false }),
    {},
  );
  const [stratTabsState, updateStratTabsState] = useState({
    ...initStrategiesTabsState,
    [allStrategyKeys[0]]: true,
  });
  const handleStratChoice = (stratTitle) => () => {
    updateStratTabsState({
      ...initStrategiesTabsState,
      [stratTitle]: true,
    });
  };

  const strategyBoxes = Object.entries(serviceData).map(([key, boxData], i) => {
    const { styles } = boxData;
    const strat = (
      <StrategyBox
        boxData={boxData}
        stratTabsState={stratTabsState}
        handleStratChoice={handleStratChoice}
        key={key}
        mt={i !== 0 ? '21px' : null}
        titleColor={styles?.titleColor}
        dotColor={styles?.dotColor}
      />
    );
    return strat;
  });

  const strategyDescBoxes = Object.values(serviceData).reduce(
    (acc, boxData) => {
      const { strategies } = boxData;
      if (!strategies) return acc;
      const interimDescBoxes = Object.entries(strategies).map(
        ([stratKey, stratObj]) => {
          const { description } = stratObj;
          return (
            <StrategyDescBox
              key={stratKey}
              description={description}
              stratTabsState={stratTabsState}
              stratKey={stratKey}
            />
          );
        },
      );
      return [...acc, ...interimDescBoxes];
    },
    [],
  );

  return (
    <>
      <TabPanelHeading logo={logo} />
      <Flex
        justifyContent='space-between'
        gap='22px'
        sx={{
          '@media (max-width: 768px)': {
            flexDir: 'column',
          },
        }}
      >
        <Box
          w='50%'
          sx={{
            '@media (max-width: 768px)': {
              w: 'full',
            },
          }}
        >
          {strategyBoxes}
        </Box>
        {strategyDescBoxes}
      </Flex>
    </>
  );
};

export default CustomTabPanel;
