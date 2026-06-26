import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { MultiSelect } from 'react-multi-select-component';
import { services } from '../../data/services';

const OutputsChoice = ({
  data,
  setData,
  selected,
  setSelected,
  createOutputOptions,
}) => {
  const { loading: combinLoading } = useSelector((state) => state.combinations);

  return (
    <Box>
      <Flex gap={2} alignItems='center'>
        <Flex
          fontSize={{ base: 'sm', sm: '15px', desktop: '16px' }}
          borderRadius='50%'
          w={6}
          h={6}
          color='white'
          justifyContent='center'
          alignItems='center'
          bg='brand.base'
        >
          4
        </Flex>
        <Heading
          as='h5'
          fontSize={{ base: 'sm', sm: '15px', desktop: '16px' }}
          color='black.1'
          fontWeight={500}
          lineHeight='22px'
        >
          Accounts to receive notifications
        </Heading>
      </Flex>
      <Stack
        pt={{ base: 3, sm: 4 }}
        pb={{ base: 4, sm: 6, desktop: 6 }}
        spacing={4}
        className='line-box'
        pl={8}
        mt={2}
      >
        <Box w={500}>
          <MultiSelect
            className='multi-select'
            disableSearch
            options={createOutputOptions(selected.map((el) => el.id))}
            isLoading={combinLoading}
            value={selected}
            onChange={(e) => {
              const selectedOutputIds = e.map((output) => output.id);
              setData({
                ...data,
                outputs: [...selectedOutputIds],
              });
              setSelected(e);
            }}
            closeOnChangedValue={true}
            hasSelectAll={false}
            overrideStrings={{
              allItemsAreSelected: 'All accounts selected',
              clearSearch: 'Clear search',
              clearSelected: 'Clear selected',
              noOptions: 'No accounts',
              search: 'Search',
              selectAll: 'Select all',
              selectAllFiltered: 'Select all (filtered)',
              selectSomeItems: 'Select...',
              create: 'Create',
            }}
            valueRenderer={(selectedOutputs) => {
              return selectedOutputs.length ? (
                selectedOutputs.map((service, i) => {
                  return (
                    <Flex key={i} h={10} alignItems='center'>
                      <img
                        src={services[service.service].icon}
                        width={14}
                        height={24}
                      />
                      <Text ml={2}>{service.label}</Text>
                    </Flex>
                  );
                })
              ) : (
                <Flex h={10} alignItems='center'>
                  Choose accounts
                </Flex>
              );
            }}
            ItemRenderer={({ option, onClick, disabled }) => (
              <div className={`item-renderer ${disabled ? 'disabled' : ''}`}>
                <input
                  type='image'
                  src={services[option.service].icon}
                  onClick={onClick}
                  tabIndex={-1}
                  disabled={disabled}
                />
                <span>{option.label}</span>
              </div>
            )}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default OutputsChoice;
