import { Component, inject } from '@angular/core';
import { logo } from '../../constants/config';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  logoUrl = logo;
  router = inject(Router); // Usar inyección de dependencias

  navigateTo(route: string) {
    this.router.navigate([`dashboard/${route}`]);
  }

  goToDashboardLogin() {
    console.log('Navigating to /dashboard-login'); // Logging para debugging
    console.log('Router instance:', this.router); // Verificar la instancia de Router
    this.router.navigate(['/dashboard-login'])
      .then(success => {
        if (success) {
          console.log('Navigation to /dashboard-login successful');
        } else {
          console.log('Navigation to /dashboard-login failed');
        }
      })
      .catch(err => {
        console.error('Navigation error:', err);
      });
  }
}