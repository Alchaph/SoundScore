import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import { UserInformationService } from './user-information.service';

describe('UserInformationService', () => {
  let service: UserInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('hide() should set isMessage to false', () => {
    service.hide();
    service.getIsMessage().subscribe(isMessage => {
      expect(isMessage).toBeFalse();
    });
  });

  it('getIsMessage() should return the current value of isMessage', fakeAsync(() => {
    service.hide();
    tick();
    service.getIsMessage().subscribe(isMessage => {
      expect(isMessage).toBeFalse();
    });

    service.setMessage('Test Message');
    tick();
    service.getIsMessage().subscribe(isMessage => {
      expect(isMessage).toBeTrue();
    });
  }));

  it('setMessage(message: string) should update message and isMessage', () => {
    const testMessage = 'Test Message';
    service.setMessage(testMessage);
    service.getMessage().subscribe(message => {
      expect(message).toEqual(testMessage);
    });
    service.getIsMessage().subscribe(isMessage => {
      expect(isMessage).toBeTrue();
    });
  });

  it('getMessage() should return the current value of message', () => {
    const testMessage = 'Another Test Message';
    service.setMessage(testMessage);
    service.getMessage().subscribe(message => {
      expect(message).toEqual(testMessage);
    });
  });
});
