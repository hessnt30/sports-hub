"use client";

import { GameData } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function NextGameInfo() {
  const [gameData, setGameData] = useState<GameData | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      const res = await fetch(
        "https://statsapi.mlb.com/api/v1/schedule?sportId=1&teamId=120"
      );

      const data = await res.json();

      // get next game
      if (data.totalGames < 1) return;
      const nextGameObject = data.dates[0].games[0];
      const nextGameData = {
        teams: nextGameObject.teams,
        gameDate: nextGameObject.gameDate,
      } as GameData;
      setGameData(nextGameData);
      console.log(nextGameData);
      console.log("schedule data", data);
    };

    fetchSchedule();
  }, []);

  if (!gameData) return <p className="p-6">Loading...</p>;
  return (
    <div className="p-6 max-w-5xl">
      <h1 className="text-xl font-bold p-2">Next Game</h1>
      <div className="flex p-4 border border-gray-800 rounded-md items-center justify-center flex-col">
        <div className="flex p-2">
          <span>
            {new Date(gameData.gameDate).toDateString()}
            {" @ "}
            {new Date(gameData.gameDate).toLocaleTimeString()}
          </span>
          <span></span>
        </div>
        <div className="flex flex-row justify-between items-center w-full px-4 max-w-xl">
          <div className="flex flex-col items-center gap-2">
            <Image
              src={`https://www.mlbstatic.com/team-logos/${gameData?.teams.away.team.id}.svg`}
              width={100}
              height={100}
              alt={`${gameData.teams.away.team.name} logo`}
              className="max-h-[100px]"
            />
            <span>{gameData?.teams.away.team.name}</span>
            <span>
              {gameData.teams.away.leagueRecord.wins}-
              {gameData.teams.away.leagueRecord.losses} (
              {gameData.teams.away.leagueRecord.pct})
            </span>
          </div>

          <div>vs</div>
          <div className="flex flex-col items-center gap-2">
            <Image
              src={`https://www.mlbstatic.com/team-logos/${gameData?.teams.home.team.id}.svg`}
              width={100}
              height={100}
              alt={`${gameData.teams.home.team.name} logo`}
              className="max-h-[100px]"
            />
            <span className="">{gameData?.teams.home.team.name}</span>
            <span>
              {gameData.teams.home.leagueRecord.wins}-
              {gameData.teams.home.leagueRecord.losses} (
              {gameData.teams.home.leagueRecord.pct})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
