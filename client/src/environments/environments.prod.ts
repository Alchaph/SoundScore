import {Language} from "../app/enums/language";

export const environment: {
  url: string,
  languages: (keyof typeof Language)[],
} = {
  url: '/api',
  languages: ['de', 'en', 'fr', 'zh', 'pt', 'Zch', 'e', 'es'],
};
