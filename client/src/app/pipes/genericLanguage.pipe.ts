import {Pipe, PipeTransform} from '@angular/core';
import {map, Observable} from "rxjs";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {LanguageService} from "../services/languageService/language.service";

@Pipe({
  name: 'generictranslate',
  standalone: true
})
export class GenericLanguagePipe implements PipeTransform {

  constructor(private languageService: LanguageService, private sanitizer: DomSanitizer) {
  }

  transform(value: string): Observable<SafeHtml> {
    return this.languageService.translateText(value).pipe(
      map(response => {
        const translatedText = response;
        return this.sanitizer.bypassSecurityTrustHtml(<string>translatedText);
      })
    );
  }
}
