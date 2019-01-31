import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
    templateUrl: './product-edit.component.html'
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

    get tags(): FormArray {
        return <FormArray>this.productForm.get('tags');
    }

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            name: {
                required: 'Product name is required.',
                minlength: 'Product name must be at least three characters.',
                maxlength: 'Product name cannot exceed 50 characters.'
            },
            code: {
                required: 'Product code is required.'
            },
            starRating: {
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
            name: ['', [Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)]],
            code: ['', Validators.required],
            starRating: ['', [NumberValidators.range(1, 5)]],
            tags: this.fb.array([]),
            description: ''
        });

        // Read the product Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getProduct(id);
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
        this.tags.push(new FormControl());
    }

    deleteTag(index: number): void {
        this.tags.removeAt(index);
        // The line below is required in Angular 4 to fix a bug with `removeAt` that was fixed in Angular 5.
        this.productForm.setControl('tags', this.fb.array(this.tags.value || []));
    }

    // Get Product by id
    getProduct(id: number): void {
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

        if (!this.product || this.product.id === 0) {
            this.pageTitle = 'Add Product';
        } else {
            this.pageTitle = `Edit Product: ${this.product ? this.product.name : ''}`;
        }

        // Update the data on the form.
        // We cannot use setValue with FormArray. So we have used patchValue here
        if (this.product) {
            this.productForm.patchValue({
                productName: this.product.name,
                productCode: this.product.code,
                starRating: this.product.starRating,
                description: this.product.description
            });
        }
        this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
    }

    deleteProduct(): void {
        if (this.product.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.product.name}?`)) {
                this.productService.deleteProduct(this.product.id)
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