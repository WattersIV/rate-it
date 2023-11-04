'server only';

import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { QueryResult, sql } from '@vercel/postgres';
import deleteRating from '../actions/deleteRating';
import { RatingResponse } from '../types/db';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

export default async function ViewRatings({
  params,
}: {
  params: { userName: string };
}) {
  const userName = params.userName;

  const response: QueryResult<RatingResponse> = await sql`
  SELECT * FROM ratings
  WHERE user_id = (SELECT user_id FROM users WHERE username = ${userName});
  `;
  const ratings = response.rows;
  return (
    <>
      {ratings.map((item) => (
        <Card key={item.rating_id}>
          <CardHeader>
            <CardTitle className="flex items-center">
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
