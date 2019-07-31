import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder, NgForm } from '@angular/forms/';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  updateForm : FormGroup;
  dob : Date;
  _id : string;
  constructor(private userService: UserService, private router: Router,private fb : FormBuilder) { }

  ngOnInit() {

    this.updateForm = this.fb.group({
      
      email : [''],
      password : [''],
      Name : [''],
      dob : [''],
      phone : ['']
    })
    this.userService.getuserprofile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.updateForm.controls.email.setValue(this.userDetails.email);
        this.updateForm.controls.password.setValue(this.userDetails.password);
        this.updateForm.controls.Name.setValue(this.userDetails.Name);
        this.updateForm.controls.dob.setValue(this.userDetails.dob);
        this.updateForm.controls.phone.setValue(this.userDetails.phone);
        console.log(this.userDetails._id);
      },
      err => {
        console.log(err);
        
      }
    );
  }

  updatedetails(form : NgForm) {
    this.userService.updateprofile(this.userDetails._id,form.value).subscribe(
      (res) => {
        this.userDetails = res['user'];
        
    }, 
    err => {
      console.log(err);
      console.log(this.userDetails._id);

    });
  }

  

}