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
    this.itemsCollections = this.angularFireStore.collection<Message>('chats');
    return this.itemsCollections.valueChanges()
      .pipe(map((response: Message[]) => {
        console.log(response);
        this.chats = response;
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
