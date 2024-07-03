import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Movie } from '../../Types/movies';

@Component({
  selector: 'app-movie-category',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './movie-category.component.html',
  styleUrl: './movie-category.component.css'
})
export class MovieCategoryComponent {
@Input() title = "";
@Input() movieList:Movie [] = [];

}
