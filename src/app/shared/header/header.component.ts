import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguagesData } from './header.constanst';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    private readonly translate: TranslateService = inject(TranslateService);
    public languages = LanguagesData;
    public selectedLanguage: string = 'en';

    constructor() {
        this.translate.setDefaultLang('en');
        this.translate.use('en');
    }
    onLanguageChange(lang: string): void {
        this.selectedLanguage = lang;
        this.translate.use(lang);
    }
}
