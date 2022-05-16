import { routes } from '../routes';

// app constants
export const APP_NAME = 'Sprint Planner';
export const SPRINTS_PAGE_NAME = `${routes[0].name} | ${APP_NAME}`;
export const RETROSPECTIVE_PAGE_NAME = `${routes[1].name} | ${APP_NAME}`;
export const SPRINT_POKER_PAGE_NAME = `${routes[2].name} | ${APP_NAME}`;
export const LOGIN_PAGE_NAME = `Login | ${APP_NAME}`;
export const PROFILE_PAGE_NAME = `Profile | ${APP_NAME}`;

// storage constants
export const AUTH_TOKEN = 'authToken';
export const USER_ID = 'userId';
export const USER_PROFILE = 'profile';
export const TODOS = 'todos';
export const WENT_WELL_ITEMS = 'went_well_items';
export const TO_IMRPOVE_ITEMS = 'to_improve_items';
export const ACTION_ITEMS = 'action_items';
