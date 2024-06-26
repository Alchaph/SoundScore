import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'language'
})
export class LanguagePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'de':
        return 'Deutsch';
      case 'en':
        return 'English';
      case 'fr':
        return 'Français';
      case 'ch':
        return '中文';
      case 'po':
        return 'Português';
      case 'Zch':
        return 'Züridütsch';
      case 'e':
        return 'Emoji';
      case 'es':
        return 'Español';
      case 'hx':
        return 'Hexadezimal';
      case 'b':
        return 'Binary';
      case 'ha':
        return 'Hacker';
      case 'd':
        return 'Miguelo';
      default:
        return 'Deutsch';
    }
  }

}
