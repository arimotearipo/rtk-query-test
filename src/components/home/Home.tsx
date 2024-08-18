function Home() {
  return (
    <div className="flex flex-row justify-center gap-x-4">
      <a className="rounded-md bg-purple-500 p-2" href="/movies">
        Movies
      </a>
      <a className="rounded-md bg-purple-500 p-2" href="/directors">
        Directors
      </a>
    </div>
  );
}

export default Home;
