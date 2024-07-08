import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'language'
})
export class LanguagePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    switch (value) {
      case 'de':
        return 'Deutsch';
      case 'en':
        return 'English';
      case 'fr':
        return 'Français';
      case 'zh':
        return '中文';
      case 'pt':
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
