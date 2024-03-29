import {
    AiFillSwitcher,
    AiOutlineAppstoreAdd,
    AiOutlineBarChart,
    AiOutlineFileText,
    AiOutlineVideoCameraAdd,
} from 'react-icons/ai';

export const routes = [
    {
        id: 0,
        name: 'Sprints',
        key: 'sprints',
        path: '/sprints',
        icon: <AiOutlineAppstoreAdd />,
    },
    {
        id: 1,
        name: 'Retrospective',
        key: 'retrospective',
        path: '/retrospective',
        icon: <AiOutlineBarChart />,
    },
    {
        id: 2,
        name: 'Sprint Poker',
        key: 'sprint-poker',
        path: '/sprint-poker',
        icon: <AiFillSwitcher />,
    },
    {
        id: 2,
        name: 'Meet',
        key: 'meet',
        path: '/meet',
        icon: <AiOutlineVideoCameraAdd />,
    },
    {
        id: 2,
        name: 'Notes',
        key: 'notes',
        path: '/notes',
        icon: <AiOutlineFileText />,
    },
];
