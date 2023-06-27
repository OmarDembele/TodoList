import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private crudService: CrudService, private router: Router){}

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group(
        {
          email: [''],
          password: ['']
        }
      )
  }

  login() {
    this.crudService.getUser().subscribe(
      (response) => {
        const user = response.find((a: User) => {
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
        });
        if (user) {
          alert("Login successfully");
          this.loginForm.reset();
          this.router.navigateByUrl('/dashboard');
        } else {
          alert("User not found");
        }
      },
      (error: any) => {
        alert("Something went wrong");
      }
    );
  }
  
}
