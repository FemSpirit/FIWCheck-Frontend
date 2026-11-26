import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar';
import { SidebarRechtsComponent } from './sidebar-rechts/sidebar-rechts';

@Component({
  imports: [RouterOutlet, SidebarComponent, SidebarRechtsComponent],
  standalone: true,
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App {
  protected readonly title = signal('FIWCheck-Frontend');
}
