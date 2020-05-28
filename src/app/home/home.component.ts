import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isRegistering = false;

  constructor() { }

  ngOnInit(): void {
  }

  registerClickToggle() {
    this.isRegistering = true;
  }

  cancelRegister(isRegistering: boolean) {
    this.isRegistering = isRegistering;
  }

}
