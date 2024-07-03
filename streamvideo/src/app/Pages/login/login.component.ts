import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BG_IMG_URL, logo } from '../../constants/config';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logoUrl = logo;
  bgUrl = BG_IMG_URL;

  email!: string;
  password!: string;

  loginService = inject(LoginService);
  router = inject(Router);
  toastr = inject(ToastrService);
  auth = inject(Auth);
  firestore = inject(Firestore);

  ngOnInit() {
    this.loginService.currentUser$.subscribe(user => {
      if (user) {
        this.router.navigateByUrl('/browse');
      }
    });
  }

  onSubmit() {
    if (!this.email || !this.password) {
      this.toastr.error('Provide email or password');
      return;
    }

    this.loginService.login(this.email, this.password)
      .then(() => {
        this.router.navigate(['/browse']);
      })
      .catch((error: any) => {
        this.toastr.error('Invalid email or password');
      });
  }

  goToDashboardLogin() {
    this.router.navigate(['/dashboard-login']);
  }

  async registerWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(this.auth, provider);
      const userDocRef = doc(this.firestore, 'users', result.user.uid);
      await setDoc(userDocRef, { email: result.user.email });
      this.toastr.success('Logged in with Google successfully.');
      this.router.navigate(['/browse']);
    } catch (error: any) {
      this.toastr.error(error.message, 'Google sign-in failed');
    }
  }
}
