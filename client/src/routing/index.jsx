import { useRoutes } from 'react-router-dom';

import MainRouting from './MainRouting';
import AuthenticationRoutes from './AuthRouting';

export default function ThemeRoutes() {
    const token = localStorage.getItem('token');
    let routes = [];
    routes = !token ? AuthenticationRoutes : MainRouting;
    return useRoutes(routes);
}