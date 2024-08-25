import { useCallback, useMemo, useState } from "react";
import {
  useGetAllDirectorsQuery,
  useLazyGetDirectorByIdQuery,
} from "../../services/directors.service";
import { useNavigate } from "react-router-dom";

function AllDirectors() {
  const { data, isLoading } = useGetAllDirectorsQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-y-4">
      {data?.data.map((director) => (
        <p key={director.DirectorID}>{`${director.Name}`}</p>
      ))}
    </div>
  );
}

function GetDirector() {
  const [directorID, setDirectorID] = useState<string>("");
  const [getMovie, { isSuccess, data }] = useLazyGetDirectorByIdQuery();

  function handleGetMovieByID() {
    getMovie(directorID || "");
  }

  return (
    <div>
      <div className="space-x-4">
        <label>
          Movie ID:
          <input
            type="text"
            className="rounded-md border-[2px]"
            value={directorID}
            onChange={(e) => setDirectorID(e.target.value)}
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
          <p>{data.data[0].DirectorID}</p>
          <p>{data.data[0].Name}</p>
          <p>{data.data[0].Nationality}</p>
        </div>
      )}
    </div>
  );
}

function UpdateDirector() {
  return <></>;
}

function DeleteDirector() {
  return <></>;
}

function AddDirector() {
  return <></>;
}

const NAVS = [
  "Get All Directors",
  "Get Director by ID",
  "Add Director",
  "Update Director by ID",
  "Delete Director by ID",
];

function Directors() {
  const [currentDirectorUI, setCurrentDirectorUI] = useState<string>(NAVS[0]);
  const navigate = useNavigate();

  const renderNavs = useMemo(
    () => [
      ...NAVS.map((nav) => {
        const className =
          currentDirectorUI === nav
            ? "rounded-md bg-purple-800 p-2 text-white"
            : "rounded-md bg-purple-500 p-2";

        return (
          <ul className={className} key={nav}>
            <button onClick={() => setCurrentDirectorUI(nav)}>{nav}</button>
          </ul>
        );
      }),
      <ul className={"rounded-md bg-purple-500 p-2"}>
        <button onClick={() => navigate("/")}>Go Back</button>
      </ul>,
    ],
    [currentDirectorUI, navigate],
  );

  const renderDirectorUI = useCallback(() => {
    switch (currentDirectorUI) {
      case "Get Director by ID":
        return <GetDirector />;
      case "Add Director":
        return <AddDirector />;
      case "Update Director by ID":
        return <UpdateDirector />;
      case "Delete Director by ID":
        return <DeleteDirector />;
      default:
        return <AllDirectors />;
    }
  }, [currentDirectorUI]);

  return (
    <div className="flex flex-col gap-y-8">
      <nav className="flex flex-row place-content-center gap-x-4">
        {renderNavs}
      </nav>
      <div>{renderDirectorUI()}</div>
    </div>
  );
}

export default Directors;
