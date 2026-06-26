import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { ButtonComponent } from '../../components';

export const TelegramConnection = () => {
  const { entity: user } = useSelector((state) => state.user);
  const { telegram_code: tgCode } = user;
  const [activeTab, setActiveTab] = useState(0);
  const tgLink = `https://t.me/${import.meta.env.VITE_BOT_NAME}?start=${tgCode}`;
  const tgCommand = `/start ${tgCode}`;
  const toast = useToast();

  return (
    <Box>
      <Tabs onChange={setActiveTab} index={activeTab} variant='unstyled'>
        <TabList flexWrap='wrap'>
          <Tab>
            <ButtonComponent
              text='Login by link'
              bg={activeTab === 0 ? '#F55B3D14' : '#F6F7F8'}
              color={activeTab === 0 ? 'black' : '#637381'}
              size='sm'
              _hover={false}
            />
          </Tab>
          <Tab>
            <ButtonComponent
              text='Login by code'
              size='sm'
              _hover={false}
              bg={activeTab === 1 ? '#F55B3D14' : '#F6F7F8'}
              color={activeTab === 1 ? 'black' : '#637381'}
            />
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box>
              <Text
                mb='16px'
                color='#171923'
                fontSize={{ base: 'sm', sm: '15px', desktop: '15px' }}
                fontWeight={600}
              >
                Authorization link
              </Text>
              <Flex
                flexWrap={{ base: 'wrap', desktop: 'nowrap' }}
                gap='8px'
                alignItems='center'
              >
                <Input
                  w={{ base: '100%', tablet: '360px' }}
                  value={tgLink}
                  size={{ base: 'sm', sm: 'lg' }}
                  fontSize='13px'
                  isReadOnly={true}
                />
                <ButtonComponent
                  text='Copy'
                  bg='brand.500'
                  color='#fff'
                  _hover={false}
                  onClick={() => {
                    navigator.clipboard.writeText(tgLink);
                    toast({
                      title: 'Link copied',
                      status: 'success',
                      isClosable: true,
                      colorScheme: 'green',
                    });
                  }}
                />
              </Flex>
              <Text fontSize='15px' color='#000000' mt='24px' maxW='325px'>
                Following the link authorizes the user immediately.
              </Text>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box>
              <Text
                mb='16px'
                color='#171923'
                fontSize={{ base: 'sm', sm: '15px', desktop: '15px' }}
                fontWeight={600}
              >
                Telegram authorization code
              </Text>
              <Flex
                flexWrap={{ base: 'wrap', desktop: 'nowrap' }}
                gap='24px'
                alignItems='center'
              >
                <Text fontSize='16px' fontWeight={600}>
                  {tgCommand}
                </Text>
                <ButtonComponent
                  text='Copy'
                  bg='brand.500'
                  color='#fff'
                  _hover={false}
                  onClick={() => {
                    navigator.clipboard.writeText(tgCommand);
                    toast({
                      title: 'Phrase copied',
                      status: 'success',
                      isClosable: true,
                      colorScheme: 'green',
                    });
                  }}
                />
              </Flex>
              <Text fontSize='15px' color='#000000' mt='24px'>
                To authorize, tell the bot the phrase /start your_code.
                This way you can authorize any user who sends
                the code to the bot.
              </Text>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
