import { lazy } from 'react';
const Account = lazy(() => import('../pages/Account'));
const Connectors = lazy(() => import('../pages/Connectors'));
const ConnectorEdit = lazy(() => import('../pages/ConnectorEdit'));
const AccountEdit = lazy(() => import('../pages/AccountEdit'));
const Home = lazy(() => import('../pages/Home'));
const Subscription = lazy(() => import('../pages/Subscription'));

const coreRoutes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/accounts',
    title: 'Text',
    component: Account,
  },
  {
    path: '/connectors',
    title: 'Text',
    component: Connectors,
  },
  {
    path: 'accounts/edit',
    title: 'Text',
    component: AccountEdit,
  },
  {
    path: 'connectors/edit',
    component: ConnectorEdit,
  },
  {
    path: '/subscription',
    component: Subscription,
  },
];
const router = [...coreRoutes];
export default router;
