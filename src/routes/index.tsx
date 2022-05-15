// Vision UI Dashboard React icons
import { BsCaretDownFill } from 'react-icons/bs';
import { IoIosDocument } from 'react-icons/io';
import { IoHome, IoStatsChart } from 'react-icons/io5';

const routes = [
    {
        type: 'collapse',
        name: 'Dashboard',
        key: 'dashboard',
        route: '/dashboard',
        icon: <IoHome size="15px" color="inherit" />,
        component: <></>,
        noCollapse: true,
    },
    {
        type: 'collapse',
        name: 'Retrospective',
        key: 'retrospective',
        route: '/retrospective',
        icon: <IoStatsChart size="15px" color="inherit" />,
        component: <></>,
        noCollapse: true,
    },
    {
        type: 'collapse',
        name: 'Sprint Poker',
        key: 'sprint-poker',
        route: '/sprint-poker',
        icon: <BsCaretDownFill size="15px" color="inherit" />,
        component: <></>,
        noCollapse: true,
    },
    {
        type: 'collapse',
        name: 'Sign In',
        key: 'sign-in',
        route: '/authentication/sign-in',
        icon: <IoIosDocument size="15px" color="inherit" />,
        component: <></>,
        noCollapse: true,
    },
];

export default routes;
