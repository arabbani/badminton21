import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Team } from '../modal/team';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  readonly teamsCollection;

  constructor(private readonly firestore: Firestore) {
    this.teamsCollection = collection(firestore, 'team');
  }

  addTeam(team: Team) {
    return addDoc(this.teamsCollection, team);
  }
}
