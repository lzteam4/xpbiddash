import { Component, OnInit } from '@angular/core';
import { FirebaseCloudMessagingService, ProductService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  token = "dfrrFgYOHiU:APA91bGYyzADHof0ZLQg-on8l3JHIPYerYQtF8SS2VdUusVSh2bO3NntOZKy_W4_BUQ5_JB5kD7NZIZo915vEcdYwZEBKbwPg1n1gdR5pEV0kkiCIvhhD5i5alPY5Tv4VM8sPuNXmcJr";
  constructor(private firebaseCloudMessagingService: FirebaseCloudMessagingService,
    private productService: ProductService) { }

  ngOnInit() {

    // this.firebaseCloudMessagingService.getAppInstanceInformation(this.token)
    //   .subscribe(data => {
    //     console.log(JSON.stringify(data));
    //   });

    //   this.firebaseCloudMessagingService.getAppInstanceTopics(this.token)
    //   .subscribe(data => {
    //     console.log(JSON.stringify(data));
    //   });
  }

}
