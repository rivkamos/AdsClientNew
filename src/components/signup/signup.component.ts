import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user: User = new User();
  errorMessage: string;

  constructor(private authService: AuthService) {}

  signup() {
    this.authService.signup(this.user)
      .subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
        },
        error: (error) => {
          this.errorMessage = 'Signup failed: ' + error.message;
        }
      });
  }
}
