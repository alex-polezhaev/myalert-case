import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import assets from '../assets';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setConnectorEditState } from '../redux/slices/connectors';
import { ButtonComponent } from './ButtonComponent';
import { GrCircleQuestion } from 'react-icons/gr';

export const Header = ({ text, addBtn, questionBox, setModalState }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const handleOpenSidebar = () => {
    const sidebarElement = document.querySelector('.left-sidebar');
    setOpenSidebar(!openSidebar);
    if (sidebarElement) {
      document.body.classList.toggle('scroll-hidden');
      sidebarElement.classList.toggle('active');
    }
  };
  useEffect(() => {
    setOpenSidebar(false);
    const sidebarElement = document.querySelector('.left-sidebar');

    if (sidebarElement) {
      document.body.classList.remove('scroll-hidden');
      sidebarElement.classList.remove('active');
    }
  }, [location]);

  return (
    <header>
      <Box
        display={{ base: 'flex', sm: 'none' }}
        justifyContent='space-between'
        alignItems='center'
        className='header-top'
        py='10px'
        px='20px'
        mt='-20px'
        mx='-20px'
        position='relative'
        zIndex={101}
        mb={6}
        bg={openSidebar ? 'white' : 'transparent'}
      >
        <Image src={assets.logo} w='100px' h='30px' />
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

      <Flex
        justifyContent='space-between'
        alignItems='center'
        mb={{ base: '20px', sm: 6, desktop: '37px' }}
      >
        <Flex w='full' gap='16px' alignItems='center'>
          <Heading className='page-title'>{text}</Heading>
          {questionBox ? (
            <IconButton
              variant={'outline'}
              borderWidth={1.5}
              borderColor={'#F55B3D'}
              color={'#F55B3D'}
              size={'sm'}
              icon={<GrCircleQuestion size={'18px'} />}
              onClick={() => setModalState(true)}
            />
          ) : null}
        </Flex>
        {addBtn ? (
          <Link to={addBtn.to}>
            <Button
              leftIcon={<AddIcon />}
              colorScheme={'brand'}
              size={{ base: 'xs', md: 'sm', desktop: 'md' }}
              onClick={() => {
                dispatch(setConnectorEditState('addition'));
              }}
            >
              Add
            </Button>
          </Link>
        ) : null}
      </Flex>
    </header>
  );
};
