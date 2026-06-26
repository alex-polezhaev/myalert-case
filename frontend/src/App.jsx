import React from 'react';
import { Route, Routes } from 'react-router-dom';
import router from './router';
import { Flex } from '@chakra-ui/react';
import { DefaultLayout } from './layout/DefaultLayout';
import { Suspense } from 'react';
import { Login, SendCode } from './pages';
import NotFoundPage from './pages/NotFoundPage';
import Home from './pages/Home';
import PrivacyPolicy from './pages/docs/PrivacyPolicy';
import Offer from './pages/docs/Offer';
import TransactionsAgreement from './pages/docs/TransactionsAgreement';
import SubscriptionAgreement from './pages/docs/SubscriptionAgreement';

function App() {
  return (
    <Flex className='app-box' width={'full'}>
      <Routes width='full'>
        <Route index element={<Home />} />
        <Route element={<DefaultLayout />}>
          {router.map((router, index) => {
            const { path, component: Component } = router;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense>
                    <Component />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
        <Route path='/privacy' element={<PrivacyPolicy />} />
        <Route path='/offer' element={<Offer />} />
        <Route
          path='/transactions-agreement'
          element={<TransactionsAgreement />}
        />
        <Route
          path='/subscription-agreement'
          element={<SubscriptionAgreement />}
        />
        <Route path='/login' element={<Login />} />
        <Route path='/login/send-code' element={<SendCode />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Flex>
  );
}

export default App;
