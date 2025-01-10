'use client'

import { useEffect, useState } from "react";

type Movie = {
  id: number;
  name: string;
  movie: any
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

const deleteMovie = async (id: number) => {
  await fetch (`http://localhost:4000/movies/${id}`,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
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
    <div>
      {movies.map((movie) => (
        <div key={movie.id} className="flex"> 
          <h1>{movie.name}</h1>
          <p
            onClick={() => {
              const newName = prompt('Enter new category name', movie.name);
              if (newName) {
                updateMovie(movie.id, { name: newName }).then(() => {
                  setMovies((prevMovies) =>
                    prevMovies.map((moviee) =>
                      moviee.id === movie.id ? { ...moviee, name: newName } : moviee
                    )
                  );
                });
              }
            }}
          >
            Edit
          </p>

          <p 
            onClick={() => deleteMovie(movie.id)}
          >
            Delete
          </p>
          
        </div>
      ))}
    </div>
  );
}
