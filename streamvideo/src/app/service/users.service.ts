import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private firestore: Firestore) {}

  async getUserRole(user: User): Promise<string | null> {
    const userDoc = doc(this.firestore, `users/${user.uid}`);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      return userData['role'] || null;
    } else {
      return null;
    }
  }
}
