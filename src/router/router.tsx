import { createBrowserRouter } from 'react-router-dom';
import App from '../App.tsx';
import SignIn from '../Pages/Sign-In/Sign-in.tsx';
import SignUp from '../Pages/Sign-Up/Sign-up.tsx';
import History from '../Pages/History/History.tsx';
import Favorites from '../Pages/Favorites/Favorites.tsx';
import PrivateRoute from './private-route.tsx';
import HomePage from '../Pages/Home/Home.tsx';
import CharCard from '../Components/Char-card/Char-card.tsx';
import SearchPage from '../Pages/Search/Search.tsx';

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
