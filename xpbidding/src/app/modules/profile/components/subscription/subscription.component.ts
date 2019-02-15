import { Component, OnInit } from '@angular/core';
import { IProductCategory } from 'src/app/entities';
import { FirebaseCloudMessagingService, CategoryService, UserService } from 'src/app/services';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  productCategories: IProductCategory[];
  errorMessage: string;
  token = null;
  constructor(private firebaseCloudMessagingService: FirebaseCloudMessagingService,
    private userService: UserService,
     private categoryService: CategoryService) { }

  ngOnInit() {
    let user = this.userService.getCurrentUser();
    this.token = user.FcmToken;
    this.categoryService.getCategories().subscribe(productCategories => {
      this.firebaseCloudMessagingService.getAppInstanceTopics(this.token).subscribe(pcs => {
        productCategories.map((productCategory) => {
          productCategory.isSubscribed = pcs.includes(productCategory.productCatName);
        },
          error => this.errorMessage = <any>error)
        this.productCategories = productCategories;
      });
    },
      error => this.errorMessage = <any>error
    );
  }

  checkboxChanged(e, productCategory) {
    if (e.target.checked === true) {
      this.firebaseCloudMessagingService.registerTokenToTopic(this.token, productCategory)
        .subscribe(data => {
          console.log(JSON.stringify(data));
        });
    }
    else {
      this.firebaseCloudMessagingService.unRegisterTokenToTopic(this.token, productCategory)
        .subscribe(data => {
          console.log(JSON.stringify(data));
        });
    }
  }
}
