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
  Text,
  Flex,
  Box,
} from '@chakra-ui/react';
import assets from '../../assets';
import { ButtonComponent } from '../ButtonComponent';
import { Badge } from '../Badge';
export const AddAccountModal = (props) => {
  const { isOpen, onClose, setIsOpenAddAccountModal } = props;

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent
          textAlign='center'
          borderRadius='20px'
          py='54px'
          maxW='804px'
          bg='#F6F7F8'
          sx={{
            '@media (max-width: 705px)': {
              mx: '20px',
              maxW: '100%',
              py: '32px',
            },
          }}
        >
          <ModalHeader>
            <Heading fontSize={{ base: '24px', desktop: '28px' }}>
              Adding accounts
            </Heading>
            <Text fontWeight='400' fontSize='14px' color='#637381'>
              This is where we store your accounts; they are needed to create
              connectors that send notifications.
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display='flex' flexDir='column' alignItems='center'>
            <Flex
              sx={{
                '@media (max-width: 600px)': {
                  flexDir: 'column',
                },
              }}
              alignItems='start'
              gap='12px'
            >
              <Box
                sx={{
                  '@media (max-width: 600px)': {
                    maxW: '100%',
                  },
                }}
                maxW='50%'
                bg='#fff'
                p='24px'
                borderRadius='12px'
              >
                <Heading fontSize='16px'>Your accounts</Heading>
                <Flex flexWrap='wrap' gap='12px' mt='16px'>
                  <Badge rightIcon={assets.avitoLogo} text='Avito' />
                  <Badge rightIcon={assets.sladki} text='MoySklad' />
                  <Badge rightIcon={assets.WildBerries} text='WildBerries' />
                  <Badge rightIcon={assets.telegram} text='Telegram' />
                  <Badge rightIcon={assets.whatsapp} text='WhatsApp' />
                </Flex>
              </Box>

              <Box
                textAlign='left'
                flex={1}
                bg='#fff'
                p='24px'
                borderRadius='12px'
                sx={{
                  '@media (max-width: 600px)': {
                    maxW: '100%',
                    w: 'full',
                  },
                }}
              >
                <Heading fontSize='16px'>Connector</Heading>
                <Text
                  fontWeight='400'
                  fontSize='16px'
                  my='12px'
                  color='#637381'
                >
                  Data source
                </Text>
                <Box w='fit-content'>
                  <Badge rightIcon={assets.avitoLogo} text='Avito' />
                </Box>
                <Image
                  src={assets.mediaNextIcon}
                  transform='rotate(90deg)'
                  display='block'
                  my='12px'
                />
                <Text
                  fontWeight='400'
                  fontSize='16px'
                  my='12px'
                  color='#637381'
                >
                  Data output
                </Text>
                <Flex gap='12px' w='fit-content'>
                  <Badge rightIcon={assets.whatsapp} text='WhatsApp' />
                  <Badge rightIcon={assets.telegram} text='Telegram' />
                </Flex>
              </Box>
            </Flex>
            <Flex
              sx={{
                '@media (max-width: 480px)': {
                  flexDir: 'column',
                },
              }}
              gap='12px'
              justifyContent='end'
              w='full'
              mt='32px'
            >
              <ButtonComponent
                text='Ask support'
                rightIcon={assets.telegram}
                bg='white'
                width='100%'
                color='#2BABEE'
                sx={{
                  '@media (max-width: 480px)': {
                    width: '100%',
                  },
                }}
                to='https://t.me/myalert_support'
              />
              <ButtonComponent
                text='Got it'
                width='100%'
                _hover={false}
                bg='brand.500'
                color='#fff'
                onClick={() => {
                  setIsOpenAddAccountModal(false);
                }}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
