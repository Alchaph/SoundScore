import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistProfileComponent } from './artist-profile.component';

describe('AddArtistComponent', () => {
  let component: ArtistProfileComponent;
  let fixture: ComponentFixture<ArtistProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
