import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Message } from '../interfaces/message.interface';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollections: AngularFirestoreCollection<Message>;

  public chats: Message[] = [];
  public user: any = {};

  constructor(
    private afs: AngularFirestore,
    private auth: AngularFireAuth
  ) {
    this.auth.authState
      .subscribe(response => {
        console.log('Esta es la autentificacion: ', response);
        if(!response) {
          return;
        }
        this.user.name = response.displayName;
        this.user.uid = response.uid;
      });
  }

  login(method: string) {
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.signOut();
  }

  loadMessages() {
    this.itemsCollections = this.afs.collection<Message>('chats', ref => ref.orderBy('date', 'desc').limit(5));

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
