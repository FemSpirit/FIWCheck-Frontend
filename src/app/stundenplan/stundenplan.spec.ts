import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Stundenplan } from './stundenplan';

describe('Stundenplan', () => {
  let component: Stundenplan;
  let fixture: ComponentFixture<Stundenplan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stundenplan],
    }).compileComponents();

    fixture = TestBed.createComponent(Stundenplan);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
