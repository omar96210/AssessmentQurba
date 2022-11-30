import { Component } from '@angular/core';
import {  FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  data: any;
  obj:any;
  UserForm = new FormControl('');
  PassForm = new FormControl('');
  constructor(private router: Router, private route: ActivatedRoute) {}

  login() {
    if(this.UserForm.value==""||this.PassForm.value==""){

      alert("username or pass is empty please full it up");

      
    }else{

    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({

        username: this.UserForm.value,
        password: this.PassForm.value,
        // expiresInMins: 60, // optional
      })
    })
      .then(res => res.json())
      .then(data => {
        this.obj = data;
       })
      .then(() => {
        if(this.obj.message=="Invalid credentials"){
          alert("Username and pass are not correct");
        }else{
          this.go();

        }
       });

  }

    }

  go() {
    this.router.navigate([`../Home`], { relativeTo: this.route });
  }

}


