'use client'

import { useEffect, useState } from "react";

type Movie = {
  id: number;
  name: string;
}

const updateMovie = async (id: number, movie: any) => {
  await fetch (`http://localhost:4000/movies/${id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie)
 });
}                

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])

  async function getMovies() {
    const res = await fetch (`${process.env.NEXT_PUBLIC_BACKEND_URL}/movies`)
    const data = await res.json();
    setMovies(data)
  }

  useEffect(() => {
    getMovies()
  }, [])
  return (
    <>
      <div>
      {movies.map((movie, index) => (
        <div key={index}>{movie.name}</div>
      )

      )}
    </div>
    </>
  
  );
}
