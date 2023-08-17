import { formatDate } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactUsService } from 'src/app/shared/_services/contact-us.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
    private readonly contactUsService: ContactUsService = inject(ContactUsService);
    private readonly formBuilder: FormBuilder = inject(FormBuilder);
    public readonly form: FormGroup = this.getContactUsForm();
    public minDate: Date;
    public submitted: boolean = false;
    public loading: boolean = false;

    constructor() {
        this.minDate = new Date();
    }

    public get f() {
        return this.form.controls;
    }

    public async onSubmit(): Promise<void> {
        if (this.form.invalid) {
            this.submitted = true;
            return;
        }
        this.loading = true;
        const date = new Date(this.f['date'].value);
        const formattedDate = formatDate(date, 'dd/MM/yyyy', 'en-US');
        const result = await this.contactUsService.sendEmail({...this.form.value, date: formattedDate});
        this.loading = false;
        if (result.status === 200) {
            this.contactUsService.sendEmailStatus.set('success');
            this.form.reset();
        } else {
            this.contactUsService.sendEmailStatus.set('failure');
        }

        setTimeout(() => {
            this.contactUsService.sendEmailStatus.set(null);
        }, 3000);
    }

    private getContactUsForm(): FormGroup {
        return this.formBuilder.group({
            customerName: this.formBuilder.control('', [Validators.required]),
            email: this.formBuilder.control('', [Validators.required, Validators.email]),
            date: this.formBuilder.control('', [Validators.required]),
            additionalInfo: this.formBuilder.control('')
        });
    }

    public getErrorMessage(key: string): string {
        let message = null;
        switch (key) {
            case 'required':
                message = 'errorMessageRequired';
                break;
            case 'email':
                message = `errorMessageEmail`;
                break;
        }
        return message;
    }
}
