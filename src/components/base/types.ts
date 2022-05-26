import { ReactNode } from 'react';

export interface BasePageProps {
    cookies?: string;
    children?: ReactNode;
    title: string;
}
