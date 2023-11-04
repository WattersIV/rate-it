'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export default async function deleteRating(ratingId: number) {
  try {
    await sql`
        DELETE FROM ratings
        WHERE rating_id = ${ratingId}
      `;
    revalidatePath('/view-ratings');
    return 'success';
  } catch (error) {
    return error;
  }
}
