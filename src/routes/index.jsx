import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import FavoritesPage from '../pages/FavoritesPage';
import GetAMatchPage from '../pages/GetAMatchPage';
import ProtectedRoute from '../components/ProtectedRoute';
import NotFound from '../pages/NotFoundPage.jsx';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <App />
            </ProtectedRoute>
        ),
        errorElement: <NotFound />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'favorites', element: <FavoritesPage /> },
            { path: 'get-a-match', element: <GetAMatchPage /> },
        ],
    },
]);

export default router;