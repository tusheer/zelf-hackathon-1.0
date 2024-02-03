import Navbar from '@/components/Navbar';
import auth0 from '@/config/auth0';
import Home from '@/modules/Home';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function HomePage() {
    const { user, isLoading } = useUser();
    const router = useRouter();
    // I am aware that handling authentication on the client side is not the best method, but I am short on time and unable to implement it on the server right now. I have attempted it, but it's not working as expected. If I had more time, I could implement this properly.
    useEffect(() => {
        if (!user && !isLoading) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    if (!user) return null;

    return (
        <main>
            <Navbar />
            <Home />
        </main>
    );
}
