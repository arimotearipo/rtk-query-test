import { useGetAllMoviesQuery } from "../../services/movies.service";

function Movies() {
  const { data, isLoading } = useGetAllMoviesQuery();

  if (isLoading) {
    return <h1>Loading movies...</h1>;
  }

  return (
    <>
      <h1>Movies</h1>
      {data?.data.map((movie) => (
        <p key={movie.MovieID}>{movie.Title}</p>
      ))}
    </>
  );
}

export default Movies;
