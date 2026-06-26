import {Language} from "../app/enums/language";

export const environment: {
  url: string,
  languages: (keyof typeof Language)[],
} = {
  url: 'http://localhost:8080/api',
  languages: ['de', 'en', 'fr', 'zh', 'pt', 'Zch', 'e', 'es'],
};
