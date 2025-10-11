export interface Shooter {
  rank: number;
  'regions.name': string;
  'shooters.firstname': string;
  'shooters.lastname': string;
  display_rating: number;
}

export type MatchType = 'shotgun' | 'handgun' | 'pcc' | 'rifle' | 'minirifle';
export type Divisions = { id: number; name: string }[];
