import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Product } from '../interfaces/data.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-product-modal',
    templateUrl: './product-modal.component.html',
    styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {
    private readonly translate: TranslateService = inject(TranslateService);
    private readonly formBuilder: FormBuilder = inject(FormBuilder);
    private readonly modalService: BsModalService = inject(BsModalService);

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

    constructor() {
        const currentYear = new Date().getFullYear();
        this.maxYear = new Date(currentYear, 11, 31);
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: this.formBuilder.control(null, { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100)] }),
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
        const formattedYear = this.formatDate(this.f['year'].value);
        // this.onAddProduct.emit({...this.form.getRawValue(), year: formattedYear});
        // this.hideModal();
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
                message = 'errorMessageRequired';
                break;
            case 'maxlength':
                message = this.translate.instant('errorMessageMaxLength', {requiredLength: error.value.requiredLength});
                break;
            case 'minlength':
                message = this.translate.instant('errorMessageMinLength', {requiredLength: error.value.requiredLength});
                break;
        }
        return message;
    }

    private formatDate(value): number {
        if (!value) return null;
        const parsedDate = new Date(value);
        const extractedYear = parsedDate.getUTCFullYear();
        return extractedYear;
    }
}
