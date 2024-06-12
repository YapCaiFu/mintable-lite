import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
      cookies().delete('jwt')
      return NextResponse.json({}, { status: 200 });
    } catch {
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }
  return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
}