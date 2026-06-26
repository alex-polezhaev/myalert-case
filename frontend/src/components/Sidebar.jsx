import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import assets from '../assets';
import { useLocation } from 'react-router-dom';
import { ButtonComponent, NavigationLink } from '.';
import { LogoutButton } from './LogoutButton';

export default function Sidebar() {
  const { entities: connectors } = useSelector((state) => state.connectors);
  const location = useLocation();

  return (
    <Box className='left-sidebar'>
      <Flex
        className='left-sidebar__box'
        justifyContent='space-between'
        flexDirection='column'
        bg='white'
        py='24px'
        px={4}
        minW={{ base: '280px', sm: '250px', md: '280px', desktop: '280px' }}
        maxW={{ base: '280px', sm: '250px', md: '280px', desktop: '280px' }}
        minH={{ base: 'auto', sm: '100vh' }}
        h={{ base: 'calc(100% - 50px)', sm: 'full' }}
        position={{ base: 'fixed', sm: 'initial' }}
      >
        <Box>
          <Link to='/accounts'>
            <Image
              mb={8}
              mx='auto'
              src={assets.logo}
              maxW={{ base: '100px', sm: '184px' }}
              height={{ base: '30px', sm: '54px' }}
              display={{ base: 'none', sm: 'block' }}
            />
          </Link>
          <Stack spacing={1}>
            <NavigationLink
              to='/accounts'
              text='My accounts'
              activeclass={`${
                location.pathname === '/' ||
                location.pathname === '/accounts' ||
                location.pathname === '/accounts/edit'
                  ? 'active'
                  : ''
              } sidebar-nav-link`}
              icon={''}
              svg={
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    opacity='0.5'
                    d='M2 6.5C2 4.379 2 3.318 2.659 2.659C3.318 2 4.379 2 6.5 2C8.621 2 9.682 2 10.341 2.659C11 3.318 11 4.379 11 6.5C11 8.621 11 9.682 10.341 10.341C9.682 11 8.621 11 6.5 11C4.379 11 3.318 11 2.659 10.341C2 9.682 2 8.621 2 6.5ZM13 17.5C13 15.379 13 14.318 13.659 13.659C14.318 13 15.379 13 17.5 13C19.621 13 20.682 13 21.341 13.659C22 14.318 22 15.379 22 17.5C22 19.621 22 20.682 21.341 21.341C20.682 22 19.621 22 17.5 22C15.379 22 14.318 22 13.659 21.341C13 20.682 13 19.621 13 17.5Z'
                    fill='#637381'
                  />
                  <path
                    d='M2 17.5C2 15.379 2 14.318 2.659 13.659C3.318 13 4.379 13 6.5 13C8.621 13 9.682 13 10.341 13.659C11 14.318 11 15.379 11 17.5C11 19.621 11 20.682 10.341 21.341C9.682 22 8.621 22 6.5 22C4.379 22 3.318 22 2.659 21.341C2 20.682 2 19.621 2 17.5ZM13 6.5C13 4.379 13 3.318 13.659 2.659C14.318 2 15.379 2 17.5 2C19.621 2 20.682 2 21.341 2.659C22 3.318 22 4.379 22 6.5C22 8.621 22 9.682 21.341 10.341C20.682 11 19.621 11 17.5 11C15.379 11 14.318 11 13.659 10.341C13 9.682 13 8.621 13 6.5Z'
                    fill='#637381'
                  />
                </svg>
              }
            />
            <NavigationLink
              to='/connectors'
              svg={
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M8.352 20.242C8.78715 20.7922 9.34165 21.2364 9.97361 21.541C10.6056 21.8455 11.2985 22.0025 12 22C12.7015 22.0025 13.3944 21.8455 14.0264 21.541C14.6584 21.2364 15.2129 20.7922 15.648 20.242C13.2271 20.5702 10.7729 20.5702 8.352 20.242ZM18.75 9V9.704C18.75 10.549 18.99 11.375 19.442 12.078L20.55 13.801C21.561 15.375 20.789 17.514 19.03 18.011C14.4338 19.313 9.56625 19.313 4.97 18.011C3.211 17.514 2.439 15.375 3.45 13.801L4.558 12.078C5.01157 11.3694 5.25211 10.5454 5.251 9.704V9C5.251 5.134 8.273 2 12 2C15.727 2 18.75 5.134 18.75 9Z'
                    fill='#637381'
                  />
                </svg>
              }
              text='Connectors'
              badgeCount={connectors.length === 0 ? null : connectors.length}
              activeclass={`${
                location.pathname === '/connectors' ||
                location.pathname === '/connectors/edit'
                  ? 'active'
                  : ''
              } sidebar-nav-link`}
              icon={''}
            />
            <NavigationLink
              to='/subscription'
              svg={
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M5.75 7C5.55109 7 5.36032 7.07902 5.21967 7.21967C5.07902 7.36032 5 7.55109 5 7.75C5 7.94891 5.07902 8.13968 5.21967 8.28033C5.36032 8.42098 5.55109 8.5 5.75 8.5H9.75C9.94891 8.5 10.1397 8.42098 10.2803 8.28033C10.421 8.13968 10.5 7.94891 10.5 7.75C10.5 7.55109 10.421 7.36032 10.2803 7.21967C10.1397 7.07902 9.94891 7 9.75 7H5.75Z'
                    fill='#637381'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M21.188 8.004C21.126 8 21.058 8 20.988 8H18.215C15.944 8 14 9.736 14 12C14 14.264 15.944 16 18.215 16H20.988C21.058 16 21.126 16 21.188 15.996C22.111 15.94 22.927 15.239 22.996 14.259C23 14.195 23 14.126 23 14.062V9.938C23 9.874 23 9.805 22.996 9.741C22.927 8.761 22.111 8.061 21.188 8.004ZM17.971 13.067C18.555 13.067 19.029 12.589 19.029 12C19.029 11.41 18.555 10.933 17.971 10.933C17.386 10.933 16.911 11.411 16.911 12C16.911 12.59 17.386 13.067 17.971 13.067Z'
                    fill='#637381'
                  />
                  <path
                    opacity='0.5'
                    d='M21.14 8.002C21.14 6.821 21.096 5.554 20.342 4.647C20.2683 4.55815 20.1905 4.47272 20.109 4.391C19.36 3.643 18.411 3.311 17.239 3.153C16.099 3 14.644 3 12.806 3H10.694C8.856 3 7.4 3 6.26 3.153C5.088 3.311 4.139 3.643 3.39 4.391C2.642 5.14 2.31 6.089 2.152 7.261C2 8.401 2 9.856 2 11.694V11.806C2 13.644 2 15.1 2.153 16.239C2.311 17.411 2.643 18.36 3.391 19.109C4.14 19.857 5.089 20.189 6.261 20.347C7.401 20.5 8.856 20.5 10.694 20.5H12.806C14.644 20.5 16.1 20.5 17.239 20.347C18.411 20.189 19.36 19.857 20.109 19.109C20.3082 18.9092 20.4846 18.6878 20.635 18.449C21.085 17.729 21.139 16.847 21.139 15.999L20.989 16H18.215C15.944 16 14 14.264 14 12C14 9.736 15.944 8 18.215 8H20.988C21.04 8 21.092 8 21.14 8.002Z'
                    fill='#637381'
                  />
                </svg>
              }
              text='Subscription'
              activeclass={`${
                location.pathname === '/subscription' ? 'active' : ''
              } sidebar-nav-link`}
              icon={''}
            />
          </Stack>
        </Box>

        <Box>
          <Box
            bg={'bg'}
            textAlign='center'
            pt='20px'
            pb={3}
            px='20px'
            borderRadius='xl'
            mb={6}
          >
            <Box
              bg='white'
              py={3}
              px='9px'
              width='fit-content'
              borderRadius='10px'
              mx='auto'
              mb={3}
            >
              <Image src={assets.telegramIcon} />
            </Box>
            <Heading color='black.1' mb={1} fontSize='16px' lineHeight={6}>
              Need help?
            </Heading>
            <Text color='black.5' fontSize='sm' lineHeight='20px' mb='20px'>
              Message us on Telegram and we will help!
            </Text>
            <ButtonComponent
              size='sm'
              text='Message us'
              width='full'
              colorScheme='brand'
              leftIcon={null}
              color={'white'}
              to='https://t.me/myalert_support'
              target={'blanc'}
            />
          </Box>
          <LogoutButton />
        </Box>
      </Flex>
    </Box>
  );
}
