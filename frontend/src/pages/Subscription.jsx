import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Stack, Skeleton } from '@chakra-ui/react';
import { Header } from '../components';
import { getUser } from '../redux/slices/user';
import SubscriptionRenewal from '../components/Subscription-parts/SubscriptionRenewal';
import Autopayment from '../components/Subscription-parts/Autopayment';

const Subscription = () => {
  const dispatch = useDispatch();
  const { entity: user, isUserLoading } = useSelector((state) => state.user);
  const [isChecked1, updateCheckbox1State] = useState(false);
  const [isChecked2, updateCheckbox2State] = useState(false);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const SkeletLoading = () => (
    <Stack>
      <Skeleton height='170px' borderRadius='18px' />
      <Skeleton height='170px' borderRadius='18px' mt={1} />
    </Stack>
  );

  const Main = () => (
    <Box className='subscription__management'>
      <Flex
        justifyContent='space-between'
        gap='20px'
        mt={{ base: '32px' }}
        sx={{
          '@media (max-width: 1300px)': {
            flexDir: 'column',
          },
        }}
      >
        <SubscriptionRenewal
          user={user}
          isChecked1={isChecked1}
          isChecked2={isChecked2}
          updateCheckbox1State={updateCheckbox1State}
          updateCheckbox2State={updateCheckbox2State}
        />
        <Autopayment user={user} />
      </Flex>
    </Box>
  );

  return (
    <>
      <Header text='Subscription management' addBtn={false} />
      {user && !isUserLoading ? <Main /> : <SkeletLoading />}
    </>
  );
};

export default Subscription;
