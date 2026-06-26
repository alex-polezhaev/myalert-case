import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Heading, Text, useToast, Checkbox } from '@chakra-ui/react';
import { ButtonComponent } from '../ButtonComponent';
import { getDateData } from './helpers';
import { initPayment } from '../../api/paymentApi';

const SubscriptionRenewal = ({
  user,
  isChecked1,
  isChecked2,
  updateCheckbox1State,
  updateCheckbox2State,
}) => {
  const { trial_used: isTrialUsed, expires_at: expirestAt } = user;
  const toast = useToast();

  const { daysLeft, daysLeftPercent, renewalDate, isSubscriptionExpired } =
    getDateData(expirestAt);
  const isSubscriptionActive = !isSubscriptionExpired;

  const SubscriptionStatus = () => {
    const statusClass = isSubscriptionActive ? 'active' : 'ended';
    const statusText = isSubscriptionActive ? 'Active' : 'Expired';
    return (
      <button className={`status__btn ${statusClass}`}>
        <Text as='span' className='dot'></Text>
        <Text as='span'>{statusText}</Text>
      </button>
    );
  };

  const RenewalButton = () => {
    return (
      <Box mt='33px'>
        <ButtonComponent
          text={
            isTrialUsed
              ? 'Renew subscription for 299₽/month'
              : 'Renew subscription for 1₽/month'
          }
          bg='brand.500'
          color='#fff'
          width='full'
          _hover={false}
          onClick={() => {
            if (isChecked1 && isChecked2) {
              initPayment().catch(() => {
                toast({
                  title: 'An error occurred',
                  description: 'Please try again later',
                  status: 'error',
                  isClosable: true,
                  colorScheme: 'red',
                });
              });
            } else {
              toast({
                title: 'Consent not confirmed',
                description:
                  'You must confirm your agreement to the auto-payment terms and the privacy policy',
                status: 'warning',
                isClosable: true,
                duration: 10000,
              });
            }
          }}
        />
      </Box>
    );
  };

  const PricePerMonth = () => {
    return (
      <Box borderRadius={3} p='12px' bg='bg' mt='20px'>
        <Heading
          as='h5'
          fontSize={{ base: '16px', desktop: '18px' }}
          color='#000000D9'
          fontWeight={500}
        >
          {' '}
          299₽{' '}
          <Text
            fontWeight={400}
            fontSize={{ base: '16px', desktop: '18px' }}
            as='span'
            color='#000000A6'
          >
            / month
          </Text>
        </Heading>
      </Box>
    );
  };

  const SubscriptionDate = () => {
    return (
      <Box mt={2}>
        <Text color='#000000BF' size='14px'>
          {daysLeft} days left
        </Text>
        <Box my='3' borderRadius='23px' w='full' h='6px' bg='#F6F6F6'>
          <Box
            bg='brand.500'
            w={`${daysLeftPercent}%`}
            borderRadius='23px'
            h='full'
          ></Box>
        </Box>
        {isTrialUsed ? (
          <Text color='#00000073' fontSize='13px'>
            {renewalDate}, the subscription will be renewed automatically for one month for 299
            ₽
          </Text>
        ) : null}
      </Box>
    );
  };

  return (
    <Box
      flex={1}
      borderRadius={{ base: '20px' }}
      p={{ base: '20px', desktop: '24px' }}
      bg='#fff'
    >
      <Flex
        justifyContent='space-between'
        alignItems='start'
        w={isSubscriptionActive ? undefined : 'full'}
        sx={
          isSubscriptionActive
            ? {
                '@media (max-width:480px)': {
                  flexDir: 'column',
                  mb: '20px',
                },
              }
            : undefined
        }
      >
        <Box
          borderRadius='16px'
          w={isSubscriptionActive ? undefined : 'full'}
          sx={
            isSubscriptionActive
              ? {
                  '@media (max-width:480px)': {
                    display: 'flex',
                    justifyContent: 'space-between',
                    w: 'full',
                  },
                }
              : undefined
          }
        >
          <Heading
            fontSize={{ base: '18px', sm: '20px', desktop: '24px' }}
            as='h4'
            color='#000000D9'
            fontWeight={600}
            mb='16px'
          >
            Service subscription
          </Heading>
          <SubscriptionStatus />
        </Box>
        {isSubscriptionActive ? <PricePerMonth /> : null}
      </Flex>
      {isSubscriptionActive ? <SubscriptionDate /> : null}
      <RenewalButton />
      <Checkbox
        isChecked={isChecked1}
        onChange={(e) => {
          const { checked } = e.target;
          updateCheckbox1State(checked);
        }}
        id='agreement-confirmaion'
        mt={3}
      >
        <Text fontSize='14px'>
          I agree to{' '}
          <Link
            to='/transactions-agreement'
            style={{ color: 'black', textDecoration: 'underline' }}
          >
            the auto-payment terms
          </Link>{' '}
        </Text>
      </Checkbox>
      <br />
      <Checkbox
        isChecked={isChecked2}
        onChange={(e) => {
          const { checked } = e.target;
          updateCheckbox2State(checked);
        }}
        id='agreement-confirmaion'
        mt={3}
      >
        <Text fontSize='14px'>
          I agree to{' '}
          <Link
            to='/privacy'
            style={{ color: 'black', textDecoration: 'underline' }}
          >
            the privacy policy
          </Link>
        </Text>
      </Checkbox>
    </Box>
  );
};

export default SubscriptionRenewal;
