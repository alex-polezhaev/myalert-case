import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Text,
  Image,
  Flex,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { ButtonComponent } from './ButtonComponent';
import assets from '../assets';
import { cancelSubscription } from '../api/paymentApi';
import { getUser } from '../redux/slices/user';

export const Footer = ({ removeLogo, className }) => {
  const CancellationLink = () => {
    const { isAutopaymentEnabled } = useSelector((state) => state.user);
    const [isCancellationInProgress, updateCancellationState] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const toast = useToast();
    const navigate = useNavigate();

    return (
      <Box mt='0'>
        <Link
          mb='16px'
          to='#!'
          display='block'
          size='14px'
          color='#718096'
          onClick={() => {
            if (!Cookies.get('authentication')) {
              toast({
                title: 'You need to sign in to cancel the subscription',
                status: 'info',
                isClosable: true,
                duration: 10000,
              });
              navigate('/login?redirectTo=/subscription');
              return;
            }
            if (!isAutopaymentEnabled) {
              toast({
                title: 'Your auto-payment is disabled',
                status: 'info',
                isClosable: true,
              });
              return;
            }
            onOpen();
          }}
        >
          Cancel subscription
        </Link>
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
                      onClose();
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

  return (
    <footer className={`${className}`}>
      <Flex
        className='container'
        pt={{ base: '40px', sm: '100px', desktop: '150px' }}
        pb={{ base: '40px', desktop: '80px' }}
        justifyContent='space-between'
        flexWrap='wrap'
        rowGap='2rem'
      >
        <Box>
          {removeLogo ? null : <Image src={assets.logo} w='224' h='66' />}
          <Text size='14px' color='#718096' mt='16px'>
            Notifications & auto-replies for your marketplaces
          </Text>
          <Text size='14px' color='#718096' mt='12px' mb='28px'>
            @ {new Date().getFullYear()} MyAlert. All rights reserved.
          </Text>
          {removeLogo ? null : (
            <ButtonComponent
              text='Sign in'
              bg='brand.500'
              color='white'
              size='lg'
              _hover={false}
              to='/login'
            />
          )}
        </Box>
        <Box>
          <Link
            mb='16px'
            href='/privacy'
            display='block'
            size='14px'
            color='#718096'
          >
            Privacy Policy
          </Link>
          <Link
            mb='16px'
            href='/offer'
            display='block'
            size='14px'
            color='#718096'
          >
            Terms of Service
          </Link>
          <Link
            mb='16px'
            href='/transactions-agreement'
            display='block'
            size='14px'
            color='#718096'
          >
            Consent to store credentials <br /> for future transactions
          </Link>
        </Box>
        <Box>
          <Link
            mb='16px'
            href='https://t.me/myalert_support'
            display='block'
            size='14px'
            color='#718096'
          >
            Contact us
          </Link>
          <Link
            mb='16px'
            href='/subscription-agreement'
            display='block'
            size='14px'
            color='#718096'
          >
            Subscription Agreement
          </Link>
          <CancellationLink />
        </Box>
      </Flex>
    </footer>
  );
};
