import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import { LoaderService } from '../../services/LoaderService/loader.service';
import { of } from 'rxjs';
import {computeMsgId} from "@angular/compiler";

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let loaderServiceMock: any;

  let LoaderComponentMock: Partial<LoaderComponent>;

  beforeEach(async () => {
    LoaderComponentMock = {
      ngOnInit: jasmine.createSpy('ngOnInit')
    }
    loaderServiceMock = {
      getIsLoading: jasmine.createSpy('getIsLoading').and.returnValue(of(true))
    };

    await TestBed.configureTestingModule({
      providers: [
        { provide: LoaderService, useValue: loaderServiceMock },
        { provide: LoaderComponent, useValue: LoaderComponentMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should set isLoading to true', () => {
    component.ngOnInit();
    component.isLoading.subscribe(isLoading => {
      expect(isLoading).toBeTrue();
    });
  });

  it('ngOnInit should handle LoaderService returning false', () => {
    loaderServiceMock.getIsLoading.and.returnValue(of(false));
    component.ngOnInit();
    component.isLoading.subscribe(isLoading => {
      expect(isLoading).toBeFalse();
    });
  });
});
