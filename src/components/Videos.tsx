"use client";

// nationals team id is 120

import Image from "next/image";
import { useEffect, useState } from "react";
import { Video } from "@/types";

const YOUTUBE_PLAYLIST_ITEMS_API =
  "https://www.googleapis.com/youtube/v3/playlistItems";

const PLAYLIST_ID = "PLL-lmlkrmJanq-c41voXY4cCbxVR0bjxR";

export default function Videos() {
  const [videos, setVideos] = useState<Video[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    /**
     * Initial fetch of videos from MLB 2025 Game Highlights playlist
     */
    const fetchVideos = async () => {
      const res = await fetch(
        `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=200&playlistId=${PLAYLIST_ID}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
      );

      const data = await res.json();

      let allVideos = data.items as Video[];

      if (!data.items) return;

      let pageToken = data.nextPageToken;
      while (pageToken) {
        console.log("fetching next page", pageToken);
        const nextRes = await fetch(
          `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=200&playlistId=${PLAYLIST_ID}&pageToken=${pageToken}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
        );

        const nextData = await nextRes.json();

        if (!nextData || !nextData.nextPageToken) break;
        allVideos.push(...nextData.items);

        // console.log(allVideos);

        pageToken = nextData.nextPageToken;
      }
      console.log("here");
      console.log("items fetched:", allVideos);
      findTeamVideos("Nationals", allVideos);
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    console.log("data", videos);
  }, [videos]);

  /**
   * Filter videos by looking for `team` in title and update `videos` state.
   * @param team Team name to filter results by
   * @param vids All videos from playlist
   * @returns `null` if `vids` is null
   */
  function findTeamVideos(team: string, vids: Video[]) {
    if (!vids) return;
    const filteredVids = vids.filter((video) => {
      return video.snippet.title.includes(team);
    });
    console.log("vids:", filteredVids);
    setVideos(filteredVids);
    setLoading(false);
  }

  if (!videos || loading) return <p className="p-6">Loading...</p>;
  return (
    <div className="p-6 max-w-5xl">
      <h1 className="text-xl font-bold p-2">Game Recaps</h1>
      <ul className="grid grid-cols-1 gap-2 md:grid-cols-2 max-h-[600px] overflow-y-auto">
        {videos.map((video) => {
          return (
            <li key={video.id}>
              <div className="flex p-4 border border-gray-800 rounded-md justify-center">
                <a
                  href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
                  target="_blank"
                  title={`View ${video.snippet.title.replace(
                    " | MLB Highlights",
                    ""
                  )} in YouTube (opens in new tab)`}
                >
                  <p>
                    <Image
                      width={video.snippet.thumbnails.medium.width}
                      height={video.snippet.thumbnails.medium.height}
                      src={video.snippet.thumbnails.medium.url}
                      alt={video.snippet.title}
                      className="object-cover object-center w-full rounded-lg"
                    />
                  </p>
                  <h3 className="max-w-s truncate">
                    {video.snippet.title.replace(" | MLB Highlights", "")}
                  </h3>
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
