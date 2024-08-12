export type ScoutingArea = {
  id: number;
  title: string;
  reward: number;
  description: string | null;
  hash: string;
  latitude: number;
  longitude: number;
  isBookmarked: boolean | null;
};
