import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Player } from '../modal/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  readonly playersCollection;

  constructor(afs: AngularFirestore) {
    this.playersCollection = afs.collection<Player>('players');
  }

  addPlayer(player: Player) {
    return this.playersCollection.add(player);
  }
}
