"use client";

import { Team } from "@/types";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [searchBarInput, setSearchBarInput] = useState("");
  const searchTeams = async () => {
    const res = await fetch("https://statsapi.mlb.com/api/v1/teams?sportId=1");

    const data = await res.json();

    if (!data) return;

    console.log(searchBarInput.toLowerCase());
    console.log("teams", data);

    const searchResults = data.teams.filter((team: Team) => {
      return team.name.toLowerCase().includes(searchBarInput.toLowerCase());
    });

    console.log("search results", searchResults);
    return searchResults;
  };

  return (
    <div className="flex bg-light-shades w-full h-12 items-center px-12 py-8 ">
      <div className="flex items-center w-full gap-20 justify-between">
        <Link href={"/"}>
          <h1 className="text-foreground text-2xl font-bold">SportsHub</h1>
        </Link>
        <div className="flex items-center">
          <input
            className="py-1 px-2 border border-secondary rounded-l-full w-sm"
            type="text"
            placeholder="Find teams"
            value={searchBarInput}
            onChange={(e) => {
              setSearchBarInput(e.target.value);
            }}
          />
          <div>
            <button
              onClick={() => searchTeams()}
              className="flex items-center border-secondary bg-secondary border py-1 px-2 rounded-r-full"
            >
              <Search className="text-light-shades" />
            </button>
          </div>
        </div>
        <div className="flex">
          <button className="flex border border-light-shades bg-secondary p-2 rounded-full">
            <span className="text-background">NH</span>
          </button>
        </div>
      </div>
    </div>
  );
}
