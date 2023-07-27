import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Product } from '../interfaces/product.interface';

@Component({
    selector: 'app-product-modal',
    templateUrl: './product-modal.component.html',
    styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {

    @Input() isEditMode: boolean = false;
    public modalRef: BsModalRef;
    public form: FormGroup;
    public submitted: boolean = false;
    public maxYear: Date;
    @ViewChild('template') elementRef: TemplateRef<Element>;
    @Output() onAddProduct = new EventEmitter();
    @Output() onEditProduct = new EventEmitter();

    private productData: Product;

    public get f() {
        return this.form.controls;
    }

    constructor(
        private modalService: BsModalService,
        private formBuilder: FormBuilder
    ) {
        const currentYear = new Date().getFullYear();
        this.maxYear = new Date(currentYear, 11, 31);
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: this.formBuilder.control(null, { validators: [Validators.required] }),
            price: this.formBuilder.control(null, { validators: [Validators.required] }),
            year: this.formBuilder.control(null, { validators: [Validators.required] })
        });
    }

    public openEditModal(productDeatils: Product): void {
        this.productData = productDeatils;
        this.f['name'].setValue(productDeatils.name);
        this.f['price'].setValue(productDeatils.price);
        this.f['year'].setValue(productDeatils.year);
        this.openModal();
    }

    public openModal(): void {
        this.modalRef = this.modalService.show(this.elementRef);
    }

    public addProduct(): void {
        if (!this.form.valid) {
            this.submitted = true;
            return;
        }
        this.onAddProduct.emit(this.form.getRawValue());
        this.hideModal();
    }

    public editProduct(): void {
        if (!this.form.valid) {
            this.submitted = true;
            return;
        }
        this.onEditProduct.emit({ ...this.form.getRawValue(), id: this.productData.id });
        this.hideModal();
    }

    public hideModal(): void {
        if (this.modalRef) {
            this.modalRef.hide();
        }
        this.form.reset();
        this.submitted = false;
    }

    public getErrorMessage(key: string, error): string {
        let message = null;
        switch (key) {
            case 'required':
                message = '*This field is required';
                break;
            case 'maxlength':
                message = `*Please enter maximum ${error.value.requiredLength} characters`;
                break;
            case 'minlength':
                message = `*Please enter minimum ${error.value.requiredLength} characters`;
                break;
        }
        return message;
    }
}
