'server only';

import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { QueryResult, sql } from '@vercel/postgres';
import { User } from '../types/user';
import { RatingResponse } from '../types/db';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { revalidatePath } from 'next/cache';
export default async function ViewRatings() {
  const user: User = { name: 'noot', id: 1 };

  async function deleteRating(ratingId: number) {
    'use server';
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

  const response: QueryResult<RatingResponse> = await sql`
    SELECT rating_id, artist_name, event_name, year, rating
    FROM ratings
    WHERE user_id = ${user.id}
  `;
  const ratings = response.rows;
  return (
    <>
      {ratings.map((item) => (
        <Card key={item.rating_id}>
          <CardHeader>
            <CardTitle>
              {item.artist_name} - {item.rating}
              <form action={deleteRating.bind(null, item.rating_id)}>
                <IconButton type="submit" aria-label="Delete Entry">
                  <DeleteIcon className="fill-neutral-50" />
                </IconButton>
              </form>
            </CardTitle>
            <CardFooter>
              {item.event_name} - {item.year}
            </CardFooter>
          </CardHeader>
        </Card>
      ))}
    </>
  );
}
