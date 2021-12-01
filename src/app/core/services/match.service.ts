import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Match } from '../modal/match';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  readonly matchesCollection;
  matches$: Observable<Match[]>;

  constructor(afs: AngularFirestore) {
    this.matchesCollection = afs.collection<Match>('matches');
    this.matches$ = this.matchesCollection.valueChanges({ idField: 'id' });
  }

  createMAtch(match: Match) {
    return this.matchesCollection.add(match);
  }
}
