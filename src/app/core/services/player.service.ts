import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Player } from '../modal/player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  readonly playersCollection;

  constructor(private readonly firestore: Firestore) {
    this.playersCollection = collection(firestore, 'players');
  }

  addPlayer(player: Player) {
    return addDoc(this.playersCollection, player);
  }
}
