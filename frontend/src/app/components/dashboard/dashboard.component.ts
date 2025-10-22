import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  multipleWinners: any[] = [];
  studios: any[] = [];
  intervals: any = { min: [], max: [] };
  winners: any[] = [];
  searchYear: number = 2018;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getYearsWithMultipleWinners()
      .subscribe(res => this.multipleWinners = res);  // já é lista
  
    this.movieService.getStudiosWithWinCount()
      .subscribe(res => this.studios = res.slice(0, 3)); // já é lista
  
    this.movieService.getIntervals()
      .subscribe(res => this.intervals = res);
  }
  
  getWinners() {
    this.movieService.getWinnersByYear(this.searchYear)
      .subscribe(res => {
        this.winners = Array.isArray(res) ? res : [res];
      });
  }
  
}
