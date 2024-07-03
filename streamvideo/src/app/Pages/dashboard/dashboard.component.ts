import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router: Router, private loginService: LoginService) {}

  navigateTo(route: string) {
    this.router.navigate([`dashboard/${route}`]);
  }

  logout() {
    this.loginService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}