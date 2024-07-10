import {ApplicationConfig, importProvidersFrom, isDevMode} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpClient, provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {LanguageService} from "./services/languageService/language.service";
import {immediateProvider} from "rxjs/internal/scheduler/immediateProvider";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {LoadingInterceptor} from "./Interceptors/LoadingInterceptor";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './../assets/i18n/', '.json');
}


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withFetch()), provideAnimations(), provideHttpClient(withInterceptors([LoadingInterceptor])), provideAnimationsAsync(), LanguageService,
              importProvidersFrom(TranslateModule.forRoot({
                loader: {
                  provide: TranslateLoader,
                  useFactory: createTranslateLoader,
                  deps: [HttpClient]
                },
              }))],
};
