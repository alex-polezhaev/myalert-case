import React from 'react';
import { Text, Heading, Image } from '@chakra-ui/react';

const TabPanelHeading = ({ logo }) => {
  return (
    <Heading
      color='black.1'
      display='flex'
      alignItems='center'
      gap='4'
      fontSize={{ base: '24px', sm: '32px', desktop: '48px' }}
      lineHeight={{ base: '28.8px', sm: '38.4px', desktop: '57.6px' }}
      className='avito__logo-heading'
      mt='30px'
      mb={10}
    >
      Features{' '}
      <Text as='span' className='gradient-text'>
        My Alert
      </Text>{' '}
      in <Image src={logo} />
    </Heading>
  );
};

export default TabPanelHeading;
