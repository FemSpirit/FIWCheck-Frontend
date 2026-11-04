import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Registrierung } from './registrierung';
import { ReactiveFormsModule } from '@angular/forms';
import{NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('Registrierung', () => {
  let component: Registrierung;
  let fixture: ComponentFixture<Registrierung>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Registrierung
      , ReactiveFormsModule, 
      NoopAnimationsModule
    ],
    }).compileComponents();

    fixture = TestBed.createComponent(Registrierung);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
