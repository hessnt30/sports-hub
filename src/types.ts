export type Video = {
  kind: string;
  etag: string;
  id: string;
  nextPageToken: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
      standard: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: {
      kind: string;
      videoId: string;
    };
    videoOwnerChannelTitle: string;
    videoOwnerChannelId: string;
  };
};

export type GameData = {
  teams: {
    away: {
      leagueRecord: {
        wins: number;
        losses: number;
        pct: string;
      };
      team: {
        id: number;
        name: string;
        link: string;
      };
      splitSquad: boolean;
      seriesNumber: number;
    };
    home: {
      leagueRecord: {
        wins: number;
        losses: number;
        pct: string;
      };
      team: {
        id: number;
        name: string;
        link: string;
      };
      splitSquad: boolean;
      seriesNumber: number;
    };
  };
  gameDate: string;
};

export type Team = {
  springLeague: {
    id: number;
    name: string;
    link: string;
    abbreviation: string;
  };
  allStarStatus: string;
  id: number;
  name: string;
  link: string;
  season: number;
  venue: {
    id: number;
    name: string;
    link: string;
  };
  springVenue: {
    id: number;
    link: string;
  };
  teamCode: string;
  fileCode: string;
  abbreviation: string;
  teamName: string;
  locationName: string;
  firstYearOfPlay: string;
  league: {
    id: number;
    name: string;
    link: string;
  };
  division: {
    id: number;
    name: string;
    link: string;
  };
  sport: {
    id: number;
    link: string;
    name: string;
  };
  shortName: string;
  franchiseName: string;
  clubName: string;
  active: boolean;
};
