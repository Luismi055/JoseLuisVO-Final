import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, User, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, collection, collectionData, deleteDoc, doc, setDoc, updateDoc, query, where, getDocs, addDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  private usersCollection = collection(this.firestore, 'users');
  private videosCollection = collection(this.firestore, 'videos');

  constructor(private auth: Auth, private router: Router, private toastr: ToastrService, private firestore: Firestore) {
    onAuthStateChanged(this.auth, (user) => {
      console.log('Auth state changed:', user); 
      this.currentUserSubject.next(user);
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  register(email: string, password: string): Promise<void> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(async (result) => {
        this.toastr.success('Registered successfully.');
        await setDoc(doc(this.usersCollection, result.user.uid), { email: result.user.email });
        this.router.navigate(['/dashboard']);
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
  addVideo(url: string): Promise<void> {
    return addDoc(this.videosCollection, { url })
      .then(() => {
        console.log('Video added successfully');
      })
      .catch(error => {
        console.error('Error adding video: ', error);
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

  deleteUser(email: string): Promise<void> {
    return this.getUsersByEmail(email).then(users => {
      if (users.length === 0) {
        this.toastr.error('User not found');
        return Promise.reject('User not found');
      }
      
      const user = users[0];
      return deleteDoc(doc(this.usersCollection, user.uid))
        .then(() => {
          this.toastr.success('User deleted successfully');
          return;
        })
        .catch(error => {
          this.toastr.error(error.message, 'Delete failed');
          throw error;
        });
    });
  }

  getUsers(): Observable<any[]> {
    return collectionData(this.usersCollection, { idField: 'uid' });
  }

  getUsersByEmail(email: string): Promise<any[]> {
    const q = query(this.usersCollection, where("email", "==", email));
    return getDocs(q).then(querySnapshot => {
      return querySnapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id }));
    });
  }

  updateUser(uid: string, newEmail: string): Promise<void> {
    return updateDoc(doc(this.usersCollection, uid), { email: newEmail })
      .then(() => {
        this.toastr.success('User updated successfully');
        return;
      })
      .catch(error => {
        this.toastr.error(error.message, 'Update failed');
        throw error;
      });
  }

  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }

  get currentUser(): User | null {
    return this.auth.currentUser;
  }
  getVideos(): Observable<any[]> {
  return collectionData(this.videosCollection, { idField: 'id' });
}
}




 /* /*constructor() { }

  login(email: string, password: string): void {
    // Aquí, llamaremos a nuestra API de backend. Para este ejemplo, simplemente iniciamos sesión.
    // Supongamos que hemos iniciado sesión correctamente y obtuvimos un token del servicio.
    // Almacenaremos el token en el almacenamiento local.
    localStorage.setItem('token', Math.random().toString());
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Verifica si el token existe en el almacenamiento local
  }

  logout(): void {
    localStorage.removeItem('token');
  }*/
