import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Skeleton, Text, Box, Image, Heading } from '@chakra-ui/react';
import { Header, Connector, ButtonComponent } from '../components';
import {
  getConnectors,
  setConnectorEditState,
} from '../redux/slices/connectors';
import assets from '../assets';
import { ConnectorQuestionModal } from '../components/first-visit-modals/ConnectorQuestionModal';
import { getUser, setConnectorsModalsState } from '../redux/slices/user';

const Connectors = () => {
  const dispatch = useDispatch();
  const { isUserCreatedRecently, isConnectorsModalShown } = useSelector(
    (state) => state.user,
  );
  const { entities: connectors, isConnectorsLoading } = useSelector(
    (state) => state.connectors,
  );
  const [isOpenConnectorQuestionModal, setIsOpenConnectorQuestionModal] =
    useState(false);

  useEffect(() => {
    if (isUserCreatedRecently && !isConnectorsModalShown) {
      setIsOpenConnectorQuestionModal(true);
      dispatch(setConnectorsModalsState(true));
    }
  }, [isUserCreatedRecently, isConnectorsModalShown]);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getConnectors());
  }, []);

  const ConnectorsList = () =>
    connectors.map((connector, i) => (
      <Connector key={i} connector={connector} />
    ));
  const ZeroConnectors = () => (
    <Box
      textAlign='center'
      bg='#fff'
      borderRadius='12px'
      p='40px 24px 40px 24px'
      display='flex'
      flexDir='column'
      alignItems='center'
    >
      <Image src={assets.addFolter} mb='38px' />
      <Heading fontSize={'24px'}>Nothing here yet</Heading>
      <Text margin='12px 0 24px 0'>Create your first connector!</Text>
      <ButtonComponent
        text='Add'
        _hover={false}
        color='#fff'
        bg='brand.500'
        icon={assets.plus}
        to='/connectors/edit'
        onClick={() => {
          dispatch(setConnectorEditState('addition'));
        }}
      />
    </Box>
  );

  const SkeletLoading = () => (
    <Stack>
      <Skeleton height='130px' borderRadius={12} />
      <Skeleton height='130px' borderRadius={12} my={1} />
      <Skeleton height='130px' borderRadius={12} />
    </Stack>
  );

  return (
    <>
      <Header
        text='Connectors'
        addBtn={{ to: '/connectors/edit' }}
        questionBox={true}
        setModalState={setIsOpenConnectorQuestionModal}
      />
      <Stack spacing={{ base: 3, desktop: 4 }}>
        {isConnectorsLoading && <SkeletLoading />}
        {!isConnectorsLoading && connectors.length !== 0 && <ConnectorsList />}
        {!isConnectorsLoading && connectors.length === 0 && <ZeroConnectors />}
      </Stack>
      <ConnectorQuestionModal
        isOpen={isOpenConnectorQuestionModal}
        onClose={() => setIsOpenConnectorQuestionModal(false)}
        setIsOpenConnectorQuestionModal={setIsOpenConnectorQuestionModal}
      />
    </>
  );
};

export default Connectors;
