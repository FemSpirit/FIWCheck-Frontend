import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Subscription } from 'rxjs';

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
  isLoggedInStatus = false;
  private loginSubscription!: Subscription;

  constructor(private authService: AuthService) {
    this.loginSubscription = this.authService.loggedInChange.subscribe(
      (status) => {
        console.log('Sidebar empfängt Login-Status:', status);
        this.isLoggedInStatus = status;
      }
    );
  }

  toggleSidebar(): void {
    this.isCollapsed.update((val) => !val);
  }

  // geschuetzte sidebar ( nur fuer eingeloggte User )
  mainNavItems: NavItem[] = [
    { label: 'Startseite', icon: 'home', route: '/startseite' },
    { label: 'Profil', icon: 'person', route: '/profil' },
    { label: 'Semesterplan', icon: 'edit_calendar', route: '/semesterplan' },
    { label: 'Modulübersicht', icon: 'article', route: '/moduluebersicht' },
    { label: 'Noten', icon: 'book', route: '/noten' },
    { label: 'Statistik', icon: 'trending_up', route: '/statistikstudi' },
    { label: 'Kalender', icon: 'calendar_today', route: '/kalender' }
  ];

  // oeffentliche sidebar 
  publicNavItems: NavItem[] = [
    { label: 'Startseite', icon: 'home', route: '/startseite' },
    { label: 'Modulübersicht', icon: 'article', route: '/moduluebersicht' },
    { label: 'Tipps', icon: 'info', route: '/tipps' },
    { label: 'Login', icon: 'login', route: '/login' },
    { label: 'Registrierung', icon: 'person_add', route: '/registrierungsformular' }
  ];

  bottomNavItems: NavItem[] = [
    { label: 'Tipps', icon: 'info', route: '/tipps' },
    { label: 'Einstellungen', icon: 'settings', route: '/einstellungen' }
  ];

  isLoggedIn(): boolean {
    return this.isLoggedInStatus;

  }

  onLogout(): void {
    console.log('Logout geklickt');
    this.authService.logout();
    localStorage.removeItem('token');
  }
}