import React from 'react';
import { Box, Flex, Heading, Stack } from '@chakra-ui/react';

const StrategySettings = ({ currentStrategy, data, setData }) => {
  const strategySettingsProps = { data, setData };
  return (
    <Box>
      <Flex gap={2} alignItems='center'>
        <Flex
          fontSize={{ base: 'sm', sm: '15px', desktop: '16px' }}
          borderRadius='50%'
          w={6}
          h={6}
          color='white'
          justifyContent='center'
          alignItems='center'
          bg='brand.base'
        >
          3
        </Flex>
        <Heading
          as='h5'
          fontSize={{ base: 'sm', sm: '15px', desktop: '16px' }}
          color='black.1'
          fontWeight={500}
          lineHeight='22px'
        >
          Strategy settings
        </Heading>
      </Flex>
      <Stack
        pt={{ base: 3, sm: 4 }}
        pb={{ base: 4, sm: 6, desktop: 6 }}
        spacing={4}
        className='line-box'
        pl={8}
        mt={2}
      >
        {currentStrategy
          ? currentStrategy.createSettingsComponent(strategySettingsProps)
          : null}
      </Stack>
    </Box>
  );
};

export default StrategySettings;
