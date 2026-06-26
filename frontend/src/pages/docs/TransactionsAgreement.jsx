import React from 'react';
import { Box, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';

const TransactionsAgreement = () => {
  return (
    <Box mx='20px' my='50px' className='offer'>
      <Heading fontSize='20px' textAlign='center' mb='10px'>
        Recurring Payments Agreement
      </Heading>
      <Text>
        This is a placeholder agreement covering the storage of payment
        credentials for future subscription charges.
      </Text>
      <UnorderedList mt='4' spacing={3}>
        <ListItem>
          By enabling auto-payment, you authorize the service to store a payment
          token and charge your subscription on a recurring basis.
        </ListItem>
        <ListItem>
          You can disable auto-payment and remove stored payment data at any
          time from your account settings.
        </ListItem>
      </UnorderedList>
      <Text mt='4'>
        Replace this placeholder with your real payments agreement before going
        to production.
      </Text>
    </Box>
  );
};

export default TransactionsAgreement;
