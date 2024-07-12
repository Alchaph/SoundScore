import { loginGuard } from './login.guard';
import { Router } from '@angular/router';

class RouterStub {
  navigate(url: string[]) { return url; }
}

describe('loginGuard', () => {
  let router: Router;

  beforeEach(() => {
    router = new RouterStub() as any;
  });

  it('should allow the authenticated user to access app', () => {
    spyOn(localStorage, 'getItem').and.returnValue('fake_token');
    const result = loginGuard(null!, null!);
    expect(result).toBeTrue();
  });

  it('should redirect an unauthenticated user to the home page', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const navigateSpy = spyOn(router, 'navigate');
    const result = loginGuard(null!, null!);
    expect(navigateSpy).toHaveBeenCalledWith(['']);
    expect(result).toBeFalse();
  });
});
