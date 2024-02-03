import React from 'react';
import styles from './Navbar.module.css';
import { ZelfColorLogo, ZelfLogo } from '../ZelfLogo';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

const Navbar = () => {
    const { user } = useUser();
    return (
        <nav className={styles.nav__contianer}>
            <div className={styles.nav}>
                {user ? <ZelfColorLogo /> : <ZelfLogo />}

                {user ? (
                    <div className={styles.nav__user}>
                        <img src='/assets/images/dummy-user.svg' alt='user' />
                    </div>
                ) : (
                    <ul className={styles.nav__links}>
                        <li>
                            <Link href='/api/auth/login'>
                                <button className={styles.nav_links_login}>Sign In</button>
                            </Link>
                        </li>
                        <li>
                            <Link href='/api/auth/signup'>
                                <button className={styles.nav_links_signup}>Join</button>
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
