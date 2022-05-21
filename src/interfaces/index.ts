import { IconProps } from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import type { NextComponentType, NextPageContext } from 'next';
import type { NextRouter } from 'next/router';
import { MouseEventHandler, ReactNode, RefObject } from 'react';

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
    userName: string;
    userId: string;
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

export interface ICardPickerProps {
    game: IGame;
    players: IPlayer[];
    currentPlayerId: string;
}

export interface IPokerControllerProps {
    game: IGame;
    currentPlayerId: string;
}

export interface IPlayerCardProps {
    game: IGame;
    player: IPlayer;
}

export interface IPokerPlayersProps {
    game: IGame;
    players: IPlayer[];
}

export interface ICardConfig {
    value: number;
    displayValue: string;
}

export interface IRetrospectiveData {
    went_well: string[];
    to_improve: string[];
    action_items: string[];
}

export interface INewRetroItemProps {
    name: string;
    title: string;
    desc: string;
    refresh: boolean;
}

export interface INotesEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export interface IAlertBoxProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    cancelRef: RefObject<FocusableElement>;
    onAction: MouseEventHandler<HTMLButtonElement>;
    btnText: string;
    btnColor: string;
    title: string;
    body?: string;
}
