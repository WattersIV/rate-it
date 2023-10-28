'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import submitRatingForm from './actions/submitRatingForm';
import { useRef } from 'react';

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    try {
      await submitRatingForm(formData);
      formRef.current?.reset();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <main className="h-full">
      <h1 className="text-4xl text-blue-400 text-center text-bold">Rate It</h1>
      <form action={handleSubmit} ref={formRef}>
        <Card className="h-3/5 w-4/5 mx-auto my-4">
          <CardHeader>
            <CardTitle>Enter Your Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              name="artistName"
              className="m-2"
              type="text"
              placeholder="Artist Name"
            />
            <Input
              name="event"
              className="m-2"
              type="text"
              placeholder="Event"
            />
            <Input
              name="year"
              className="m-2"
              type="number"
              min={2010}
              max={new Date().getFullYear()}
              placeholder="Year"
            />
            <Input
              name="rating"
              className="m-2"
              max={10}
              min={0}
              step={0.1}
              type="number"
              placeholder="Rate It"
            />
          </CardContent>
          <CardFooter>
            <Button size="lg">Submit</Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}
