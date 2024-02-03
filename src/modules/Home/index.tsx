import React from 'react';
import styles from './Home.module.css';
import CreatorTable from './CreatorTable';
import Posts from './Posts';

const Home = () => {
    return (
        <div className={styles.home}>
            <div className={styles.home_container}>
                <CreatorTable />
                <Posts />
            </div>
        </div>
    );
};

export default Home;
