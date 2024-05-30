import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistRegisterEditComponent } from './artist-register-edit.component';

describe('ArtistRegisterComponent', () => {
  let component: ArtistRegisterEditComponent;
  let fixture: ComponentFixture<ArtistRegisterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistRegisterEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistRegisterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
