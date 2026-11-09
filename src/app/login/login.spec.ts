import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from './login';
import { provideRouter } from '@angular/router';

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideRouter([])] // Wichtig wegen RouterLink in der Komponente
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate the form when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should validate email and password fields correctly', () => {
    const emailCtrl = component.loginForm.get('email');
    const passwordCtrl = component.loginForm.get('password');

    // Teste ungültige E-Mail
    emailCtrl?.setValue('falsche-email');
    passwordCtrl?.setValue('geheim123');
    expect(component.loginForm.valid).toBeFalsy();

    // Teste gültige E-Mail
    emailCtrl?.setValue('student@htw-berlin.de');
    expect(component.loginForm.valid).toBeTruthy();
  });
});