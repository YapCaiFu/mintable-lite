import { NextResponse } from "next/server";
import Moralis from 'moralis';
import { RequestMessageEvmOptions } from 'moralis/auth';
import { startServer } from "@/app/lib/utils";

const config = {
  domain: process.env.APP_DOMAIN,
  statement: 'Please sign this message to confirm your identity.',
  uri: process.env.REACT_URL,
  timeout: 60,
};

export async function POST(req: Request) {
  if (req.method === 'POST') {
    await startServer();
    const res = await req.json()
    const { address, chain } = res;

    const message = await Moralis.Auth.requestMessage({
      address,
      chain,
      ...config,
    } as RequestMessageEvmOptions);

    if (message) {
      return NextResponse.json(message, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }
}