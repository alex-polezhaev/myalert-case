import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import assets from '../assets';
import { ButtonComponent } from '../components';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@chakra-ui/icons';

export const SendCode = () => {
  const [showResendMessage, setShowResendMessage] = useState(false);
  const [countdown, setCountdown] = useState(36);

  useEffect(() => {
    let timer;
    if (showResendMessage) {
      timer = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount === 1) {
            setShowResendMessage(false);
            clearInterval(timer);
            return 36;
          } else {
            return prevCount - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showResendMessage]);

  const handleButtonClick = () => {
    setShowResendMessage(true);
  };

  const inputs = useRef([]);

  useEffect(() => {
    if (inputs.current[0]) {
      inputs.current[0]?.focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (value && value.length === 1) {
      if (index < inputs.current.length - 1 && inputs.current[index + 1]) {
        inputs.current[index + 1]?.focus();
      } else if (index === inputs.current.length - 1) {
        e.target.blur();
      } else if (index > 0 && inputs.current[index - 1]) {
        inputs.current[index - 1]?.focus();
      }
    }
  };
  return (
    <Box
      className='login-box'
      marginTop={{ base: '56px', sm: '40px', desktop: '44px' }}
      marginLeft={{ base: '20px', sm: '32px', desktop: '49px' }}
      marginRight={{ base: '20px', sm: '32px', desktop: 10 }}
      marginBottom={{ base: '56px', sm: '40px', desktop: 8 }}
      w='full'
    >
      <Box
        backgroundColor='white'
        borderRadius='30px'
        width='full'
        backgroundImage={{ base: assets.loginBanner, md: 'none' }}
        py={{ base: '65', md: 'auto' }}
        minH={{ base: '687px', sm: '687px', desktop: 'fit-content' }}
      >
        <Image
          w={{ base: '219px', md: 'full' }}
          h={{ base: '63px', md: 'full' }}
          src={assets.myAlertLogo}
          mb={6}
          display={{ base: 'block', md: 'none' }}
          mx='auto'
        />
        <Flex
          gap={{ base: '40px', desktop: '76px' }}
          justifyContent='center'
          alignItems='center'
          pr={{ base: '0', md: 10, desktop: 20 }}
          position='relative'
          flexDir={{ base: 'column', md: 'row' }}
        >
          <Box
            maxW={{ base: 'full', md: '458px', desktop: '695px' }}
            maxH={{ base: 'auto', md: '1043px' }}
            position='relative'
            display={{ base: 'none', md: 'block' }}
          >
            <Image
              w='full'
              h='full'
              src={assets.loginBanner}
              borderRadius={{ base: '18px', sm: '30px' }}
              display={{ base: 'none', md: 'block' }}
            />
            <Box
              position={{ base: 'relative', md: 'absolute' }}
              top={{ base: '156px', md: '50%' }}
              left='50%'
              transform='translate(-50%, -50%)'
            >
              <Image
                w={{ base: '219px', md: 'full' }}
                h={{ base: '63px', md: 'full' }}
                src={assets.myAlertLogo}
              />
            </Box>
          </Box>
          <Box
            flex={1}
            maxW={{ base: 'full', md: '500px' }}
            className='login-content'
          >
            <Button
              fontSize='sm'
              color='black.base'
              lineHeight={6}
              fontWeight={600}
              leftIcon={<ChevronLeftIcon />}
              colorScheme='transparent'
              padding={0}
              h='fit-content'
              mb={{ base: '20px', desktop: 8 }}
            >
              <Link to='/login'>Back</Link>
            </Button>
            <Flex
              justifyContent={'center'}
              alignItems={'center'}
              borderRadius='10px'
              className='gradient-bg'
              width={14}
              height={14}
            >
              <Image src={assets.callIcon} />
            </Flex>
            <Heading
              fontSize={{ base: '28px', sm: '36px', desktop: '48px' }}
              lineHeight={{ base: '34px', sm: '58px', desktop: '43px' }}
              fontWeight='bold'
              my={{ base: '20px', desktop: 8 }}
              color='black.base'
              whiteSpace='nowrap'
            >
              Sign in
            </Heading>
            <Text
              lineHeight={6}
              mb={1}
              color='black.1'
              fontWeight={500}
              fontSize='sm'
            >
              An SMS with a code will be sent to your phone number, enter it
            </Text>
            <Flex gap='6px'>
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <Input
                  key={index}
                  ref={(el) => (inputs.current[index] = el)}
                  onChange={(e) => handleChange(index, e)}
                  placeholder='○'
                  size='lg'
                  fontSize={{ base: 'sm', sm: 'lg' }}
                  px='0'
                  textAlign='center'
                  w={{ base: 8, sm: '48px' }}
                  h={{ base: 8, sm: '48px' }}
                />
              ))}
            </Flex>

            <Text
              color='brand.base'
              lineHeight='20px'
              fontSize='sm'
              fontWeight={500}
              mt={3}
              mb={8}
              cursor='pointer'
              onClick={handleButtonClick}
            >
              {showResendMessage ? (
                `Resend the code in ${countdown} seconds`
              ) : (
                <Text as='span' display='inline-block'>
                  Resend the code{' '}
                  <Text as='span' color='black.1'>
                    again
                  </Text>
                </Text>
              )}
            </Text>
            <Stack spacing={2}>
              <ButtonComponent
                text={'Sign in (inactive)'}
                width='full'
                size={'lg'}
                bg='#919EAB'
                color='white'
                to='/login/send-code'
                fontSize='16px'
                _hover={{ bg: 'black.2' }}
              />
              <ButtonComponent
                text='Back'
                width='full'
                size={'lg'}
                fontSize='16px'
                variant='outline'
                colorScheme='gray'
                color='black.4'
                to='/login'
              />
            </Stack>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
