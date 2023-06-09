import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { lazy } from 'react';
import { MainLayout } from '@/layouts/';

const LazyListGroupsPage = lazy(
  () => import('@/pages/ListGroupsPage/ListGroupsPage'),
);
const LazyProfilePage = lazy(() => import('@/pages/ProfilePage/ProfilePage'));
const LazyGroupDonationsPage = lazy(
  () => import('@/pages/GroupDonationsPage/GroupDonationsPage'),
);
const LazyTermsAndConditionsPage = lazy(
  () => import('@/pages/TermsAndConditionsPage/TermsAndConditionsPage'),
);

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <LazyListGroupsPage />,
      },
      { path: 'profile', element: <LazyProfilePage /> },
      { path: 'group/:token', element: <LazyGroupDonationsPage /> },
      {
        path: '/terms-and-conditions',
        element: <LazyTermsAndConditionsPage />,
      },
    ],
  },

  {
    path: '/*',
    element: <Navigate to='/' replace />,
  },
];

const privateRouter = createBrowserRouter(routes);

export default function PrivateRouterProvider() {
  return <RouterProvider router={privateRouter} />;
}
