'use server';
import { db } from '@/db';
import { RatingFormData } from '../types/form';

export default async function submitRatingForm(data: FormData) {
  const user = 'noot';
  console.log('submitRatingForm', data);
  const formObj = {
    artistName: data.get('artistName'),
    event: data.get('event'),
    rating: Number(data.get('rating')),
    year: Number(data.get('year')),
  } as RatingFormData;
  db[user].push(formObj);
  console.log('db', db);
}
