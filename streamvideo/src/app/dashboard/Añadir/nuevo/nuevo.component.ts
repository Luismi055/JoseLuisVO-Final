import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from '@angular/fire/firestore';
import { ToastrService} from 'ngx-toastr';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css'],
  standalone: true,
  imports: [FormsModule,CommonModule]
})
export class NuevoComponent implements OnInit {
  title: string = '';
  url: string = '';
  imageUrl: string = ''; // IMAGEN URL
  videos: any[] = [];
  editMode: boolean = false;
  currentVideoId: string | null = null;

  constructor(private firestore: Firestore, private toastr: ToastrService) {}

  ngOnInit() {
    this.loadVideos();
  }

  async loadVideos() {
    const videosCollection = collection(this.firestore, 'videos');
    const videoDocs = await getDocs(videosCollection);
    this.videos = videoDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async addVideo() {
    try {
      const videosCollection = collection(this.firestore, 'videos');
      if (this.editMode && this.currentVideoId) {
        const videoDoc = doc(this.firestore, `videos/${this.currentVideoId}`);
        await updateDoc(videoDoc, {
          title: this.title,
          url: this.url,
          imageUrl: this.imageUrl
        });
        this.toastr.success('Video actualizado exitosamente');
      } else {
        await addDoc(videosCollection, {
          title: this.title,
          url: this.url,
          imageUrl: this.imageUrl
        });
        this.toastr.success('Video añadido exitosamente');
      }
      this.resetForm();
      this.loadVideos();
    } catch (error) {
      console.error(error);
      this.toastr.error('Error al añadir/actualizar el video');
    }
  }

  editVideo(video: any) {
    this.title = video.title;
    this.url = video.url;
    this.imageUrl = video.imageUrl;
    this.currentVideoId = video.id;
    this.editMode = true;
  }

  async deleteVideo(videoId: string) {
    try {
      const videoDoc = doc(this.firestore, `videos/${videoId}`);
      await deleteDoc(videoDoc);
      this.toastr.success('Video eliminado exitosamente');
      this.loadVideos();
    } catch (error) {
      console.error(error);
      this.toastr.error('Error al eliminar el video');
    }
  }

  resetForm() {
    this.title = '';
    this.url = '';
    this.imageUrl = '';
    this.currentVideoId = null;
    this.editMode = false;
  }
}