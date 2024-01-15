import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm:FormGroup=new FormGroup({
    correo: new FormControl('', Validators.required), 
    password: new FormControl('', Validators.required)
  });
  enviarlogin(){
    console.log(this.loginForm.value);
  }
}
