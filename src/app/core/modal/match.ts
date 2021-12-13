import { SetDetails } from './set-details';
import { SetNumber } from './set-number';
import { Team } from './team';

export interface Match {
  id?: string;
  matchNumber: number;
  firstTeam: string;
  secondTeam: string;
  firstTeamData?: Team;
  secondTeamData?: Team;
  numberOfSets: number;
  winningPoint: number;
  ongoing: boolean;
  finished: boolean;
  sets: SetDetails[];
  currentSet: SetNumber;
  currentSetWinningPoint: number;
  winnerTeam: number;
}
