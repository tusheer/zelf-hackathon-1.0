import React, { useState } from 'react';
import styles from './Login.module.css';
import Link from 'next/link';
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/router';

const Login = () => {
    const [brand, setBrand] = useState(false);

    const router = useRouter();

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!brand) {
            return toast.error('Please select the brand option to continue.');
        }

        router.push('/api/auth/signup');
    };

    return (
        <form onSubmit={handleOnSubmit}>
            <div className={styles.login}>
                <Toaster />
                <div className={styles.login_conainer}>
                    <div className={styles.login_left_side}>
                        <div className={styles.login_left_content}>
                            <div>
                                <img style={{ width: '144px' }} className='' src='/assets/images/login-content.svg' alt='zelf software' />
                            </div>
                            <img className='' src='/assets/images/mobileexample.svg' alt='zelf software' />
                        </div>
                    </div>

                    <div className={styles.login_right_side}>
                        <div className={styles.login_right_content}>
                            <div>
                                <h1>Register Your Account</h1>
                                <div className={styles.radio_button}>
                                    <label htmlFor='brand'>
                                        <input checked={brand} onChange={(e) => setBrand(e.currentTarget.checked)} type='checkbox' name='brand' />
                                        <span className={styles.checkmark}>
                                            <span></span>
                                        </span>
                                        I Represent a Brand
                                    </label>
                                </div>

                                <button type='submit'>Continue</button>
                                <div className={styles.siginlink}>
                                    Already a member?
                                    <Link href='/api/auth/signup'>Sign In</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Login;
