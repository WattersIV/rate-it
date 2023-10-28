'server only';

import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { db } from '@/db';

export default function ViewRatings() {
  const user = 'noot';
  const ratings = db[user];
  console.log('view-ratings page', ratings);
  return (
    <>
      {ratings.map((item, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>
              {item.artistName} - {item.rating}
            </CardTitle>
            <CardFooter>
              {item.event} - {item.year}
            </CardFooter>
          </CardHeader>
        </Card>
      ))}
    </>
  );
}
