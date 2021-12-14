import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Team } from '../modal/team';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  readonly teamsCollection;

  constructor(afs: AngularFirestore) {
    this.teamsCollection = afs.collection<Team>('teams');
  }

  getTeams() {
    return this.teamsCollection.valueChanges({ idField: 'id' });
  }

  addTeam(team: Team) {
    return this.teamsCollection.add(team);
  }

  getTeam(ref: any) {
    return this.teamsCollection.doc(ref).get();
  }
}
