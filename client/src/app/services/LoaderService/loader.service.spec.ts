import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';
import { BehaviorSubject } from 'rxjs';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService]
    });
    service = TestBed.inject(LoaderService);
  });

  it('should start with isLoading as false', () => {
    service.getIsLoading().subscribe(isLoading => {
      expect(isLoading).toBe(false);
    });
  });

  it('should set isLoading to true when show is called', () => {
    service.show();
    service.getIsLoading().subscribe(isLoading => {
      expect(isLoading).toBe(true);
    });
  });

  it('should set isLoading to false when hide is called after show', () => {
    service.show();
    service.hide();
    service.getIsLoading().subscribe(isLoading => {
      expect(isLoading).toBe(false);
    });
  });

  it('should keep isLoading as true if hide is called without show', () => {
    service.hide();
    service.getIsLoading().subscribe(isLoading => {
      expect(isLoading).toBe(false);
    });
  });

  it('should keep isLoading as true if show is called multiple times and hide is called fewer times', () => {
    service.show();
    service.show();
    service.hide();
    service.getIsLoading().subscribe(isLoading => {
      expect(isLoading).toBe(true);
    });
  });

  it('should set isLoading to false if show is called multiple times and hide is called the same number of times', () => {
    service.show();
    service.show();
    service.hide();
    service.hide();
    service.getIsLoading().subscribe(isLoading => {
      expect(isLoading).toBe(false);
    });
  });

  it('should not set isLoading to false if hide is called more times than show', () => {
    service.show();
    service.hide();
    service.hide();
    service.getIsLoading().subscribe(isLoading => {
      expect(isLoading).toBe(false);
    });
  });
});
