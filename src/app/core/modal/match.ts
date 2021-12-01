import {
  DocumentData,
  DocumentReference,
} from '@angular/fire/compat/firestore';

export interface Match {
  team1: DocumentReference<DocumentData>;
  team2: DocumentReference<DocumentData>;
}
