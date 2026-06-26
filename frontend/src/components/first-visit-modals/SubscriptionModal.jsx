import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Heading,
  Image,
} from '@chakra-ui/react';
import assets from '../../assets';
import { ButtonComponent } from '../ButtonComponent';
export const SubscriptionModal = (props) => {
  const {
    isOpen,
    onClose,
    setIsOpenSubscriptionModal,
    setIsOpenAddAccountModal,
  } = props;

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent
          textAlign='center'
          borderRadius='20px'
          py='54px'
          maxW='670px'
          sx={{
            '@media (max-width: 705px)': {
              mx: '20px',
              maxW: '100%',
              py: '32px',
            },
          }}
        >
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody display='flex' flexDir='column' alignItems='center'>
            <Image src={assets.check} w={130} />
            <Heading fontSize='22px' my='32px' color='#222222' fontWeight={600}>
              Congratulations on signing up! <br />
              Here are 3 free days of subscription!
            </Heading>
            <ButtonComponent
              text='Continue'
              bg='brand.500'
              color='white'
              _hover={false}
              onClick={() => {
                setIsOpenAddAccountModal(true);
                setIsOpenSubscriptionModal(false);
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
