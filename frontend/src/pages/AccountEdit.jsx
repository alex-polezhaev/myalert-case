import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Heading, Select, Spinner, Stack } from '@chakra-ui/react';
import { Header } from '../components';
import { services } from '../data/services.jsx';
import { getUser } from '../redux/slices/user.js';

const AccountEdit = () => {
  const { isUserLoading } = useSelector((state) => state.user);
  const [currentService, setCurrentService] = useState(
    Object.keys(services)[0],
  );
  const dispatch = useDispatch();

  const CurrentConnectComponent = services[currentService].connection;

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (isUserLoading) {
    return (
      <Spinner
        mt={40}
        ml={40}
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='red.500'
        size='xl'
      />
    );
  }

  return (
    <>
      <Header text='Add account' addBtn={false} />
      <Stack className='card-box' px={{ base: '16px', sm: 6, desktop: 6 }}>
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
              Choose a service to connect
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
              size={{ base: 'sm', sm: 'lg' }}
              w={{ base: '100%', tablet: '500px' }}
              onChange={(e) => {
                setCurrentService(e.target.value);
              }}
              value={currentService}
            >
              {Object.values(services)
                .filter((el) => el.connection)
                .map((el, i) => (
                  <option key={i + 'services'} value={el.key}>
                    {el.titles.rus_url}
                  </option>
                ))}
            </Select>
          </Flex>
        </Box>
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
              Configure the connection
            </Heading>
          </Flex>
          <Stack
            spacing={{ base: 3, sm: '38px' }}
            className='line-box'
            pl={8}
            pt={{ base: 3, sm: 4 }}
            pb={{ base: 4, sm: 6, desktop: 8 }}
            maxW='528px'
          >
            <CurrentConnectComponent />
          </Stack>
        </Box>
      </Stack>
    </>
  );
};
export default AccountEdit;
