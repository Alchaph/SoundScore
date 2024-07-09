import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPostsComponent } from './users-posts.component';

describe('UsersPostsComponent', () => {
  let component: UsersPostsComponent;
  let fixture: ComponentFixture<UsersPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersPostsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
