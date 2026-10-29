import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Statistikstudi } from './statistikstudi';

describe('Statistikstudi', () => {
  let component: Statistikstudi;
  let fixture: ComponentFixture<Statistikstudi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Statistikstudi],
    }).compileComponents();

    fixture = TestBed.createComponent(Statistikstudi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
