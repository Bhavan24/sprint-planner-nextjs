import { routes } from '../routes';

// app constants
export const APP_NAME = 'Sprint Planner';
export const SPRINTS_PAGE_NAME = `${routes[0].name} | ${APP_NAME}`;
export const RETROSPECTIVE_PAGE_NAME = `${routes[1].name} | ${APP_NAME}`;
export const SPRINT_POKER_PAGE_NAME = `${routes[2].name} | ${APP_NAME}`;
export const NOTES_PAGE_NAME = `${routes[3].name} | ${APP_NAME}`;
export const LOGIN_PAGE_NAME = `Login | ${APP_NAME}`;
export const PROFILE_PAGE_NAME = `Profile | ${APP_NAME}`;

// storage constants
export const AUTH_TOKEN = 'authToken';
export const USER_ID = 'userId';
export const USER_PROFILE = 'profile';
export const NOTES = 'notes';
export const WENT_WELL_ITEMS = 'went_well_items';
export const TO_IMRPOVE_ITEMS = 'to_improve_items';
export const ACTION_ITEMS = 'action_items';
export const POKER_PLAYER_GAMES = 'player_games';

// Firebase collections constants
export const FB_DB_GAMES = 'sprint_poker';
export const FB_DB_PLAYERS = 'sprint_players';

// Main page constants
export const BOX_DETAILS = [
    {
        imageUrl: '/static/sprint2.png',
        imageAlt: 'sprint',
        title: 'Sprints',
        content: `A sprint is a short, time-boxed period when a scrum team works to complete
        a set amount of work. Sprints are at the very heart of scrum and agile methodologies,
        and getting sprints right will help your agile team ship better software with fewer headaches.`,
        link: '/sprints',
    },
    {
        imageUrl: '/static/retro1.png',
        imageAlt: 'retro',
        title: 'Retrospective',
        content: `A retrospective is anytime your team reflects on the past to improve the future.
        Between technical and non-technical teams, you can retro on just about anything!
        Right now, we're hosting a public retrospective on agile software development.
        Help define the future of agile by adding some of your ideas to our board.`,
        link: '/retrospective',
    },
    {
        imageUrl: '/static/story.png',
        imageAlt: 'story',
        title: 'Sprint Poker',
        content: `Scrum metrics are specific data points that scrum teams track and use to improve
        efficiency and effectiveness. Scrum teams use metrics to inform decision-making and become more efficient
        in planning and execution, as well as set target goals and improvement plans.`,
        link: '/sprint-poker',
    },
];

// Poker Constants
export const GAME_TYPES = [
    {
        id: 0,
        type: 'FIBONACCI',
        label: 'Fibonacci (0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89)',
        values: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
        displayValues: ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89'],
    },
    {
        id: 1,
        type: 'SHORT_FIBONACCI',
        label: 'Short Fibonacci (0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100)',
        values: [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100],
        displayValues: ['0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100'],
    },
    {
        id: 2,
        type: 'TSHIRT',
        label: 'T-Shirt (XXS, XS, S, M, L, XL, XXL)',
        values: [10, 20, 30, 40, 50, 60, 70],
        displayValues: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
    },
];

export enum GAME_STATUS {
    NOT_STARTED = 'NOT_STARTED',
    STARTED = 'STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    FINISHED = 'FINISHED',
}
