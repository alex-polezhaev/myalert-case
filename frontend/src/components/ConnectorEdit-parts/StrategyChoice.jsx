import React from 'react';
import { Box, Flex, Heading, Select, Stack } from '@chakra-ui/react';

const StrategyChoice = ({
  data,
  setData,
  strategies,
  setCurrentStrategy,
  setCurrentStrategyKey,
}) => {
  const strategiesEntries = Object.entries(strategies);
  const currentStrategyKey = Object.keys(data?.settings)[0];

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
          2
        </Flex>
        <Heading
          as='h5'
          fontSize={{ base: 'sm', sm: '15px', desktop: '16px' }}
          color='black.1'
          fontWeight={500}
          lineHeight='22px'
        >
          Choose a strategy
        </Heading>
      </Flex>
      <Stack
        spacing={{ base: 3, sm: 4 }}
        className='line-box'
        pl={8}
        mt={2}
        pt={{ base: 3, sm: 4 }}
        pb={{ base: 4, sm: 6, desktop: 8 }}
      >
        <Box>
          <Select
            name='strategy-select'
            size={{ base: 'sm', sm: 'lg' }}
            w={{ base: '100%', tablet: '500px' }}
            onChange={(e) => {
              const strategyKey = e.target.value;
              const strategy = strategies[strategyKey];
              setCurrentStrategyKey(strategyKey);
              setCurrentStrategy(strategy);
              setData({
                ...data,
                settings: { [strategyKey]: { ...strategy.rules } },
              });
            }}
            value={currentStrategyKey}
          >
            {strategiesEntries.map(([strategyKey, strategyData], i) => (
              <option key={i} value={strategyKey}>
                {strategyData.title}
              </option>
            ))}
          </Select>
        </Box>
      </Stack>
    </Box>
  );
};

export default StrategyChoice;
