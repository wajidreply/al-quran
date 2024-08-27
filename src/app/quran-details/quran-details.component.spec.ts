import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuranDetailsComponent } from './quran-details.component';

describe('QuranDetailsComponent', () => {
  let component: QuranDetailsComponent;
  let fixture: ComponentFixture<QuranDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuranDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuranDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
