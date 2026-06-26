import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Flex, Heading, Select } from '@chakra-ui/react';

const ServiceChoice = ({ chooseService, currentInputServiceKey }) => {
  const { entities: combinations } = useSelector((state) => state.combinations);
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
          1
        </Flex>
        <Heading
          as='h5'
          fontSize={{ base: 'sm', sm: '15px', desktop: '16px' }}
          color='black.1'
          fontWeight={500}
          lineHeight='22px'
        >
          Choose a data source service
        </Heading>
      </Flex>
      <Flex
        className='line-box'
        alignItems={{ base: 'end', tablet: 'center' }}
        justifyContent={{ base: 'end', tablet: 'start' }}
        gap={{ base: 3, sm: 4 }}
        pl={8}
        pt={{ base: 3, sm: 4 }}
        mt={2}
        pb={{ base: 4, sm: 6, desktop: 8 }}
        flexWrap='wrap'
      >
        <Select
          name='input-select'
          size={{ base: 'sm', sm: 'lg' }}
          w={{ base: '100%', tablet: '500px' }}
          onChange={(e) => {
            const serviceKey = e.target.value;
            const accountId = e.target.selectedOptions[0].id;
            chooseService(serviceKey, accountId);
          }}
          value={currentInputServiceKey}
        >
          {combinations.map((combination, i) => (
            <option key={i} value={combination.service} id={combination._id}>
              {combination.title}
            </option>
          ))}
        </Select>
      </Flex>
    </Box>
  );
};

export default ServiceChoice;
