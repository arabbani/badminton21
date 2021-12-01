import {
  DocumentData,
  DocumentReference,
} from '@angular/fire/compat/firestore';

export interface Match {
  firstTeam: DocumentReference<DocumentData>;
  secondTeam: DocumentReference<DocumentData>;
  numberOfSets: number;
  winningPoint: number;
}
