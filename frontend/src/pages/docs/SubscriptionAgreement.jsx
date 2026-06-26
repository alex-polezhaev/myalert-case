import React from 'react';
import { Box, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';

const SubscriptionAgreement = () => {
  return (
    <Box mx='20px' my='50px' className='offer'>
      <Heading fontSize='20px' textAlign='center' mb='10px'>
        Subscription Agreement
      </Heading>
      <Text>
        This is a placeholder Subscription Agreement for the MyAlert demo. It
        describes the terms of the paid subscription.
      </Text>
      <UnorderedList mt='4' spacing={3}>
        <ListItem>
          The subscription unlocks the connector and notification features of
          the service for the paid period.
        </ListItem>
        <ListItem>
          The subscription renews automatically unless cancelled before the end
          of the current billing period.
        </ListItem>
        <ListItem>
          Refunds and cancellations are handled according to your published
          billing policy.
        </ListItem>
      </UnorderedList>
      <Text mt='4'>
        Replace this placeholder with your real Subscription Agreement before
        going to production.
      </Text>
    </Box>
  );
};

export default SubscriptionAgreement;
