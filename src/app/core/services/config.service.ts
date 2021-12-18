import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Config } from '../modal/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly configCollection;

  constructor(private readonly afs: AngularFirestore) {
    this.configCollection = afs.collection<Config>('configs');
  }

  getCofig() {
    return this.configCollection.valueChanges({ idField: 'id' });
  }

  updateConfig(id: string, config: Partial<Config>) {
    return this.afs.doc<Config>(`configs/${id}`).update(config);
  }
}
