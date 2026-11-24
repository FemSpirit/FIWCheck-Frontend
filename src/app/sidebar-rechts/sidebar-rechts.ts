import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-sidebar-rechts',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-rechts.html',
  styleUrl: './sidebar-rechts.css',
  host: {
    '[class.collapsed]': 'isCollapsed()'
  }
})
export class SidebarRechtsComponent {
  isCollapsed = signal(false);

  // TODO: Werte später aus dem Backend/Service laden (aktuell Platzhalter wie im Mockup)
  name = signal('Marie');
  avatarUrl = 'assets/images/katzefiwilogo.png';
  lpBestanden = signal(55);
  lpGesamt = 180;
  notenschnitt = signal<number | null>(2.03);
  moduleDiesesSemester = signal(6);

  // Fortschritt in Prozent für den Balken
  fortschritt = computed(() =>
    Math.min(100, Math.round((this.lpBestanden() / this.lpGesamt) * 100))
  );

  // 2.03 -> "2,03", kein Wert -> "–"
  notenschnittText = computed(() => {
    const n = this.notenschnitt();
    return n === null ? '–' : n.toFixed(2).replace('.', ',');
  });

  toggleSidebar(): void {
    this.isCollapsed.update((val) => !val);
  }
}