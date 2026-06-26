import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Flex,
  Heading,
  Text,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { cancelSubscription } from '../../api/paymentApi';
import { getUser } from '../../redux/slices/user';

const Autopayment = ({ user }) => {
  const { trial_used: isTrialUsed, rebill_id: rebillID, card } = user;
  const isAutopaymentEnabled = !!isTrialUsed && !!rebillID && !!card;
  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const ActivationStatus = () => {
    const activeClass = isAutopaymentEnabled ? 'active' : '';
    const activationText = isAutopaymentEnabled ? 'Enabled' : 'Disabled';
    return (
      <button className={`status__btn ${activeClass}`}>
        <Text as='span' className='dot'></Text>
        <Text as='span'>{activationText}</Text>
      </button>
    );
  };

  const AutopaymentButton = () => {
    if (!isAutopaymentEnabled) return null;
    const [isCancellationInProgress, updateCancellationState] = useState(false);

    return (
      <Box mt='0'>
        <button className='change__map-btn' onClick={onOpen}>
          Disable
        </button>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm action</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Are you sure you want to cancel the subscription?</ModalBody>

            <ModalFooter>
              <Button
                color='red.400'
                variant={'outline'}
                mr={3}
                onClick={() => {
                  updateCancellationState(true);
                  cancelSubscription()
                    .then(() => {
                      toast({
                        title: 'Subscription cancelled successfully',
                        status: 'success',
                        isClosable: true,
                        colorScheme: 'green',
                      });
                      dispatch(getUser());
                    })
                    .catch(() => {
                      toast({
                        title: 'An error occurred',
                        description:
                          'Please try again later or contact support',
                        status: 'error',
                        isClosable: true,
                        colorScheme: 'red',
                      });
                    })
                    .finally(() => {
                      updateCancellationState(false);
                    });
                }}
                isLoading={isCancellationInProgress}
              >
                Confirm
              </Button>
              <Button variant='ghost' onClick={onClose}>
                Go back
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    );
  };

  const Card = () => {
    const disabledClass = isAutopaymentEnabled ? '' : 'disabled';
    const last4Digits = isAutopaymentEnabled ? card?.pan?.slice(-4) : '****';
    const expDate = isAutopaymentEnabled
      ? `${card?.exp_date?.slice(0, 2)}/${card?.exp_date?.slice(2)}`
      : '**/**';
    const height = isAutopaymentEnabled ? undefined : 'full';
    return (
      <Box
        className={`cart__bg ${disabledClass}`}
        color='#fff'
        maxW='268px'
        w='full'
        overflow='hidden'
        borderRadius='12px'
        p='12px'
        display='flex'
        justifyContent='end'
        flexDir='column'
        h={height}
        sx={{
          '@media (max-width:480px)': {
            maxW: 'full',
          },
        }}
      >
        <Text fontSize='21px' fontWeight={500}>
          **** **** **** {last4Digits}
        </Text>
        <Text fontSize='14px'>{expDate}</Text>
      </Box>
    );
  };

  return (
    <Box
      flex={1}
      borderRadius={{ base: '20px' }}
      p={{ base: '20px', desktop: '24px' }}
      bg='#fff'
      height='fit-content'
    >
      <Flex
        justifyContent='space-between'
        alignItems='start'
        h='full'
        sx={{
          '@media (max-width:480px)': {
            flexDir: 'column',
            rowGap: '1rem',
            w: 'full',
          },
        }}
      >
        <Flex
          justifyContent='space-between'
          flexDir='column'
          borderRadius='16px'
          h='full'
          rowGap='18px'
          sx={{
            '@media (max-width:480px)': {
              flexDir: 'column',
              w: 'full',
            },
          }}
        >
          <Box
            sx={{
              '@media (max-width:480px)': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                w: 'full',
              },
            }}
          >
            <Heading
              fontSize={{ base: '18px', sm: '20px', desktop: '24px' }}
              as='h4'
              color='#000000D9'
              fontWeight={600}
              mb='16px'
            >
              Auto-payment
            </Heading>
            <ActivationStatus />
          </Box>
          <AutopaymentButton />
        </Flex>
        <Card />
      </Flex>
    </Box>
  );
};

export default Autopayment;
