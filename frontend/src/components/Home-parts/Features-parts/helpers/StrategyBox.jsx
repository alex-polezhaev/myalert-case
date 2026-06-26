import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';

const StrategyBox = ({
  boxData,
  stratTabsState,
  handleStratChoice,
  mt,
  titleColor,
  dotColor,
}) => {
  const { title: boxTitle, strategies } = boxData;
  if (!strategies) return null;
  const texts = Object.entries(strategies).map(([key, strategyData], i) => {
    const text = (
      <Text
        px={4}
        py={3}
        bg={stratTabsState[key] ? 'bg' : null}
        fontWeight={500}
        fontSize={{ base: '14px', sm: '14px', desktop: '16px' }}
        mt={i === 0 ? '20px' : null}
        borderRadius='10px'
        color={stratTabsState[key] ? 'black.1' : 'black.5'}
        onClick={handleStratChoice(key)}
        cursor='pointer'
        key={key}
      >
        {strategyData.title}
      </Text>
    );
    return text;
  });

  return (
    <Box
      className='bg__box'
      sx={{
        '@media (max-width: 930px)': {
          bg: 'white',
          borderRadius: '8px',
        },
      }}
      mt={mt}
    >
      <Heading
        className={`bg__box-title ${dotColor}`}
        as='h5'
        color={titleColor ? titleColor : 'brand.base'}
        fontSize={{ base: '14px', sm: '14px', desktop: '16px' }}
        fontWeight={500}
        ml='22px'
      >
        {boxTitle}
      </Heading>
      {texts}
    </Box>
  );
};

export default StrategyBox;
