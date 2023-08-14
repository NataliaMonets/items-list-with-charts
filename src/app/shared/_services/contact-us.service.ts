import { Injectable, signal } from '@angular/core';
import { ContactUs } from '../interfaces/data.interface';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
    providedIn: 'root'
})
export class ContactUsService {
    public sendEmailStatus = signal<string>(null);

    public async sendEmail(data: ContactUs): Promise<EmailJSResponseStatus> {
        emailjs.init('X7eFAZrQUwX3NBuGA');
        return await emailjs.send("service_1o4qakm","template_3bh5nsa", {...data});
    }
}
