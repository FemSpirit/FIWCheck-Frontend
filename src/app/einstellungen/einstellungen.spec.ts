import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Einstellungen } from './einstellungen';

describe('Einstellungen', () => {
  let component: Einstellungen;
  let fixture: ComponentFixture<Einstellungen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Einstellungen],
    }).compileComponents();

    fixture = TestBed.createComponent(Einstellungen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
