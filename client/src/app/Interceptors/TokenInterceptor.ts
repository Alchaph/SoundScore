import { HttpInterceptorFn } from "@angular/common/http";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const methods = ['GET', 'POST', 'PUT', 'DELETE'];
  if (!(req.url.includes('auth/email-exists'))) { //TODO delete this if
    if (methods.includes(req.method)) {
      const token = localStorage.getItem('token');
      if (token) {
        req.headers.set('Authorization', `Bearer ${token}`);
      }
      return next(req);
    }
    return next(req);
  }
  return next(req);
}
