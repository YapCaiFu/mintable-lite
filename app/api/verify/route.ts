'use server'
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";
import Moralis from 'moralis';
import { cookies } from 'next/headers';
import { startServer } from '@/app/lib/utils';

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      await startServer();
      const res = await req.json()
      const { message, signature } = res;

      const { address, profileId } = (
        await Moralis.Auth.verify({
          message,
          signature,
          networkType: 'evm',
        })
      ).raw;

      const user = { address, profileId, signature };

      // create JWT token
      const token = jwt.sign(user, process.env.AUTH_SECRET as string);

      // set JWT cookie
      cookies().set('jwt', token, { secure: true })
      return NextResponse.json({ token }, { status: 200 });
    } catch (error) {
      console.error(error)
      return NextResponse.json({ message: `${error}` }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }
}