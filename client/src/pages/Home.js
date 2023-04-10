import React from "react";
import SongsList from "../components/SongsList";
import Playlists from "../components/Playlists";
import Player from "../components/Player";

function Home() {
  return (
    <>
      <div className="flex-col lg:flex-row flex gap-5">
        <div className="w-4/5 lg:w-1/2">
          <SongsList />
        </div>
        <div className=" flex-col w-1/2">
          <Playlists />
        </div>
      </div>
      <Player />
    </>
  );
}

export default Home;