import styles from './Home.module.css';
import PostCard from './PostCard';

const Posts = () => {
    return (
        <div className={styles.post}>
            <h1>
                All posts
                <span>(1,240 total posts)</span>
            </h1>
            <div className={styles.post_container}>
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
            </div>
        </div>
    );
};

export default Posts;
