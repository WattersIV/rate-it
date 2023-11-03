import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const username = 'noot';
  try {
    const result = await sql`
    INSERT INTO users (username)
    VALUES (${username})
    RETURNING *;
  `;
    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
