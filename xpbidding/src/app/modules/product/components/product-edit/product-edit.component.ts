import { Component, OnInit, ElementRef, OnDestroy, ViewChildren } from '@angular/core';
import { IProduct } from 'src/app/entities';
import { FormControl, FormBuilder, FormArray, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { GenericValidator } from 'src/app/modules/shared/generic-validator';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services';
import { NumberValidators } from 'src/app/modules/shared/number.validator';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle: string = 'Product Edit';
  errorMessage: string;
  productForm: FormGroup;

  product: IProduct;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  get Tags(): FormArray {
      return <FormArray>this.productForm.get('Tags');
  }

  constructor(private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private productService: ProductService) {

      // Defines all of the validation messages for the form.
      // These could instead be retrieved from a file or database.
      this.validationMessages = {
          Name: {
              required: 'Product name is required.',
              minlength: 'Product name must be at least three characters.',
              maxlength: 'Product name cannot exceed 50 characters.'
          },
          Code: {
              required: 'Product code is required.'
          },
          Category: {
            required: 'Product category is required.'
        },
          StarRating: {
              range: 'Rate the product between 1 (lowest) and 5 (highest).'
          }
      };

      // Define an instance of the validator for use with this form, 
      // passing in this form's set of validation messages.
      this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
      // Define our Form Model using Form Builder
      this.productForm = this.fb.group({
          Name: ['', [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)]],
          Code: ['', Validators.required],
          Category: ['', Validators.required],
          StarRating: ['', [NumberValidators.range(1, 5)]],
          Tags: this.fb.array([]),
          Description: ''
      });

      // Read the product Id from the route parameter
      this.sub = this.route.params.subscribe(
          params => {
              let productId = params['productId'];
              if(productId){
              this.getProduct(productId);
              }
          }
      );
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
      // Watch for the blur event from any input element on the form.
      let controlBlurs: Observable<any>[] = this.formInputElements
          .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

      // Merge the blur event observable with the valueChanges observable
      Observable.merge(this.productForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
          this.displayMessage = this.genericValidator.processMessages(this.productForm);
      });
  }

  addTag(): void {
      this.Tags.push(new FormControl());
  }

  deleteTag(index: number): void {
      this.Tags.removeAt(index);
      // The line below is required in Angular 4 to fix a bug with `removeAt` that was fixed in Angular 5.
      this.productForm.setControl('Tags', this.fb.array(this.Tags.value || []));
  }

  // Get Product by id
  getProduct(id: string): void {
      this.productService.getProduct(id)
          .subscribe(
              (product: IProduct) => this.onProductRetrieved(product),
              (error: any) => this.errorMessage = <any>error
          );
  }

  onProductRetrieved(product: IProduct): void {
      if (this.productForm) {
          this.productForm.reset();
      }
      this.product = product;

      if (!this.product || !this.product.Id) {
          this.pageTitle = 'Add Product';
      } else {
          this.pageTitle = `Edit Product: ${this.product ? this.product.Name : ''}`;
      }

      // Update the data on the form.
      // We cannot use setValue with FormArray. So we have used patchValue here
      if (this.product) {
          this.productForm.patchValue({
              Name: this.product.Name,
              Code: this.product.Code,
              Category: this.product.Category,
              StarRating: this.product.StarRating,
              Description: this.product.Description
          });
      }
      this.productForm.setControl('Tags', this.fb.array(this.product.Tags || []));
  }

  deleteProduct(): void {
      if (!this.product.Id) {
          // Don't delete, it was never saved.
          this.onSaveComplete();
      } else {
          if (confirm(`Really delete the product: ${this.product.Name}?`)) {
              this.productService.deleteProduct(this.product.Id)
                  .subscribe(
                      () => this.onSaveComplete(),
                      (error: any) => this.errorMessage = <any>error
                  );
          }
      }
  }

  saveProduct(): void {
      if (this.productForm.dirty && this.productForm.valid) {
          // Copy the form values over the product object values
          /* Assign method takes 3 params: 
          1. Empty Destination object
          2. Map to
          3. Map From */
          let p = Object.assign({}, this.product, this.productForm.value);


          this.productService.saveProduct(p)
              .subscribe(
                  () => this.onSaveComplete(),
                  (error: any) => this.errorMessage = <any>error
              );
      } else if (!this.productForm.dirty) {
          this.onSaveComplete();
      }
  }

  onSaveComplete(): void {
      // Reset the form to clear the flags & all control states
      this.productForm.reset();
      this.router.navigate(['/products']);
  }

}
