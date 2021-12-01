import { DocumentReference } from '@angular/fire/compat/firestore';
import { Player } from './player';

export interface Team {
  id?: DocumentReference;
  name: string;
  place: string;
  players: Player[];
}
