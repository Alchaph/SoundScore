import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSongComponent } from './add-edit-song.component';

describe('AddEditSongComponent', () => {
  let component: AddEditSongComponent;
  let fixture: ComponentFixture<AddEditSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditSongComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
