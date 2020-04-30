import { Component } from '@angular/core';

import { ChatService } from '../../services/chat.service';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent {

  message: string = "";

  constructor(
    public chatService: ChatService
  ) {
    this.chatService.loadMessages()
      // .pipe(first())
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  sendMessage() {
    console.log('Mensaje enviado');
  }

}
