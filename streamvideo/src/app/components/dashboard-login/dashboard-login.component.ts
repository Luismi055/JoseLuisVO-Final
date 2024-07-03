import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-dashboard-login',
  standalone: true, // Asegúrate de que este componente sea autónomo
  imports: [CommonModule, FormsModule], // Importa CommonModule y FormsModule
  templateUrl: './dashboard-login.component.html',
  styleUrls: ['./dashboard-login.component.css']
})
export class DashboardLoginComponent {
  email: string = '';
  password: string = '';

  // Credenciales predefinidas para acceder al dashboard
  private readonly adminEmail: string = 'admin@example.com';
  private readonly adminPassword: string = '1234admin';

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    if (this.email && this.password) {
      if (this.email === this.adminEmail && this.password === this.adminPassword) {
        this.loginService.login(this.email, this.password)
          .then(() => {
            this.router.navigate(['/dashboard']);
          })
          .catch((error) => {
            console.error(error);
            alert('Invalid email or password');
          });
      } else {
        alert('Unauthorized access');
      }
    } else {
      alert('Please provide email and password');
    }
  }
}