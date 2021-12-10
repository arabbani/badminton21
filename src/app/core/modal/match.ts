import { SetDetails } from './set-details';
import { SetNumber } from './set-number';
import { Team } from './team';

export interface Match {
  id?: string;
  firstTeam: string;
  secondTeam: string;
  numberOfSets: number;
  winningPoint: number;
  ongoing: boolean;
  scheduled: boolean;
  finished: boolean;
  firstTeamData?: Team;
  secondTeamData?: Team;
  sets: SetDetails[];
  currentSet: SetNumber;
  currentSetWinningPoint: number;
}
