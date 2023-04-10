import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SetCurrentSong,
  SetCurrentSongIndex,
  SetCurrentTime,
  SetIsPlaying,
} from "../redux/userSlice";

function Player() {
  const [volume, setVolume] = useState(0.5);
  const [shuffleOn, setShuffleOn] = useState(false);
  const dispatch = useDispatch();
  const audioRef = React.createRef();
  const { currentSong, currentSongIndex, allSongs, isPlaying, currentTime } =
    useSelector((state) => state.user);

  const onPlay = () => {
    audioRef.current.play();
    dispatch(SetIsPlaying(true));
  };

  const onPause = () => {
    audioRef.current.pause();
    dispatch(SetIsPlaying(false));
  };

  const onPrev = () => {
    if (currentSongIndex !== 0 && !shuffleOn) {
      dispatch(SetCurrentSongIndex(currentSongIndex - 1));
      dispatch(SetCurrentSong(allSongs[currentSongIndex - 1]));
    } else {
      const randomIndex = Math.floor(Math.random() * allSongs.length);
      dispatch(SetCurrentSongIndex(randomIndex));
      dispatch(SetCurrentSong(allSongs[randomIndex]));
    }
  };
  const onNext = () => {
    if (currentSongIndex !== allSongs.length - 1 && !shuffleOn) {
      dispatch(SetCurrentSongIndex(currentSongIndex + 1));
      dispatch(SetCurrentSong(allSongs[currentSongIndex + 1]));
    } else {
      const randomIndex = Math.floor(Math.random() * allSongs.length);
      dispatch(SetCurrentSongIndex(randomIndex));
      dispatch(SetCurrentSong(allSongs[randomIndex]));
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentSong]);

  useEffect(() => {
    if (!currentSong && allSongs.length > 0) {
      dispatch(SetCurrentSong(allSongs[0]));
    }
  }, [allSongs]);

  useEffect(() => {
    if (currentTime) {
      audioRef.current.currentTime = currentTime;
    }
  }, []);

  return (
    <div className=" relative flex-col lg:flex-row bottom-0 left-0 right-0 p-5 shadow-lg bg-white">
      <div className=" bg-red-200 flex  justify-between items-center border block p-5 border rounded shadow-xl">
        <div className="flex items-center gap-1 w-65">
          <img
            className="h-15 w-20 lg:h-20 w-36"
            src="https://www.pngimages.pics/images/quotes/english/general/transparent-musical-drawing-musical-png-52650-135734.png"
            alt=""
          />
          <div>
            <h1 className="gap-10 flex-col lg:flex-row text-active text-xl  lg:text-2xl">{currentSong?.title}</h1>
            <h4 className="text-secondary">
             <h5 className="text-10px  lg:text-xl ">{currentSong?.artist}</h5>
             <h5 className="text-10px  lg:text-xl ">{currentSong?.album}</h5>
             <h5 className="text-10px  lg:text-xl">{currentSong?.year}</h5>
            </h4>
          </div>
        </div>

        <div className="gap-6 w-66 align-item flex flex-col items-center">
          <audio
            src={currentSong?.src}
            ref={audioRef}
            onTimeUpdate={(e) => {
              dispatch(SetCurrentTime(e.target.currentTime));
            }}
          ></audio>
          <div className=" flex gap-5 lg:gap-10 items-center lg: bg-slate-400">
            <i class=" md:mx-auto ri-skip-back-line text-8px bg-blue-100  lg:text-3xl text-black" onClick={onPrev}></i>

            {isPlaying ? (
              <i className="md:mx-auto ri-pause-line text-8px bg-blue-100  lg:text-3xl text-black" onClick={onPause}></i>
            ) : (
              <i className="ri-play-line text-8px lg:text-3xl text-black bg-blue-300 rounded-xl" onClick={onPlay}></i>
            )}

            <i class="ri-skip-forward-line text-8px bg-blue-100  lg:text-3xl text-black" onClick={onNext}></i>
          </div>
          <div className="flex gap-3 items-center w-full">
            <i
              className={`ri-shuffle-line text-xl ${
                shuffleOn && "text-orange-500 font-semibold"
              }`}
              onClick={() => {
                setShuffleOn(!shuffleOn);
              }}
            ></i>
            <h1>
              {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)}
            </h1>
            <input
              type="range"
              className="p-0 w-2/5 lg:w-full"
              min={0}
              max={Number(currentSong?.duration) * 60}
              value={currentTime}
              onChange={(e) => {
                audioRef.current.currentTime = e.target.value;
                dispatch(SetCurrentTime(e.target.value));
              }}
            />
            <h1>{currentSong?.duration}</h1>
          </div>
        </div>

        <div className="flex gap-3 items-center ">
          <i
            className="bg-blue-100 ri-volume-mute-line  text-8px lg:text-3xl text-black"
            onClick={() => {
              setVolume(0);
              audioRef.current.volume = 0;
            }}
          ></i>
          <input
            type="range"
            className="w-3 lg:w-full"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={(e) => {
              audioRef.current.volume = e.target.value;
              setVolume(e.target.value);
            }}
          />
          <i
            className="bg-blue-100 ri-volume-down-line text-8px lg:text-3xl "
            onClick={() => {
              setVolume(1);
              audioRef.current.volume = 1;
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default Player;