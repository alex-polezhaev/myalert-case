import React from 'react';
import { Box, Image, Heading, Text } from '@chakra-ui/react';
import { ButtonComponent, HeaderDefault } from '../components';
import assets from '../assets';
const NotFound = () => {
  return (
    <Box mb='50px'>
      <Box bg='#fff'>
        <HeaderDefault notFoundBtn={true} />
      </Box>
      <Box
        className='container'
        justifyContent='center'
        display='flex'
        flexDir='column'
        mt={{ base: '88px', sm: '142px', desktop: '126px' }}
        alignItems='center'
        textAlign='center'
      >
        <Image
          src={assets.notFound}
          w='530px'
          h='347px'
          sx={{
            '@media (max-width: 480px)': {
              h: '280px',
              w: '100%',
            },
          }}
        />
        <Heading fontSize={{ base: '32px', desktop: '48px' }} color='#171923'>
          Page not found
        </Heading>
        <Text fontSize={{ base: '15px', desktop: '18px' }} mt='18px' mb='45px'>
          It looks like this page was moved or deleted, go back to the home
          page
        </Text>
        <ButtonComponent
          text='Home'
          bg='brand.500'
          color='#fff'
          size='md'
          _hover={false}
          to='/accounts'
        />
      </Box>
    </Box>
  );
};

export default NotFound;
