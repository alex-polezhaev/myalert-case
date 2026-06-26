import React, { useState } from 'react';
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
import { getAccs } from '../redux/slices/accounts';
import assets from '../assets';
import { ButtonComponent } from './ButtonComponent';
import { removeAcc } from '../api/accountsApi';
import { getCombinations } from '../redux/slices/combinations';
import { getConnectors } from '../redux/slices/connectors';

export const RemoveAccountButton = (props) => {
  const { account } = props;
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <ButtonComponent
        icon={assets.trashLogo}
        colorScheme='gray'
        size='xs'
        text='Delete'
        color='#919EAB'
        to={''}
        fontSize={{ base: 'xs', sm: 'sm', desktop: 'xs' }}
        height={{ base: '24px', sm: '32px', desktop: '24px' }}
        leftIcon={null}
        onClick={onOpen}
      >
        Delete
      </ButtonComponent>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm action</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete the account {account.title}?
          </ModalBody>

          <ModalFooter>
            <Button
              color='red.400'
              variant={'outline'}
              mr={3}
              onClick={() => {
                setLoading(true);
                removeAcc(account._id)
                  .then(() => {
                    dispatch(getAccs());
                    dispatch(getConnectors());
                    dispatch(getCombinations());
                  })
                  .finally(() => setLoading(false));
              }}
              isLoading={isLoading}
            >
              Delete
            </Button>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
