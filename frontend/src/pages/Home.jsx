import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Text, Heading, Image, Flex } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { ButtonComponent, Footer, HeaderDefault } from '../components';
import assets from '../assets';
import './home.css';
import Features from '../components/Home-parts/Features';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (Cookies.get('authentication')) {
      return navigate('/accounts');
    }
  }, []);
  return (
    <>
      <Box className='home__page' bg='#fff'>
        <HeaderDefault />
        <Box
          mt={16}
          mb='174px'
          className='home__intro container'
          p={{ base: '20px', sm: '32px', desktop: 16 }}
          rounded={32}
          sx={{
            '@media (max-width:480px)': {
              mt: '32px',
              mb: '100px',
            },
          }}
        >
          <Box maxW='50%'>
            <Heading
              as='h1'
              fontSize={{ base: '28px', sm: '36px', desktop: '54px' }}
              lineHeight={{ base: '35px', sm: '43px', desktop: '59px' }}
              maxW='768px'
            >
              <Text as='span' className='gradient-text'>
                Instant
              </Text>{' '}
              notifications about your business
            </Heading>
            <Text
              fontSize={{ base: 'sm', sm: '16px', desktop: 'lg' }}
              lineHeight={{ base: '20px', sm: '24px', desktop: '27px' }}
              mt={{ base: '20px', sm: 4, desktop: 8 }}
              mb={{ base: '245px', sm: '119px', desktop: '117px' }}
              maxW='584px'
            >
              Stay on top of key moments on the go — without a CRM or complex
              software.
            </Text>
            <ButtonComponent
              text='Enable notifications'
              className='gradient-bg'
              color='white'
              size='lg'
              bg='brand.500'
              icon={assets.flash}
              _hover={false}
              to='/login'
            />
          </Box>
        </Box>

        {/* features section */}
        <Features />

        {/* application section */}
        <Flex
          justifyContent='space-between'
          alignItems='center'
          gap='88px'
          mb='150px'
          className='container'
          sx={{
            '@media (max-width: 966px)': {
              flexDir: 'column',
              gap: '20px',
            },
          }}
        >
          <Box maxW='567px'>
            <Heading
              color='black.1'
              fontSize={{ base: '24px', sm: '32px', desktop: '48px' }}
              lineHeight={{ base: '28.8px', sm: '38.4px', desktop: '57.6px' }}
            >
              Manage your business{' '}
              <Text as='span' color='brand.base'>
                on the go
              </Text>
            </Heading>
            <Text
              color='#171923'
              fontSize={{ base: '14px', desktop: '16px' }}
              mt={{ base: '12px', sm: '20px', desktop: '24px' }}
            >
              Stay informed about important events in your business, in real time.
            </Text>
          </Box>
          <Box
            bg='#F6F7F8'
            minW='625px'
            sx={{
              '@media (max-width: 1150px)': {
                minW: 'fit-content',
                px: '30px',
              },
              '@media (max-width: 1000px)': {
                minW: 'fit-content',
                px: '85px',
              },
            }}
            pt={{ base: '24px', sm: '31px', desktop: '43px' }}
            borderRadius={{ base: '16px', sm: ' 24px', desktop: '32px' }}
            overflow='hidden'
            h={{ base: '328px', sm: '429px', desktop: '586px' }}
            flex={1}
            textAlign='center'
          >
            <Image mx='auto' src={assets.phone} />
          </Box>
        </Flex>

        {/* notification__box */}
        <Box
          mt={16}
          mb='174px'
          className='home__intro bell__box container'
          px={{ base: '32px', sm: '40px', desktop: '64px' }}
          py={{ base: '28px', sm: '118px', desktop: '144px' }}
          rounded={32}
          position='relative'
        >
          <Heading
            color='black.1'
            fontSize={{ base: '24px', sm: '32px', desktop: '48px' }}
            lineHeight={{ base: '28.8px', sm: '38.4px', desktop: '57.6px' }}
          >
            The first 3 days as a{' '}
            <Text as='span' color='brand.base'>
              a gift!
            </Text>
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: '16px', desktop: 'lg' }}
            lineHeight={{ base: '20px', sm: '24px', desktop: '27px' }}
            mt={{ base: '12px ', desktop: '17px' }}
            mb={{ base: '48px', desktop: '51px' }}
            maxW='584px'
            color='black.1'
          >
            3 days free and 30 days for 1 ruble
          </Text>
          <Image className='bell__img' src={assets.bell} />
          <Box textAlign='center' w='fit-content'>
            <ButtonComponent
              text='Get 30 days for 1₽'
              className='gradient-bg'
              color='white'
              size='lg'
              bg='brand.500'
              _hover={false}
              to='/login'
            />
            <Text
              as='span'
              fontSize='16px'
              color='black.5'
              textAlign='center'
              mt='17px'
              display='block'
            >
              then 299 ₽/month.
            </Text>
          </Box>
        </Box>

        <Flex
          justifyContent='space-between'
          alignItems='center'
          gap='88px'
          mb='150px'
          className='container'
          sx={{
            '@media (max-width: 910px)': {
              flexDir: 'column',
              alignItems: 'start',
              gap: '24px',
            },
          }}
          id='support'
        >
          <Box
            // bg='#F6F7F8'
            pt={{ base: '24px', sm: '31px', desktop: '43px' }}
            borderRadius={{ base: '16px', sm: ' 24px', desktop: '32px' }}
            overflow='hidden'
            h={{ base: '328px', sm: '390px', desktop: 'fit-content' }}
            flex={1}
            textAlign='center'
            sx={{
              '@media (max-width: 1000px)': {
                minW: '457px',
              },
              '@media (max-width: 910px)': {
                w: 'full',
                minW: 'fit-content',
              },
            }}
          >
            <Image mx='auto' src={assets.message} />
          </Box>
          <Box maxW='567px'>
            <Heading
              color='black.1'
              fontSize={{ base: '24px', sm: '32px', desktop: '48px' }}
              lineHeight={{ base: '28.8px', sm: '38.4px', desktop: '57.6px' }}
            >
              Responsive{' '}
              <Text as='span' color='brand.base'>
                support
              </Text>
            </Heading>
            <Text
              color='#171923'
              fontSize={{ base: '14px', desktop: '16px' }}
              mt={{ base: '12px', sm: '20px', desktop: '24px' }}
              mb={{ base: '24px', sm: '40px', desktop: '50px' }}
            >
              Fast support in the Telegram chat will help you set up
              your connection to the services.
            </Text>
            <ButtonComponent
              text='Contact support'
              bg='brand.500'
              color='white'
              size='lg'
              icon={assets.whiteTelegram}
              _hover={false}
              to='https://t.me/myalert_support'
            />
          </Box>
        </Flex>

        {/* try it */}
        <Box
          className='container try__it-box'
          color='white'
          rounded={{ base: '20px', sm: '24px', desktop: '32px' }}
          py={{ base: '45px', sm: '149px', desktop: '137px' }}
          pl={{ base: '32px', sm: '40px', desktop: '70px' }}
        >
          <Heading
            fontSize={{ base: '24px', sm: '32px', desktop: '48px' }}
            lineHeight={{ base: '28.8px', sm: '38.4px', desktop: '57.6px' }}
          >
            A whole month for a ruble!
          </Heading>
          <Text
            fontSize={{ base: '14px', desktop: '16px' }}
            mt={{ base: '12px', sm: '20px', desktop: '24px' }}
            mb={{ base: '24px', sm: '40px', desktop: '50px' }}
          >
            3 days free and 30 days for 1 ruble
          </Text>
          <Flex
            gap={6}
            alignItems='center'
            sx={{
              '@media (max-width: 480px)': {
                flexDir: 'column',
                textAlign: 'center',
                alignItems: 'start',
              },
            }}
          >
            <ButtonComponent
              text='Get 30 days for 1₽'
              size='lg'
              to='/login'
            />
            <Text fontSize={{ base: '14px', desktop: '16px' }}>
              then 299 ₽/month.
            </Text>
          </Flex>
          <Image className='try__it-img' src={assets.tryItLogo} />
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Home;
