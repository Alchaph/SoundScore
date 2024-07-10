import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeOrDislikeComponent } from './like-or-dislike.component';

describe('LikeOrDislikeComponent', () => {
  let component: LikeOrDislikeComponent;
  let fixture: ComponentFixture<LikeOrDislikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikeOrDislikeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LikeOrDislikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
