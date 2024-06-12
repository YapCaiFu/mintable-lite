import jwt, { Secret } from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    const token = req.cookies.get('jwt')
    if (!token) return NextResponse.json({ message: 'Invalid credentials' }, { status: 403 });
    try {
      const data = jwt.verify(token?.value, process.env.AUTH_SECRET as Secret);
      return NextResponse.json(data, { status: 200 });
    } catch  (error) {
      console.error(error)
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 403 });
    }
  }
  return NextResponse.json({ message: 'Invalid credentials' }, { status: 403 });
}