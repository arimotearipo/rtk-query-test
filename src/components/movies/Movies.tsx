import { useCallback, useMemo, useRef, useState } from "react";
import {
  useDeleteMovieByIdMutation,
  useGetAllMoviesQuery,
  useLazyGetMovieByIdQuery,
  useUpdateMovieByIdMutation,
} from "../../services/movies.service";

function AllMovies() {
  const { data, isLoading } = useGetAllMoviesQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-y-4">
      {data?.data.map((movie) => (
        <p key={movie.MovieID}>{`${movie.MovieID} - ${movie.Title}`}</p>
      ))}
    </div>
  );
}

function GetMovie() {
  const [movieID, setMovieID] = useState<string>("");
  const [getMovie, { isSuccess, data }] = useLazyGetMovieByIdQuery();

  function handleGetMovieByID() {
    getMovie(movieID || "");
  }

  return (
    <div>
      <div className="space-x-4">
        <label>
          Movie ID:
          <input
            type="text"
            className="rounded-md border-[2px]"
            value={movieID}
            onChange={(e) => setMovieID(e.target.value)}
          />
        </label>

        <button
          className="rounded-md bg-gray-500 p-[4px]"
          onClick={handleGetMovieByID}
        >
          Get Movie
        </button>
      </div>
      {isSuccess && (
        <div className="flex flex-col gap-y-2">
          <p>{data.data[0].MovieID}</p>
          <p>{data.data[0].Title}</p>
          <p>{data.data[0].DirectorName}</p>
          <p>{data.data[0].Year}</p>
        </div>
      )}
    </div>
  );
}

function UpdateMovie() {
  const [updateMovie, { isLoading, isSuccess }] = useUpdateMovieByIdMutation();

  const movieIdRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const directorNameRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleUpdateMovie = () => {
    const movieId = movieIdRef.current?.value;
    const title = titleRef.current?.value;
    const directorName = directorNameRef.current?.value;
    const year = yearRef.current?.value;

    const payload = {
      movie_id: movieId || "",
      title: title || "",
      director_name: directorName || "",
      year: year || "",
    };

    console.log("Payoad", payload);

    updateMovie(payload);
  };

  return (
    <div>
      <div className="space-x-4">
        <label>
          Movie ID:
          <input
            type="text"
            ref={movieIdRef}
            className="rounded-md border-[2px]"
          />
        </label>
      </div>
      <div className="space-x-4">
        <label>
          Title:
          <input
            type="text"
            ref={titleRef}
            className="rounded-md border-[2px]"
          />
        </label>
      </div>
      <div className="space-x-4">
        <label>
          Director Name:
          <input
            type="text"
            ref={directorNameRef}
            className="rounded-md border-[2px]"
          />
        </label>
      </div>
      <div className="space-x-4">
        <label>
          Year:
          <input
            type="text"
            ref={yearRef}
            className="rounded-md border-[2px]"
          />
        </label>
      </div>
      <button
        className="rounded-md bg-gray-500 p-[4px]"
        onClick={handleUpdateMovie}
      >
        Submit
      </button>
      {!isLoading && isSuccess ? <p>Deleted</p> : <p>Failed to delete</p>}
    </div>
  );
}

function DeleteMovie() {
  const [movieID, setMovieID] = useState<string>("");
  const [deleteMovie, { isSuccess, isLoading }] = useDeleteMovieByIdMutation();

  function handleDeeteMovieByID() {
    deleteMovie(movieID || "");
  }

  return (
    <div>
      <div className="space-x-4">
        <label>Movie ID</label>
        <input
          type="text"
          className="rounded-md border-[2px]"
          value={movieID}
          onChange={(e) => setMovieID(e.target.value)}
        />
        <button
          className="rounded-md bg-red-200 p-[4px]"
          onClick={handleDeeteMovieByID}
        >
          Delete Movie
        </button>
      </div>
      {!isLoading && isSuccess ? <p>Deleted</p> : <p>Failed to delete</p>}
    </div>
  );
}

function AddMovie() {
  return <></>;
}

const NAVS = [
  "Get All Movies",
  "Get Movie by ID",
  "Add Movie",
  "Update Movie by ID",
  "Delete Movie by ID",
];

function Movies() {
  const [currentMovieUI, setCurrentMovieUI] = useState<string>(NAVS[0]);

  const renderNavs = useMemo(
    () =>
      NAVS.map((nav) => {
        const className =
          currentMovieUI === nav
            ? "rounded-md bg-purple-800 p-2 text-white"
            : "rounded-md bg-purple-500 p-2";

        return (
          <ul className={className} key={nav}>
            <button onClick={() => setCurrentMovieUI(nav)}>{nav}</button>
          </ul>
        );
      }),
    [NAVS, currentMovieUI],
  );

  const renderMovieUI = useCallback(() => {
    switch (currentMovieUI) {
      case "Get Movie by ID":
        return <GetMovie />;
      case "Add Movie":
        return <AddMovie />;
      case "Update Movie by ID":
        return <UpdateMovie />;
      case "Delete Movie by ID":
        return <DeleteMovie />;
      default:
        return <AllMovies />;
    }
  }, [currentMovieUI]);

  return (
    <div className="flex flex-col gap-y-8">
      <nav className="flex flex-row place-content-center gap-x-4">
        {renderNavs}
      </nav>
      <div>{renderMovieUI()}</div>
    </div>
  );
}

export default Movies;
