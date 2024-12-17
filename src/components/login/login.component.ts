import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,  
    MatCardModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: User = new User();

  constructor(private authService: AuthService, 
    private router: Router, 
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<LoginComponent>) {}

  login(): void {
      this.authService.login(this.user).subscribe(
          response => {
              this.authService.setCurrentUser({ id: response.id, password: response.password, email: response.email });
              this.dialogRef.close();
            },
          error => {
              console.error('Login failed', error);
          }
      );
  }


  navigateToSignup() {
    this.dialog.open(SignupComponent, {
      width: '300px',
      data: {} 
    });
  }
}
