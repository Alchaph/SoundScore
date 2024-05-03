import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadNavBarComponent } from './head-nav-bar.component';

describe('HeadNavBarComponent', () => {
  let component: HeadNavBarComponent;
  let fixture: ComponentFixture<HeadNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadNavBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
