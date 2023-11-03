import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const result = await sql`
      CREATE TABLE IF NOT EXISTS ratings (
        rating_id serial PRIMARY KEY,
        user_id integer REFERENCES users(user_id) NOT NULL,
        artist_name text NOT NULL,
        event_name text NOT NULL,
        year integer NOT NULL,
        rating numeric(3,1) CHECK (rating >= 0.0 AND rating <= 10.0) NOT NULL
      );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
