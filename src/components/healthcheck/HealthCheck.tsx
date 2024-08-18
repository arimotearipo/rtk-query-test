import { useGetHealthCheckQuery } from "../../services/healthcheck.service";

function HealthCheck() {
  const { isLoading, data } = useGetHealthCheckQuery();

  if (isLoading) {
    return <h1>Loading directors...</h1>;
  }

  return (
    <>
      <h1>HealthCheck</h1>
      <p>{data?.message}</p>
    </>
  );
}

export default HealthCheck;
