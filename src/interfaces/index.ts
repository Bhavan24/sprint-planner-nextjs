import { FocusableElement } from '@chakra-ui/utils';
import type { NextComponentType, NextPageContext } from 'next';
import type { NextRouter } from 'next/router';
import { ReactNode, RefObject } from 'react';

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

export interface IndexProps {
    cookies?: string;
}

export interface INewSession {
    name: string;
    gameType: string;
    userName: string;
    userId: string;
    createdAt: Date;
    sprintId: string;
    isSpectator: boolean;
}

export interface IPlayer {
    name: string;
    id: string;
    status: string;
    isSpectator: boolean;
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
    sprintId: string;
    issueId?: string;
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
    isAdmin: boolean;
}

export interface IPokerPlayersProps {
    game: IGame;
    players: IPlayer[];
    currentPlayerId: string;
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

export interface IRetroDetails {
    went_well: string;
    to_improve: string;
    action_items: string;
}

export interface INewRetroItemProps {
    name: string;
    title: string;
    desc: string;
    refresh: boolean;
}

export interface ISaveSprintBoxProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    initialRef: RefObject<FocusableElement>;
    finalRef: RefObject<FocusableElement>;
    title: string;
    body?: string;
}

export interface ISavePokerSprintBoxProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    initialRef: RefObject<FocusableElement>;
    finalRef: RefObject<FocusableElement>;
    title: string;
    body?: string;
    game: IGame;
}

export interface ISSettingsPokerControllerSprintBoxProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    title: string;
    body?: string;
    gameId: string;
}

export interface IEditSprintBoxProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    initialRef: RefObject<FocusableElement>;
    finalRef: RefObject<FocusableElement>;
    title: string;
    body?: string;
    sprint: ISprintColData;
}

export interface ISprintColData {
    id?: string;
    name: string;
    createdById: string;
    progress: {
        open: number;
        reopen: number;
        inprogress: number;
        prcreated: number;
        prmerged: number;
        inverification: number;
        resolved: number;
    };
    retro: {
        went_well: string[];
        to_improve: string[];
        action_items: string[];
    };
    poker?: ISprintPokerColData[];
}

export interface ISprintPokerColData {
    title: string;
    desc: string;
    link: string;
    assignee: string;
    points: number;
}

export interface ISprintDetailsBoxProps {
    link: string;
    title: string;
    content?: {
        open: number;
        reopen: number;
        inprogress: number;
        prcreated: number;
        prmerged: number;
        inverification: number;
        resolved: number;
    };
}

export interface ISprintDetailsItemProps {
    data: ISprintColData;
}

export interface ISprintEngineerPointsProps {
    sprintId: string;
}

export interface IAssigneeDetails {
    name: string;
    point: number;
}

export interface ICommonUser {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
}

export interface IJiraIssue {
    issueKey: string;
    priority: string;
    summary: string;
    description: string;
}