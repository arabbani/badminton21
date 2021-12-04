import { Team } from './team';

export interface Match {
  id?: string;
  firstTeam: string;
  secondTeam: string;
  numberOfSets: number;
  winningPoint: number;
  finished: boolean;
  firstTeamData?: Team;
  secondTeamData?: Team;
}
