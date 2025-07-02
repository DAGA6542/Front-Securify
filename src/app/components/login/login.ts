import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RequestDto} from '../../model/request.dto';
import {ResponseDto} from '../../model/response.dto';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatCardHeader,
    RouterLink,

  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username: string;
  password: string;
  router = inject(Router);
  loginForm: FormGroup;
  fb = inject(FormBuilder);
  loginService = inject(LoginService);

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    localStorage.clear();
    console.log("Items eliminados ...");
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const requestDto = new RequestDto();
      requestDto.username = this.loginForm.controls['username'].value;
      requestDto.password = this.loginForm.controls['password'].value;
      let responseDto = new ResponseDto();

      this.loginService.login(requestDto).subscribe({
        next: (data: ResponseDto) => {
          console.log("Login response ROLS:", data.roles);
          console.log("Login response ROL:", data.roles[0]);
          localStorage.setItem('rol', data.roles[0]);
        },
        error: (error) => {
          console.log(error);
          this.router.navigate(['/login']);
        }
      });
      this.router.navigate(['/home']);
    }else{
      console.log("Login form invalid");
      alert("Login form invalid");
    }
  }

}
