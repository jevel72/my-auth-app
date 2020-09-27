import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { PasswordValidators } from 'ngx-validators';

type Controls = { [key: string]: AbstractControl };

@Component({
  selector: 'my-auth-app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.registerModel = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(15),
        ],
      ],
      login: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(30),
          PasswordValidators.digitCharacterRule(1),
          PasswordValidators.alphabeticalCharacterRule(3),
          PasswordValidators.lowercaseCharacterRule(1),
          PasswordValidators.uppercaseCharacterRule(1),
          PasswordValidators.repeatCharacterRegexRule(3),
        ],
      ],
    });
    this.registerControls = this.registerModel.controls;
  }

  public registerModel: FormGroup;
  public registerControls: Controls;
  public hide: boolean = true;
  public onSubmit(): void {
    if (this.registerModel.valid) {
      const { passwordConfirm, ...registerDTO } = this.registerModel.value;
      console.log(registerDTO);
    }
  }
}
