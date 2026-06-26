import React from 'react';
import { NavLink } from 'react-router-dom';
import { Flex, Image, Box, Text } from '@chakra-ui/react';

export const NavigationItem = ({ to, children }) => {
  return <NavLink to={to}>{children}</NavLink>;
};

export const NavigationLink = ({
  to,
  icon,
  text,
  badgeCount,
  activeclass,
  svg,
}) => {
  return (
    <NavigationItem to={to}>
      <Flex
        p={3}
        className={activeclass}
        gap={4}
        justifyContent='space-between'
        alignItems='center'
        borderRadius='lg'
        _hover={{ bg: '#F55B3D14', color: 'brand.base' }}
      >
        <Flex alignItems='center' gap='20px'>
          <Image src={icon} />
          {svg} {/* SVG JSX.Element sifatida o'rnating */}
          <Text fontSize='sm' lineHeight='22px'>
            {text}
          </Text>
        </Flex>
        {badgeCount && (
          <Box
            fontSize='xs'
            lineHeight='20px'
            fontWeight={700}
            py='2px'
            px={2}
            color='brand.base'
            borderRadius='6px'
            bg='#F55B3D29'
          >
            {badgeCount}
          </Box>
        )}
      </Flex>
    </NavigationItem>
  );
};
