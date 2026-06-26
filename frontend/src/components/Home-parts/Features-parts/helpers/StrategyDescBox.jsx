import React from 'react';
import { Box, Text, Heading, Image } from '@chakra-ui/react';
import assets from '../../../../assets';

const StrategyDescBox = ({ description, stratTabsState, stratKey }) => {
  if (!description) return null;
  const { descTitle, descMain, descSettings } = description;
  return (
    <Box
      sx={{
        '@media (max-width: 768px)': {
          w: 'full',
        },
      }}
      bg='#fff'
      p={{ base: 6, sm: 8 }}
      borderRadius={{ base: '20px', sm: '24px', desktop: '20px' }}
      w='50%'
      hidden={!stratTabsState[stratKey]}
    >
      <Heading
        color='#171923 '
        as='h3'
        fontSize={{ base: '16px', desktop: '21px' }}
        mb={4}
      >
        {descTitle.split('\n').map((text, i) => (
          <Text key={i}>{text}</Text>
        ))}
      </Heading>
      <Text
        color='black.5'
        fontSize={{ base: '14px', desktop: '16px' }}
        lineHeight={{ base: '20px', desktop: '22.4px' }}
      >
        {descMain.split('\n').map((text, i) => (
          <Text key={i}>{text}</Text>
        ))}
      </Text>
      <Heading
        color='#171923 '
        as='h3'
        fontSize={{ base: '16px', desktop: '21px' }}
        mt={6}
        mb={4}
      >
        Settings
      </Heading>
      <Text
        color='black.5'
        fontSize={{ base: '14px', desktop: '16px' }}
        lineHeight={{ base: '20px', desktop: '22.4px' }}
      >
        {descSettings.split('\n').map((text, i) => (
          <Text key={i}>{text}</Text>
        ))}
      </Text>
    </Box>
  );
};

export default StrategyDescBox;
