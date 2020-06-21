import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/service/auth.service';
import { Reviewer } from '../shared/reviewer.model';
import { MessageService } from '../shared/service/message.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  msg: string;
  reviewer: Reviewer;

  loggingIn = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.messageService.invalidAction();
      this.router.navigate(['dashboard']);
    }
    this.formGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(): void {
    this.loggingIn = true;
    this.authService.login(this.formGroup.get(['email']).value, this.formGroup.get(['password']).value)
    .subscribe(res => {
      if (res) {
        this.loggingIn = false;
      }
    });
  }
}
