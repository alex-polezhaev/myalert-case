import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Text,
} from '@chakra-ui/react';

export const NotifyNegativeMood = ({ props }) => {
  const { data, setData } = props;
  const currentStrategyKey = Object.keys(data?.settings)[0];
  const updateStrategySettings = (settingsUpdates) => {
    const strategySettings = data.settings[currentStrategyKey];
    const newData = {
      ...data,
      settings: {
        [currentStrategyKey]: { ...strategySettings, ...settingsUpdates },
      },
    };
    setData(newData);
  };

  const [isBusinessHoursSelected, setBusinessHoursSelected] = useState(true);
  // bh = business hours
  const [bhFrom, setBhFrom] = useState('');
  const [bhTo, setBhTo] = useState('');

  useEffect(() => {
    const rulesData = data.settings[currentStrategyKey];
    setBusinessHoursSelected(rulesData.use_business_hours);
    setBhFrom(rulesData.business_hours[0]);
    setBhTo(rulesData.business_hours[1]);
  });

  return (
    <>
      <FormControl display='flex' gap={3} alignItems='center'>
        <Switch
          id='email-alerts'
          onChange={(e) => {
            const { checked } = e.target;
            updateStrategySettings({ use_business_hours: checked });
            setBusinessHoursSelected(checked);
          }}
          isChecked={isBusinessHoursSelected}
        />
        <FormLabel
          userSelect='none'
          htmlFor='email-alerts'
          color='black.1'
          fontWeight={400}
          fontSize={{ base: 'sm', sm: '16px' }}
          ml='0'
          mb='0'
        >
          Send notifications only during business hours
        </FormLabel>
      </FormControl>
      {isBusinessHoursSelected ? (
        <Box>
          <Text
            mb={1}
            color='black.1'
            fontSize={{ base: 'sm', sm: '15px', desktop: '16px' }}
          >
            Business hours
          </Text>
          <Flex alignItems='center' maxW={{ base: '100%', tablet: '500px' }}>
            <Input
              name='business-hours-from'
              w={{ base: '62px', xs: 'full' }}
              placeholder='10:00'
              size={{ base: 'sm', sm: 'lg' }}
              value={bhFrom}
              onChange={(e) => {
                setBhFrom(e.target.value);
                updateStrategySettings({
                  business_hours: [e.target.value, bhTo],
                });
              }}
            />
            <Box
              w={{ base: 4, sm: '20px' }}
              h='1px'
              bg='#E2E8F0'
              mx={{ base: 2, md: 3 }}
            />
            <Input
              name='business-hours-to'
              w={{ base: '62px', xs: 'full' }}
              placeholder='18:00'
              size={{ base: 'sm', sm: 'lg' }}
              value={bhTo}
              onChange={(e) => {
                setBhTo(e.target.value);
                updateStrategySettings({
                  business_hours: [bhFrom, e.target.value],
                });
              }}
            />
          </Flex>
        </Box>
      ) : null}
    </>
  );
};
