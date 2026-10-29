import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Stupo } from './stupo';

describe('Stupo', () => {
  let component: Stupo;
  let fixture: ComponentFixture<Stupo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stupo],
    }).compileComponents();

    fixture = TestBed.createComponent(Stupo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
