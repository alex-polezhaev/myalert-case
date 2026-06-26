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
import { Badge } from '../Badge';
import { ButtonComponent } from '../ButtonComponent';

export const ConnectorQuestionModal = (props) => {
  const { isOpen, onClose, setIsOpenConnectorQuestionModal } = props;

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent
          textAlign='center'
          borderRadius='20px'
          py='25px'
          maxW='500px'
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
              What is a connector?
            </Heading>
            <Text fontWeight='400' fontSize='14px' color='#637381'>
              Connectors link accounts together; in them you can
              configure notification delivery rules.
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
              w='full'
              textAlign='center'
              justifyContent='center'
              alignItems='start'
              gap='12px'
            >
              <Box
                flex={1}
                bg='#fff'
                p='24px'
                borderRadius='12px'
                margin='0 autor'
                textAlign='center'
                w='full'
                sx={{
                  '@media (max-width: 600px)': {
                    maxW: '100%',
                    w: 'full',
                  },
                }}
              >
                <Text
                  fontWeight='400'
                  fontSize='16px'
                  mb='12px'
                  color='#637381'
                >
                  Data source
                </Text>
                <Box w='fit-content' mx='auto'>
                  <Badge rightIcon={assets.avitoLogo} text='Avito' />
                </Box>
                <Image
                  src={assets.mediaNextIcon}
                  transform='rotate(90deg)'
                  display='block'
                  my='12px'
                  mx='auto'
                />
                <Text
                  fontWeight='400'
                  fontSize='16px'
                  my='12px'
                  color='#637381'
                >
                  Data output
                </Text>
                <Flex flexWrap='wrap' gap='12px' w='fit-content' mx='auto'>
                  <Badge rightIcon={assets.telegram} text='Telegram' />
                  <Badge rightIcon={assets.whatsapp} text='WhatsApp' />
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
                  setIsOpenConnectorQuestionModal(false);
                }}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
