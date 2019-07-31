import { Component } from '@angular/core';
import { UserService } from './shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
  constructor(private userservice : UserService,private router : Router) {}

  ngOnInit() {
    if(localStorage.getItem('loginid') != null) {
      this.userservice.navlogin = true;
    }
    else {
      this.userservice.navlogin = false;
    }
    
    
  }

  logout() {
    this.userservice.deleteToken();
    localStorage.clear();
    this.userservice.navlogin = false;
  }
}
