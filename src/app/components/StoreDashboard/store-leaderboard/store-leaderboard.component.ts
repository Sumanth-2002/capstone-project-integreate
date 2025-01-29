import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../side-bar/side-bar.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-store-leaderboard',
  imports: [HeaderComponent,SidebarComponent,CommonModule],
  
  templateUrl: './store-leaderboard.component.html',
  styleUrl: './store-leaderboard.component.css'
})
export class StoreLeaderboardComponent {
  leaderboardData: any[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchLeaderboardData();
  }
  fetchLeaderboardData(): void {
    // Replace with your backend API endpoint
    const apiUrl = 'http://localhost:9095/api/billing/get-leaderboard/STOR8D740A';

    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
        this.leaderboardData = data;
      },
      (error) => {
        console.error('Error fetching leaderboard data:', error);
      }
    );
  }
}



