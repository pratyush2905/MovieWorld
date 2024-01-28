import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
//d121c6d
const API_URL = "http://www.omdbapi.com?apikey=d121c6d";

const movie1 = {
  Title: "Frozen",
  Year: "2013",
  imdbID: "tt2294629",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_SX300.jpg",
};

const App = () => {
  const [movies, setMovies] = useState([]);
  const[searchTerm,setSearchTerm] = useState('');

  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovie("Frozen");
  }, []);
  return (
    <>
      <div className="app">
        <h1>MovieWorld</h1>

        <div className="search">
          <input
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={SearchIcon} alt="search" 
          onClick={() => searchMovie(searchTerm)} />
        </div>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movie</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
