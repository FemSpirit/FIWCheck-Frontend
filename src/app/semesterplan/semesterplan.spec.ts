import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Semesterplan} from './semesterplan';

describe('Semesterplan', () => {
  let component: Semesterplan;
  let fixture: ComponentFixture<Semesterplan>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Semesterplan]
    }).compileComponents();

    fixture = TestBed.createComponent(Semesterplan);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

})