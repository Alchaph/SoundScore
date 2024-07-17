import { TestBed } from '@angular/core/testing';

import { JwtServiceService } from './jwt-service.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../../environments/environments";
import {User} from "../../models/User";
import {DataTranfer} from "../../models/DataTranfer";
import {Verification} from "../../models/Verification";
import {Artist} from "../../models/Artist";

describe('JwtServiceService', () => {
  let service: JwtServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JwtServiceService]
    });
    service = TestBed.inject(JwtServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login should post and return data', () => {
    const mockResponse = { token: 'fakeToken', expiresIn: 1234 };
    const testData = { username: 'testUser', password: 'testPass' };

    service.login(testData.username, testData.password).subscribe(response => {
      expect(response.token).toEqual(mockResponse.token);
      expect(response.expiresIn).toEqual(mockResponse.expiresIn);
    });

    const req = httpMock.expectOne(`${environment.url}/auth/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(testData);
    req.flush(mockResponse);
  });

  it('login should return undefined when username and password is empty', () => {
    service.login('', '').subscribe(response => {
      expect(response.token).toBeUndefined();
    });

    const req = httpMock.expectOne(`${environment.url}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush({ token: undefined, expiresIn: undefined });
  });

  it('login should return undefined when username is "A deleted User"', () => {

    service.login('A deleted User', 'test123').subscribe(response => {
      expect(response.token).toBeUndefined();
    });

    const req = httpMock.expectOne(`${environment.url}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush({ token: undefined, expiresIn: undefined });
  });

  it('register should post and return data', () => {
    const mockResponse = { id: 1, email: 'testMail@mail.com', password: 'testPass', username: 'testUser' };

    service.register(mockResponse.email, mockResponse.password, mockResponse.username).subscribe(response => {
      expect(response.id).toEqual(mockResponse.id);
      expect(response.email).toEqual(mockResponse.email);
      expect(response.password).toEqual(mockResponse.password);
      expect(response.username).toEqual(mockResponse.username);
    });

    const req = httpMock.expectOne(`${environment.url}/auth/signup`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('register should return undefined when email, password and username is empty', () => {
    service.register('', '', '').subscribe(response => {
      expect(response.id).toBeUndefined();
    });

    const req = httpMock.expectOne(`${environment.url}/auth/signup`);
    expect(req.request.method).toBe('POST');
    req.flush({ id: undefined, email: undefined, password: undefined, username: undefined });
  });

  it('register should return undefined when email is "A deleted User"', () => {
    service.register('A deleted User', 'test123', 'test123').subscribe(response => {
      expect(response.id).toBeUndefined();
    });

    const req = httpMock.expectOne(`${environment.url}/auth/signup`);
    expect(req.request.method).toBe('POST');
    req.flush({ id: undefined, email: undefined, password: undefined, username: undefined });
  });

  it('getUsers should get and return data', () => {
    const mockResponse: User[] = [
      { id: 1, email: 'mail@1.com', password: 'test1', username: 'test1', notifications: [] },
      { id: 2, email: 'mail@2.com', password: 'test2', username: 'test2', notifications: [] }
  ];

  service.getUsers().subscribe(response => {
      expect(response).toEqual(mockResponse);
  });

  const req = httpMock.expectOne(`${environment.url}/users/all`);
  expect(req.request.method).toBe('GET');
  req.flush(mockResponse);
  });

  it('getUsers should fail and return an error', () => {
    service.getUsers().subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/users/all`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });

  it('getUserById should get and return data', () => {
    const mockResponse: User = { id: 1, email: 'mail@1.com', password: 'test1', username: 'test1', notifications: [] };
    service.getUserById(1).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.url}/users/user/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
    });

  it('getUserById should fail and return an error', () => {
    service.getUserById(1).subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/users/user/1`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });

  it('getUserByArtistId should get and return data', () => {
    const mockResponse: User =       { id: 1, email: 'mail@1.com', password: 'test1', username: 'test1', notifications: [] };
    service.getUserByArtistId(1).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.url}/users/getByArtistId/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('getUserByArtistId should fail and return an error', () => {
    service.getUserByArtistId(1).subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/users/getByArtistId/1`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });

  it('getMe should get and return data', () => {
    const mockResponse: User =       { id: 1, email: 'mail@1.com', password: 'test1', username: 'test1', notifications: [] };
    service.getMe().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

  const req = httpMock.expectOne(`${environment.url}/users/me`);
  expect(req.request.method).toBe('GET');
  req.flush(mockResponse);
  });

  it('getMe should fail and return an error', () => {
    service.getMe().subscribe({
      next: () => fail('Expected to fail due to invalid HTTP options'),
      error: (error) => expect(error).toBeTruthy()
    });

    const req = httpMock.expectOne(`${environment.url}/users/me`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });

  it('verifyPassword should post and return success', () => {
    const mockResponse = { success: true };
    const testData = { username: 'testUser', password: 'testPass' };

    service.verifyPassword(testData.username, testData.password).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(environment.url + '/auth/verify-password');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(testData);
    req.flush(mockResponse);
  });

  it('verifyPassword should handle failure', () => {
    const testData = { username: 'testUser', password: 'wrongPass' };

    service.verifyPassword(testData.username, testData.password).subscribe({
      next: () => fail('This call should fail with a 401 error'),
      error: (error) => expect(error.status).toBe(401)
    });

    const req = httpMock.expectOne(environment.url + '/auth/verify-password');
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Unauthorized' }, { status: 401, statusText: 'Unauthorized' });
  });

  it('registerArtist should put and return the registered user', () => {
    const mockArtist: Artist = { id: 1, name: 'New Artist', description: 'Description', image: 'Image' }
    const mockResponse: User = { id: 1, email: 'test@test.com', password: 'testPass', username: 'testUser', notifications: [] };

    service.registerArtist(mockArtist).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(environment.url + '/users/register-artist');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockArtist);
    req.flush(mockResponse);
  });

  it('registerArtist should handle failure', () => {
    const mockArtist = { id: 1, name: 'New Artist', description: 'Description', image: 'Image' };
    const errorResponse = { message: 'Error registering artist' };

    service.registerArtist(mockArtist).subscribe({
      next: () => fail('This call should fail with a server error'),
      error: (error) => {
        expect(error.error).toEqual(errorResponse);
        expect(error.status).toBe(500);
      }
    });

    const req = httpMock.expectOne(`${environment.url}/users/register-artist`);
    expect(req.request.method).toBe('PUT');
    req.flush(errorResponse, { status: 500, statusText: 'Server Error' });
  });

  it('updateUser should put and return the updated user', () => {
    const mockUser: User = { id: 1, username: 'testUser', email: 'test@test.com', password: 'testPass',
      artist: { id: 1, name: 'New Artist', description: 'Description', image: 'Image' },
      created_at: new Date(), updated_at: new Date(), enabled: true, authorities: [], accountNonLocked: true, notifications: [] };
    const mockResponse:User = { ...mockUser, username: 'updatedUser' };

    service.updateUser(mockUser).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.url}/users`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockUser);
    req.flush(mockResponse);
  });

  it('updateUser should handle failure', () => {
    const mockUser: User = { id: 1, username: 'testUser', email: 'test@test.com', password: 'testPass',
      artist: { id: 1, name: 'New Artist', description: 'Description', image: 'Image' },
      created_at: new Date(), updated_at: new Date(), enabled: true, authorities: [], accountNonLocked: true, notifications: [] };
    const errorResponse = { message: 'Error updating user' };

    service.updateUser(mockUser).subscribe({
      next: () => fail('This call should fail with a server error'),
      error: (error) => {
        expect(error.error).toEqual(errorResponse);
        expect(error.status).toBe(500);
      }
    });
    const req = httpMock.expectOne(`${environment.url}/users`);
    expect(req.request.method).toBe('PUT');
    req.flush(errorResponse, { status: 500, statusText: 'Server Error' });
  });

  it('deleteMe should send a DELETE request and return the deleted user', () => {
    const mockResponse: User = { id: 1, username: 'testUser', email: 'test@test.com', password: 'testPass',
      artist: { id: 1, name: 'New Artist', description: 'Description', image: 'Image' },
      created_at: new Date(), updated_at: new Date(), enabled: true, authorities: [], accountNonLocked: true, notifications: [] };

    service.deleteMe().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.url}/users`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('deleteMe should handle failure', () => {
    const errorResponse = { message: 'Error deleting user' };

    service.deleteMe().subscribe({
      next: () => fail('This call should fail with a server error'),
      error: (error) => {
        expect(error.error).toEqual(errorResponse);
        expect(error.status).toBe(500);
      }
    });

    const req = httpMock.expectOne(`${environment.url}/users`);
    expect(req.request.method).toBe('DELETE');
    req.flush(errorResponse, { status: 500, statusText: 'Server Error' });
  });

  it('emailExists should return true if the email exists', () => {
    const testEmail = 'existing@test.com';
    const mockResponse = true;

    service.emailExists(testEmail).subscribe(response => {
      expect(response).toBeTrue();
    });

    const req = httpMock.expectOne(`${environment.url}/auth/email-exists/${testEmail}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('emailExists should return false if the email does not exist', () => {
    const testEmail = 'nonexisting@test.com';
    const mockResponse = false;

    service.emailExists(testEmail).subscribe(response => {
      expect(response).toBeFalse();
    });

    const req = httpMock.expectOne(`${environment.url}/auth/email-exists/${testEmail}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('emailExists should handle server errors', () => {
    const testEmail = 'error@test.com';
    const errorMessage = 'Unable to check if email exists';

    service.emailExists(testEmail).subscribe({
      next: () => fail('Expected an error to be thrown'),
      error: (error) => {
        expect(error.statusText).toBe('Server Error');
        expect(error.status).toBe(500);
        expect(error.error).toBe(errorMessage);
      }
    });

    const req = httpMock.expectOne(`${environment.url}/auth/email-exists/${testEmail}`);
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });

  it('usernameExists should return true if the username exists', () => {
    const testUsername = 'existingUser';
    const mockResponse = true;

    service.usernameExists(testUsername).subscribe(response => {
      expect(response).toBeTrue();
    });

    const req = httpMock.expectOne(`${environment.url}/auth/username-exists/${testUsername}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('usernameExists should return false if the username does not exist', () => {
    const testUsername = 'nonExistingUser';
    const mockResponse = false;

    service.usernameExists(testUsername).subscribe(response => {
      expect(response).toBeFalse();
    });

    const req = httpMock.expectOne(`${environment.url}/auth/username-exists/${testUsername}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('usernameExists should handle server errors', () => {
    const testUsername = 'errorUser';
    const errorMessage = 'Unable to check if username exists';

    service.usernameExists(testUsername).subscribe({
      next: () => fail('Expected an error to be thrown'),
      error: (error) => {
        expect(error.statusText).toBe('Server Error');
        expect(error.status).toBe(500);
        expect(error.error).toBe(errorMessage);
      }
    });

    const req = httpMock.expectOne(`${environment.url}/auth/username-exists/${testUsername}`);
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });

  it('getUsernameByEMail should return data when the email is found', () => {
    const testEmail = 'test@test.com';
    const mockResponse:DataTranfer = { data: 'testUser' };

    service.getUsernameByEMail(testEmail).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.url}/auth/username-by-email/${testEmail}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('getUsernameByEMail should handle server errors', () => {
    const testEmail = 'error@test.com';
    const mockError = new ErrorEvent('Network error', {
      message: 'Unable to retrieve username by email'
    });

    service.getUsernameByEMail(testEmail).subscribe({
      next: () => fail('Expected an error to be thrown'),
      error: (error) => expect(error.error).toBe(mockError.message)
    });
  });

  it('authenticate should send a POST request and return verification data', () => {
    const testEmail = 'test@test.com';
    const mockResponse: Verification = { username: 'test', otp: '1234'};
    service.authenticate(testEmail).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.url}/auth/authenticate`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ data: testEmail });
    req.flush(mockResponse);
  });

  it('authenticate should handle server errors', () => {
    const testEmail = 'error@test.com';
    const errorMessage = 'Unable to authenticate email';
    const mockErrorResponse = { status: 500, statusText: 'Server Error', error: { message: errorMessage } };

    service.authenticate(testEmail).subscribe({
      next: () => fail('Expected an error to be thrown'),
      error: (error) => {
        expect(error.status).toBe(mockErrorResponse.status);
        expect(error.statusText).toBe(mockErrorResponse.statusText);
        expect(error.error.message).toBe(errorMessage);
      }
    });
  });

  it('verify should return true if the OTP is correct', () => {
    const testEmail = 'test@test.com';
    const testUsername = 'testUser';
    const testOtp = '123456';
    const mockResponse = true;

    service.verify(testEmail, testUsername, testOtp).subscribe(response => {
      expect(response).toBeTrue();
    });

    const req = httpMock.expectOne(`${environment.url}/auth/verify-Otp`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: testEmail, otp: testOtp });
    req.flush(mockResponse);
  });

  it('verify should return false if the OTP is incorrect', () => {
    const testEmail = 'test@test.com';
    const testUsername = 'testUser';
    const testOtp = '654321';
    const mockResponse = false;

    service.verify(testEmail, testUsername, testOtp).subscribe(response => {
      expect(response).toBeFalse();
    });

    const req = httpMock.expectOne(`${environment.url}/auth/verify-Otp`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ username: testEmail, otp: testOtp });
    req.flush(mockResponse);
  });

  it('verify should handle server errors', () => {
    const testEmail = 'test@test.com';
    const testUsername = 'testUser';
    const testOtp = 'error';
    const errorMessage = 'Unable to verify OTP';
    const mockErrorResponse = { status: 500, statusText: 'Server Error', error: { message: errorMessage } };

    service.verify(testEmail, testUsername, testOtp).subscribe({
      next: () => fail('Expected an error to be thrown'),
      error: (error) => {
        expect(error.status).toBe(mockErrorResponse.status);
        expect(error.statusText).toBe(mockErrorResponse.statusText);
        expect(error.error.message).toBe(errorMessage);
      }
    });

    const req = httpMock.expectOne(`${environment.url}/auth/verify-Otp`);
    expect(req.request.method).toBe('POST');
    req.flush(mockErrorResponse.error, { status: mockErrorResponse.status, statusText: mockErrorResponse.statusText });
  });

  it('updatePassword should send a PUT request and return updated user data', () => {
    const testEmail = 'test@test.com';
    const testPassword = 'newPassword';
    const mockResponse: User = { id: 1, email: testEmail, password: testPassword, username: 'testUser', artist:undefined, notifications: [] };
    service.updatePassword(testEmail, testPassword).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.url}/auth/update-password`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ email: testEmail, password: testPassword });
    req.flush(mockResponse);
  });

  it('updatePassword should handle server errors', () => {
    const testEmail = 'error@test.com';
    const testPassword = 'newPassword';
    const errorMessage = 'Unable to update password';

    service.updatePassword(testEmail, testPassword).subscribe({
      next: () => fail('Expected an error to be thrown'),
      error: (error) => {
        expect(error.statusText).toBe('Server Error');
        expect(error.status).toBe(500);
        expect(error.error).toBe(errorMessage);
      }
    });

    const req = httpMock.expectOne(`${environment.url}/auth/update-password`);
    expect(req.request.method).toBe('PUT');
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });

  it('deleteAccountByUsername should send a DELETE request and return deleted user data', () => {
    const testUsername = 'testUser';
    const mockResponse: User = { id: 1, email: 'testEmail', password: 'testPassword', username: 'testUser', artist:undefined, notifications: [] };

    service.deleteAccountByUsername(testUsername).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.url}/auth/delete-account/${testUsername}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('deleteAccountByUsername should handle server errors', () => {
    const testUsername = 'errorUser';
    const errorMessage = 'Unable to delete account';
    const mockErrorResponse = { status: 500, statusText: 'Server Error', error: { message: errorMessage } };

    service.deleteAccountByUsername(testUsername).subscribe({
      next: () => fail('Expected an error to be thrown'),
      error: (error) => {
        expect(error.status).toBe(mockErrorResponse.status);
        expect(error.statusText).toBe(mockErrorResponse.statusText);
        expect(error.error.message).toBe(errorMessage);
      }
    });

    const req = httpMock.expectOne(`${environment.url}/auth/delete-account/${testUsername}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockErrorResponse.error, { status: mockErrorResponse.status, statusText: mockErrorResponse.statusText });
  });
});

