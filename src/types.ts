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
