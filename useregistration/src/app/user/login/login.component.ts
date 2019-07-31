import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms';
import { user } from '../../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model : user = new user();

  constructor(private userservice : UserService,private router : Router) { }

  
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  serverErrorMessages: string;
  

  ngOnInit() {
    if(this.userservice.isloggedIn) {
      this.router.navigateByUrl('/userprofile');
    }
  }

  onSubmit(form : NgForm) {
    this.userservice.login(form.value).subscribe(
      res => {
        this.userservice.setToken(res['token']);
        localStorage.setItem('loginid',res['token']);
        this.userservice.navlogin = true;
        this.router.navigateByUrl('/home');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

}
