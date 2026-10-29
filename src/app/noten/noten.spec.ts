import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Noten } from './noten';

describe('Noten', () => {
  let component: Noten;
  let fixture: ComponentFixture<Noten>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Noten],
    }).compileComponents();

    fixture = TestBed.createComponent(Noten);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
