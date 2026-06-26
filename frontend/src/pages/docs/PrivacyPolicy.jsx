import React from 'react';
import { Box, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';

const PrivacyPolicy = () => {
  return (
    <Box mx='20px' my='50px' className='offer'>
      <Heading textAlign='center' size='lg'>
        Privacy Policy
      </Heading>
      <Text mt='4'>
        This is a placeholder Privacy Policy for the MyAlert demo. It describes,
        in general terms, how personal data would be processed by the service.
      </Text>
      <UnorderedList mt='4' spacing={3}>
        <ListItem>
          We collect only the data required to operate the service (such as your
          Telegram identity and connected marketplace accounts).
        </ListItem>
        <ListItem>
          Data is used solely to provide the notification and auto-reply
          features you configure.
        </ListItem>
        <ListItem>
          You can revoke access and request deletion of your data at any time.
        </ListItem>
      </UnorderedList>
      <Text mt='4'>
        Replace this placeholder with your real Privacy Policy before going to
        production.
      </Text>
    </Box>
  );
};

export default PrivacyPolicy;
