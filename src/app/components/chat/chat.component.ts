import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {

  message: string = "";
  send: boolean = false;
  element: any;

  constructor(
    public chatService: ChatService
  ) {
    this.chatService.loadMessages()
      .subscribe( () => {
        setTimeout(() => {
          this.element.scrollTop = this.element.scrollHeight;
        }, 20);
      });
  }

  ngOnInit(): void {
    this.element = document.getElementById('app-mensajes');
  }

  sendMessage() {
    console.log(this.message);

    if(this.message.length === 0) {
      return;
    }
    else {
      this.send = true;
      this.chatService.addMessage(this.message)
        .then(() => {
          this.send = false;
          this.message = "";
        })
        .catch((err) => {
          console.error('Error al enviar', err);
        });
    }
  }

}
