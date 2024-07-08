import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMobileComponent } from './home-mobile.component';

describe('HomeMobileComponent', () => {
  let component: HomeMobileComponent;
  let fixture: ComponentFixture<HomeMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMobileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
