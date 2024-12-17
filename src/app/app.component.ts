import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { FilterAdsComponent } from "../components/filter-ads/filter-ads.component";
import { AdListComponent } from '../components/ad-list/ad-list.component';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../components/login/login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AdListComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false; // Update the login status
  }

  navigateToLoginOrSignup() {
    this.dialog.open(LoginComponent, {
      width: '300px',
      data: {} 
    });
    // this.router.navigate(['/login']); // or '/signup' based on your routing logic
  }
}
