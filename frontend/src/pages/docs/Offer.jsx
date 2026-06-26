import { Box, Heading, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react';
import React from 'react';

const Offer = () => {
  return (
    <Box mx='20px' my='50px' className='offer'>
      <Stack spacing={4} mt={4}>
        <Heading fontSize='20px' textAlign='center'>
          Terms of Service
        </Heading>
        <Text>
          This is a placeholder Terms of Service for the MyAlert demo. It
          outlines the general terms under which the service is provided.
        </Text>
        <UnorderedList spacing={3}>
          <ListItem>
            The service grants you a non-exclusive right to use the MyAlert
            dashboard and connectors.
          </ListItem>
          <ListItem>
            You are responsible for the accounts and content you connect to the
            service.
          </ListItem>
          <ListItem>
            The service is provided &quot;as is&quot; without warranties of any
            kind.
          </ListItem>
        </UnorderedList>
        <Text>
          Replace this placeholder with your real Terms of Service before going
          to production.
        </Text>
      </Stack>
    </Box>
  );
};

export default Offer;
