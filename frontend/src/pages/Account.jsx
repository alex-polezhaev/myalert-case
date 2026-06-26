import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Flex,
  Stack,
  Text,
  Skeleton,
  Box,
  Image,
  Heading,
} from '@chakra-ui/react';
import { Header, ButtonComponent } from '../components';
import { RemoveAccountButton } from '../components/removeAccountButton';
import { services } from '../data/services';
import { getAccs } from '../redux/slices/accounts';
import assets from '../assets';
import { SubscriptionModal } from '../components/first-visit-modals/SubscriptionModal';
import { getUser, setAccsModalsState } from '../redux/slices/user';
import { AddAccountModal } from '../components/first-visit-modals/AddAccountModal';

const accConnectDate = (createdAt) => {
  let formatDate = new Date(createdAt).toLocaleString('RU', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  if (formatDate === 'Invalid Date') return 'Connected automatically';
  return `Connected ${formatDate}`;
};

const Account = () => {
  const dispatch = useDispatch();
  const { isUserCreatedRecently, isAccsModalShown } = useSelector(
    (state) => state.user,
  );
  const { entities: accounts, isAccsLoading } = useSelector(
    (state) => state.accounts,
  );
  const [isOpenSubscriptionModal, setIsOpenSubscriptionModal] = useState(false);
  const [isOpenAddAccountModal, setIsOpenAddAccountModal] = useState(false);

  useEffect(() => {
    if (isUserCreatedRecently && !isAccsModalShown) {
      setIsOpenSubscriptionModal(true);
      dispatch(setAccsModalsState(true));
    }
  }, [isUserCreatedRecently, isAccsModalShown]);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAccs());
  }, []);

  const AccountsList = () =>
    accounts?.map((account, index) => {
      const { createBadge } = services[account.service];

      return (
        <Flex
          flexWrap='wrap'
          gap={4}
          flexDirection={{ base: 'column', tablet: 'row' }}
          className='card-box'
          key={index}
          justifyContent='space-between'
        >
          <Flex
            flexDir={{ base: 'column', xs: 'row' }}
            alignItems={{ base: 'start', xs: 'center' }}
            gap={{ base: '20px', desktop: 6 }}
          >
            {createBadge()}
            <Text
              fontSize={{ base: '15px', sm: '16px', desktop: 'lg' }}
              lineHeight='22px'
              fontWeight={600}
            >
              {account.title}
            </Text>
          </Flex>
          <Flex
            justifyContent={{ base: 'space-between', tablet: 'normal' }}
            gap={{ base: '20px', desktop: 6 }}
            alignItems='center'
          >
            <Text
              fontSize={{ base: 'xs', desktop: 'sm' }}
              lineHeight={{ base: '14px', desktop: '17px' }}
              fontWeight={400}
              color='black.4'
            >
              {accConnectDate(account.createdAt)}
            </Text>
            {!account.shared && <RemoveAccountButton account={account} />}
          </Flex>
        </Flex>
      );
    });

  const ZeroAccounts = () => (
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
      <Text margin='12px 0 24px 0'>Add your accounts now!</Text>
      <ButtonComponent
        text='Add'
        _hover={false}
        color='#fff'
        bg='brand.500'
        icon={assets.plus}
        to='/accounts/edit'
      />
    </Box>
  );

  const SkeletLoading = () => (
    <Stack>
      <Skeleton height='85px' borderRadius={14} />
      <Skeleton height='85px' borderRadius={14} my={1} />
      <Skeleton height='85px' borderRadius={14} />
    </Stack>
  );

  const FirstVisitModals = () => (
    <>
      <SubscriptionModal
        isOpen={isOpenSubscriptionModal}
        onClose={() => setIsOpenSubscriptionModal(false)}
        setIsOpenSubscriptionModal={setIsOpenSubscriptionModal}
        setIsOpenAddAccountModal={setIsOpenAddAccountModal}
      />{' '}
      <AddAccountModal
        isOpen={isOpenAddAccountModal}
        onClose={() => setIsOpenAddAccountModal(false)}
        setIsOpenAddAccountModal={setIsOpenAddAccountModal}
      />{' '}
    </>
  );

  return (
    <>
      <Header
        text='My accounts'
        addBtn={{ to: '/accounts/edit' }}
        questionBox={true}
        setModalState={setIsOpenAddAccountModal}
      />
      <Stack spacing={4}>
        {isAccsLoading && <SkeletLoading />}
        {!isAccsLoading && accounts.length !== 0 && <AccountsList />}
        {!isAccsLoading && accounts.length === 0 && <ZeroAccounts />}
      </Stack>
      <FirstVisitModals />
    </>
  );
};

export default Account;
