import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { loginGuard } from './login.guard';

class RouterStub {
  navigate(url: string[]) { return url; }
}

describe('loginGuard', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useClass: RouterStub }
      ]
    });
    router = TestBed.inject(Router);
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
