import { DocumentReference } from '@angular/fire/compat/firestore';
import { Player } from './player';

export interface Team {
  id?: string;
  name: string;
  place: string;
  players: Player[];
}
