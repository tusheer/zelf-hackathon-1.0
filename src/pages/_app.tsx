import '@/styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import type { AppProps } from 'next/app';

import { Inter } from 'next/font/google';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <main className={inter.className}>
                <Component {...pageProps} />
            </main>
        </UserProvider>
    );
}
