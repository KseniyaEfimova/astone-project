import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App.tsx';
import PrivateRoute from './private-route.tsx';

const SignIn = lazy(() => import('../Pages/Sign-In/Sign-in.tsx'));
const SignUp = lazy(() => import('../Pages/Sign-Up/Sign-up.tsx'));
const History = lazy(() => import('../Pages/History/History.tsx'));
const Favorites = lazy(() => import('../Pages/Favorites/Favorites.tsx'));
const HomePage = lazy(() => import('../Pages/Home/Home.tsx'));
const CharCard = lazy(() => import('../Components/Char-card/Char-card.tsx'));
const SearchPage = lazy(() => import('../Pages/Search/Search.tsx'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'sign-in', element: <SignIn /> },
      { path: 'sign-up', element: <SignUp /> },
      { path: 'character/:id', element: <CharCard /> },
      { path: 'search', element: <SearchPage /> },
      {
        element: <PrivateRoute />,
        children: [
          { path: 'history', element: <History /> },
          { path: 'favorites', element: <Favorites /> },
        ],
      },
    ],
  },
]);
