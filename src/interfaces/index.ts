import { IconProps } from '@chakra-ui/react';
import { MouseEventHandler, ReactNode } from 'react';

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
    logOut: MouseEventHandler<HTMLButtonElement>;
}

export interface IndexProps {
    cookies?: string;
}

export interface SprintDetailsProps {
    id: string;
    isNew: boolean;
    imageUrl: string;
    imageAlt: string;
    beds: number;
    baths: number;
    title: string;
    formattedPrice: string;
    reviewCount: number;
    rating: number;
    description: string;
}
