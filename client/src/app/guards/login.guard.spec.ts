import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}

// Test suite
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";

class RouterStub {
  navigate(url: string[]) { return url; }
}

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let router: RouterStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule, TranslateModule.forRoot(), RouterTestingModule],
      providers: [
        LoginGuard,
        { provide: Router, useClass: RouterStub }
      ]
    });

    guard = TestBed.inject(LoginGuard);
    router = TestBed.inject(Router) as unknown as RouterStub;
  });

  it('should allow the authenticated user to access app', () => {
    spyOn(localStorage, 'getItem').and.returnValue('fake_token');
    const result = guard.canActivate();
    expect(result).toBeTrue();
  });

  it('should redirect an unauthenticated user to the home page', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const navigateSpy = spyOn(router, 'navigate');
    const result = guard.canActivate();
    expect(navigateSpy).toHaveBeenCalledWith(['']);
    expect(result).toBeFalse();
  });
});
