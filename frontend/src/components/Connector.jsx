import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Switch,
  useToast,
} from '@chakra-ui/react';
import { Badge, ButtonComponent } from '.';
import assets from '../assets';
import { services } from '../data/services';
import {
  setConnectorEditState,
  setCurrentConnector,
} from '../redux/slices/connectors';
import { switchActiveConnection } from '../api/connectorsApi';

export const Connector = ({ connector }) => {
  const { active, input_service: input, settings } = connector;
  const [isConnectorActive, setIsConnectorActive] = useState(active);
  const service = services[input];
  const strategyKey = Object.keys(settings)[0];
  const strategyTitle = service.strategies[strategyKey]?.title;
  const dispatch = useDispatch();
  const toast = useToast();
  const outputsCountToShow = 3;
  const textKeys = {
    telegram: 'username',
    avito: 'name',
  };
  return (
    <Box className='card-box'>
      <Flex
        justifyContent='space-between'
        pb='20px'
        alignItems={{ base: 'start', md: 'center' }}
      >
        <Flex alignItems='center' gap={3} flexWrap='wrap'>
          <Heading
            as='h4'
            fontSize={{ base: '16px', desktop: '18px' }}
            fontWeight={600}
            lineHeight={{ base: '19.2px', desktop: '21.6px' }}
            color='#171923'
          >
            {strategyTitle}
          </Heading>
          <ButtonComponent
            icon={assets.penciIcon}
            color='#919EAB'
            size='xs'
            text='Edit'
            to='edit'
            colorScheme={'gray'}
            leftIcon={null}
            onClick={() => {
              dispatch(setCurrentConnector(connector));
              dispatch(setConnectorEditState('editing'));
            }}
          />
        </Flex>
        <FormControl width='fit-content' display='flex' alignItems='center'>
          <FormLabel
            color='black.4'
            fontSize='14px'
            fontWeight={400}
            htmlFor='email-alerts'
            mb='0'
            display={{ base: 'none', md: 'block' }}
          >
            {isConnectorActive ? 'Connected' : 'Disconnected'}
          </FormLabel>
          <Switch
            size='lg'
            isChecked={isConnectorActive}
            id='email-alerts'
            onChange={(e) => {
              const { checked } = e.target;
              setIsConnectorActive(checked);
              const body = {
                inputId: connector._id,
                active: checked,
              };
              switchActiveConnection(body).catch(() => {
                setIsConnectorActive(!checked);
                toast({
                  title: 'An error occurred',
                  description: 'Please try again later',
                  status: 'error',
                  isClosable: true,
                  colorScheme: 'red',
                });
              });
            }}
          />
        </FormControl>
      </Flex>
      <Flex borderTop='1px solid #EEEFF0' pt='20px' gap={2} flexWrap='wrap'>
        {service.createBadge(0)}
        <Image
          display={{ base: 'none', sm: 'block' }}
          mx={{ base: '8px', sm: '24px', desktop: '24px' }}
          src={assets.nextIcon}
        />
        <Image
          display={{ base: 'block', sm: 'none' }}
          mx={{ base: '8px', sm: '24px', desktop: '24px' }}
          src={assets.mediaNextIcon}
        />
        {connector.outputs.map((output, i) => {
          const currentServiceTitle = output.output_service;
          if (i < outputsCountToShow) {
            return (
              <Badge
                color='black.5'
                leftIcon={services[currentServiceTitle].icon}
                text={output.service_data[textKeys[currentServiceTitle]]}
                key={i}
              />
            );
          }
          return null;
        })}
        {connector.outputs.length > outputsCountToShow ? (
          <Badge
            color='brand.base'
            text={`${connector.outputs.length - outputsCountToShow} more`}
          />
        ) : null}
      </Flex>
    </Box>
  );
};
