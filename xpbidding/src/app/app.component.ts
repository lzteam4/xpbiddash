import { Component } from '@angular/core';
import { FirebaseCloudMessagingService } from './services';
import { UserService } from './services/user.service';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pageTitle = 'my-app';
  constructor(private userService: UserService, 
    private firebaseCloudMessagingService: FirebaseCloudMessagingService,
    private messageService: MessageService) {
    userService.getUserByUP("Nikhil", "test123").subscribe(
      user => {
        this.userService.setCurrentUser(user);
        this.firebaseCloudMessagingService.requestPermission();
        this.firebaseCloudMessagingService.receiveMessage().subscribe(payload => {
          this.messageService.add({severity:'success', summary: payload["notification"]["title"], detail: payload["notification"]["body"]});
        });
      }
    );
  }
}
