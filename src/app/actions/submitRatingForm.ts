'use server';
import { NextResponse } from 'next/server';
import { RatingFormData } from '../types/form';
import { sql } from '@vercel/postgres';
import { User } from '../types/user';

export default async function submitRatingForm(data: FormData) {
  const user: User = { name: 'noot', id: 1 };
  const ratingFormData = {
    artistName: data.get('artistName'),
    eventName: data.get('eventName'),
    rating: Number(data.get('rating')),
    year: Number(data.get('year')),
  } as RatingFormData;

  try {
    const result = await sql`
      INSERT INTO ratings (user_id, artist_name, event_name, year, rating)
      VALUES (${user.id}, ${ratingFormData.artistName}, ${ratingFormData.eventName}, ${ratingFormData.year}, ${ratingFormData.rating})
      RETURNING *;
    `;
    return result;
  } catch (error) {
    return error;
  }
}
