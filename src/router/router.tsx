import { createBrowserRouter } from 'react-router-dom';
import App from '../App.tsx';
import SignIn from '../Pages/Sign-In/Sign-in.tsx';
import SignUp from '../Pages/Sign-Up/Sign-up.tsx';
import History from '../Pages/History/History.tsx';
import Favorites from '../Pages/Favorites/Favorites.tsx';
import Search from '../Pages/Search/Search.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'sign-in', element: <SignIn /> },
      { path: 'sign-up', element: <SignUp /> },
      { path: 'history', element: <History /> },
      { path: 'favorites', element: <Favorites /> },
      { path: 'search', element: <Search /> },
    ],
  },
]);
