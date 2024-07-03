import { Component, Input } from '@angular/core';
import { Movie } from '../../Types/movies';
import { tmdbCongif } from '../../constants/config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  @Input() movie! :Movie;
tmdbConfig = tmdbCongif;

}
