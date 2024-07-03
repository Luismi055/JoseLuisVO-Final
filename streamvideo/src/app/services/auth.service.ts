import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private router: Router, private toastr: ToastrService) {}

  register(email: string, password: string): Promise<void> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.toastr.success('Registered successfully.');
        this.router.navigate(['/browse']);
      })
      .catch((error) => {
        this.toastr.error(error.message, 'Registration failed');
        throw error;
      });
  }

  login(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.toastr.success('Logged in successfully.');
        this.router.navigate(['/browse']);
      })
      .catch((error) => {
        this.toastr.error(error.message, 'Login failed');
        throw error;
      });
  }

  logout(): Promise<void> {
    return signOut(this.auth)
      .then(() => {
        this.toastr.success('Logged out successfully.');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.toastr.error(error.message, 'Logout failed');
      });
  }

  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }

  onAuthStateChanged(callback: (user: any) => void) {
    const auth = getAuth();
    onAuthStateChanged(auth, callback);
  }
}