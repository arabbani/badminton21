import { DocumentReference } from 'rxfire/firestore/interfaces';
import { Player } from './player';

export interface Team {
  name: string;
  place: string;
  players: Player[];
  captain: DocumentReference<Player>;
}
