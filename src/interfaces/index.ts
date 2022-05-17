import { IconProps } from '@chakra-ui/react';
import type { NextComponentType, NextPageContext } from 'next';
import type { NextRouter } from 'next/router';
import { MouseEventHandler, ReactNode } from 'react';

export interface AppRenderProps {
    pageProps: object;
    err?: Error;
    Component: NextComponentType<NextPageContext, AppRenderProps, object>;
    router: NextRouter;
}

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

export interface BasePageProps {
    cookies?: string;
    children?: ReactNode;
    title: string;
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

export interface INewSession {
    name: string;
    gameType: string;
    createdBy: string;
    createdAt: Date;
}

export interface IPlayer {
    name: string;
    id: string;
    status: string;
    value?: number;
    emoji?: string;
}

export interface IPlayerGame {
    gameId: string;
    playerId: string;
}

export interface IGame {
    id: string;
    name: string;
    average: number;
    gameStatus: string;
    gameType?: string;
    createdBy: string;
    createdById: string;
    createdAt: Date;
    updatedAt?: Date;
}
