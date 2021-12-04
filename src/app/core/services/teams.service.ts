import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Team } from '../modal/team';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  readonly teamsCollection;
  teams$: Observable<Team[]>;

  constructor(afs: AngularFirestore) {
    this.teamsCollection = afs.collection<Team>('teams');
    this.teams$ = this.teamsCollection.valueChanges({ idField: 'id' });
    this.teamsCollection;
  }

  addTeam(team: Team) {
    return this.teamsCollection.add(team);
  }

  getTeam(ref: any) {
    return this.teamsCollection.doc(ref).get();
  }
}
