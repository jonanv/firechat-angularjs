import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollections: AngularFirestoreCollection<any>;

  public chats: any[] = [];

  constructor(
    private angularFireStore: AngularFirestore
  ) { }

  loadMessages() {
    this.itemsCollections = this.angularFireStore.collection<any>('chats');
    return this.itemsCollections.valueChanges();
  }


}
