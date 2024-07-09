import {Language} from "../app/enums/language";

export const environment: {
  url: 'http://localhost:8080/api',
  languages: (keyof typeof Language)[],
  options: {
    headers: {
      Authorization: string
    }
  }
} = {
  url: 'http://localhost:8080/api',
  languages: ['de', 'en', 'fr', 'zh', 'pt', 'Zch', 'e', 'es'],
  options: {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
};
