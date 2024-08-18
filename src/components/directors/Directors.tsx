import { useState } from "react";
import {
  useAddDirectorMutation,
  useGetAllDirectorsQuery,
  useLazyGetDirectorByIdQuery,
} from "../../services/directors.service";

function Directors() {
  const [directorID, setDirectorID] = useState("");
  const { data, isLoading } = useGetAllDirectorsQuery();
  const [
    getDirectorByID,
    { data: directorByIDData, isLoading: directorByIDIsLoading },
  ] = useLazyGetDirectorByIdQuery();

  if (isLoading) {
    return <h1>Loading directors...</h1>;
  }

  function handleIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDirectorID(e.target.value);
  }

  async function handleGetDirectorByID() {
    getDirectorByID(directorID);
  }

  return (
    <div>
      <div>
        <h1>Directors</h1>
        {data?.data.map((director) => (
          <p key={director.DirectorID}>{director.Name}</p>
        ))}
      </div>
      <div>
        <label>Enter ID</label>
        <input type="text" value={directorID} onChange={handleIdChange} />
        <button type="button" onClick={handleGetDirectorByID}>
          Get Director
        </button>
        {!directorByIDIsLoading && <p>{directorByIDData?.data[0].Name}</p>}
      </div>
    </div>
  );
}

export default Directors;
