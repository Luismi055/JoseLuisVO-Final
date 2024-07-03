import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowseComponent } from './Pages/browse/browse.component';
import { LoginService } from './service/login.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,BrowseComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'streamvideo';
  
  constructor(private loginService: LoginService, private router: Router) {
    this.loginService.currentUser$.subscribe(user => {
      if (user) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
  
}
