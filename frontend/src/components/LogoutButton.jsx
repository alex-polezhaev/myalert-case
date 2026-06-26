import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { LuLogOut } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { clearAccounts } from '../redux/slices/accounts';
import { clearConnectors } from '../redux/slices/connectors';
import { clearCombinations } from '../redux/slices/combinations';
import { clearUser } from '../redux/slices/user';

export const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const domain = import.meta.env.VITE_COOKIE_DOMAIN;

  return (
    <>
      <Button
        colorScheme='gray'
        color='#919EAB'
        size='sm'
        fontSize='13px'
        variant='outline'
        width='full'
        rightIcon={<LuLogOut />}
        onClick={onOpen}
      >
        Log out
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm action</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to log out?</ModalBody>

          <ModalFooter>
            <Button
              color='red.400'
              variant={'outline'}
              mr={3}
              onClick={() => {
                Cookies.remove('authentication', {
                  path: '/',
                  domain,
                });

                dispatch(clearAccounts());
                dispatch(clearConnectors());
                dispatch(clearCombinations());
                dispatch(clearUser());
                navigate('/');
              }}
            >
              Log out
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Go back
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
