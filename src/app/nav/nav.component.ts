import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        console.log('Logged in');
      },
      (error) => {
        console.log('Error while logging in');
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    console.log('Logged out');
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return !!token; // returns true or false if token is empty
  }
}
