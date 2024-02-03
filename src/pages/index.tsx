
import Navbar from '@/components/Navbar';
import auth0 from '@/config/auth0';


export default function Home() {
    return <div>
      <Navbar />
    </div>;
}

export const getServerSideProps = auth0.withPageAuthRequired();
