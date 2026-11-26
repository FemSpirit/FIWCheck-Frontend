import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarRechtsComponent } from './sidebar-rechts';

describe('SidebarRechtsComponent', () => {
  let component: SidebarRechtsComponent;
  let fixture: ComponentFixture<SidebarRechtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarRechtsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarRechtsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle collapsed state', () => {
    expect(component.isCollapsed()).toBe(false);
    component.toggleSidebar();
    expect(component.isCollapsed()).toBe(true);
  });

  it('should calculate progress and format grade', () => {
    expect(component.fortschritt()).toBe(31); // 55 von 180
    expect(component.notenschnittText()).toBe('2,03');
  });
});