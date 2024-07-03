import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../service/movie.service';
import { Movie } from '../../Types/movies';
import { tmdbCongif } from '../../constants/config';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginService } from '../../service/login.service'; // Importar LoginService
import { HeaderComponent } from '../../componenets/header/header.component';
import { MovieCategoryComponent } from '../../componenets/movie-category/movie-category.component';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MovieCategoryComponent, FormsModule],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit {
  popularMovie: Movie[] = [];
  topRatedMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  nowPlayingMovie: Movie[] = [];
  bannerMovie!: Movie;
  tmdbConfig = tmdbCongif;
  customVideos: any[] = [];

  searchTerm: string = '';
  filteredPopularMovies: Movie[] = [];
  filteredTopRatedMovies: Movie[] = [];
  filteredNowPlayingMovies: Movie[] = [];
  filteredUpcomingMovies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    public domSanitise: DomSanitizer,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.movieService.getPopularMovies().subscribe((result: any) => {
      this.popularMovie = result.results;
      this.filteredPopularMovies = this.popularMovie;
      this.bannerMovie = this.popularMovie[0];
      this.movieService.getMovieVideos(this.bannerMovie.id).subscribe((res: any) => {
        this.bannerMovie.videoKey = res.results.find((x: any) => x.site === 'YouTube').key;
      });
    });

    this.movieService.getTopRatedMovies().subscribe((result: any) => {
      this.topRatedMovies = result.results;
      this.filteredTopRatedMovies = this.topRatedMovies;
    });

    this.movieService.getNowPlayingMovies().subscribe((result: any) => {
      this.nowPlayingMovie = result.results;
      this.filteredNowPlayingMovies = this.nowPlayingMovie;
    });

    this.movieService.getUpcomingMovies().subscribe((result: any) => {
      this.upcomingMovies = result.results;
      this.filteredUpcomingMovies = this.upcomingMovies;
    });

    this.loginService.getVideos().subscribe((videos: any[]) => {
      this.customVideos = videos;
    });
  }

  searchMovies() {
    const term = this.searchTerm.toLowerCase();
    this.filteredPopularMovies = this.popularMovie.filter(movie => movie.original_title.toLowerCase().includes(term));
    this.filteredTopRatedMovies = this.topRatedMovies.filter(movie => movie.original_title.toLowerCase().includes(term));
    this.filteredNowPlayingMovies = this.nowPlayingMovie.filter(movie => movie.original_title.toLowerCase().includes(term));
    this.filteredUpcomingMovies = this.upcomingMovies.filter(movie => movie.original_title.toLowerCase().includes(term));
  }

  goToDashboardLogin() {
    this.router.navigate(['/dashboard-login']);
  }

  logout() {
    this.loginService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }

  playVideo(videoUrl: string) {
    this.router.navigate(['/video-player'], { queryParams: { url: videoUrl } });
  }
}
