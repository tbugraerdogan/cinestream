import React, { useEffect, useState } from "react";
import "./Movies.css"; // Import the CSS file

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=213dc0eaffdba0d7a2028eed7aa48062"
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const fetchTrailer = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=213dc0eaffdba0d7a2028eed7aa48062`
      );
      const data = await response.json();
      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      } else {
        alert("Trailer not found");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  if (loading) {
    return <p className="loading">Loading movies...</p>;
  }

  return (
    <div className="movies-container">
      <h1 className="title">Movies List</h1>
      <ul className="movies-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-item">
            <h2 className="movie-title">{movie.title}</h2>
            <img
              className="movie-poster"
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <button
              className="trailer-button"
              onClick={() => fetchTrailer(movie.id)}
            >
              Watch Trailer
            </button>
          </li>
        ))}
      </ul>
      {trailerUrl && (
        <div className="trailer-container">
          <iframe
            className="trailer-iframe"
            width="560"
            height="315"
            src={trailerUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Movie Trailer"
          ></iframe>
          <button className="close-button" onClick={() => setTrailerUrl("")}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Movies;
