import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css', 
  host: {
    '[class.collapsed]': 'isCollapsed()'
  }
})

export class SidebarComponent {
  
  isCollapsed = signal(false);

  toggleSidebar(): void {
    this.isCollapsed.update((val) => !val);
  }

  mainNavItems: NavItem[] = [
    { label: 'Startseite', icon: 'home', route: '/startseite' },
    { label: 'Profil', icon: 'person', route: '/profil' },
    { label: 'Stundenplan', icon: 'edit_calendar', route: '/stundenplan' },
    { label: 'Modulübersicht', icon: 'article', route: '/moduluebersicht' },
    /* { label: 'Noten', icon: 'book', route: '/noten' }, erstmal raus*/                          /* Noten doch weg?, habs erstmal drinnen gelassen */
    { label: 'Statistik', icon: 'trending_up', route: '/statistikstudi' },
    { label: 'Kalender', icon: 'calendar_today', route: '/kalender' }
  ];

  bottomNavItems: NavItem[] = [
    { label: 'Tipps', icon: 'info', route: '/tipps' },
    { label: 'Einstellungen', icon: 'settings', route: '/einstellungen' }
  ];

  onLogout(): void {
    console.log('Logout geklickt');
  }
}