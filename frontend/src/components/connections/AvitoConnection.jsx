import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  useToast,
  Badge,
} from '@chakra-ui/react';
import assets from '../../assets';
import { connectAvitoAcc } from '../../api/accountsApi.js';
import { ButtonComponent } from '../../components';

export const AvitoConnection = () => {
  const toast = useToast();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const { entity: user, isUserLoading } = useSelector((state) => state.user);

  const data = {
    clientId: '',
    clientSecret: '',
  };

  const submit = () => {
    setLoading(true);
    connectAvitoAcc(data)
      .then(() => {
        toast({
          title: 'Account added successfully',
          status: 'success',
          isClosable: true,
          colorScheme: 'green',
        });
        navigate('/accounts');
      })
      .catch((e) => {
        let title = 'Please try again later';

        if (e.response) {
          if (e.response.status === 400) title = 'Invalid data provided';
          if (e.response.status === 409) title = 'Account already exists';
        }
        toast({
          title: title,
          status: 'error',
          isClosable: true,
          colorScheme: 'red',
          duration: 15000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const avitoAuthLink = `https://avito.ru/oauth?response_type=code&client_id=${import.meta.env.VITE_AVITO_CLIENT_ID}&scope=autoload:reports,items:apply_vas,items:info,job:cv,job:applications,job:vacancy,job:write,messenger:read,messenger:write,short_term_rent:read,short_term_rent:write,stats:read,user:read,user_balance:read,user_operations:read&state=${user?._id}`;

  return (
    <Tabs onChange={setActiveTab} index={activeTab} variant='unstyled'>
      <TabList flexWrap='wrap'>
        <Tab>
          <ButtonComponent
            text='Sign in with Avito'
            bg={activeTab === 0 ? '#F55B3D14' : '#F6F7F8'}
            color={activeTab === 0 ? 'black' : '#637381'}
            size='sm'
            _hover={false}
          />
        </Tab>
        <Tab>
          <ButtonComponent
            text='Integration via API key'
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
            <Text fontSize='15px' color='#000000' maxW='325px' mb='24px'>
              To add an account, click the button and complete authorization
              via avito.ru
            </Text>
            <ButtonComponent
              text='Sign in'
              bg='brand.500'
              color='#fff'
              _hover={false}
              to={avitoAuthLink}
              isLoading={isUserLoading}
            />
          </Box>
        </TabPanel>
        <TabPanel>
          <Box>
            <Text fontSize='15px' color='#000000' mb='24px'>
              To add an account, enter the integration keys from your profile
              avito.ru{' '}
              <Link>
                <Badge
                  textTransform='capitalize'
                  color='#F24441'
                  bg='#F55B3D14'
                  borderRadius='8px'
                  fontSize='11px'
                  fontWeight={600}
                  py='4px'
                  px='8px'
                  display='inline-block'
                >
                  How to find?
                </Badge>
              </Link>
            </Text>
            <Input
              placeholder='clientId'
              onChange={(e) => (data.clientId = e.target.value)}
            />
            <Input
              placeholder='clientSecret'
              onChange={(e) => (data.clientSecret = e.target.value)}
              my='10px'
            />
            <ButtonComponent
              colorScheme={'brand'}
              text='Connect'
              width={{ base: 'full', sm: 'fit-content' }}
              icon={assets.saveIcon}
              size={{ base: 'lg', sm: 'md' }}
              to={''}
              color={'white'}
              onClick={submit}
              isLoading={isLoading}
            />
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
