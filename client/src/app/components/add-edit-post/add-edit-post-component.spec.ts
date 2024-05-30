import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPostComponent } from './add-edit-post-component';

describe('AddPostComponent', () => {
  let component: AddEditPostComponent;
  let fixture: ComponentFixture<AddEditPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
