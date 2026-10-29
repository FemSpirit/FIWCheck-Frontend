import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Statistikprof } from './statistikprof';

describe('Statistikprof', () => {
  let component: Statistikprof;
  let fixture: ComponentFixture<Statistikprof>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Statistikprof],
    }).compileComponents();

    fixture = TestBed.createComponent(Statistikprof);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
