import { IconProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

export interface ChakraProps {
    cookies?: string;
    children: ReactNode;
}

export interface DashboardLayoutProps {
    children?: ReactNode;
    title?: string;
}

export interface AuthenticationLayoutProps {
    children?: ReactNode;
    title?: string;
}

export interface IconPropsExtended extends IconProps {
    size: number;
    style: {};
}

interface AvatarProps {
    name: string;
    src: string;
}

export interface HeaderProps {
    avatar: AvatarProps;
}

export interface IndexProps {
    cookies?: string;
}
