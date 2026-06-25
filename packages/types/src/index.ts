export type MatchStatus = "live" | "upcoming" | "finished";

export interface MatchSummary {
  id: string;
  status: MatchStatus;
  competition: string;
  home: string;
  away: string;
  homeScore: number | null;
  awayScore: number | null;
  minute?: number | null;
  ai?: string;
}
