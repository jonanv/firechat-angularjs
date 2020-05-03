import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
  }

  authSignIn(method: string) {
    console.log(method);
    this.chatService.login(method);
  }

}
