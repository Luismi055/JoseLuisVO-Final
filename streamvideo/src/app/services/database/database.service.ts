/*import { Injectable, inject } from '@angular/core';
//import { Database } from '@angular/fire/database';
import { addDoc, collection, CollectionReference, 
  doc, Firestore, getDocs, query, where } from '@angular/fire/firestore';
  



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  list(dbPath: string) {
    throw new Error('Method not implemented.');
  }
  object(arg0: string) {
    throw new Error('Method not implemented.');
  }
  createPushId() {
    throw new Error('Method not implemented.');
  }
  getUserByEmail(email: string) {
    throw new Error('Method not implemented.');
  }
  private readonly data:Firestore = inject(Firestore)

  private readonly collection$ : CollectionReference = collection(this.data, 'users')
  constructor() { }
  
  private document(path: string, id: string){
    return doc(this.data, `${path}/${id}`)
  }

  async createUser(data: UserDto){
    return await addDoc(this.collection$, data)
  }


  async getUser(id: string){
    try {
      let user: UserDto = {} as UserDto

      const q = query(this.collection$, where('id', '==', id))

      const querySnapshot = await getDocs(q)


      querySnapshot.forEach((doc) =>{
        user = {...doc.data() as UserDto}
      })

      return user


    } catch (error) {
      console.error(error)
      return  {} as UserDto
    }
  }
}*/