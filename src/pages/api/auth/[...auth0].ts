import auth0 from '@/config/auth0';

export default auth0.handleAuth({
    login: auth0.handleLogin({
        authorizationParams: { redirect_uri: `${process.env.AUTH0_BASE_URL}/api/auth/callback`,  },
    }),
    callback: auth0.handleCallback({ redirectUri: `${process.env.AUTH0_BASE_URL}/page-router` }),
    logout: auth0.handleLogout({ returnTo: `${process.env.AUTH0_BASE_URL}/logout` }),
    
});
