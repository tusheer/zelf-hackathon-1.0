import auth0 from '@/config/auth0';

import { NextApiRequest, NextApiResponse } from 'next';


export default async function signup(req: NextApiRequest, res: NextApiResponse) {
    try {
        await auth0.handleLogin(req, res, {
            authorizationParams: {
                redirect_uri: `${process.env.AUTH0_BASE_URL}/api/auth/callback`,
                screen_hint: 'signup'
            },
        });
    } catch (error: any) {
        res.status(error.status || 500).end(error.message);
    }
}