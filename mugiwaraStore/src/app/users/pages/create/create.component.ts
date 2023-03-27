import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import User from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form_create: FormGroup;
  isSubmitted: boolean = false;
  constructor(private userService: UserService, private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { 
    this.form_create = this.formBuilder.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  get errorControl(){
    return this.form_create.controls;
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.form_create.valid){
      return false;
    }else{
      this.createUser();
      return true;
    }
  }

  createUser(){
    let user = new User();
    user.name = this.form_create.value['name'];
    user.email = this.form_create.value['email'];
    user.password = this.form_create.value['password'];
    this.userService.criarUsuario(user).subscribe(resultado =>{
      console.log(resultado);
      this.router.navigate(['login']);
    }, error =>{
      console.log(error);
    })
  }

  goToLogin(){
    this.router.navigate(['session']);
  }

}
