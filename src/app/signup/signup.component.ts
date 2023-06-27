import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../service/crud.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  public signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private crudService: CrudService, private router: Router) { }


  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullname: [''],
      email: [''],
      password: [''],
      mobile: ['']
    }); 
  }

  signUp(){
    this.crudService.addUsers(this.signupForm.value).subscribe(
      (response) => {
        alert("Signup successfully ");
        this.signupForm.reset();
        this.router.navigate(['/login']);
      }
    ),
    (error: any) => {
      alert("Something went wrong");
    }
  }

}
