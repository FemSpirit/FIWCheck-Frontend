import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Moduluebersicht } from './moduluebersicht';

describe('Moduluebersicht', () => {
  let component: Moduluebersicht;
  let fixture: ComponentFixture<Moduluebersicht>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Moduluebersicht],
    }).compileComponents();

    fixture = TestBed.createComponent(Moduluebersicht);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
