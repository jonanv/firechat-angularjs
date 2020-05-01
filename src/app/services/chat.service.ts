import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Message } from '../interfaces/message.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollections: AngularFirestoreCollection<Message>;

  public chats: Message[] = [];

  constructor(
    private angularFireStore: AngularFirestore
  ) { }

  loadMessages() {
    this.itemsCollections = this.angularFireStore.collection<Message>('chats', ref => ref.orderBy('date', 'desc').limit(5));

    return this.itemsCollections.valueChanges()
      .pipe(map((response: Message[]) => {
        console.log(response);
        // this.chats = response;
        this.chats = [];

        for (let message of response) {
          this.chats.unshift(message);
        }
        return this.chats;
      }));
  }

  addMessage(text: string) {
    // TODO: falta el uid
    let message: Message = {
      name: 'Demo',
      message: text,
      date: new Date().getTime(),
    }

    return this.itemsCollections.add(message);
  }


}
