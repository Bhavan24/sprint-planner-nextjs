import { MouseEventHandler } from 'react';

interface AvatarProps {
    name: string;
    src: string;
}

export interface HeaderProps {
    avatar: AvatarProps;
    logOut: MouseEventHandler<HTMLButtonElement>;
}
