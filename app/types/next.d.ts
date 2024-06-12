import { NextApiRequest } from 'next';

declare module 'next' {
  interface NextApiRequest {
    user?: {
      username: string;
    };
  }
}

interface UserAuthData {
  address: string;
  profileId: string;
  signature: string;
}