import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Moduldetails } from './moduldetails';

describe('Moduldetails', () => {
  let component: Moduldetails;
  let fixture: ComponentFixture<Moduldetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Moduldetails],
    }).compileComponents();

    fixture = TestBed.createComponent(Moduldetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
