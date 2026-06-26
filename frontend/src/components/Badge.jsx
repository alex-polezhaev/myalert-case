import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';

export const Badge = ({
  text,
  leftIcon,
  rightIcon,
  color,
  display,
  bg,
  ...rest
}) => {
  return (
    <Flex
      {...rest}
      borderRadius='xl'
      bg={bg ? bg : 'bg'}
      alignItems='center'
      gap={1}
      py={2}
      display={display}
    >
      {leftIcon && <Image w={4} src={leftIcon} />}
      <Text
        color={color ? color : '#171923'}
        fontSize={{ base: 'sm', desktop: '16px' }}
        lineHeight='19.2px'
        fontWeight={500}
      >
        {text}
      </Text>
      {rightIcon && <Image src={rightIcon} />}
    </Flex>
  );
};
