import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flex, Image, Button, Box } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { SiTelegram } from 'react-icons/si';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import assets from '../assets';
import { ButtonComponent } from './ButtonComponent';

export const HeaderDefault = ({ notFoundBtn }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOpenSidebar = () => {
    const sidebarElement = document.querySelector('.header__btns');
    setOpenSidebar(!openSidebar);
    if (sidebarElement) {
      document.body.classList.toggle('scroll-hidden');
      sidebarElement.classList.toggle('active');
    }
  };

  return (
    <header>
      <Flex
        className='container'
        py={5}
        justifyContent='space-between'
        alignItems='center'
      >
        <Link to='/'>
          <Image
            src={assets.logo}
            width='156px'
            height='46px'
            sx={{
              '@media (max-width: 480px)': {
                w: '124px',
                h: '36px',
              },
            }}
          />
        </Link>

        {notFoundBtn ? (
          <ButtonComponent
            text='Home'
            bg='brand.500'
            _hover={false}
            color='#fff'
            to='/accounts'
          />
        ) : (
          <Flex gap={4} alignItems='center'>
            <Flex className='header__btns' gap={4}>
              <AnchorLink href='#features'>
                <Button>Features</Button>
              </AnchorLink>
              <AnchorLink href='#support'>
                <Button
                  colorScheme='telegram'
                  leftIcon={<SiTelegram />}
                  variant='outline'
                >
                  Support
                </Button>
              </AnchorLink>
            </Flex>
            <ButtonComponent
              text='Sign in'
              bg='brand.500'
              color='#fff'
              _hover={false}
              to='/login'
            />
            <Box width='30px' className='hamburger__menu' h='25px'>
              <HamburgerIcon
                onClick={handleOpenSidebar}
                width={6}
                h={6}
                display={openSidebar ? 'none' : 'block'}
              />
              <CloseIcon
                onClick={handleOpenSidebar}
                display={openSidebar ? 'block' : 'none'}
              />
            </Box>
          </Flex>
        )}
      </Flex>
    </header>
  );
};
