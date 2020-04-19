import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/service/auth.service';
import { Reviewer } from '../shared/reviewer.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  reviewer: Reviewer;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(): void {
    this.authService.login(this.formGroup.get(['email']).value, this.formGroup.get(['password']).value)
                      .subscribe(() => {
                                        console.log('Logged In!!!');
                                        this.router.navigate(['/employees']);
                                        });
  }
}
