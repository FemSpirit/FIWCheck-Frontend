import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Registrierung } from './registrierung';

describe('Registrierung', () => {
  let component: Registrierung;
  let fixture: ComponentFixture<Registrierung>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registrierung],
    }).compileComponents();

    fixture = TestBed.createComponent(Registrierung);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
