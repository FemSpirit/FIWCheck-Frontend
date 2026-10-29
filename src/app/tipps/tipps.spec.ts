import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tipps } from './tipps';

describe('Tipps', () => {
  let component: Tipps;
  let fixture: ComponentFixture<Tipps>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tipps],
    }).compileComponents();

    fixture = TestBed.createComponent(Tipps);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
