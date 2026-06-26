import React from 'react';
import {
  Box,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { Badge } from '../Badge';
import assets from '../../assets';
import AvitoTabPanel from './Features-parts/AvitoTabPanel';
import SkladTabPanel from './Features-parts/SkladTabPanel';
import WbTabPanel from './Features-parts/WbTabPanel';

const Features = () => {
  return (
    <Box
      className='features'
      mx={{ base: '0', sm: '32px', desktop: 12 }}
      bg='#F6F7F8'
      mb={{ base: '100px', sm: '80px', desktop: '150px' }}
      pt={{ base: '48px', sm: 10, desktop: '150px' }}
      pb={{ base: '48px', sm: '36px', desktop: '160px' }}
      borderRadius={30}
      id='features'
    >
      <Box className='container'>
        <Tabs variant='soft-rounded' size='sm'>
          <TabList>
            <Flex gap='3' bg='#fff' borderRadius={12} p={3} w='fit-content'>
              <Tab _selected={{ bg: 'bg', borderRadius: '13px' }}>
                <Badge
                  bg='transparent'
                  text='Avito'
                  leftIcon={assets.avitoLogo}
                />
              </Tab>
              <Tab
                _selected={{ bg: 'bg', borderRadius: '13px' }}
                isDisabled={true}
              >
                <Badge
                  text='MoySklad'
                  bg='transparent'
                  leftIcon={assets.sladki}
                />
              </Tab>
              <Tab
                _selected={{ bg: 'bg', borderRadius: '13px' }}
                isDisabled={true}
              >
                <Badge
                  text='Wildberries'
                  bg='transparent'
                  leftIcon={assets.WildBerries}
                />
              </Tab>
            </Flex>
          </TabList>

          <TabPanels>
            <TabPanel>
              <AvitoTabPanel />
            </TabPanel>
            <TabPanel>
              <SkladTabPanel />
            </TabPanel>
            <TabPanel>
              <WbTabPanel />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default Features;
