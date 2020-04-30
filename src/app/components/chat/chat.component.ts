import { Component } from '@angular/core';

import { ChatService } from '../../services/chat.service';
import { Message } from 'src/app/interfaces/message.interface';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent {

  message: string = "";
  send: boolean = false;

  constructor(
    public chatService: ChatService
  ) {
    this.chatService.loadMessages()
      // .pipe(first())
      .subscribe();
  }

  sendMessage() {
    if(this.message.length === 0) {
      return;
    }
    else {
      this.send = true;
      this.chatService.addMessage(this.message)
        .then(() => {
          console.log('Mensaje enviado');
          this.send = false;
          this.message = "";
        })
        .catch((err) => {
          console.error('Error al enviar', err);
        });
    }
  }

}
