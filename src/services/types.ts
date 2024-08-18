export type Director = {
  DirectorID: string;
  Name: string;
  DOB: string;
  Gender: string;
  Nationality: string;
};

export type DirectorResponse = {
  data: Director[];
};

export type DirectorPayload = {
  name: string;
  gender: string;
  date_of_birth: string;
  nationality: string;
};

export type Movie = {
  MovieID: string;
  Title: string;
  DirectorName: string;
  Year: string;
};

export type MovieResponse = {
  data: Movie[];
};

export type HealthCheck = {
  message: string;
};
