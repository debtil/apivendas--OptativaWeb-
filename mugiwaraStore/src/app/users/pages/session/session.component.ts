import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import User from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  form_login: FormGroup;
  isSubmitted: boolean = false;
  constructor(private userService: UserService, private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { 
    this.form_login = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  get errorControl(){
    return this.form_login.controls;
  }

  submitForm(){
    this.isSubmitted = true;
    if(!this.form_login.valid){
      return false;
    }else{
      this.createSession();
      return true;
    }
  }

  createSession(){
    let user = new User();
    user.email = this.form_login.value['email'];
    user.password = this.form_login.value['password'];
    this.userService.criarSessao(user).subscribe(resultado =>{
      this.authService.mockUsuarioLogin(resultado);
      console.log(resultado);
      this.router.navigate(['products']);
    }, error =>{
      console.log(error);
    })
  }

  goToCreate(){
    this.router.navigate(['create-user']);
  }
}
