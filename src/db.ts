'server only';
import { Db } from './app/types/db';
console.log('db.ts>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
export const db: Db = {
  noot: [
    {
      artistName: 'Porkchop',
      event: 'The Big One',
      year: 2021,
      rating: 0.1,
    },
  ],
};
