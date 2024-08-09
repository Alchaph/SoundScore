import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInformationComponent } from './user-information.component';
import { UserInformationService } from "../../services/UserInformationService/user-information.service";
import {BehaviorSubject, of} from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';

describe('UserInformationComponent', () => {
  let component: UserInformationComponent;
  let fixture: ComponentFixture<UserInformationComponent>;
  let userInformationServiceSpy: jasmine.SpyObj<UserInformationService>;

  beforeEach(async () => {
    userInformationServiceSpy = jasmine.createSpyObj('UserInformationService', ['getIsMessage', 'getMessage', 'hide']);

    await TestBed.configureTestingModule({
      imports: [UserInformationComponent],
      providers: [
        { provide: UserInformationService, useValue: userInformationServiceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserInformationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isMessage should return true (positive)', fakeAsync(() => {
    userInformationServiceSpy.getIsMessage.and.returnValue(of(true) as unknown as BehaviorSubject<boolean>);
    fixture.detectChanges();
    tick();
    expect(component.isMessage).toBeTruthy();
  }));

  it('isMessage should return false (negative)', () => {
    userInformationServiceSpy.getIsMessage.and.returnValue(of(false) as unknown as BehaviorSubject<boolean>);
    fixture.detectChanges();
    expect(component.isMessage).toBeFalsy();
  });

  it('message should return expected message (positive)', (done) => {
    const expectedMessage = 'Test Message';
    userInformationServiceSpy.getMessage.and.returnValue(of(expectedMessage));
    component.message.subscribe((message) => {
      expect(message).toEqual(expectedMessage);
      done();
    });
  });

  it('message should return unexpected message (negative)', (done) => {
    userInformationServiceSpy.getMessage.and.returnValue(of('Unexpected Message'));
    component.message.subscribe((message) => {
      expect(message).not.toEqual('Expected Message');
      done();
    });
  });

  it('hide should call userInformationService.hide() (positive)', () => {
    component.hide();
    expect(userInformationServiceSpy.hide.calls.count()).toBe(1);
  });
});
