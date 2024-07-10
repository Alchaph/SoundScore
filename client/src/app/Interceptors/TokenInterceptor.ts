// import {HttpInterceptorFn} from "@angular/common/http";
// import {HttpService} from "../services/HttpService/http.service";
// import {inject} from "@angular/core";
//
// export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
//   const methods: string[] = ['GET', 'POST', 'PUT', 'DELETE'];
//
//
//   console.log("request with token: {} : {}", req.url, localStorage.getItem('token'));
//   inject(HttpService).getHttpOptions();
//
//
//   if (!(req.url.includes('auth/email-exists'))) {
//     if (methods.includes(req.method)) {
//       const token: string | null = localStorage.getItem('token');
//       if (token) {
//         console.log('Token added {}', token);
//         req.headers.set('Authorization', `Bearer ${token}`);
//       }
//       return next(req);
//     }
//     return next(req);
//   }
//   return next(req);
// }
