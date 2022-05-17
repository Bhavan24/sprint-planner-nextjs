import { AppRenderProps } from '../interfaces';

export default function App({ Component, pageProps }: AppRenderProps) {
    return <Component {...pageProps} />;
}
