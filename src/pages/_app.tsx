import '@/styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import type { AppProps } from 'next/app';

import { Inter } from 'next/font/google';
import { QueryClient, QueryClientProvider } from 'react-query';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <main className={inter.className}>
                    <Component {...pageProps} />
                </main>
            </UserProvider>
        </QueryClientProvider>
    );
}
