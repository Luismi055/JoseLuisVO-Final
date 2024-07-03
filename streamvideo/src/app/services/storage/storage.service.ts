import {inject, Injectable} from '@angular/core';
import {ref, Storage, uploadBytesResumable} from "@angular/fire/storage";


export class FileUpload{
  key!: string;
  name!: string;
  url!: string;
  file!: File;
  constructor(file: File) {
    this.file = file
  }
}

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {
  private readonly storage:Storage = inject(Storage)
  ref: any;
  upload: any;
  constructor() { }



  async uploadFile(data: File, path: string){
    const fileUpload = new FileUpload(data)
    const bucketRef = ref(this.storage, `${path}/${fileUpload.file.name}`)
    return uploadBytesResumable(bucketRef, fileUpload.file)
  }
}